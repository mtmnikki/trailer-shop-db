-- =====================================================
-- THE TRAILER SHOP DATABASE FUNCTIONS
-- Last Updated: November 16, 2025
-- =====================================================

-- =====================================================
-- ID GENERATION FUNCTIONS
-- =====================================================

-- Generate 3-letter code from name/company
-- Individual: First 2 of first name + 1 of last (John Davis → JOD)
-- Company: First letter of first 3 words (Acme Lawncare → ALC)
CREATE OR REPLACE FUNCTION generate_lead_code(
  p_first_name TEXT, 
  p_last_name TEXT, 
  p_company_name TEXT, 
  p_account_type TEXT
)
RETURNS TEXT AS $$
DECLARE
  v_code TEXT := '';
  v_clean_first TEXT;
  v_clean_last TEXT;
  v_clean_company TEXT;
  v_words TEXT[];
  v_char CHAR;
BEGIN
  v_clean_first := UPPER(REGEXP_REPLACE(COALESCE(p_first_name, ''), '[^A-Za-z]', '', 'g'));
  v_clean_last := UPPER(REGEXP_REPLACE(COALESCE(p_last_name, ''), '[^A-Za-z]', '', 'g'));
  v_clean_company := UPPER(REGEXP_REPLACE(COALESCE(p_company_name, ''), '[^A-Za-z ]', '', 'g'));

  IF p_account_type = 'company' AND LENGTH(v_clean_company) > 0 THEN
    v_words := STRING_TO_ARRAY(v_clean_company, ' ');
    
    FOR i IN 1..LEAST(ARRAY_LENGTH(v_words, 1), 3) LOOP
      IF LENGTH(v_words[i]) > 0 THEN
        v_code := v_code || SUBSTRING(v_words[i], 1, 1);
      END IF;
    END LOOP;
    
    IF LENGTH(v_code) = 3 THEN RETURN v_code; END IF;
    
    IF LENGTH(v_code) > 0 AND LENGTH(v_code) < 3 THEN
      FOR i IN 1..LENGTH(v_clean_company) LOOP
        v_char := SUBSTRING(v_clean_company, i, 1);
        IF v_char != ' ' AND POSITION(v_char IN v_code) = 0 THEN
          v_code := v_code || v_char;
          IF LENGTH(v_code) = 3 THEN RETURN v_code; END IF;
        END IF;
      END LOOP;
    END IF;
  END IF;

  IF LENGTH(v_clean_first) >= 2 AND LENGTH(v_clean_last) >= 1 THEN
    RETURN SUBSTRING(v_clean_first, 1, 2) || SUBSTRING(v_clean_last, 1, 1);
  END IF;

  IF LENGTH(v_clean_first) >= 3 THEN
    RETURN SUBSTRING(v_clean_first, 1, 3);
  END IF;

  IF LENGTH(v_clean_last) >= 3 THEN
    RETURN SUBSTRING(v_clean_last, 1, 3);
  END IF;

  IF LENGTH(v_clean_first) > 0 AND LENGTH(v_clean_last) > 0 THEN
    v_code := v_clean_first || SUBSTRING(v_clean_last, 1, 3 - LENGTH(v_clean_first));
    IF LENGTH(v_code) = 3 THEN RETURN v_code; END IF;
  END IF;

  IF LENGTH(v_clean_first) > 0 THEN
    v_code := v_clean_first;
    WHILE LENGTH(v_code) < 3 LOOP
      v_code := v_code || 'X';
    END LOOP;
    RETURN SUBSTRING(v_code, 1, 3);
  END IF;

  IF LENGTH(v_clean_last) > 0 THEN
    v_code := v_clean_last;
    WHILE LENGTH(v_code) < 3 LOOP
      v_code := v_code || 'X';
    END LOOP;
    RETURN SUBSTRING(v_code, 1, 3);
  END IF;

  RETURN 'XXX';
END;
$$ LANGUAGE plpgsql;

