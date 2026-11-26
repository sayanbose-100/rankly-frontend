# Rankly Frontend (React + TypeScript + TanStack Query)

Production-structured SaaS frontend for **Rankly**, engineered to connect cleanly to the Spring Boot REST backend (`/api/auth`, `/api/user`, `/api/domains`, `/api/batches`, `/api/alerts`) while also providing an instant interactive Demo / Mock fallback mode when the backend isn't running locally.

## Folder Structure

```text
src/
├── api/                  # Typed Axios/Fetch HTTP client & endpoint modules
│   ├── client.ts         # Fetch wrapper with credentials: 'include' & error handling
│   ├── auth.api.ts       # /api/auth/* (register, login, logout, me)
│   ├── user.api.ts       # /api/user/* (preferences, quota)
│   ├── domains.api.ts    # /api/domains/* (list, create, get, delete)
│   ├── keywords.api.ts   # /api/domains/:id/keywords/* & /api/batches/:id
│   └── alerts.api.ts     # /api/alerts/* (list, unread-count, mark-read)
├── components/
│   ├── common/           # Reusable UI primitives (RankDeltaBadge, StatusBadge, ThemeToggle)
│   ├── layout/           # AppShell, Navbar (responsive + global Logout), Footer
│   ├── landing/          # HeroSection & product overview
│   ├── auth/             # AuthModal (Sign In / Register)
│   ├── domains/          # DomainCard & AddDomainModal
│   ├── workspace/        # KeywordSearchBar, BatchProgressBanner, RankTrendChart, KeywordTable
│   └── alerts/           # AlertDrawer (>100 rank drop notifications)
├── context/
│   ├── AuthContext.tsx   # Persistent session state & global logout
│   └── ThemeContext.tsx  # Light / Dark mode synced with /api/user/preferences
├── hooks/                # TanStack Query hooks (queries, mutations, batch polling)
│   ├── useDomains.ts
│   ├── useKeywords.ts
│   ├── useAlerts.ts
│   └── useQuota.ts
├── pages/                # Route-level views
│   ├── LandingPage.tsx
│   ├── DashboardPage.tsx
│   └── DomainWorkspacePage.tsx
├── types/                # TypeScript interfaces mirroring Spring Boot DTOs
│   └── rankly.ts
├── utils/                # Formatters & mock fallback store
│   ├── formatters.ts
│   └── mockStore.ts
├── App.tsx               # Route configuration & global drawers/modals
├── main.tsx              # QueryClientProvider, AuthProvider, ThemeProvider bootstrap
└── index.css             # Tailwind layers & smooth theme transitions
```

## Quick Start

```bash
npm install
npm run dev
```
