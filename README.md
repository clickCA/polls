# PollTier - Polls with Tierlist Results

A simple poll application that displays results in tierlist format (S, A, B, C tiers).

## Features

- **Easy Poll Creation**: Create polls with a title, optional description, and custom options
- **Simple Voting**: One vote per user (tracked by IP + User-Agent hash)
- **Tierlist Dashboard**: Results displayed as a ranked tierlist
  - S Tier (Red): Top 20% by votes
  - A Tier (Orange): Next 30% by votes
  - B Tier (Yellow): Next 30% by votes
  - C Tier (Gray): Remaining options
- **No Authentication Required**: Instant voting without signup

## Tech Stack

- **Frontend**: SvelteKit 2 + Svelte 5
- **UI**: shadcn-svelte + Tailwind CSS v4
- **Database**: SQLite + Drizzle ORM
- **Icons**: Lucide Svelte

## Getting Started

### Install Dependencies

```bash
pnpm install
```

### Setup Database

The database will be automatically created on first run. To manually run migrations:

```bash
pnpm tsx src/lib/db/migrate.ts
```

### Development

```bash
pnpm dev
```

Visit [http://localhost:5173](http://localhost:5173)

### Build

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

## Project Structure

```
src/
├── lib/
│   ├── components/ui/     # shadcn-svelte components
│   ├── db/                # Database schema and connection
│   ├── tier.ts            # Tier calculation logic
│   └── hash.ts            # Voter hash generation
├── routes/
│   ├── +page.svelte       # Home page
│   ├── create/            # Poll creation page
│   └── poll/[id]/         # Vote page and dashboard
```

## How It Works

1. **Create a Poll**: Add a title, description, and at least 2 options
2. **Share the Link**: Send the poll URL to voters
3. **Vote**: Each person votes once (tracked by browser/IP)
4. **View Dashboard**: See results ranked in tierlist format

## Database Schema

- **polls**: Poll metadata (title, description, tier labels)
- **options**: Poll options with sort order
- **votes**: Vote records with voter hash for duplicate prevention

## Future Enhancements

- Real-time updates
- Custom tier labels
- Poll expiration dates
- Vote analytics
- Export results
