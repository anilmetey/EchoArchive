# GitHub Ready Checklist

- No real `.env` files are tracked.
- Local runtime data is ignored via `apps/api/data/`.
- Local uploads are ignored via `apps/api/storage/uploads/`.
- Python cache and Next build output are ignored.
- Deployment configs are included for Vercel and Railway.
- README explains local setup, endpoints, and production requirements.

Before pushing, run:

```bash
npm run lint --workspace apps/web
npm run build --workspace apps/web
source .venv/bin/activate
python -m py_compile $(rg --files apps/api -g '*.py')
```

