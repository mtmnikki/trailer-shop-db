# The Trailer Shop - Business Management System

## Implementation Plan & Architecture

### Business Context

The Trailer Shop is a trailer service and repair business that needs a comprehensive internal operations management system for daily business operations.

### Data Model

#### Core Entities

1. **Vendors** - Suppliers of parts and materials
2. **Purchase Orders** - Orders placed with vendors
3. **Parts** - List of parts, materials, and supplies
4. **Services** - Service catalog (service areas and service types)
5. **Leads** - Potential customers
6. **Accounts** - Parent account entity with related contacts, trailers, jobs, estimates, and invoices
7. **Contacts** - Contact persons for customer accounts
8. **Trailers** - Registry of customer-owned trailers
9. **Estimates** - Price quotes for services
10. **Jobs** - Active service/repair jobs
11. **Invoices** - Billing documents
12. **Payments** - Payment records
13. **Tasks** - Internal task management
14. **Notes** - General notes system
15. **Files** - Document management
16. **Schedules** - Service scheduling/calendar

### Standard Page Pattern

Entities follow a 4-component workflow:

1. **Add Form** (`/[entity]/new`) - Create new records
   - Modal or dedicated page
   - Form validation
   - Success/error handling

2. **List Page** (`/[entity]`) - View all records
   - Search functionality
   - Filter by status/category
   - Sort by columns
   - Pagination
   - Quick actions (view, edit, delete, update status)

3. **Details Page** (`/[entity]/[id]`) - View single record
   - Read-only display
   - Related records
   - Action buttons (edit, delete, etc.)
   - Activity history

4. **Edit Form** (`/[entity]/[id]/edit`) - Modify records
   - Pre-populated form
   - Save/cancel actions
   - Can be slideout, modal, popover, inline, or separate page

### Core Workflows

1. **Lead Intake → Conversion** (Lead → Account/Contact → Trailer → Job) — conversion occurs on `leadStatus = Converted`.  
2. **Invoicing Imperfect Pathways** → Dashboard/Invoices pages "Add Invoice" button → Invoice page, Account tab → Select Account  or Add New → Select Trailer  or Add New → Invoice page, Line Items tab → Add Parts/Labor → Invoice page, Review tab → Edit/Save/Generate PDF/Send  
3. **Job Execution → Invoicing** (Job → Invoice \+ Line Items → Payment) — OCR can seed invoice lines.  
4. **Inventory & Purchasing** (Parts → PO → Receiving → Update stock) — scans/NFC assist lookups.  
5. **Task Automation** (status changes create Tasks; due dates/SLAs) — avoid hard stops.  
6. **Client Visibility** (client‑role views of Jobs/Invoices/Trailers)

### Zero‑typing pathways

1. **Invoice OCR** from handwritten photos  
2. **Speech‑to‑Text** on all search inputs and forms  
3. **Barcode/QR** scan for parts and search fields  
4. **NFC tap** to resolve parts by `partsInformation.itemId`.

### Implementation Phases

#### Customer Management

**Priority: HIGHEST** - Core business function

1. **Leads** (`/leads`)
   - Add lead form
   - Leads list with status filter and priority filter
   - Lead details page
   - Edit lead form
   - Convert to customer action

2. **Customer Accounts** (`/accounts`)
   - Add account form
   - Customers list with search/filter
   - Customer details page (with embedded tabs for account contacts, notes, trailers, jobs, invoices)
   - Edit account form

3. **Account Contacts** (`/accounts/[id]/contacts`)
   - Add contact form (within customer account context)
   - Contacts list for customer accounts
   - Contact details
   - Edit contact form

4. **Customer Trailers** (`/accounts/[id]/trailers`)
   - Add trailer form
   - Trailers list with customer filter
   - Trailer details (with embedded service history)
   - Edit trailer form

#### Service Operations

**Priority: HIGHEST** - Daily operations

1. **Parts** (`/parts`)
   - Add part form
   - Parts list with search, type/category/subcategory filter
   - Part details (cost and sales pricing data, usage history, descriptive information)
   - Edit part form
   - Stock adjustment

2. **Services** (`/services`)
   - Services catalog list
   - Service details (rates, description)
   - Edit service form

3. **Invoices** (`/invoices`)
   - Create invoice form
   - Invoices list with status and financial summaries
   - Invoice details/preview
   - Edit invoice form
   - PDF export
   - Send via email or sms (can create link and send link)

4. **Jobs** (`/jobs`)
   - Create job form
   - Jobs list with status
   - Job details (parts used, time tracking, notes)
   - Edit job form
   - Convert to invoice action

5. **Estimates** (`/estimates`)
   - Create estimate form
   - Estimates list with status
   - Estimate details/preview
   - Edit estimate form
   - Convert to job action
   - PDF export

#### Inventory & Purchasing

**Priority: HIGH** - Parts management

