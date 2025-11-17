-- =====================================================
-- THE TRAILER SHOP DATABASE TRIGGERS
-- Last Updated: November 16, 2025
-- =====================================================

-- =====================================================
-- TIMESTAMP TRIGGERS
-- =====================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER trg_update_customer_accounts
BEFORE UPDATE ON customer_accounts
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER trg_update_customer_trailers
BEFORE UPDATE ON customer_trailers
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER trg_update_parts_information
BEFORE UPDATE ON parts_information
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER trg_update_vendor_information
BEFORE UPDATE ON vendor_information
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER trg_update_purchase_orders
BEFORE UPDATE ON purchase_orders
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER trg_update_customer_estimates
BEFORE UPDATE ON customer_estimates
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER trg_update_customer_invoices
BEFORE UPDATE ON customer_invoices
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER trg_update_jobs_tracking
BEFORE UPDATE ON jobs_tracking
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER trg_update_lead_tracking
BEFORE UPDATE ON lead_tracking
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER trg_update_payments
BEFORE UPDATE ON payments
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER trg_update_notes
BEFORE UPDATE ON notes
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER trg_update_tasks
BEFORE UPDATE ON tasks
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER trg_update_parts_vendors
BEFORE UPDATE ON parts_vendors
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER trg_update_trailer_build_sheets
BEFORE UPDATE ON trailer_build_sheets
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

-- =====================================================
-- INVENTORY MANAGEMENT TRIGGERS
-- =====================================================

-- Update parts inventory when PO received
CREATE OR REPLACE FUNCTION update_parts_on_po_receive()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.purchase_order_status = 'received' AND OLD.purchase_order_status != 'received' THEN
    UPDATE parts_information pi
    SET 
      quantity_ordered = COALESCE(quantity_ordered, 0) + pod.quantity,
      quantity_in_stock = COALESCE(quantity_in_stock, 0) + pod.quantity
    FROM purchase_order_details pod
    WHERE pod.item_id = pi.item_id 
      AND pod.purchase_order_number = NEW.purchase_order_number;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_inventory_on_po_receive
AFTER UPDATE ON purchase_orders
FOR EACH ROW EXECUTE FUNCTION update_parts_on_po_receive();

-- Update parts inventory when invoiced
CREATE OR REPLACE FUNCTION update_parts_on_invoice()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.line_item_type = 'part' AND NEW.item_id IS NOT NULL THEN
    UPDATE parts_information
    SET 
      quantity_invoiced = COALESCE(quantity_invoiced, 0) + NEW.quantity,
      quantity_in_stock = COALESCE(quantity_in_stock, 0) - NEW.quantity
    WHERE item_id = NEW.item_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_inventory_on_invoice
AFTER INSERT ON customer_invoice_details
FOR EACH ROW EXECUTE FUNCTION update_parts_on_invoice();
