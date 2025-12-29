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
- **Database**: PostgreSQL 16 + Drizzle ORM
- **Icons**: Lucide Svelte
- **Deployment**: Docker Compose

## Getting Started

### Development Setup

#### 1. Install Dependencies

```bash
pnpm install
```

#### 2. Start PostgreSQL Database

Using Docker Compose:

```bash
docker compose up -d postgres
```

This starts PostgreSQL on `localhost:5432` with:
- Database: `polls`
- Username: `postgres`
- Password: `postgres`

#### 3. Generate and Run Migrations

Generate migration files from schema:

```bash
pnpm db:generate
```

Apply migrations to create tables:

```bash
pnpm db:migrate
```

This creates tables: `polls`, `options`, `votes`, and migration tracking.

#### 4. Development Server

Start the development server:

```bash
pnpm dev
```

Visit [http://localhost:5173](http://localhost:5173)

The app will be available with:
- Home page at `/`
- Browse all polls at `/polls`
- Create poll at `/create`

### Production Deployment

#### Using Docker Compose (Recommended)

Build and start all services:

```bash
docker compose up -d
```

This will:
1. Start PostgreSQL database with persistent volume
2. Build and start the application
3. Generate and run database migrations automatically on startup
4. Expose the app on `localhost:3000`

Stop services:

```bash
docker compose down
```

Stop and remove volumes:

```bash
docker compose down -v
```

#### Using Cloudflare Tunnel (Optional)

To expose your app publicly using Cloudflare Tunnel:

1. Create a tunnel in your Cloudflare Zero Trust dashboard
2. Get your tunnel token
3. Create a `.env` file in the project root:

```bash
CLOUDFLARE_TUNNEL_TOKEN=your_tunnel_token_here
```

4. Start all services including the tunnel:

```bash
docker compose --env-file .env up -d
```

The Cloudflare tunnel will:
- Create a secure outbound connection to Cloudflare
- Expose your app on your configured domain (e.g., `https://polls.yourdomain.com`)
- Handle SSL/TLS automatically
- Protect your app with Cloudflare's security features

To stop all services including the tunnel:

```bash
docker compose down
```

#### Manual Build

Build for production:

```bash
pnpm build
```

Preview production build:

```bash
pnpm preview
```

## Environment Variables

The application uses the following environment variable:

| Variable | Default | Description |
|----------|---------|-------------|
| `DATABASE_URL` | `postgresql://postgres:postgres@localhost:5432/polls` | PostgreSQL connection string |
| `NODE_ENV` | `development` | Environment mode (production/development) |
| `PORT` | `3000` | Port for production server |

For development, the defaults work with the Docker Compose setup. For production, set `DATABASE_URL` to your PostgreSQL instance.

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

Using Docker Compose:

```bash
docker compose exec postgres psql -U postgres -d polls
```

Or connect from host (requires PostgreSQL client):

```bash
psql postgresql://postgres:postgres@localhost:5432/polls
```

Common PostgreSQL commands:
```sql
\dt                        -- List all tables
\d polls                   -- View table structure
SELECT * FROM polls;       -- Query all polls
SELECT COUNT(*) FROM votes;-- Count total votes
\q                         -- Exit psql
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
- `created_at` (TIMESTAMP) - Timestamp of creation (default: now())

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
- `created_at` (TIMESTAMP) - Timestamp of vote (default: now())

## Troubleshooting

### Database Connection Issues

If the app can't connect to PostgreSQL:

```bash
# Check if PostgreSQL is running
docker compose ps

# View PostgreSQL logs
docker compose logs postgres

# Restart PostgreSQL
docker compose restart postgres
```

### Migration Errors

If migrations fail:

1. Reset the database:
```bash
docker compose down -v
docker compose up -d postgres
```

2. Delete migration folder: `rm -rf drizzle/`
3. Regenerate migrations: `pnpm db:generate`
4. Run migrations: `pnpm db:migrate`

### Port Already in Use

If port 5432 or 3000 is already in use:

```bash
# Find process using the port
lsof -i :5432
lsof -i :3000

# Change ports in compose.yml
# For example: "5433:5432" for PostgreSQL
```

## Future Enhancements

- Real-time updates with WebSockets
- Custom tier labels and distribution
- Poll expiration dates
- Vote analytics and charts
- Export results to CSV/JSON
- Dark mode toggle
- Poll search and filtering