1. **Vendors** (`/vendors`)
   - Add vendor form
   - Vendors list
   - Vendor details (contact info, parts supplied)
   - Edit vendor form

2. **Purchase Orders** (`/purchase-orders`)
   - Create PO form
   - PO list with status
   - PO details
   - Edit PO form
   - Receive items action

#### Operations Support

**Priority: HIGH** - Supporting features

1. **Tasks** (`/tasks`)
   - Create task form
   - Tasks list with status
   - Task details
   - Edit task form
   - Assign to team members
   - Polymorphic link to collections (customer accounts, trailer, invoice, job, etc)

2. **Notes** (`/notes`)
   - Create note form
   - Notes list with search
   - Note details
   - Edit note form
   - Polymorphic link to entities (accounts, jobs, etc.)

3. **Files** (`/media`)
   - Upload file form
   - Files list with filters (images, documents, etc.)
   - File preview
   - Edit metadata
   - Polymorphic link to entities

4. **Schedule** (`/schedule`)
   - Calendar view
   - Add event form
   - Day/week/month views
   - Drag-and-drop scheduling
   - Acts as master shops schedule by combining all entities with dates (tasks, current and scheduled jobs, estimates, invoices, etc)

#### Financial Management & Analytics

**Priority: LOWER** - Management features & revenue tracking

1. **Payments** (`/payments`)
   - Record payment form
   - Payments list
   - Payment details
   - Edit payment form
   - Link to invoices

2. **Transactions** (`/transactions`)
   - Transaction list (income/expenses)
   - Filter by type, date range
   - Transaction details
   - Financial reports

3. **Team Members** (`/members`)
   - Add member form
   - Members list
   - Member details (assigned jobs, performance)
   - Edit member form
   - Role management

4. **Analytics** (`/dashboard/analytics`)
   - Revenue dashboard
   - Job completion metrics
   - Customer acquisition
   - Parts usage
   - Technician performance

5. **Reports** (`/dashboard/reports`)
   - Sales reports
   - Financial reports
   - Inventory reports
   - Custom report builder

### Technical Architecture

#### Component Patterns

**Form Components:**

- Use local state with `useState`
- Icon-prefixed inputs
- Validation on submit
- Loading states
- Success/error messages

**List Components:**

- Search input with real-time filtering
- Tab-based status filters
- Status badges with inline update ability
- Hover states for rows
- Action buttons (view, edit, delete)
- Empty state handling
- Pagination

**Detail Components:**

- Card-based layout
- Section separators
- Related records tabs
- Action buttons
- Status badges with inline update ability
- Metadata display

**Edit Components:**

- Toggle between view/edit modes
- Pre-populated fields
- Save/Cancel buttons
- Confirmation dialogs for destructive actions

### Navigation Structure

The sidebar will be organized to reflect The Trailer Shop business model:

---

Dashboard
├── Overview
├── Important Notifications
├── Analytics
├── Tasks Tracking
├── Calendar and Schedule
└── Quick Action Buttons

Customers
├── Leads
└── Accounts

Inventory
├── Parts
├── Vendors
└── Purchase Orders

Operations
├── Jobs
├── Estimates
└── Invoices

Content
├── Schedule
├── Tasks
├── Notes
└── Files

Management
├── Payments
├── Transactions
├── Reports
└── Analytics Details (AI recommendations)

Team
├── Members
└── Settings

---

### Quality Standards

**Code Quality:**

- TypeScript interfaces for all data models
- Proper error handling
- Loading states for async operations
- Responsive design (mobile-first)

**User Experience:**

- Clear feedback for actions
- Confirmation for destructive actions
- Empty states with helpful messages
- Optimistic UI updates where appropriate

**Performance:**

- Lazy loading for large lists
- Pagination for data tables
- Image optimization
- Code splitting by route

---

## Rubric for World-Class Implementation

### 1. Functionality (20%)

- All CRUD operations work correctly
- Data validation prevents errors
- Edge cases handled gracefully
- No broken links or dead ends

### 2. User Experience (20%)

- Intuitive navigation
- Clear visual hierarchy
- Responsive feedback
- Minimal clicks to complete tasks
- Helpful error messages

### 3. Visual Design (15%)

- Consistent styling
- Professional appearance
- Proper use of color and typography
- Smooth animations and transitions

### 4. Code Quality (15%)

- Clean, readable code
- Proper TypeScript usage
- Reusable components
- Consistent patterns
- Well-organized file structure

### 5. Performance (10%)

- Fast page loads
- Smooth interactions
- Efficient data fetching
- Optimized images and assets

### 7. Completeness (20%)

- All required pages implemented
- All features functional
- Documentation complete
- No placeholder content

## **The "Cody Code" Initiative**

### **1. The Mission: Why We Are Building This App**

