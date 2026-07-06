# DezignCamp LMS 🎓

A production-grade, AI-powered Learning Management System built with Next.js 16 App Router, Tailwind CSS v4, and a dark Framer design system.

## 🚀 Live Demo

**App URL:** `https://3000-in7qmy35y28wg9629hg6y-5c13a017.sandbox.novita.ai`

---

## ✅ Completed Features

### Student Panel
| Module | Route | Status |
|--------|-------|--------|
| Dashboard | `/dashboard` | ✅ Done |
| My Courses | `/courses` | ✅ Done |
| Course Player | `/courses/[id]` | ✅ Done |
| Grade Book | `/grades` | ✅ Done |
| Assignments | `/assignments` | ✅ Done |
| Calendar | `/calendar` | ✅ Done |
| Notes | `/notes` | ✅ Done |
| To-Do List | `/todo` | ✅ Done |
| Study Plan (AI) | `/study-plan` | ✅ Done |
| Schedule / Timetable | `/schedule` | ✅ Done |
| e-ID Card | `/eid-card` | ✅ Done |
| Notifications | `/notifications` | ✅ Done |
| Help & Support | `/help` | ✅ Done |

### Auth Pages
| Page | Route | Status |
|------|-------|--------|
| Login | `/login` | ✅ Done |
| Register | `/register` | ✅ Done |

### Instructor Panel
| Module | Route | Status |
|--------|-------|--------|
| Instructor Dashboard | `/instructor/dashboard` | ✅ Done |

### Admin Panel
| Module | Route | Status |
|--------|-------|--------|
| Admin Dashboard | `/admin/dashboard` | ✅ Done |

---

## 🏗️ Architecture

### Frontend (This Repo)
- **Framework:** Next.js 16 with App Router
- **Styling:** Tailwind CSS v4.3 (inline arbitrary values, `@theme` tokens)
- **Charts:** Recharts (BarChart, AreaChart, LineChart, RadarChart, PieChart)
- **Icons:** Lucide React
- **Type Safety:** TypeScript 5

### Design System
Based on the Framer Dark Design System:
- **Canvas:** `#090909`
- **Surface 1:** `#141414`
- **Surface 2:** `#1c1c1c`
- **Accent Blue:** `#0099ff`
- **Gradient accents:** violet `#a855f7`, orange `#f97316`, coral `#ec4899`
- **Typography:** Inter font, 12px–110px scale

### Backend (Documented — Not Implemented)
See `/docs/backend/laravel-structure.md`
- **Framework:** Laravel 11 with Sanctum auth
- **Database:** PostgreSQL (full schema in `/docs/database/schema.sql`)
- **Storage:** Amazon S3 for media/files
- **AI:** OpenAI GPT-4 for study plans, note summarization, inactivity detection

### API Reference
See `/docs/api/endpoints.md` — full REST API documentation with all endpoints.

---

## 📁 Project Structure

```
dezigncamp/
├── src/
│   ├── app/
│   │   ├── (auth)/           # Login, Register
│   │   ├── (dashboard)/      # All student pages
│   │   ├── instructor/       # Instructor panel
│   │   ├── admin/            # Admin panel
│   │   ├── globals.css       # Tailwind v4 @theme tokens + base reset
│   │   └── layout.tsx        # Root layout
│   ├── components/
│   │   ├── layout/           # Sidebar, TopBar, DashboardLayout
│   │   └── ui/               # Button, Card, Badge, Input, Avatar, ProgressBar
│   ├── lib/
│   │   ├── mock-data.ts      # All prototype data
│   │   └── utils.ts          # cn(), formatDate, getInitials, etc.
│   └── types/
│       └── index.ts          # TypeScript interfaces
├── docs/
│   ├── database/schema.sql   # Full PostgreSQL schema
│   ├── api/endpoints.md      # REST API reference
│   └── backend/laravel-structure.md
├── public/
└── next.config.ts
```

---

## 🔑 Key Technical Notes

### Tailwind CSS v4 Pattern
All styles use inline arbitrary values — no custom CSS class names in JSX:
```tsx
// ✅ Correct (v4)
<div className="bg-[#141414] text-[14px] rounded-[12px] px-4 py-2">

// ❌ Wrong (v3 pattern — causes build errors)
<div className="bg-surface-1 text-body-sm rounded-md px-4 py-2">
```

### Mock Data
All pages use `src/lib/mock-data.ts` for prototype data. Connect to the Laravel REST API by replacing mock data calls with `fetch()` or `axios` API calls.

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

---

## 📚 Documentation

| Doc | Path |
|-----|------|
| PostgreSQL Schema | `docs/database/schema.sql` |
| Laravel API Endpoints | `docs/api/endpoints.md` |
| Laravel Backend Structure | `docs/backend/laravel-structure.md` |

---

## 🗺️ Roadmap

- [ ] Connect to Laravel REST API (replace mock data)
- [ ] YouTube player with watch progress tracking
- [ ] AI study plan regeneration (OpenAI API)
- [ ] File upload for assignments (S3)
- [ ] Real-time notifications (Laravel Echo + Pusher)
- [ ] Timed exam / MCQ engine with anti-cheat
- [ ] Certificate generation (PDF)
- [ ] Mobile-responsive layout improvements
- [ ] Dark/light theme toggle

---

**Built with ❤️ for DezignCamp — AI-Powered Learning**
