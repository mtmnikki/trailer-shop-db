-- =====================================================
-- THE TRAILER SHOP DATABASE VIEWS
-- Last Updated: November 16, 2025
-- =====================================================

-- =====================================================
-- FINANCIAL CALCULATION VIEWS
-- =====================================================

-- Invoice Totals: Auto-calculate from line items
-- Misc calculation: 4% OR 2.5% if 4% > $25
-- Tax: 7% of subtotal
CREATE OR REPLACE VIEW v_invoice_totals AS
SELECT 
  invoice_number,
  COALESCE(SUM(CASE WHEN line_item_type = 'part' THEN item_total ELSE 0 END), 0) AS parts_subtotal,
  COALESCE(SUM(CASE WHEN line_item_type = 'service' THEN item_total ELSE 0 END), 0) AS service_subtotal,
  COUNT(*) AS number_of_items,
  CASE 
    WHEN (COALESCE(SUM(item_total), 0) * 0.04) > 25 
    THEN ROUND(COALESCE(SUM(item_total), 0) * 0.025, 2)
    ELSE ROUND(COALESCE(SUM(item_total), 0) * 0.04, 2)
  END AS misc_shop_supplies,
  COALESCE(SUM(item_total), 0) + 
    CASE 
      WHEN (COALESCE(SUM(item_total), 0) * 0.04) > 25 
      THEN ROUND(COALESCE(SUM(item_total), 0) * 0.025, 2)
      ELSE ROUND(COALESCE(SUM(item_total), 0) * 0.04, 2)
    END AS invoice_subtotal,
  ROUND((COALESCE(SUM(item_total), 0) + 
    CASE 
      WHEN (COALESCE(SUM(item_total), 0) * 0.04) > 25 
      THEN ROUND(COALESCE(SUM(item_total), 0) * 0.025, 2)
      ELSE ROUND(COALESCE(SUM(item_total), 0) * 0.04, 2)
    END) * 0.07, 2) AS invoice_tax,
  ROUND((COALESCE(SUM(item_total), 0) + 
    CASE 
      WHEN (COALESCE(SUM(item_total), 0) * 0.04) > 25 
      THEN ROUND(COALESCE(SUM(item_total), 0) * 0.025, 2)
      ELSE ROUND(COALESCE(SUM(item_total), 0) * 0.04, 2)
    END) * 1.07, 2) AS invoice_total
FROM customer_invoice_details
GROUP BY invoice_number;

-- Estimate Totals: Same logic as invoices
CREATE OR REPLACE VIEW v_estimate_totals AS
SELECT 
  estimate_number,
  COALESCE(SUM(CASE WHEN line_item_type = 'part' THEN item_total ELSE 0 END), 0) AS parts_subtotal,
  COALESCE(SUM(CASE WHEN line_item_type = 'service' THEN item_total ELSE 0 END), 0) AS service_subtotal,
  COUNT(*) AS number_of_items,
  CASE 
    WHEN (COALESCE(SUM(item_total), 0) * 0.04) > 25 
    THEN ROUND(COALESCE(SUM(item_total), 0) * 0.025, 2)
    ELSE ROUND(COALESCE(SUM(item_total), 0) * 0.04, 2)
  END AS misc_shop_supplies,
  COALESCE(SUM(item_total), 0) + 
    CASE 
      WHEN (COALESCE(SUM(item_total), 0) * 0.04) > 25 
      THEN ROUND(COALESCE(SUM(item_total), 0) * 0.025, 2)
      ELSE ROUND(COALESCE(SUM(item_total), 0) * 0.04, 2)
    END AS estimate_subtotal,
  ROUND((COALESCE(SUM(item_total), 0) + 
    CASE 
      WHEN (COALESCE(SUM(item_total), 0) * 0.04) > 25 
      THEN ROUND(COALESCE(SUM(item_total), 0) * 0.025, 2)
      ELSE ROUND(COALESCE(SUM(item_total), 0) * 0.04, 2)
    END) * 0.07, 2) AS estimate_tax,
  ROUND((COALESCE(SUM(item_total), 0) + 
    CASE 
      WHEN (COALESCE(SUM(item_total), 0) * 0.04) > 25 
      THEN ROUND(COALESCE(SUM(item_total), 0) * 0.025, 2)
      ELSE ROUND(COALESCE(SUM(item_total), 0) * 0.04, 2)
    END) * 1.07, 2) AS estimate_total
FROM customer_estimate_details
GROUP BY estimate_number;

-- =====================================================
-- CUSTOMER VIEWS
-- =====================================================

-- Customer Search: Fast lookup by phone/name/email
CREATE OR REPLACE VIEW v_customer_search AS
SELECT 
  ca.account_id,
  ca.account_name,
  ca.account_type,
  ca.company_name,
  ci.contact_id,
  ci.contact_first_name,
  ci.contact_last_name,
  ci.contact_phone,
  ci.contact_email,
  ci.preferred_contact_method,
  COUNT(DISTINCT ct.trailer_id) AS trailer_count,
  COUNT(DISTINCT jt.job_id) AS job_count,
  COUNT(DISTINCT inv.invoice_number) AS invoice_count,
  COALESCE(SUM(inv.invoice_total), 0) AS total_revenue