The Trailer Shop is at a critical juncture. Our growth is limited not by our skill or customer demand, but by a fundamental disconnect between our expert, hands-on service and the essential business data required to manage and scale our operations. The current workflow, reliant on pen, paper, and memory, has created a state of constant operational chaos that prevents accurate financial tracking, hinders customer management, and creates significant administrative bottlenecks.

**Our Core Mission:** To build a custom application that bridges the gap between the physical and digital worlds of our shop. This app will serve as a seamless extension of our Service Manager, Cody, by mirroring his real-world actions and making the process of creating clean, structured, and profitable data feel as natural to him as picking up a pen. **Success is not measured by the sophistication of the technology, but by its willing and enthusiastic adoption by Cody.**

### **2. The Heart of the Operation: Understanding Cody**

To build the right tool, we must first understand the craftsman. Cody is the engine of The Trailer Shop. He is the lead technician, the service manager, and the primary point of contact for customers. His expertise is our greatest asset.

However, this presents the "Cody Paradox": he is the source of all our service-related value and, simultaneously, the bottleneck for all our service-related data.

**Cody's Real-World Context:**

- **He is an Analog Expert in a Digital World:** Cody is brilliant with mechanics but averse to technology. For him, a computer is a hurdle, not a help. His trusted tools are a notepad and a pen.  
- **His Environment is Hands-On:** He operates with grease on his hands. Any solution requiring delicate, precise typing on a keyboard or phone is destined for failure.  
- **His Goal is Efficiency:** He needs to get the job done and get the customer on their way. Anything that slows him down or feels cumbersome will be abandoned.  
- **He is Left-Handed:** A small but crucial detail. Interfaces must be designed with a southpaw-friendly layout in mind. Small ergonomic shifts can dramatically improve usability and reduce friction.

This is why we have adopted the **"Cody Code"** as our primary design principle. It is a strict filter through which every feature must pass:

1. **Does it eliminate more work than it creates?**  
2. **Is its function immediately obvious without a manual?**  
3. **Does it feel like a natural extension of a real-world action (talking, writing, looking something up)?**  
4. **Does it build his confidence by feeling like a reliable assistant?**

### **3. The Current State: A Foundation of Chaos**

Our current workflow is a direct reflection of Cody's methods. While effective for completing a single job, it breaks down when trying to run a cohesive business.

**The Workflow Breakdown & Its Impact:**

- **Job Intake:** Customer information is often incomplete, jotted down on a scrap of paper, or exists only in Cody's memory. This leads to lost phone numbers and a lack of service history.  
- **Quoting & Pricing:** Prices are decided "in the moment" without referencing actual part costs or applying consistent margins. This makes it impossible to assess job profitability or the financial health of the business.  
- **Invoice Creation:** The final invoice is handwritten, often while the customer is waiting. This creates a pressure-filled end to the transaction and delays the information needed for official accounting in QuickBooks.  
- **Documentation & Tracking:** There is no centralized system for tracking job status, communication, or scheduling. This leaves the rest of the team completely blind to the shop's daily operations and commitments.

**The Business-Critical Consequence:** We are trapped in a cycle of reactive problem-solving. We cannot plan for growth because we lack the foundational data to make informed decisions about pricing, staffing, and inventory.

### **4. The Solution: From Paper to Profitable Data**

The app's purpose is not to force Cody to change, but to meet him where he is and make his existing actions infinitely more powerful.

- **To Solve Invoicing with "No-Type" Interfaces:** Recognizing that Cody thinks best with a pen and communicates best by talking, the app will offer two parallel, equally critical intake methods. This dual approach is the cornerstone of adoption:  
- **Instant OCR for Handwritten Notes:** Cody can continue to write invoices by hand. A simple photo will instantly transform his notes into a structured, digital record. This feature is the essential bridge, respecting his current process while eliminating manual entry for the team.  
- **Seamless Speech-to-Text:** For a man who cannot type but uses voice-to-text daily, this is his native digital language. The app will allow him to dictate notes, customer requests, and entire work orders. This is the path to evolving the app into a true conversational AI assistant that he can interact with naturally.  
- **To Bridge Organizational Gaps with Proactive Automation:** The app must function as Cody's administrative partner. It will automate reminders, suggest follow-ups, and integrate with native phone functions (like the calendar or contacts) to handle the planning and organization he struggles with. The goal is for the technology to do the admin work, freeing Cody to focus exclusively on his craft.  
- **To Solve Customer Management:** When a customer calls, Cody only needs to start typing a phone number or name. The app will **instantly find and display** the customer's full account and service history, eliminating the need to hunt for information.  
- **To Solve Inconsistent Pricing:** When the app creates a work order, it will automatically query our live database to find our **actual average cost** for each part. It will then suggest a consistent, profitable sale price based on our business rules. Cody's job becomes a simple review and confirmation.

This approach transforms Cody's natural actions into the structured, reliable data the business needs to thrive. It empowers him, reduces his administrative burden, and provides the clarity required to move forward.

---
