# Setup Instructions

## For AI Assistants

Read these files first:

1. [index.html](../index.html) - Full documentation
2. [schema.json](../schema.json) - Database schema
3. [functions.sql](sql/functions.sql) - All functions
4. [views.sql](sql/views.sql) - All views

## For Developers

### Clone & Deploy

```bash
git clone https://github.com/YOUR-USERNAME/trailer-shop-db.git
cd trailer-shop-db

# Enable GitHub Pages
# Settings → Pages → Source: main branch / (root)
```

Your docs will be live at: `https://YOUR-USERNAME.github.io/trailer-shop-db/`

### Database Setup

Run SQL files in order:

1. Create tables (from schema.json)
2. `docs/sql/functions.sql`
3. `docs/sql/views.sql`
4. `docs/sql/triggers.sql`

### Update Documentation

Edit `index.html` then:

```bash
git add .
git commit -m "Update docs"
git push
```

Changes go live automatically.