FROM customer_accounts ca
LEFT JOIN contact_information ci ON ca.account_id = ci.account_id AND ci.is_primary = true
LEFT JOIN customer_trailers ct ON ca.account_id = ct.account_id
LEFT JOIN jobs_tracking jt ON ca.account_id = jt.account_id
LEFT JOIN customer_invoices inv ON ca.account_id = inv.account_id
GROUP BY ca.account_id, ca.account_name, ca.account_type, ca.company_name,
         ci.contact_id, ci.contact_first_name, ci.contact_last_name, 
         ci.contact_phone, ci.contact_email, ci.preferred_contact_method;

-- Account Balance: Financial summary per account
CREATE OR REPLACE VIEW v_account_balance AS
SELECT 
  ca.account_id,
  ca.account_name,
  COALESCE(SUM(inv.invoice_total), 0) AS total_invoiced,
  COALESCE(SUM(p.amount_total), 0) AS total_payments,
  COALESCE(SUM(inv.invoice_total), 0) - COALESCE(SUM(p.amount_total), 0) AS balance_due
FROM customer_accounts ca
LEFT JOIN customer_invoices inv ON ca.account_id = inv.account_id
LEFT JOIN payments p ON ca.account_id = p.account_id
GROUP BY ca.account_id, ca.account_name;

-- Invoice Paid Status: FIFO waterfall payment application
CREATE OR REPLACE VIEW v_invoice_paid_status AS
WITH account_payments AS (
  SELECT account_id, SUM(amount_total) AS total_paid
  FROM payments
  GROUP BY account_id
),
invoices_ordered AS (
  SELECT 
    invoice_number,
    account_id,
    invoice_date,
    invoice_total,
    ROW_NUMBER() OVER (PARTITION BY account_id ORDER BY invoice_date) AS invoice_order
  FROM customer_invoices
),
running_totals AS (
  SELECT 
    io.invoice_number,
    io.account_id,
    io.invoice_total,
    SUM(io.invoice_total) OVER (
      PARTITION BY io.account_id 
      ORDER BY io.invoice_date 
      ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS cumulative_invoiced
  FROM invoices_ordered io
)
SELECT 
  rt.invoice_number,
  rt.invoice_total,
  CASE 
    WHEN ap.total_paid >= rt.cumulative_invoiced THEN rt.invoice_total
    WHEN ap.total_paid >= (rt.cumulative_invoiced - rt.invoice_total) THEN ap.total_paid - (rt.cumulative_invoiced - rt.invoice_total)
    ELSE 0
  END AS amount_paid,
  rt.invoice_total - CASE 
    WHEN ap.total_paid >= rt.cumulative_invoiced THEN rt.invoice_total
    WHEN ap.total_paid >= (rt.cumulative_invoiced - rt.invoice_total) THEN ap.total_paid - (rt.cumulative_invoiced - rt.invoice_total)
    ELSE 0
  END AS balance_due,
  CASE 
    WHEN ap.total_paid >= rt.cumulative_invoiced THEN 'paid_in_full'
    WHEN ap.total_paid >= (rt.cumulative_invoiced - rt.invoice_total) THEN 'partial_payment'
    ELSE 'unpaid'
  END AS payment_status
FROM running_totals rt
LEFT JOIN account_payments ap ON rt.account_id = ap.account_id;

-- =====================================================
-- INVENTORY VIEWS
-- =====================================================

-- Parts Inventory: Profitability calculations only
-- (Join with parts_information for full details)
CREATE OR REPLACE VIEW v_parts_inventory AS
SELECT 
  pi.item_id,
  COALESCE(SUM(pod.item_total), 0) AS total_cost,
  COALESCE(SUM(cid.item_total), 0) AS total_sales,
  (COALESCE(SUM(cid.item_total), 0) - COALESCE(SUM(pod.item_total), 0)) AS margin_dollars,
  CASE 
    WHEN SUM(cid.item_total) > 0 
    THEN ((SUM(cid.item_total) - COALESCE(SUM(pod.item_total), 0)) / SUM(cid.item_total))
    ELSE NULL
  END AS margin_percent
FROM parts_information pi
LEFT JOIN purchase_order_details pod ON pi.item_id = pod.item_id
LEFT JOIN customer_invoice_details cid ON pi.item_id = cid.item_id
GROUP BY pi.item_id;

-- Vendor Totals: Spending summary
CREATE OR REPLACE VIEW v_vendor_totals AS
SELECT 
  vi.vendor_id,
  vi.vendor_name,
  COUNT(po.purchase_order_number) AS total_po_count,
  COALESCE(SUM(po.purchase_order_total), 0) AS total_spend
FROM vendor_information vi
LEFT JOIN purchase_orders po ON vi.vendor_id = po.vendor_id
GROUP BY vi.vendor_id, vi.vendor_name;