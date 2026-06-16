# InternTrack

> Track every internship application in one place.  
> Never lose track of applications, interviews, OAs, and offers again.

---

## Overview

InternTrack is a fully client-side internship application tracker built for students who apply to dozens (or hundreds) of internships across LinkedIn, Internshala, company career pages, referrals, and cold emails.

All data is stored in **your browser's LocalStorage** — no backend, no database, no sign-up required.

---

## Features

- **Dashboard** — Live stats: Total, Applied, OA, Interview, Rejected, Offers
- **Add / Edit / Delete** applications with full validation
- **Search** — Debounced, full-text search across company, role, location, source, notes
- **Filter** — Multi-select by status and source
- **Sort** — By date, company name, or recently updated
- **Kanban View** — Drag-and-drop cards between status columns
- **Analytics** — Bar chart (by status), Pie chart (by source), Line chart (over 30 days)
- **Export CSV** — Download all applications as `interntrack.csv`
- **Import CSV** — Re-import previously exported data
- **Dark Mode** — System-aware, persisted via `next-themes`
- **Offer Celebration** — Confetti animation + toast when status = Offer
- **Keyboard Shortcuts** — `A` to add, `/` to search, `Esc` to close
- **Relative Dates** — "Applied today", "Applied 3 days ago", etc.
- **Empty States** — Friendly illustrations for no data and no results
- **Responsive** — Mobile, tablet, and desktop friendly

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | TailwindCSS |
| Animations | Framer Motion |
| Charts | Recharts |
| Notifications | react-hot-toast |
| Confetti | react-confetti |
| Dark Mode | next-themes |
| Icons | Lucide React |
| Storage | Browser LocalStorage |

---

## Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/interntrack.git
cd interntrack

# 2. Install dependencies
npm install

# 3. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deployment (Vercel)

```bash
# Deploy instantly with the Vercel CLI
npx vercel --prod
```

Or push to GitHub and connect the repo at [vercel.com](https://vercel.com) — zero configuration needed.

---

## Folder Structure

```
interntrack/
├── app/
│   ├── globals.css         # Tailwind + CSS variables
│   ├── layout.tsx          # Root layout (ThemeProvider + Toaster)
│   └── page.tsx            # Main dashboard page
├── components/
│   ├── Header.tsx          # Sticky nav with view toggle + theme toggle
│   ├── StatsCards.tsx      # Dashboard stat cards
│   ├── ApplicationForm.tsx # Add / Edit modal form
│   ├── ApplicationCard.tsx # Single application card (list view)
│   ├── ApplicationList.tsx # Search + filter + list/kanban renderer
│   ├── SearchBar.tsx       # Debounced search input
│   ├── FilterBar.tsx       # Status + source filters + sort
│   ├── Analytics.tsx       # Recharts analytics panel
│   ├── ExportButton.tsx    # CSV export + import
│   ├── EmptyState.tsx      # Empty state illustrations
│   ├── ThemeToggle.tsx     # Dark/light mode toggle
│   ├── KanbanBoard.tsx     # Drag-and-drop Kanban view
│   └── Footer.tsx          # Footer with author + Digital Heroes link
├── hooks/
│   ├── useLocalStorage.ts  # Persistent state hook
│   └── useDebounce.ts      # Debounce utility hook
├── types/
│   └── application.ts      # Application interface + Status/Source types
├── utils/
│   ├── date.ts             # Relative date formatting
│   ├── csv.ts              # CSV export + import + parse
│   ├── status.ts           # Status color/badge helpers
│   └── storage.ts          # ID generation + sanitization
└── constants/
    └── statuses.ts         # Status definitions with colors
```

---

## Future Enhancements

- Reminder / deadline notifications
- Priority levels (High / Medium / Low)
- Interview prep notes per application
- Bulk status updates
- Cloud sync (Firebase / Supabase optional mode)
- Browser extension for one-click application capture from LinkedIn
- PDF export

---

## Author

**Rohit Ganguly**  
Built for [Digital Heroes](https://digitalheroesco.com)
