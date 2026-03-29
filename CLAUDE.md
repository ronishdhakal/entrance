# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Entrance exam preparation platform for Nepal (BSc CSIT, BIT, BBA, etc.). Production domains:
- Frontend: `entrance.collegeinfonepal.com`
- Backend media: `media.collegeinfonepal.com`
- Backend API: `entrancebase.collegeinfonepal.com`

---

## Commands

### Frontend (`entrance-frontend/`)

```bash
npm run dev       # Start dev server (http://localhost:3000)
npm run build     # Production build
npm run lint      # ESLint
```

### Backend (`entrance-backend/`)

```bash
# Activate venv first
source venv/Scripts/activate          # Windows (bash)
source venv/bin/activate              # Linux/macOS

python manage.py runserver            # Start dev server (http://localhost:8000)
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py collectstatic
```

### Docker (both services have `docker-compose.yml`)

```bash
docker-compose up --build
```

---

## Environment Variables

### Frontend — `entrance-frontend/.env.local`
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### Backend — `entrance-backend/.env`
```
ALLOWED_HOSTS=localhost,127.0.0.1
CSRF_TRUSTED_ORIGINS=http://localhost:3000
DB_NAME=...
DB_USER=...
DB_PASSWORD=...
DB_HOST=localhost
DB_PORT=5432
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
```

> The backend uses **PostgreSQL** (configured via env vars). A `db.sqlite3` file exists but is not used in production.

---

## Architecture

### Backend (`entrance-backend/`)

Standard Django project layout. All custom code lives under `apps/`:

| App | Purpose |
|---|---|
| `accounts` | Custom `User` model, JWT auth, OTP password reset |
| `programs` | Entrance exam programs (BSc CSIT, BIT, etc.) |
| `mocktests` | `MockTest` → `Section` → `Question` → `Option` hierarchy |
| `attempts` | `ExamAttempt` and `UserAnswer` — tracks user exam sessions |
| `question` | Public question bank (sections/questions browsable without auth) |
| `exam` | Real exam info (dates, fees, schedule) |
| `syllabus` | Syllabus documents per program |
| `college` | College listings with course/university filters |
| `university` | University listings |
| `programs` | Program listings |
| `course` | Course listings |
| `book` | Study books |
| `classes` | Online classes |
| `news` | News articles |
| `advertisement` | Ad placements (`home_1..4`, `popup`, `text`) |
| `inquiry` | College and program lead forms |

Config is in `config/` (settings, urls, wsgi, asgi). `ROOT_URLCONF = "config.urls"`.

**Auth:** JWT (`Bearer` token). Access token: 30 min. Refresh token: 1 year. Default permission is `AllowAny`; protected endpoints require `Authorization: Bearer <token>`.

**Admin:** Jazzmin-themed Django admin at `/admin/`. CKEditor used for rich text fields.

**All models** auto-generate slugs from titles and use `is_active`/`is_published` flags.

### Frontend (`entrance-frontend/`)

Next.js 16 App Router. All pages are in `app/`, all reusable UI in `components/`.

**Key utilities:**
- `lib/api-config.js` — exports `API_URL` (reads `NEXT_PUBLIC_API_URL` env var, defaults to `http://localhost:8000/api`)
- `lib/auth.js` — JWT token management in `localStorage`, `fetchWithAuth` wrapper with auto-refresh on 401
- `utils/api.js` — all fetch functions organized by domain (programs, mocktests, attempts, exam, news, books, colleges, syllabus, classes, advertisements, inquiries)
- `utils/admin-api.js` — admin-facing API calls

**Auth flow:** Tokens stored in `localStorage` as `access_token` and `refresh_token`. `fetchWithAuth` handles 401 → refresh → retry automatically; on refresh failure it redirects to `/login`.

**Math rendering:** KaTeX (`react-katex`) — question and option text supports LaTeX. KaTeX CSS is imported globally in `app/layout.tsx`.

**UI:** shadcn/ui (Radix UI primitives + Tailwind CSS v4). Components in `components/ui/`. Feature components organized by domain under `components/`.

**Exam flow (key pages):**
- `/program/[slug]` — program detail + list of mock tests
- `/practice/[slug]/[programSlug]` — mock test taking interface (requires auth)
- `/dashboard` — user attempt history and results
