# EchoArchive

EchoArchive is a time capsule and AI memory archive. People lock messages, media, and reflections for a future date, then receive an AI-generated snapshot of who they were when the capsule was created.

## Stack

- Frontend: Next.js 15, TypeScript, Tailwind, shadcn-style components
- Backend: Python, FastAPI
- AI: Claude-ready service layer with a local fallback
- Database and storage: Supabase schema and Storage bucket plan
- Deployment targets: Vercel for web, Railway for API

## Run Locally

Install frontend dependencies:

```bash
npm install
```

Run the web app:

```bash
npm run dev
```

Set up the API:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r apps/api/requirements.txt
uvicorn app.main:app --reload --app-dir apps/api
```

Frontend runs at `http://localhost:3000` by default. In this workspace we usually run it on `http://localhost:3002`. API runs at `http://localhost:8000`.

Run both services:

```bash
source .venv/bin/activate
uvicorn app.main:app --reload --app-dir apps/api --port 8000
npm run dev --workspace apps/web -- --port 3002
```

## Environment

Copy the examples and fill in real credentials when you are ready to connect Supabase and Claude:

```bash
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env
```

The API works without `ANTHROPIC_API_KEY`; it returns a structured demo analysis so the product can be tested immediately.

## Product Scope

Current local MVP includes:

- Dashboard with locked, unlocked, and upcoming capsules
- Local register/login flow
- New capsule creation with text, media type, unlock date, privacy intent, and file upload
- Capsule reveal page with countdown and AI memory report
- Anonymous public archive driven by the API
- Profile memory map driven by the API
- Publish/unpublish controls for opened capsules
- FastAPI endpoints for capsules, AI analysis, archive entries, local auth, upload storage, and unlock jobs
- Supabase migration for future production persistence

## API Endpoints

- `GET /health`
- `GET /capsules`
- `POST /capsules`
- `GET /capsules/{id}`
- `POST /capsules/{id}/publish`
- `POST /capsules/{id}/unpublish`
- `POST /capsules/jobs/unlock`
- `GET /archive`
- `POST /auth/register`
- `POST /auth/login`

## Production Checklist

Code-level integration points are present. To go fully production-live:

- Create a Supabase project and run `supabase/migrations/001_initial_schema.sql`
- Add a private Storage bucket for capsule media
- Replace local JSON/file storage with Supabase database/storage calls
- Add real `ANTHROPIC_API_KEY`
- Deploy `apps/web` to Vercel with `NEXT_PUBLIC_API_URL`
- Deploy `apps/api` to Railway with `ANTHROPIC_API_KEY`, `SUPABASE_URL`, and `SUPABASE_SERVICE_ROLE_KEY`
- Schedule `POST /capsules/jobs/unlock` or deploy the Supabase Edge Function

More notes:

- [Deployment guide](docs/DEPLOYMENT.md)
- [GitHub ready checklist](docs/GITHUB_READY.md)

## Repository Hygiene

The repo intentionally ignores local runtime artifacts:

- `apps/api/data/`
- `apps/api/storage/uploads/`
- `.env` and `.env.local`
- Python cache and Next build output

This keeps GitHub clean while still allowing the app to run locally. The API recreates local JSON storage and upload folders automatically.