-- Generate Account ID: CST-JOD111025
CREATE OR REPLACE FUNCTION generate_account_id(
  p_first_name TEXT,
  p_last_name TEXT,
  p_company_name TEXT,
  p_account_type TEXT,
  p_date_created DATE
)
RETURNS TEXT AS $$
DECLARE
  v_code TEXT;
BEGIN
  v_code := generate_lead_code(p_first_name, p_last_name, p_company_name, p_account_type);
  RETURN 'CST-' || v_code || TO_CHAR(p_date_created, 'MMDDYY');
END;
$$ LANGUAGE plpgsql;

-- Generate Invoice Number: INV-JOD111625
CREATE OR REPLACE FUNCTION generate_invoice_number(p_account_id TEXT, p_invoice_date DATE)
RETURNS TEXT AS $$
DECLARE
  v_code TEXT;
BEGIN
  SELECT generate_lead_code(
    ci.contact_first_name,
    ci.contact_last_name,
    ca.company_name,
    ca.account_type
  ) INTO v_code
  FROM customer_accounts ca
  LEFT JOIN contact_information ci ON ca.account_id = ci.account_id AND ci.is_primary = true
  WHERE ca.account_id = p_account_id
  LIMIT 1;
  
  RETURN 'INV-' || v_code || TO_CHAR(p_invoice_date, 'MMDDYY');
END;
$$ LANGUAGE plpgsql;

-- Generate Estimate Number: EST-JOD111625
CREATE OR REPLACE FUNCTION generate_estimate_number(p_account_id TEXT, p_estimate_date DATE)
RETURNS TEXT AS $$
DECLARE
  v_code TEXT;
BEGIN
  SELECT generate_lead_code(
    ci.contact_first_name,
    ci.contact_last_name,
    ca.company_name,
    ca.account_type
  ) INTO v_code
  FROM customer_accounts ca
  LEFT JOIN contact_information ci ON ca.account_id = ci.account_id AND ci.is_primary = true
  WHERE ca.account_id = p_account_id
  LIMIT 1;
  
  RETURN 'EST-' || v_code || TO_CHAR(p_estimate_date, 'MMDDYY');
END;
$$ LANGUAGE plpgsql;

-- Generate Job ID: JOB-JOD111625
CREATE OR REPLACE FUNCTION generate_job_id(p_account_id TEXT, p_created_date DATE)
RETURNS TEXT AS $$
DECLARE
  v_code TEXT;
BEGIN
  SELECT generate_lead_code(
    ci.contact_first_name,
    ci.contact_last_name,
    ca.company_name,
    ca.account_type
  ) INTO v_code
  FROM customer_accounts ca
  LEFT JOIN contact_information ci ON ca.account_id = ci.account_id AND ci.is_primary = true
  WHERE ca.account_id = p_account_id
  LIMIT 1;
  
  RETURN 'JOB-' || v_code || TO_CHAR(p_created_date, 'MMDDYY');
END;
$$ LANGUAGE plpgsql;

-- Generate Trailer ID: TRL-JOD001 (sequential per account)
CREATE OR REPLACE FUNCTION generate_trailer_id(p_account_id TEXT)
RETURNS TEXT AS $$
DECLARE
  v_trailer_count INTEGER;
  v_code TEXT;
BEGIN
  SELECT COUNT(*) INTO v_trailer_count
  FROM customer_trailers
  WHERE account_id = p_account_id;
  
  SELECT generate_lead_code(
    ci.contact_first_name,
    ci.contact_last_name,
    ca.company_name,
    ca.account_type
  ) INTO v_code
  FROM customer_accounts ca
  LEFT JOIN contact_information ci ON ca.account_id = ci.account_id AND ci.is_primary = true
  WHERE ca.account_id = p_account_id
  LIMIT 1;
  
  RETURN 'TRL-' || v_code || LPAD((v_trailer_count + 1)::TEXT, 3, '0');
