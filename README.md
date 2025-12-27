# PollTier - Polls with Tierlist Results

A simple poll application that displays results in tierlist format (S, A, B, C tiers).

## Features

- **Easy Poll Creation**: Create polls with a title, optional description, and custom options
- **Browse All Polls**: View all active polls in one place with vote counts and statistics
- **Simple Voting**: One vote per user (tracked by IP + User-Agent hash)
- **Tierlist Dashboard**: Results displayed as a ranked tierlist
  - S Tier (Red): Top 20% by votes
  - A Tier (Orange): Next 30% by votes
  - B Tier (Yellow): Next 30% by votes
  - C Tier (Gray): Remaining options
- **No Authentication Required**: Instant voting without signup
- **Share Poll Links**: Easy sharing with direct poll URLs

## Tech Stack

- **Frontend**: SvelteKit 2 + Svelte 5
- **UI**: shadcn-svelte + Tailwind CSS v4
- **Database**: SQLite + Drizzle ORM
- **Icons**: Lucide Svelte

## Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

**Important**: If you encounter issues with `better-sqlite3` native bindings:

```bash
cd node_modules/.pnpm/better-sqlite3@12.5.0/node_modules/better-sqlite3
npm run build-release
cd ../../../../../..
```

### 2. Setup Database

Run the database migrations to create the SQLite database and tables:

```bash
pnpm db:migrate
```

This will:
- Create `sqlite.db` file in the project root
- Create tables: `polls`, `options`, `votes`, and migration tracking
- Set up the complete schema for the application

### 3. Development

Start the development server:

```bash
pnpm dev
```

Visit [http://localhost:5173](http://localhost:5173)

The app will be available with:
- Home page at `/`
- Browse all polls at `/polls`
- Create poll at `/create`

### 4. Build for Production

```bash
pnpm build
```

### 5. Preview Production Build

```bash
pnpm preview
```

## Database Management

### Available Commands

| Command | Description |
|---------|-------------|
| `pnpm db:migrate` | Apply pending migrations to the database |
| `pnpm db:generate` | Generate new migration files after schema changes |

### Running Migrations

Apply all pending migrations:

```bash
pnpm db:migrate
```

### Generating Migrations

After modifying the schema in `src/lib/db/schema.ts`:

```bash
pnpm db:generate
```

This creates SQL migration files in the `drizzle/` directory.

### Inspecting the Database

To view the database using SQLite CLI:

```bash
sqlite3 sqlite.db
```

Common SQLite commands:
```sql
.tables                    -- List all tables
.schema polls              -- View table structure
SELECT * FROM polls;       -- Query all polls
SELECT COUNT(*) FROM votes;-- Count total votes
.quit                      -- Exit SQLite
```

## Project Structure

```
src/
├── lib/
│   ├── components/ui/     # shadcn-svelte components (Button, Card, Badge, etc.)
│   ├── db/
│   │   ├── schema.ts      # Database schema definitions
│   │   ├── index.ts       # Database connection
│   │   └── migrate.ts     # Migration runner script
│   ├── tier.ts            # Tier calculation algorithm
│   ├── hash.ts            # Voter hash generation for duplicate prevention
│   └── utils.ts           # Utility functions (cn, transitions)
├── routes/
│   ├── +layout.svelte     # Root layout with header
│   ├── +page.svelte       # Home/landing page
│   ├── Header.svelte      # Navigation header component
│   ├── polls/
│   │   └── +page.svelte   # Browse all polls
│   ├── create/
│   │   ├── +page.svelte   # Poll creation form
│   │   └── +page.server.ts # Create poll server action
│   └── poll/[id]/
│       ├── +page.svelte         # Vote page
│       ├── +page.server.ts      # Vote handling
│       └── dashboard/
│           ├── +page.svelte      # Tierlist results dashboard
│           └── +page.server.ts   # Results data loading
└── app.css                # Global styles and Tailwind config
```

## How It Works

1. **Create a Poll**: Add a title, description, and at least 2 options at `/create`
2. **Browse Polls**: View all active polls at `/polls` with vote counts and creation dates
3. **Share the Link**: Copy and send the poll URL to voters
4. **Vote**: Each person votes once (tracked by browser/IP hash)
5. **View Dashboard**: See results ranked in tierlist format (S/A/B/C tiers)

## Database Schema

### Tables

**polls**
- `id` (TEXT, PRIMARY KEY) - Unique poll identifier
- `title` (TEXT, NOT NULL) - Poll question/title
- `description` (TEXT) - Optional poll description
- `result_type` (TEXT) - Display type (default: "TIERLIST")
- `tier_labels` (TEXT) - JSON array of tier labels (default: ["S","A","B","C"])
- `created_at` (INTEGER) - Unix timestamp of creation

**options**
- `id` (TEXT, PRIMARY KEY) - Unique option identifier
- `poll_id` (TEXT, FOREIGN KEY) - References polls(id)
- `text` (TEXT, NOT NULL) - Option text
- `sort_order` (INTEGER) - Display order

**votes**
- `id` (TEXT, PRIMARY KEY) - Unique vote identifier
- `poll_id` (TEXT, FOREIGN KEY) - References polls(id)
- `option_id` (TEXT, FOREIGN KEY) - References options(id)
- `voter_hash` (TEXT, NOT NULL) - SHA-256 hash for duplicate prevention
- `created_at` (INTEGER) - Unix timestamp of vote

## Troubleshooting

### better-sqlite3 Build Issues

If you encounter `Cannot find bindings file` errors:

```bash
cd node_modules/.pnpm/better-sqlite3@12.5.0/node_modules/better-sqlite3
npm run build-release
cd ../../../../../..
pnpm db:migrate
```

### Database Not Found

If the app can't find the database:

```bash
# Make sure you're in the project root
pwd  # Should show .../polls

# Run migrations
pnpm db:migrate

# Verify database exists
ls -lh sqlite.db
```

### Migration Errors

If migrations fail:

1. Delete the database: `rm sqlite.db*`
2. Delete migration folder: `rm -rf drizzle/`
3. Regenerate migrations: `pnpm db:generate`
4. Run migrations: `pnpm db:migrate`

## Future Enhancements

- Real-time updates with WebSockets
- Custom tier labels and distribution
- Poll expiration dates
- Vote analytics and charts
- Export results to CSV/JSON
- Dark mode toggle
- Poll search and filtering
