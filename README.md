# The Trailer Shop Database

Complete PostgreSQL database implementation for a 2-person trailer service shop.

## 🚀 Quick Start for AI Assistants

**Before working on this project, read:**
1. **Full Documentation**: https://YOUR-USERNAME.github.io/trailer-shop-db/
2. **Database Schema**: [schema.json](schema.json)
3. **Current Functions**: [docs/sql/functions.sql](docs/sql/functions.sql)

## Project Stats

- **Monthly Volume**: 10-15 invoices (~$2k each)
- **Annual Revenue**: ~$240-360k
- **Team Size**: 2 people (Nikki: ops/dev, Cody: service/tech)
- **Current State**: Handwritten paper invoices → Digital transformation
- **Database**: Supabase (PostgreSQL)
- **App Framework**: Next.js 15 (migrating to 16)

## Critical Context

**Success Metric**: Will Cody use it?
- If slower than paper → Project fails
- If harder than paper → Project fails
- If requires typing → Project fails

**The Cody Code™**: Every design decision must:
1. Eliminate more work than it creates
2. Be immediately obvious without a manual
3. Feel like natural extension of real-world action
4. Build confidence as a reliable assistant

## Database Status

✅ **Complete & Operational** (as of Nov 16, 2025)
- 22 tables created
- 8 functions (ID generation, lead conversion)
- 7 views (totals, inventory, customer search)
- 14 triggers (timestamps, inventory)
- Flexible constraints (accepts partial data)

## File Structure
```
trailer-shop-db/
├── index.html                    # Interactive documentation
├── schema.json                   # Complete database schema
├── README.md                     # This file
├── docs/
│   ├── sql/
│   │   ├── functions.sql        # All database functions
│   │   ├── views.sql            # All views
│   │   └── triggers.sql         # All triggers
│   ├── images/
│   └── SETUP.md                 # Setup instructions
```

## Next Steps

1. Complete Next.js integration
2. Build invoice creation UI (OCR + voice)
3. Customer/trailer lookup
4. Parts search with barcode

## Common Mistakes to Avoid

1. ❌ Don't assume schema details - check schema.json
2. ❌ Don't design for Fortune 500 scale - 15 invoices/month
3. ❌ Don't add strict constraints - OCR/voice input is messy
4. ❌ Don't create duplicate views - app can sort/filter
5. ❌ Don't assume business rules - check functions.sql