END;
$$ LANGUAGE plpgsql;

-- Generate Payment ID: PAY-JOD111625
CREATE OR REPLACE FUNCTION generate_payment_id(p_account_id TEXT, p_payment_date DATE)
RETURNS TEXT AS $$
DECLARE
  v_code TEXT;
BEGIN
  SELECT generate_lead_code(
    ci.contact_first_name,
    ci.contact_last_name,
    ca.company_name,
    ca.account_type
  ) INTO v_code
  FROM customer_accounts ca
  LEFT JOIN contact_information ci ON ca.account_id = ci.account_id AND ci.is_primary = true
  WHERE ca.account_id = p_account_id
  LIMIT 1;
  
  RETURN 'PAY-' || v_code || TO_CHAR(p_payment_date, 'MMDDYY');
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- BUSINESS LOGIC FUNCTIONS
-- =====================================================

-- Get numeric setting value with default fallback
CREATE OR REPLACE FUNCTION get_setting_numeric(p_key TEXT, p_default NUMERIC)
RETURNS NUMERIC AS $$
DECLARE
  v_value NUMERIC;
BEGIN
  SELECT setting_value::NUMERIC INTO v_value
  FROM settings
  WHERE setting_key = p_key;
  
  RETURN COALESCE(v_value, p_default);
END;
$$ LANGUAGE plpgsql;

-- Convert lead to customer account + contact + trailer
-- Returns JSON: {"account_id": "CST-...", "contact_id": "...", "trailer_id": "..."}
CREATE OR REPLACE FUNCTION convert_lead_to_account(p_lead_id TEXT)
RETURNS JSON AS $$
DECLARE
  v_lead RECORD;
  v_account_id TEXT;
  v_contact_id TEXT;
  v_trailer_id TEXT;
BEGIN
  SELECT * INTO v_lead FROM lead_tracking WHERE lead_id = p_lead_id;
  
  v_account_id := generate_account_id(
    v_lead.lead_first_name, 
    v_lead.lead_last_name, 
    v_lead.company_name, 
    v_lead.account_type,
    v_lead.contact_date
  );
  
  INSERT INTO customer_accounts (
    account_id, account_name, account_type, company_name,
    billing_street, billing_city, billing_state, billing_zip_code
  ) VALUES (
    v_account_id,
    COALESCE(v_lead.company_name, v_lead.lead_first_name || ' ' || v_lead.lead_last_name),
    v_lead.account_type,
    v_lead.company_name,
    v_lead.billing_street, v_lead.billing_city, v_lead.billing_state, v_lead.billing_zip
  );
  
  v_contact_id := gen_random_uuid()::text;
  INSERT INTO contact_information (
    contact_id, account_id, contact_first_name, contact_last_name,
    contact_phone, contact_email, is_primary, preferred_contact_method
  ) VALUES (
    v_contact_id, v_account_id, v_lead.lead_first_name, v_lead.lead_last_name,
    v_lead.contact_phone_number, v_lead.email, true, v_lead.preferred_contact_method
  );
  
  IF v_lead.trailer_type IS NOT NULL THEN
    v_trailer_id := generate_trailer_id(v_account_id);
    INSERT INTO customer_trailers (
      trailer_id, account_id, trailer_type, manufacturer, date_manufactured,
      coupler, length_ft, width_ft, gawr, axle_count
    ) VALUES (
      v_trailer_id, v_account_id, v_lead.trailer_type, v_lead.manufacturer,
      v_lead.date_manufactured, v_lead.coupler, v_lead.length_ft, v_lead.width_ft,
      v_lead.gawr, v_lead.axle_count
    );
  END IF;
  
  UPDATE lead_tracking SET lead_status = 'converted' WHERE lead_id = p_lead_id;
  
  RETURN json_build_object(
    'account_id', v_account_id,
    'contact_id', v_contact_id,
    'trailer_id', v_trailer_id
  );
END;
$$ LANGUAGE plpgsql;