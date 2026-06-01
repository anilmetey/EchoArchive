# EchoArchive Deployment

## Web on Vercel

1. Import the repository into Vercel.
2. Set the project root to the repository root.
3. Keep the included `vercel.json`.
4. Add environment variables:

```bash
NEXT_PUBLIC_API_URL=https://your-railway-api.up.railway.app
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## API on Railway

1. Create a Railway service from this repository.
2. Use the included `railway.json`.
3. Add environment variables:

```bash
ANTHROPIC_API_KEY=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
FRONTEND_ORIGIN=https://your-vercel-app.vercel.app
```

The API can run without `ANTHROPIC_API_KEY`; it falls back to deterministic local AI-style analysis for demos.

## Supabase

Run the migration in `supabase/migrations/001_initial_schema.sql`.

Create a private Storage bucket for capsule media. The local MVP stores files in `apps/api/storage/uploads`; production should replace that storage adapter with Supabase Storage.

## Scheduled Unlocks

Use either:

- Railway cron calling `POST /capsules/jobs/unlock`
- Supabase Edge Function in `supabase/functions/unlock-capsules`

