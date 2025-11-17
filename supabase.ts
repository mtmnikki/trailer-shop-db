export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      contact_information: {
        Row: {
          account_id: string | null
          contact_authorizations:
            | Database["public"]["Enums"]["contact_authorization"][]
            | null
          contact_autonum: number
          contact_email: string | null
          contact_first_name: string | null
          contact_id: string
          contact_last_name: string | null
          contact_phone: string | null
          date_contact_added: string | null
          is_primary: boolean | null
          preferred_contact_method:
            | Database["public"]["Enums"]["preferred_contact_method"][]
            | null
          updated_date: string | null
        }
        Insert: {
          account_id?: string | null
          contact_authorizations?:
            | Database["public"]["Enums"]["contact_authorization"][]
            | null
          contact_autonum?: number
          contact_email?: string | null
          contact_first_name?: string | null
          contact_id: string
          contact_last_name?: string | null
          contact_phone?: string | null
          date_contact_added?: string | null
          is_primary?: boolean | null
          preferred_contact_method?:
            | Database["public"]["Enums"]["preferred_contact_method"][]
            | null
          updated_date?: string | null
        }
        Update: {
          account_id?: string | null
          contact_authorizations?:
            | Database["public"]["Enums"]["contact_authorization"][]
            | null
          contact_autonum?: number
          contact_email?: string | null
          contact_first_name?: string | null
          contact_id?: string
          contact_last_name?: string | null
          contact_phone?: string | null
          date_contact_added?: string | null
          is_primary?: boolean | null
          preferred_contact_method?:
            | Database["public"]["Enums"]["preferred_contact_method"][]
            | null
          updated_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contact_information_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "customer_accounts"
            referencedColumns: ["account_id"]
          },
          {
            foreignKeyName: "contact_information_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "v_account_balance"
            referencedColumns: ["account_id"]
          },
          {
            foreignKeyName: "contact_information_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "v_customer_search"
            referencedColumns: ["account_id"]
          },
        ]
      }
      customer_accounts: {
        Row: {
          account_id: string
          account_name: string | null
          account_type: Database["public"]["Enums"]["account_type"] | null
          billing_city: string | null
          billing_state: string | null
          billing_street: string | null
          billing_zip_code: string | null
          company_name: string | null
          date_created: string | null
          last_modified: string | null
        }
        Insert: {
          account_id: string
          account_name?: string | null
          account_type?: Database["public"]["Enums"]["account_type"] | null
          billing_city?: string | null
          billing_state?: string | null
          billing_street?: string | null
          billing_zip_code?: string | null
          company_name?: string | null
          date_created?: string | null
          last_modified?: string | null
        }
        Update: {
          account_id?: string
          account_name?: string | null
          account_type?: Database["public"]["Enums"]["account_type"] | null
          billing_city?: string | null
          billing_state?: string | null
          billing_street?: string | null
          billing_zip_code?: string | null
          company_name?: string | null
          date_created?: string | null
          last_modified?: string | null
        }
        Relationships: []
      }
      customer_estimate_details: {
        Row: {
          estimate_line_item_id: string
          estimate_number: string
          item_id: string | null
          item_total: number | null
          labor_description: string | null
          line_item_type: Database["public"]["Enums"]["line_item_type"] | null
          quantity: number | null
          sales_price: number | null
          service_area_id: string | null
          service_rate: number | null
          service_type_id: string | null
          unit_rate: number | null
        }
        Insert: {
          estimate_line_item_id: string
          estimate_number: string
          item_id?: string | null
          item_total?: number | null
          labor_description?: string | null
          line_item_type?: Database["public"]["Enums"]["line_item_type"] | null
          quantity?: number | null
          sales_price?: number | null
          service_area_id?: string | null
          service_rate?: number | null
          service_type_id?: string | null
          unit_rate?: number | null
        }
        Update: {
          estimate_line_item_id?: string
          estimate_number?: string
          item_id?: string | null
          item_total?: number | null
          labor_description?: string | null
          line_item_type?: Database["public"]["Enums"]["line_item_type"] | null
          quantity?: number | null
          sales_price?: number | null
          service_area_id?: string | null
          service_rate?: number | null
          service_type_id?: string | null
          unit_rate?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_estimate_details_estimate_number_fkey"
            columns: ["estimate_number"]
            isOneToOne: false
            referencedRelation: "customer_estimates"
            referencedColumns: ["estimate_number"]
          },
          {
            foreignKeyName: "customer_estimate_details_estimate_number_fkey"
            columns: ["estimate_number"]
            isOneToOne: false
            referencedRelation: "v_estimate_totals"
            referencedColumns: ["estimate_number"]
          },
          {
            foreignKeyName: "customer_estimate_details_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "parts_information"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "customer_estimate_details_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "v_part_details"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "customer_estimate_details_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "v_parts_highest_revenue"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "customer_estimate_details_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "v_parts_inventory"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "customer_estimate_details_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "v_parts_lowest_margin"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "customer_estimate_details_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "v_parts_most_used"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "customer_estimate_details_service_area_id_fkey"
            columns: ["service_area_id"]
            isOneToOne: false
            referencedRelation: "service_area"
            referencedColumns: ["service_area_id"]
          },
          {
            foreignKeyName: "customer_estimate_details_service_type_id_fkey"
            columns: ["service_type_id"]
            isOneToOne: false
            referencedRelation: "service_types"
            referencedColumns: ["service_type_id"]
          },
        ]
      }
      customer_estimates: {
        Row: {
          account_id: string | null
          created_at: string | null
          est_exp_date: string | null
          est_response_date: string | null
          estimate_date: string | null
          estimate_number: string
          estimate_status: Database["public"]["Enums"]["estimate_status"] | null
          estimate_subtotal: number | null
          estimate_tax: number | null
          estimate_total: number | null
          misc_shop_supplies: number | null
          parts_subtotal: number | null
          service_subtotal: number | null
          terms_days: number | null
          trailer_id: string | null
          updated_at: string | null
        }
        Insert: {
          account_id?: string | null
          created_at?: string | null
          est_exp_date?: string | null
          est_response_date?: string | null
          estimate_date?: string | null
          estimate_number: string
          estimate_status?:
            | Database["public"]["Enums"]["estimate_status"]
            | null
          estimate_subtotal?: number | null
          estimate_tax?: number | null
          estimate_total?: number | null
          misc_shop_supplies?: number | null
          parts_subtotal?: number | null
          service_subtotal?: number | null
          terms_days?: number | null
          trailer_id?: string | null
          updated_at?: string | null
        }
        Update: {
          account_id?: string | null
          created_at?: string | null
          est_exp_date?: string | null
          est_response_date?: string | null
          estimate_date?: string | null
          estimate_number?: string
          estimate_status?:
            | Database["public"]["Enums"]["estimate_status"]
            | null
          estimate_subtotal?: number | null
          estimate_tax?: number | null
          estimate_total?: number | null
          misc_shop_supplies?: number | null
          parts_subtotal?: number | null
          service_subtotal?: number | null
          terms_days?: number | null
          trailer_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_estimates_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "customer_accounts"
            referencedColumns: ["account_id"]
          },
          {
            foreignKeyName: "customer_estimates_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "v_account_balance"
            referencedColumns: ["account_id"]
          },
          {
            foreignKeyName: "customer_estimates_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "v_customer_search"
            referencedColumns: ["account_id"]
          },
          {
            foreignKeyName: "customer_estimates_trailer_id_fkey"
            columns: ["trailer_id"]
            isOneToOne: false
            referencedRelation: "customer_trailers"
            referencedColumns: ["trailer_id"]
          },
        ]
      }
      customer_invoice_details: {
        Row: {
          invoice_line_item_autonum: number
          invoice_line_item_id: string
          invoice_number: string | null
          item_id: string | null
          item_name: string | null
          item_total: number | null
          labor_description: string | null
          line_item_type: Database["public"]["Enums"]["line_item_type"] | null
          quantity: number | null
          sales_price: number | null
          service_area_id: string | null
          service_rate: number | null
          service_type_id: string | null
          unit_rate: number | null
        }
        Insert: {
          invoice_line_item_autonum?: number
          invoice_line_item_id: string
          invoice_number?: string | null
          item_id?: string | null
          item_name?: string | null
          item_total?: number | null
          labor_description?: string | null
          line_item_type?: Database["public"]["Enums"]["line_item_type"] | null
          quantity?: number | null
          sales_price?: number | null
          service_area_id?: string | null
          service_rate?: number | null
          service_type_id?: string | null
          unit_rate?: number | null
        }
        Update: {
          invoice_line_item_autonum?: number
          invoice_line_item_id?: string
          invoice_number?: string | null
          item_id?: string | null
          item_name?: string | null
          item_total?: number | null
          labor_description?: string | null
          line_item_type?: Database["public"]["Enums"]["line_item_type"] | null
          quantity?: number | null
          sales_price?: number | null
          service_area_id?: string | null
          service_rate?: number | null
          service_type_id?: string | null
          unit_rate?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_invoice_details_invoice_number_fkey"
            columns: ["invoice_number"]
            isOneToOne: false
            referencedRelation: "customer_invoices"
            referencedColumns: ["invoice_number"]
          },
          {
            foreignKeyName: "customer_invoice_details_invoice_number_fkey"
            columns: ["invoice_number"]
            isOneToOne: false
            referencedRelation: "v_invoice_paid_status"
            referencedColumns: ["invoice_number"]
          },
          {
            foreignKeyName: "customer_invoice_details_invoice_number_fkey"
            columns: ["invoice_number"]
            isOneToOne: false
            referencedRelation: "v_invoice_totals"
            referencedColumns: ["invoice_number"]
          },
          {
            foreignKeyName: "customer_invoice_details_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "parts_information"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "customer_invoice_details_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "v_part_details"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "customer_invoice_details_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "v_parts_highest_revenue"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "customer_invoice_details_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "v_parts_inventory"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "customer_invoice_details_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "v_parts_lowest_margin"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "customer_invoice_details_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "v_parts_most_used"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "customer_invoice_details_service_area_id_fkey"
            columns: ["service_area_id"]
            isOneToOne: false
            referencedRelation: "service_area"
            referencedColumns: ["service_area_id"]
          },
          {
            foreignKeyName: "customer_invoice_details_service_type_id_fkey"
            columns: ["service_type_id"]
            isOneToOne: false
            referencedRelation: "service_types"
            referencedColumns: ["service_type_id"]
          },
        ]
      }
      customer_invoices: {
        Row: {
          account_id: string | null
          created_at: string | null
          estimate_number: string | null
          invoice_date: string | null
          invoice_due_date: string | null
          invoice_number: string
          invoice_status: Database["public"]["Enums"]["invoice_status"] | null
          invoice_subtotal: number | null
          invoice_tax: number | null
          invoice_total: number | null
          job_id: string | null
          misc_shop_supplies: number | null
          parts_subtotal: number | null
          service_subtotal: number | null
          trailer_id: string | null
          updated_at: string | null
        }
        Insert: {
          account_id?: string | null
          created_at?: string | null
          estimate_number?: string | null
          invoice_date?: string | null
          invoice_due_date?: string | null
          invoice_number: string
          invoice_status?: Database["public"]["Enums"]["invoice_status"] | null
          invoice_subtotal?: number | null
          invoice_tax?: number | null
          invoice_total?: number | null
          job_id?: string | null
          misc_shop_supplies?: number | null
          parts_subtotal?: number | null
          service_subtotal?: number | null
          trailer_id?: string | null
          updated_at?: string | null
        }
        Update: {
          account_id?: string | null
          created_at?: string | null
          estimate_number?: string | null
          invoice_date?: string | null
          invoice_due_date?: string | null
          invoice_number?: string
          invoice_status?: Database["public"]["Enums"]["invoice_status"] | null
          invoice_subtotal?: number | null
          invoice_tax?: number | null
          invoice_total?: number | null
          job_id?: string | null
          misc_shop_supplies?: number | null
          parts_subtotal?: number | null
          service_subtotal?: number | null
          trailer_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_invoices_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "customer_accounts"
            referencedColumns: ["account_id"]
          },
          {
            foreignKeyName: "customer_invoices_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "v_account_balance"
            referencedColumns: ["account_id"]
          },
          {
            foreignKeyName: "customer_invoices_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "v_customer_search"
            referencedColumns: ["account_id"]
          },
          {
            foreignKeyName: "customer_invoices_estimate_number_fkey"
            columns: ["estimate_number"]
            isOneToOne: false
            referencedRelation: "customer_estimates"
            referencedColumns: ["estimate_number"]
          },
          {
            foreignKeyName: "customer_invoices_estimate_number_fkey"
            columns: ["estimate_number"]
            isOneToOne: false
            referencedRelation: "v_estimate_totals"
            referencedColumns: ["estimate_number"]
          },
          {
            foreignKeyName: "customer_invoices_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs_tracking"
            referencedColumns: ["job_id"]
          },
          {
            foreignKeyName: "customer_invoices_trailer_id_fkey"
            columns: ["trailer_id"]
            isOneToOne: false
            referencedRelation: "customer_trailers"
            referencedColumns: ["trailer_id"]
          },
        ]
      }
      customer_trailers: {
        Row: {
          account_id: string | null
          axle_capacity: Database["public"]["Enums"]["axle_capacity"] | null
          axle_count: number | null
          beam_diameter: Database["public"]["Enums"]["beam_diameter"] | null
          bolt_pattern: Database["public"]["Enums"]["bolt_pattern"] | null
          brake_type: Database["public"]["Enums"]["brake_type"] | null
          color: Database["public"]["Enums"]["color"] | null
          coupler: Database["public"]["Enums"]["coupler"] | null
          created_at: string | null
          date_manufactured: string | null
          gawr: number | null
          hubface: string | null
          inner_bearing_race:
            | Database["public"]["Enums"]["inner_bearing_race"]
            | null
          jack: Database["public"]["Enums"]["jack"] | null
          leaf_count: number | null
          length_ft: number | null
          license_plate_number: string | null
          lights: Database["public"]["Enums"]["lights"] | null
          outer_bearing_race:
            | Database["public"]["Enums"]["outer_bearing_race"]
            | null
          seal: string | null
          spindle: Database["public"]["Enums"]["spindle"] | null
          spring_center: string | null
          spring_length: number | null
          spring_position: Database["public"]["Enums"]["spring_position"] | null
          spring_type: Database["public"]["Enums"]["spring_type"] | null
          spring_width: number | null
          tire_load_range: Database["public"]["Enums"]["tire_load_range"] | null
          tire_size: Database["public"]["Enums"]["tire_size"] | null
          trailer_id: string
          trailer_manufacturer:
            | Database["public"]["Enums"]["trailer_manufacturer"]
            | null
          trailer_name: string
          trailer_type: Database["public"]["Enums"]["trailer_type"] | null
          trailer_vin: string | null
          updated_at: string | null
          width_ft: number | null
        }
        Insert: {
          account_id?: string | null
          axle_capacity?: Database["public"]["Enums"]["axle_capacity"] | null
          axle_count?: number | null
          beam_diameter?: Database["public"]["Enums"]["beam_diameter"] | null
          bolt_pattern?: Database["public"]["Enums"]["bolt_pattern"] | null
          brake_type?: Database["public"]["Enums"]["brake_type"] | null
          color?: Database["public"]["Enums"]["color"] | null
          coupler?: Database["public"]["Enums"]["coupler"] | null
          created_at?: string | null
          date_manufactured?: string | null
          gawr?: number | null
          hubface?: string | null
          inner_bearing_race?:
            | Database["public"]["Enums"]["inner_bearing_race"]
            | null
          jack?: Database["public"]["Enums"]["jack"] | null
          leaf_count?: number | null
          length_ft?: number | null
          license_plate_number?: string | null
          lights?: Database["public"]["Enums"]["lights"] | null
          outer_bearing_race?:
            | Database["public"]["Enums"]["outer_bearing_race"]
            | null
          seal?: string | null
          spindle?: Database["public"]["Enums"]["spindle"] | null
          spring_center?: string | null
          spring_length?: number | null
          spring_position?:
            | Database["public"]["Enums"]["spring_position"]
            | null
          spring_type?: Database["public"]["Enums"]["spring_type"] | null
          spring_width?: number | null
          tire_load_range?:
            | Database["public"]["Enums"]["tire_load_range"]
            | null
          tire_size?: Database["public"]["Enums"]["tire_size"] | null
          trailer_id: string
          trailer_manufacturer?:
            | Database["public"]["Enums"]["trailer_manufacturer"]
            | null
          trailer_name: string
          trailer_type?: Database["public"]["Enums"]["trailer_type"] | null
          trailer_vin?: string | null
          updated_at?: string | null
          width_ft?: number | null
        }
        Update: {
          account_id?: string | null
          axle_capacity?: Database["public"]["Enums"]["axle_capacity"] | null
          axle_count?: number | null
          beam_diameter?: Database["public"]["Enums"]["beam_diameter"] | null
          bolt_pattern?: Database["public"]["Enums"]["bolt_pattern"] | null
          brake_type?: Database["public"]["Enums"]["brake_type"] | null
          color?: Database["public"]["Enums"]["color"] | null
          coupler?: Database["public"]["Enums"]["coupler"] | null
          created_at?: string | null
          date_manufactured?: string | null
          gawr?: number | null
          hubface?: string | null
          inner_bearing_race?:
            | Database["public"]["Enums"]["inner_bearing_race"]
            | null
          jack?: Database["public"]["Enums"]["jack"] | null
          leaf_count?: number | null
          length_ft?: number | null
          license_plate_number?: string | null
          lights?: Database["public"]["Enums"]["lights"] | null
          outer_bearing_race?:
            | Database["public"]["Enums"]["outer_bearing_race"]
            | null
          seal?: string | null
          spindle?: Database["public"]["Enums"]["spindle"] | null
          spring_center?: string | null
          spring_length?: number | null
          spring_position?:
            | Database["public"]["Enums"]["spring_position"]
            | null
          spring_type?: Database["public"]["Enums"]["spring_type"] | null
          spring_width?: number | null
          tire_load_range?:
            | Database["public"]["Enums"]["tire_load_range"]
            | null
          tire_size?: Database["public"]["Enums"]["tire_size"] | null
          trailer_id?: string
          trailer_manufacturer?:
            | Database["public"]["Enums"]["trailer_manufacturer"]
            | null
          trailer_name?: string
          trailer_type?: Database["public"]["Enums"]["trailer_type"] | null
          trailer_vin?: string | null
          updated_at?: string | null
          width_ft?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_trailers_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "customer_accounts"
            referencedColumns: ["account_id"]
          },
          {
            foreignKeyName: "customer_trailers_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "v_account_balance"
            referencedColumns: ["account_id"]
          },
          {
            foreignKeyName: "customer_trailers_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "v_customer_search"
            referencedColumns: ["account_id"]
          },
        ]
      }
      item_categories: {
        Row: {
          category_code: string | null
          category_id: string
          category_name: string
          type_id: string | null
        }
        Insert: {
          category_code?: string | null
          category_id: string
          category_name: string
          type_id?: string | null
        }
        Update: {
          category_code?: string | null
          category_id?: string
          category_name?: string
          type_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "item_categories_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "item_types"
            referencedColumns: ["type_id"]
          },
        ]
      }
      item_subcategories: {
        Row: {
          category_id: string | null
          subcategory_code: string | null
          subcategory_id: string
          subcategory_name: string
        }
        Insert: {
          category_id?: string | null
          subcategory_code?: string | null
          subcategory_id: string
          subcategory_name: string
        }
        Update: {
          category_id?: string | null
          subcategory_code?: string | null
          subcategory_id?: string
          subcategory_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "item_subcategories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "item_categories"
            referencedColumns: ["category_id"]
          },
        ]
      }
      item_types: {
        Row: {
          type_code: string | null
          type_id: string
          type_name: string | null
        }
        Insert: {
          type_code?: string | null
          type_id: string
          type_name?: string | null
        }
        Update: {
          type_code?: string | null
          type_id?: string
          type_name?: string | null
        }
        Relationships: []
      }
      job_details: {
        Row: {
          hours: number | null
          item_id: string | null
          job_details_id: string
          job_id: string | null
          line_item_type: Database["public"]["Enums"]["line_item_type"] | null
          service_area_id: string | null
          service_description: string | null
          service_type_id: string | null
        }
        Insert: {
          hours?: number | null
          item_id?: string | null
          job_details_id: string
          job_id?: string | null
          line_item_type?: Database["public"]["Enums"]["line_item_type"] | null
          service_area_id?: string | null
          service_description?: string | null
          service_type_id?: string | null
        }
        Update: {
          hours?: number | null
          item_id?: string | null
          job_details_id?: string
          job_id?: string | null
          line_item_type?: Database["public"]["Enums"]["line_item_type"] | null
          service_area_id?: string | null
          service_description?: string | null
          service_type_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_details_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "parts_information"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "job_details_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "v_part_details"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "job_details_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "v_parts_highest_revenue"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "job_details_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "v_parts_inventory"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "job_details_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "v_parts_lowest_margin"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "job_details_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "v_parts_most_used"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "job_details_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs_tracking"
            referencedColumns: ["job_id"]
          },
          {
            foreignKeyName: "job_details_service_area_id_fkey"
            columns: ["service_area_id"]
            isOneToOne: false
            referencedRelation: "service_area"
            referencedColumns: ["service_area_id"]
          },
          {
            foreignKeyName: "job_details_service_type_id_fkey"
            columns: ["service_type_id"]
            isOneToOne: false
            referencedRelation: "service_types"
            referencedColumns: ["service_type_id"]
          },
        ]
      }
      jobs_tracking: {
        Row: {
          account_id: string | null
          actual_hours: number | null
          completed_date: string | null
          created_date: string | null
          dropoff_date: string | null
          estimated_hours: number | null
          invoice_generated: boolean | null
          invoice_number: string | null
          job_description: string | null
          job_id: string
          job_name: string | null
          job_priority: Database["public"]["Enums"]["priority"] | null
          job_progress: string | null
          job_status: Database["public"]["Enums"]["status"] | null
          promised_date: string | null
          trailer_id: string | null
          updated_at: string | null
        }
        Insert: {
          account_id?: string | null
          actual_hours?: number | null
          completed_date?: string | null
          created_date?: string | null
          dropoff_date?: string | null
          estimated_hours?: number | null
          invoice_generated?: boolean | null
          invoice_number?: string | null
          job_description?: string | null
          job_id: string
          job_name?: string | null
          job_priority?: Database["public"]["Enums"]["priority"] | null
          job_progress?: string | null
          job_status?: Database["public"]["Enums"]["status"] | null
          promised_date?: string | null
          trailer_id?: string | null
          updated_at?: string | null
        }
        Update: {
          account_id?: string | null
          actual_hours?: number | null
          completed_date?: string | null
          created_date?: string | null
          dropoff_date?: string | null
          estimated_hours?: number | null
          invoice_generated?: boolean | null
          invoice_number?: string | null
          job_description?: string | null
          job_id?: string
          job_name?: string | null
          job_priority?: Database["public"]["Enums"]["priority"] | null
          job_progress?: string | null
          job_status?: Database["public"]["Enums"]["status"] | null
          promised_date?: string | null
          trailer_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_tracking_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "customer_accounts"
            referencedColumns: ["account_id"]
          },
          {
            foreignKeyName: "jobs_tracking_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "v_account_balance"
            referencedColumns: ["account_id"]
          },
          {
            foreignKeyName: "jobs_tracking_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "v_customer_search"
            referencedColumns: ["account_id"]
          },
          {
            foreignKeyName: "jobs_tracking_invoice_number_fkey"
            columns: ["invoice_number"]
            isOneToOne: false
            referencedRelation: "customer_invoices"
            referencedColumns: ["invoice_number"]
          },
          {
            foreignKeyName: "jobs_tracking_invoice_number_fkey"
            columns: ["invoice_number"]
            isOneToOne: false
            referencedRelation: "v_invoice_paid_status"
            referencedColumns: ["invoice_number"]
          },
          {
            foreignKeyName: "jobs_tracking_invoice_number_fkey"
            columns: ["invoice_number"]
            isOneToOne: false
            referencedRelation: "v_invoice_totals"
            referencedColumns: ["invoice_number"]
          },
          {
            foreignKeyName: "jobs_tracking_trailer_id_fkey"
            columns: ["trailer_id"]
            isOneToOne: false
            referencedRelation: "customer_trailers"
            referencedColumns: ["trailer_id"]
          },
        ]
      }
      kv_store_b6b4130b: {
        Row: {
          key: string
          value: Json
        }
        Insert: {
          key: string
          value: Json
        }
        Update: {
          key?: string
          value?: Json
        }
        Relationships: []
      }
      lead_tracking: {
        Row: {
          account_type: Database["public"]["Enums"]["account_type"] | null
          axle_count: number | null
          billing_city: string | null
          billing_state: string | null
          billing_street: string | null
          billing_zip: string | null
          company_name: string | null
          contact_date: string | null
          contact_phone_number: string | null
          coupler: Database["public"]["Enums"]["coupler"] | null
          created_at: string | null
          date_manufactured: string | null
          description_of_service: string | null
          email: string | null
          gawr: number | null
          lead_first_name: string | null
          lead_id: string
          lead_last_name: string | null
          lead_priority: Database["public"]["Enums"]["priority"] | null
          lead_status: Database["public"]["Enums"]["lead_status"] | null
          length_ft: number | null
          manufacturer:
            | Database["public"]["Enums"]["trailer_manufacturer"]
            | null
          preferred_contact_method:
            | Database["public"]["Enums"]["preferred_contact_method"][]
            | null
          promised_date: string | null
          scheduled_drop_off: string | null
          service_components:
            | Database["public"]["Enums"]["service_components"][]
            | null
          service_needed: Database["public"]["Enums"]["service_needed"][] | null
          trailer_type: Database["public"]["Enums"]["trailer_type"] | null
          updated_at: string | null
          vehicle_make: Database["public"]["Enums"]["vehicle_make"] | null
          vehicle_model: string | null
          vehicle_trim: string | null
          vehicle_year: number | null
          width_ft: number | null
        }
        Insert: {
          account_type?: Database["public"]["Enums"]["account_type"] | null
          axle_count?: number | null
          billing_city?: string | null
          billing_state?: string | null
          billing_street?: string | null
          billing_zip?: string | null
          company_name?: string | null
          contact_date?: string | null
          contact_phone_number?: string | null
          coupler?: Database["public"]["Enums"]["coupler"] | null
          created_at?: string | null
          date_manufactured?: string | null
          description_of_service?: string | null
          email?: string | null
          gawr?: number | null
          lead_first_name?: string | null
          lead_id: string
          lead_last_name?: string | null
          lead_priority?: Database["public"]["Enums"]["priority"] | null
          lead_status?: Database["public"]["Enums"]["lead_status"] | null
          length_ft?: number | null
          manufacturer?:
            | Database["public"]["Enums"]["trailer_manufacturer"]
            | null
          preferred_contact_method?:
            | Database["public"]["Enums"]["preferred_contact_method"][]
            | null
          promised_date?: string | null
          scheduled_drop_off?: string | null
          service_components?:
            | Database["public"]["Enums"]["service_components"][]
            | null
          service_needed?:
            | Database["public"]["Enums"]["service_needed"][]
            | null
          trailer_type?: Database["public"]["Enums"]["trailer_type"] | null
          updated_at?: string | null
          vehicle_make?: Database["public"]["Enums"]["vehicle_make"] | null
          vehicle_model?: string | null
          vehicle_trim?: string | null
          vehicle_year?: number | null
          width_ft?: number | null
        }
        Update: {
          account_type?: Database["public"]["Enums"]["account_type"] | null
          axle_count?: number | null
          billing_city?: string | null
          billing_state?: string | null
          billing_street?: string | null
          billing_zip?: string | null
          company_name?: string | null
          contact_date?: string | null
          contact_phone_number?: string | null
          coupler?: Database["public"]["Enums"]["coupler"] | null
          created_at?: string | null
          date_manufactured?: string | null
          description_of_service?: string | null
          email?: string | null
          gawr?: number | null
          lead_first_name?: string | null
          lead_id?: string
          lead_last_name?: string | null
          lead_priority?: Database["public"]["Enums"]["priority"] | null
          lead_status?: Database["public"]["Enums"]["lead_status"] | null
          length_ft?: number | null
          manufacturer?:
            | Database["public"]["Enums"]["trailer_manufacturer"]
            | null
          preferred_contact_method?:
            | Database["public"]["Enums"]["preferred_contact_method"][]
            | null
          promised_date?: string | null
          scheduled_drop_off?: string | null
          service_components?:
            | Database["public"]["Enums"]["service_components"][]
            | null
          service_needed?:
            | Database["public"]["Enums"]["service_needed"][]
            | null
          trailer_type?: Database["public"]["Enums"]["trailer_type"] | null
          updated_at?: string | null
          vehicle_make?: Database["public"]["Enums"]["vehicle_make"] | null
          vehicle_model?: string | null
          vehicle_trim?: string | null
          vehicle_year?: number | null
          width_ft?: number | null
        }
        Relationships: []
      }
      notes: {
        Row: {
          author_id: string | null
          created_at: string | null
          note_content: string | null
          note_id: string
          note_title: string | null
          parent_entity_id: string | null
          parent_entity_type: string | null
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          created_at?: string | null
          note_content?: string | null
          note_id?: string
          note_title?: string | null
          parent_entity_id?: string | null
          parent_entity_type?: string | null
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          created_at?: string | null
          note_content?: string | null
          note_id?: string
          note_title?: string | null
          parent_entity_id?: string | null
          parent_entity_type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notes_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "staff_information"
            referencedColumns: ["staff_id"]
          },
        ]
      }
      parts_information: {
        Row: {
          average_unit_cost: number | null
          average_unit_sales_price: number | null
          category_id: string | null
          created_at: string | null
          item_description: string | null
          item_id: string
          item_name: string
          part_autonum: number
          quantity_in_stock: number | null
          quantity_invoiced: number | null
          quantity_ordered: number | null
          sop_steps: string | null
          sop_summary: string | null
          subcategory_id: string | null
          type_id: string | null
          updated_at: string | null
          workflow_details: string | null
        }
        Insert: {
          average_unit_cost?: number | null
          average_unit_sales_price?: number | null
          category_id?: string | null
          created_at?: string | null
          item_description?: string | null
          item_id: string
          item_name: string
          part_autonum?: number
          quantity_in_stock?: number | null
          quantity_invoiced?: number | null
          quantity_ordered?: number | null
          sop_steps?: string | null
          sop_summary?: string | null
          subcategory_id?: string | null
          type_id?: string | null
          updated_at?: string | null
          workflow_details?: string | null
        }
        Update: {
          average_unit_cost?: number | null
          average_unit_sales_price?: number | null
          category_id?: string | null
          created_at?: string | null
          item_description?: string | null
          item_id?: string
          item_name?: string
          part_autonum?: number
          quantity_in_stock?: number | null
          quantity_invoiced?: number | null
          quantity_ordered?: number | null
          sop_steps?: string | null
          sop_summary?: string | null
          subcategory_id?: string | null
          type_id?: string | null
          updated_at?: string | null
          workflow_details?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "parts_information_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "item_categories"
            referencedColumns: ["category_id"]
          },
          {
            foreignKeyName: "parts_information_subcategory_id_fkey"
            columns: ["subcategory_id"]
            isOneToOne: false
            referencedRelation: "item_subcategories"
            referencedColumns: ["subcategory_id"]
          },
          {
            foreignKeyName: "parts_information_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "item_types"
            referencedColumns: ["type_id"]
          },
        ]
      }
      parts_vendors: {
        Row: {
          created_at: string | null
          item_id: string | null
          parts_vendor_id: string
          updated_at: string | null
          vendor_id: string | null
          vendor_item_number: string | null
        }
        Insert: {
          created_at?: string | null
          item_id?: string | null
          parts_vendor_id?: string
          updated_at?: string | null
          vendor_id?: string | null
          vendor_item_number?: string | null
        }
        Update: {
          created_at?: string | null
          item_id?: string | null
          parts_vendor_id?: string
          updated_at?: string | null
          vendor_id?: string | null
          vendor_item_number?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "parts_vendors_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "parts_information"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "parts_vendors_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "v_part_details"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "parts_vendors_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "v_parts_highest_revenue"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "parts_vendors_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "v_parts_inventory"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "parts_vendors_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "v_parts_lowest_margin"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "parts_vendors_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "v_parts_most_used"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "parts_vendors_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "v_vendor_totals"
            referencedColumns: ["vendor_id"]
          },
          {
            foreignKeyName: "parts_vendors_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendor_information"
            referencedColumns: ["vendor_id"]
          },
        ]
      }
      payments: {
        Row: {
          account_id: string | null
          amount_total: number | null
          created_at: string | null
          payment_date: string | null
          payment_id: string
          payment_method: string | null
          reference_number: string | null
          updated_at: string | null
        }
        Insert: {
          account_id?: string | null
          amount_total?: number | null
          created_at?: string | null
          payment_date?: string | null
          payment_id?: string
          payment_method?: string | null
          reference_number?: string | null
          updated_at?: string | null
        }
        Update: {
          account_id?: string | null
          amount_total?: number | null
          created_at?: string | null
          payment_date?: string | null
          payment_id?: string
          payment_method?: string | null
          reference_number?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "customer_accounts"
            referencedColumns: ["account_id"]
          },
          {
            foreignKeyName: "payments_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "v_account_balance"
            referencedColumns: ["account_id"]
          },
          {
            foreignKeyName: "payments_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "v_customer_search"
            referencedColumns: ["account_id"]
          },
        ]
      }
      purchase_order_details: {
        Row: {
          category_id: string | null
          item_id: string
          item_name: string | null
          item_total: number | null
          po_line_item_id: string
          purchase_order_number: string | null
          quantity: number | null
          subcategory_id: string | null
          type_id: string | null
          unit_cost: number | null
          vendor_item_number: string | null
        }
        Insert: {
          category_id?: string | null
          item_id: string
          item_name?: string | null
          item_total?: number | null
          po_line_item_id: string
          purchase_order_number?: string | null
          quantity?: number | null
          subcategory_id?: string | null
          type_id?: string | null
          unit_cost?: number | null
          vendor_item_number?: string | null
        }
        Update: {
          category_id?: string | null
          item_id?: string
          item_name?: string | null
          item_total?: number | null
          po_line_item_id?: string
          purchase_order_number?: string | null
          quantity?: number | null
          subcategory_id?: string | null
          type_id?: string | null
          unit_cost?: number | null
          vendor_item_number?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "purchase_order_details_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "item_categories"
            referencedColumns: ["category_id"]
          },
          {
            foreignKeyName: "purchase_order_details_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "parts_information"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "purchase_order_details_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "v_part_details"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "purchase_order_details_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "v_parts_highest_revenue"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "purchase_order_details_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "v_parts_inventory"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "purchase_order_details_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "v_parts_lowest_margin"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "purchase_order_details_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "v_parts_most_used"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "purchase_order_details_purchase_order_number_fkey"
            columns: ["purchase_order_number"]
            isOneToOne: false
            referencedRelation: "purchase_orders"
            referencedColumns: ["purchase_order_number"]
          },
          {
            foreignKeyName: "purchase_order_details_subcategory_id_fkey"
            columns: ["subcategory_id"]
            isOneToOne: false
            referencedRelation: "item_subcategories"
            referencedColumns: ["subcategory_id"]
          },
          {
            foreignKeyName: "purchase_order_details_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "item_types"
            referencedColumns: ["type_id"]
          },
        ]
      }
      purchase_orders: {
        Row: {
          created_at: string | null
          po_act_del_date: string | null
          po_autonum: number
          po_est_del_date: string | null
          purchase_order_date: string | null
          purchase_order_method:
            | Database["public"]["Enums"]["purchase_order_method"]
            | null
          purchase_order_number: string
          purchase_order_status: Database["public"]["Enums"]["po_status"] | null
          purchase_order_total: number | null
          updated_at: string | null
          vendor_id: string | null
          vendor_po_number: string | null
        }
        Insert: {
          created_at?: string | null
          po_act_del_date?: string | null
          po_autonum: number
          po_est_del_date?: string | null
          purchase_order_date?: string | null
          purchase_order_method?:
            | Database["public"]["Enums"]["purchase_order_method"]
            | null
          purchase_order_number: string
          purchase_order_status?:
            | Database["public"]["Enums"]["po_status"]
            | null
          purchase_order_total?: number | null
          updated_at?: string | null
          vendor_id?: string | null
          vendor_po_number?: string | null
        }
        Update: {
          created_at?: string | null
          po_act_del_date?: string | null
          po_autonum?: number
          po_est_del_date?: string | null
          purchase_order_date?: string | null
          purchase_order_method?:
            | Database["public"]["Enums"]["purchase_order_method"]
            | null
          purchase_order_number?: string
          purchase_order_status?:
            | Database["public"]["Enums"]["po_status"]
            | null
          purchase_order_total?: number | null
          updated_at?: string | null
          vendor_id?: string | null
          vendor_po_number?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "purchase_orders_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "v_vendor_totals"
            referencedColumns: ["vendor_id"]
          },
          {
            foreignKeyName: "purchase_orders_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendor_information"
            referencedColumns: ["vendor_id"]
          },
        ]
      }
      service_area: {
        Row: {
          service_area_code: string | null
          service_area_id: string
          service_area_name: string
        }
        Insert: {
          service_area_code?: string | null
          service_area_id: string
          service_area_name: string
        }
        Update: {
          service_area_code?: string | null
          service_area_id?: string
          service_area_name?: string
        }
        Relationships: []
      }
      service_types: {
        Row: {
          rate: number | null
          service_type_id: string
          service_type_name: string
        }
        Insert: {
          rate?: number | null
          service_type_id: string
          service_type_name: string
        }
        Update: {
          rate?: number | null
          service_type_id?: string
          service_type_name?: string
        }
        Relationships: []
      }
      settings: {
        Row: {
          description: string | null
          setting_key: string
          setting_value: number
          updated_at: string | null
        }
        Insert: {
          description?: string | null
          setting_key: string
          setting_value: number
          updated_at?: string | null
        }
        Update: {
          description?: string | null
          setting_key?: string
          setting_value?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      staff_information: {
        Row: {
          email: string | null
          first_name: string | null
          last_name: string | null
          phone: string | null
          staff_id: string
        }
        Insert: {
          email?: string | null
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          staff_id: string
        }
        Update: {
          email?: string | null
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          staff_id?: string
        }
        Relationships: []
      }
      tasks: {
        Row: {
          assigned_to_id: string | null
          created_at: string | null
          description: string | null
          due_date: string | null
          parent_entity_id: string | null
          parent_entity_type: string | null
          priority: Database["public"]["Enums"]["priority"] | null
          status: Database["public"]["Enums"]["status"] | null
          task_category: Database["public"]["Enums"]["task_category"] | null
          task_id: string
          title: string | null
          updated_at: string | null
        }
        Insert: {
          assigned_to_id?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          parent_entity_id?: string | null
          parent_entity_type?: string | null
          priority?: Database["public"]["Enums"]["priority"] | null
          status?: Database["public"]["Enums"]["status"] | null
          task_category?: Database["public"]["Enums"]["task_category"] | null
          task_id?: string
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          assigned_to_id?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          parent_entity_id?: string | null
          parent_entity_type?: string | null
          priority?: Database["public"]["Enums"]["priority"] | null
          status?: Database["public"]["Enums"]["status"] | null
          task_category?: Database["public"]["Enums"]["task_category"] | null
          task_id?: string
          title?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_assigned_to_id_fkey"
            columns: ["assigned_to_id"]
            isOneToOne: false
            referencedRelation: "staff_information"
            referencedColumns: ["staff_id"]
          },
        ]
      }
      trailer_build_sheets: {
        Row: {
          build_sheet_id: string
          item_id: string | null
          item_name: string | null
          last_price_charged: number | null
          notes: string | null
          trailer_id: string | null
          updated_at: string | null
          vendor_item_number: string | null
        }
        Insert: {
          build_sheet_id?: string
          item_id?: string | null
          item_name?: string | null
          last_price_charged?: number | null
          notes?: string | null
          trailer_id?: string | null
          updated_at?: string | null
          vendor_item_number?: string | null
        }
        Update: {
          build_sheet_id?: string
          item_id?: string | null
          item_name?: string | null
          last_price_charged?: number | null
          notes?: string | null
          trailer_id?: string | null
          updated_at?: string | null
          vendor_item_number?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "trailer_build_sheets_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "parts_information"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "trailer_build_sheets_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "v_part_details"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "trailer_build_sheets_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "v_parts_highest_revenue"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "trailer_build_sheets_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "v_parts_inventory"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "trailer_build_sheets_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "v_parts_lowest_margin"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "trailer_build_sheets_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "v_parts_most_used"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "trailer_build_sheets_trailer_id_fkey"
            columns: ["trailer_id"]
            isOneToOne: false
            referencedRelation: "customer_trailers"
            referencedColumns: ["trailer_id"]
          },
        ]
      }
      vendor_information: {
        Row: {
          account_number: string | null
          additional_contacts: string | null
          created_at: string | null
          updated_at: string | null
          vendor_address: string | null
          vendor_category: Database["public"]["Enums"]["vendor_category"] | null
          vendor_contact: string | null
          vendor_email: string | null
          vendor_hours: string | null
          vendor_id: string
          vendor_name: string
          vendor_password: string | null
          vendor_phone: string | null
          vendor_type: Database["public"]["Enums"]["vendor_type"] | null
          vendor_username: string | null
          vendor_website: string | null
        }
        Insert: {
          account_number?: string | null
          additional_contacts?: string | null
          created_at?: string | null
          updated_at?: string | null
          vendor_address?: string | null
          vendor_category?:
            | Database["public"]["Enums"]["vendor_category"]
            | null
          vendor_contact?: string | null
          vendor_email?: string | null
          vendor_hours?: string | null
          vendor_id: string
          vendor_name: string
          vendor_password?: string | null
          vendor_phone?: string | null
          vendor_type?: Database["public"]["Enums"]["vendor_type"] | null
          vendor_username?: string | null
          vendor_website?: string | null
        }
        Update: {
          account_number?: string | null
          additional_contacts?: string | null
          created_at?: string | null
          updated_at?: string | null
          vendor_address?: string | null
          vendor_category?:
            | Database["public"]["Enums"]["vendor_category"]
            | null
          vendor_contact?: string | null
          vendor_email?: string | null
          vendor_hours?: string | null
          vendor_id?: string
          vendor_name?: string
          vendor_password?: string | null
          vendor_phone?: string | null
          vendor_type?: Database["public"]["Enums"]["vendor_type"] | null
          vendor_username?: string | null
          vendor_website?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      v_account_balance: {
        Row: {
          account_id: string | null
          account_name: string | null
          balance_due: number | null
          total_invoiced: number | null
          total_payments: number | null
        }
        Relationships: []
      }
      v_customer_search: {
        Row: {
          account_id: string | null
          account_name: string | null
          account_type: Database["public"]["Enums"]["account_type"] | null
          billing_city: string | null
          billing_state: string | null
          billing_street: string | null
          billing_zip_code: string | null
          company_name: string | null
          contact_email: string | null
          contact_first_name: string | null
          contact_id: string | null
          contact_last_name: string | null
          contact_phone: string | null
          invoice_count: number | null
          is_primary: boolean | null
          job_count: number | null
          total_revenue: number | null
          trailer_count: number | null
        }
        Relationships: []
      }
      v_estimate_totals: {
        Row: {
          estimate_number: string | null
          estimate_subtotal: number | null
          estimate_tax: number | null
          estimate_total: number | null
          misc_shop_supplies: number | null
          number_of_items: number | null
          parts_subtotal: number | null
          service_subtotal: number | null
        }
        Relationships: []
      }
      v_invoice_paid_status: {
        Row: {
          account_id: string | null
          amount_paid: number | null
          balance_due: number | null
          invoice_number: string | null
          invoice_total: number | null
          payment_status: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_invoices_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "customer_accounts"
            referencedColumns: ["account_id"]
          },
          {
            foreignKeyName: "customer_invoices_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "v_account_balance"
            referencedColumns: ["account_id"]
          },
          {
            foreignKeyName: "customer_invoices_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "v_customer_search"
            referencedColumns: ["account_id"]
          },
        ]
      }
      v_invoice_totals: {
        Row: {
          invoice_number: string | null
          invoice_subtotal: number | null
          invoice_tax: number | null
          invoice_total: number | null
          misc_shop_supplies: number | null
          number_of_items: number | null
          parts_subtotal: number | null
          service_subtotal: number | null
        }
        Relationships: []
      }
      v_part_details: {
        Row: {
          avg_margin_percent: number | null
          avg_unit_cost: number | null
          avg_unit_price: number | null
          category_name: string | null
          current_margin_dollars: number | null
          item_description: string | null
          item_id: string | null
          item_name: string | null
          profit: number | null
          subcategory_name: string | null
          total_cost: number | null
          total_cost_stock: number | null
          total_revenue: number | null
          type_name: string | null
          ytd_units: number | null
        }
        Relationships: []
      }
      v_part_vendor_pricing: {
        Row: {
          avg_cost: number | null
          item_id: string | null
          last_cost: number | null
          last_purchase_date: string | null
          vendor_id: string | null
          vendor_item_number: string | null
          vendor_name: string | null
        }
        Relationships: [
          {
            foreignKeyName: "parts_vendors_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "parts_information"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "parts_vendors_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "v_part_details"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "parts_vendors_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "v_parts_highest_revenue"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "parts_vendors_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "v_parts_inventory"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "parts_vendors_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "v_parts_lowest_margin"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "parts_vendors_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "v_parts_most_used"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "parts_vendors_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "v_vendor_totals"
            referencedColumns: ["vendor_id"]
          },
          {
            foreignKeyName: "parts_vendors_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendor_information"
            referencedColumns: ["vendor_id"]
          },
        ]
      }
      v_parts_highest_revenue: {
        Row: {
          item_id: string | null
          item_name: string | null
          total_revenue: number | null
        }
        Relationships: []
      }
      v_parts_inventory: {
        Row: {
          item_id: string | null
          margin_dollars: number | null
          margin_percent: number | null
          total_cost: number | null
          total_sales: number | null
        }
        Relationships: []
      }
      v_parts_lowest_margin: {
        Row: {
          average_unit_cost: number | null
          average_unit_sales_price: number | null
          item_id: string | null
          item_name: string | null
          margin_percent: number | null
        }
        Relationships: []
      }
      v_parts_most_used: {
        Row: {
          item_id: string | null
          item_name: string | null
          units_sold: number | null
        }
        Relationships: []
      }
      v_vendor_totals: {
        Row: {
          total_po_count: number | null
          total_spend: number | null
          vendor_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      convert_lead_to_account: { Args: { p_lead_id: string }; Returns: Json }
      generate_account_code: { Args: { p_account_id: string }; Returns: string }
      generate_estimate_number: {
        Args: { p_account_id: string; p_estimate_date: string }
        Returns: string
      }
      generate_invoice_number: {
        Args: { p_account_id: string; p_invoice_date: string }
        Returns: string
      }
      generate_job_id: {
        Args: { p_account_id: string; p_created_date: string }
        Returns: string
      }
      generate_lead_code: {
        Args: {
          p_account_type: string
          p_company_name: string
          p_first_name: string
          p_last_name: string
        }
        Returns: string
      }
      generate_payment_id: {
        Args: { p_account_id: string; p_payment_date: string }
        Returns: string
      }
      generate_trailer_id: { Args: { p_account_id: string }; Returns: string }
      get_setting_numeric: {
        Args: { p_default?: number; p_key: string }
        Returns: number
      }
      search_customers_trgm:
        | {
            Args: { term: string }
            Returns: {
              account_id: string
              account_name: string
              company_name: string
              contact_email: string
              contact_phone: string
              primary_contact: string
              search_rank: number
            }[]
          }
        | {
            Args: { limit_n?: number; offset_n?: number; term: string }
            Returns: {
              account_id: string
              account_name: string
              company_name: string
              contact_email: string
              contact_phone: string
              primary_contact: string
              search_rank: number
            }[]
          }
      show_limit: { Args: never; Returns: number }
      show_trgm: { Args: { "": string }; Returns: string[] }
    }
    Enums: {
      account_type: "individual" | "company"
      accounting_category:
        | "trailer_parts"
        | "shop_supplies_tools_equipment"
        | "fabrication_materials"
        | "labor"
      axle_capacity:
        | "2.2k"
        | "3.5k"
        | "5.2k"
        | "6k"
        | "7k"
        | "8k"
        | "9k"
        | "10k"
        | "12k"
      beam_diameter: '1-3/4"' | '2-3/8"' | '3"' | '4"' | '5"'
      bolt_pattern:
        | "440"
        | "545"
        | "550"
        | "555"
        | "655"
        | "660"
        | "865"
        | "880"
        | "sel655"
      brake_type: "idler" | "electric" | "hydraulic" | "electric_hydraulic"
      calendar_status: "scheduled" | "overdue" | "closed"
      color: "black" | "white" | "red" | "brown" | "green" | "silver" | "other"
      contact_authorization:
        | "service"
        | "scheduling"
        | "dropoff"
        | "pickup"
        | "billing"
      contact_role: "primary_contact" | "additional_contact"
      coupler: "a-frame" | "flat_mount" | "gooseneck" | "straight" | "other"
      created_by: "cody" | "nikki" | "the_trailer_shop"
      estimate_status:
        | "draft"
        | "sent_waiting"
        | "accepted"
        | "needs_edits"
        | "rejected_hard"
        | "rejected_future_fu"
      file_category:
        | "estimates"
        | "invoices"
        | "trailer_images"
        | "parts"
        | "purchase_orders"
        | "receipts"
        | "notes"
        | "other"
      inner_bearing_race:
        | "l44643/l44610"
        | "l44649/l44610"
        | "lm48548/lm48510"
        | "l68149/l68111"
        | "2788/2729"
        | "lm501349/lm501310"
        | "25580/25520"
        | "28580/28521"
        | "387a/382a"
        | "395s/394a"
        | "3984/3920"
        | "hm218248/hm218210"
        | "other"
      invoice_status:
        | "draft"
        | "sent"
        | "paid_in_full"
        | "overdue"
        | "needs_edit"
        | "partial_payment"
      jack:
        | "a-frame_2k_top-wind"
        | "a-frame_2k_side-wind"
        | "a-frame_5k_top-wind"
        | "a-frame_5k_side-wind"
        | "a-frame_3.5k_powered"
        | "swivel_mount_1k_top-wind"
        | "swivel_mount_1.5k_side-wind"
        | "swivel_mount_2k_top-wind"
        | "swivel_mount_2k_side-wind"
        | "swivel_mount_5k_top-wind"
        | "swivel_mount_5k_side-wind"
        | "swivel_mount_8k_side-wind"
        | "drop-leg_8k_top-wind"
        | "drop-leg_8k_side-wind"
        | "drop-leg_10k_top-wind"
        | "drop-leg_10k_side-wind"
        | "drop-leg_12k_top-wind_spring-loaded"
        | "drop-leg_12k_side-wind_spring-loaded"
        | "gooseneck_12k_single-speed"
        | "gooseneck_25k_dual-speed"
        | "gooseneck_25k_hydraulic"
        | "square_jack_7k_side-wind"
        | "square_jack_12k_side-wind"
        | "stabilizer_5k_manual"
        | "stabilizer_7k_manual"
        | "stabilizer_10k_drop-down"
        | "other"
      lead_status:
        | "initial_contact"
        | "needs_follow-up"
        | "waiting_for_reply"
        | "converted"
        | "lost"
        | "future_contact"
        | "other"
      leaf_count: "3" | "4" | "5" | "6" | "7"
      lights: "incandescent" | "led"
      line_item_type: "part" | "service"
      outer_bearing_race:
        | "lm11949/lm11910"
        | "1779/1729"
        | "l44643/l44610"
        | "l44649/l44610"
        | "lm67048/lm67010"
        | "15123/15245"
        | "14125a/14276"
        | "d02475/d02420"
        | "2585/2520"
        | "lm501349/lm501310"
        | "25580/25520"
        | "387a/382a"
        | "28682/28622"
        | "hm212049/hm212011"
      po_status: "ordered" | "shipped" | "partial" | "cancelled" | "received"
      preferred_contact_method: "📞" | "💬" | "📧"
      priority: "immediate" | "high" | "medium" | "low"
      purchase_order_method: "online" | "phone" | "in_person"
      service_components:
        | "axles"
        | "bearings"
        | "brakes"
        | "body_flooring"
        | "cargo_control"
        | "coupler"
        | "jack"
        | "lights_electrical"
        | "suspension"
        | "wheels_tires"
        | "other"
      service_needed:
        | "trailer_service"
        | "trailer_repair"
        | "tow_vehicle_install"
        | "accessory_install"
        | "parts_accessory_purchase"
        | "other"
      spindle: "straight" | 'drop_4"' | "torsion" | "other"
      spring_position: "underslung" | "overslung"
      spring_type: "double_eye" | "slipper"
      status:
        | "scheduled"
        | "in_progress"
        | "completed"
        | "cancelled"
        | "on_hold"
        | "blocked"
        | "not_started"
      task_category:
        | "follow_up"
        | "customer_scheduling"
        | "billing"
        | "trailer_inspection"
        | "trailer_repair"
        | "quality_control"
        | "parts_ordering"
        | "inventory_management"
        | "vendor_coordination"
        | "documentation"
        | "facility_maintenance"
        | "marketing"
        | "accounting"
        | "regulatory_compliance"
        | "general"
      tire_load_range:
        | "load_range_b_4-ply"
        | "load_range_c_6-ply"
        | "load_range_d_8-ply"
        | "load_range_e_10-ply"
        | "load_range_f_12-ply"
        | "load_range_g_14-ply"
        | "load_range_h_16-ply"
        | "load_range_j_18-ply"
      tire_size:
        | "st175/80r13"
        | "st185/80r13"
        | "st205/75r13"
        | "st185/75r14"
        | "st205/75r14"
        | "st215/75r14"
        | "st225/75r14"
        | "st205/75r15"
        | "st225/75r15"
        | "st235/80r15"
        | "st215/85r16"
        | "st225/75r16"
        | "st235/80r16"
        | "st235/85r16"
        | "215/75r17.5"
        | "235/75r17.5"
        | "245/70r17.5"
        | "225/70r19.5"
        | "245/70r19.5"
        | "265/70r19.5"
        | "275/70r22.5"
        | "285/75r22.5"
        | "295/75r22.5"
        | "4.80-8"
        | "5.70-8"
        | "4.80-12"
        | "5.30-12"
        | "20.5x8-12"
        | "145r13"
        | "155r13"
        | "165r13"
        | "175r14"
        | "185r14"
        | "175r15"
        | "185r15"
        | "other"
      trailer_manufacturer:
        | "big_tex"
        | "diamond_c"
        | "doolittle_trailer_mfg"
        | "interstate"
        | "maxx-d"
        | "nationwide"
        | "pj"
        | "rj"
        | "top_hat"
        | "tow_master"
        | "x-cel"
        | "other"
      trailer_type:
        | "car_hauler"
        | "equipment"
        | "enclosed_cargo"
        | "dump"
        | "flatbed"
        | "horse"
        | "landscaping"
        | "stock"
        | "utility"
        | "tilt"
        | "other"
      type_name:
        | "axles"
        | "bearings"
        | "brakes"
        | "body_flooring"
        | "cargo_control"
        | "electrical"
        | "frame"
        | "hitches_couplers"
        | "hydraulic"
        | "lighting"
        | "suspension"
        | "tires_wheels"
        | "toolboxes"
        | "winches"
      user_role: "tts_team" | "customer" | "tts_admin"
      vehicle_make:
        | "acura"
        | "audi"
        | "bmw"
        | "buick"
        | "cadillac"
        | "chevrolet"
        | "chrysler"
        | "dodge"
        | "ford"
        | "genesis"
        | "gmc"
        | "honda"
        | "hyundai"
        | "infiniti"
        | "isuzu"
        | "jaguar"
        | "jeep"
        | "kia"
        | "land rover"
        | "lexus"
        | "lincoln"
        | "mazda"
        | "mercedes-benz"
        | "mitsubishi"
        | "nissan"
        | "other"
        | "porsche"
        | "ram"
        | "subaru"
        | "suzuki"
        | "tesla"
        | "toyota"
        | "volkswagen"
        | "volvo"
      vendor_category:
        | "trailer_parts"
        | "shop_supplies_tools_equipment"
        | "bank_asset_holder"
        | "general_homegoods"
        | "food_to_go"
        | "food_groceries"
        | "gas_station"
        | "general_retailer"
        | "shop_rent"
        | "utility_company"
        | "loan_holder"
        | "credit_card_issuer"
        | "government"
      vendor_type:
        | "supplier"
        | "retailer"
        | "asset_holder"
        | "service_provider"
        | "debt_servicer"
        | "other"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      account_type: ["individual", "company"],
      accounting_category: [
        "trailer_parts",
        "shop_supplies_tools_equipment",
        "fabrication_materials",
        "labor",
      ],
      axle_capacity: [
        "2.2k",
        "3.5k",
        "5.2k",
        "6k",
        "7k",
        "8k",
        "9k",
        "10k",
        "12k",
      ],
      beam_diameter: ['1-3/4"', '2-3/8"', '3"', '4"', '5"'],
      bolt_pattern: [
        "440",
        "545",
        "550",
        "555",
        "655",
        "660",
        "865",
        "880",
        "sel655",
      ],
      brake_type: ["idler", "electric", "hydraulic", "electric_hydraulic"],
      calendar_status: ["scheduled", "overdue", "closed"],
      color: ["black", "white", "red", "brown", "green", "silver", "other"],
      contact_authorization: [
        "service",
        "scheduling",
        "dropoff",
        "pickup",
        "billing",
      ],
      contact_role: ["primary_contact", "additional_contact"],
      coupler: ["a-frame", "flat_mount", "gooseneck", "straight", "other"],
      created_by: ["cody", "nikki", "the_trailer_shop"],
      estimate_status: [
        "draft",
        "sent_waiting",
        "accepted",
        "needs_edits",
        "rejected_hard",
        "rejected_future_fu",
      ],
      file_category: [
        "estimates",
        "invoices",
        "trailer_images",
        "parts",
        "purchase_orders",
        "receipts",
        "notes",
        "other",
      ],
      inner_bearing_race: [
        "l44643/l44610",
        "l44649/l44610",
        "lm48548/lm48510",
        "l68149/l68111",
        "2788/2729",
        "lm501349/lm501310",
        "25580/25520",
        "28580/28521",
        "387a/382a",
        "395s/394a",
        "3984/3920",
        "hm218248/hm218210",
        "other",
      ],
      invoice_status: [
        "draft",
        "sent",
        "paid_in_full",
        "overdue",
        "needs_edit",
        "partial_payment",
      ],
      jack: [
        "a-frame_2k_top-wind",
        "a-frame_2k_side-wind",
        "a-frame_5k_top-wind",
        "a-frame_5k_side-wind",
        "a-frame_3.5k_powered",
        "swivel_mount_1k_top-wind",
        "swivel_mount_1.5k_side-wind",
        "swivel_mount_2k_top-wind",
        "swivel_mount_2k_side-wind",
        "swivel_mount_5k_top-wind",
        "swivel_mount_5k_side-wind",
        "swivel_mount_8k_side-wind",
        "drop-leg_8k_top-wind",
        "drop-leg_8k_side-wind",
        "drop-leg_10k_top-wind",
        "drop-leg_10k_side-wind",
        "drop-leg_12k_top-wind_spring-loaded",
        "drop-leg_12k_side-wind_spring-loaded",
        "gooseneck_12k_single-speed",
        "gooseneck_25k_dual-speed",
        "gooseneck_25k_hydraulic",
        "square_jack_7k_side-wind",
        "square_jack_12k_side-wind",
        "stabilizer_5k_manual",
        "stabilizer_7k_manual",
        "stabilizer_10k_drop-down",
        "other",
      ],
      lead_status: [
        "initial_contact",
        "needs_follow-up",
        "waiting_for_reply",
        "converted",
        "lost",
        "future_contact",
        "other",
      ],
      leaf_count: ["3", "4", "5", "6", "7"],
      lights: ["incandescent", "led"],
      line_item_type: ["part", "service"],
      outer_bearing_race: [
        "lm11949/lm11910",
        "1779/1729",
        "l44643/l44610",
        "l44649/l44610",
        "lm67048/lm67010",
        "15123/15245",
        "14125a/14276",
        "d02475/d02420",
        "2585/2520",
        "lm501349/lm501310",
        "25580/25520",
        "387a/382a",
        "28682/28622",
        "hm212049/hm212011",
      ],
      po_status: ["ordered", "shipped", "partial", "cancelled", "received"],
      preferred_contact_method: ["📞", "💬", "📧"],
      priority: ["immediate", "high", "medium", "low"],
      purchase_order_method: ["online", "phone", "in_person"],
      service_components: [
        "axles",
        "bearings",
        "brakes",
        "body_flooring",
        "cargo_control",
        "coupler",
        "jack",
        "lights_electrical",
        "suspension",
        "wheels_tires",
        "other",
      ],
      service_needed: [
        "trailer_service",
        "trailer_repair",
        "tow_vehicle_install",
        "accessory_install",
        "parts_accessory_purchase",
        "other",
      ],
      spindle: ["straight", 'drop_4"', "torsion", "other"],
      spring_position: ["underslung", "overslung"],
      spring_type: ["double_eye", "slipper"],
      status: [
        "scheduled",
        "in_progress",
        "completed",
        "cancelled",
        "on_hold",
        "blocked",
        "not_started",
      ],
      task_category: [
        "follow_up",
        "customer_scheduling",
        "billing",
        "trailer_inspection",
        "trailer_repair",
        "quality_control",
        "parts_ordering",
        "inventory_management",
        "vendor_coordination",
        "documentation",
        "facility_maintenance",
        "marketing",
        "accounting",
        "regulatory_compliance",
        "general",
      ],
      tire_load_range: [
        "load_range_b_4-ply",
        "load_range_c_6-ply",
        "load_range_d_8-ply",
        "load_range_e_10-ply",
        "load_range_f_12-ply",
        "load_range_g_14-ply",
        "load_range_h_16-ply",
        "load_range_j_18-ply",
      ],
      tire_size: [
        "st175/80r13",
        "st185/80r13",
        "st205/75r13",
        "st185/75r14",
        "st205/75r14",
        "st215/75r14",
        "st225/75r14",
        "st205/75r15",
        "st225/75r15",
        "st235/80r15",
        "st215/85r16",
        "st225/75r16",
        "st235/80r16",
        "st235/85r16",
        "215/75r17.5",
        "235/75r17.5",
        "245/70r17.5",
        "225/70r19.5",
        "245/70r19.5",
        "265/70r19.5",
        "275/70r22.5",
        "285/75r22.5",
        "295/75r22.5",
        "4.80-8",
        "5.70-8",
        "4.80-12",
        "5.30-12",
        "20.5x8-12",
        "145r13",
        "155r13",
        "165r13",
        "175r14",
        "185r14",
        "175r15",
        "185r15",
        "other",
      ],
      trailer_manufacturer: [
        "big_tex",
        "diamond_c",
        "doolittle_trailer_mfg",
        "interstate",
        "maxx-d",
        "nationwide",
        "pj",
        "rj",
        "top_hat",
        "tow_master",
        "x-cel",
        "other",
      ],
      trailer_type: [
        "car_hauler",
        "equipment",
        "enclosed_cargo",
        "dump",
        "flatbed",
        "horse",
        "landscaping",
        "stock",
        "utility",
        "tilt",
        "other",
      ],
      type_name: [
        "axles",
        "bearings",
        "brakes",
        "body_flooring",
        "cargo_control",
        "electrical",
        "frame",
        "hitches_couplers",
        "hydraulic",
        "lighting",
        "suspension",
        "tires_wheels",
        "toolboxes",
        "winches",
      ],
      user_role: ["tts_team", "customer", "tts_admin"],
      vehicle_make: [
        "acura",
        "audi",
        "bmw",
        "buick",
        "cadillac",
        "chevrolet",
        "chrysler",
        "dodge",
        "ford",
        "genesis",
        "gmc",
        "honda",
        "hyundai",
        "infiniti",
        "isuzu",
        "jaguar",
        "jeep",
        "kia",
        "land rover",
        "lexus",
        "lincoln",
        "mazda",
        "mercedes-benz",
        "mitsubishi",
        "nissan",
        "other",
        "porsche",
        "ram",
        "subaru",
        "suzuki",
        "tesla",
        "toyota",
        "volkswagen",
        "volvo",
      ],
      vendor_category: [
        "trailer_parts",
        "shop_supplies_tools_equipment",
        "bank_asset_holder",
        "general_homegoods",
        "food_to_go",
        "food_groceries",
        "gas_station",
        "general_retailer",
        "shop_rent",
        "utility_company",
        "loan_holder",
        "credit_card_issuer",
        "government",
      ],
      vendor_type: [
        "supplier",
        "retailer",
        "asset_holder",
        "service_provider",
        "debt_servicer",
        "other",
      ],
    },
  },
} as const
