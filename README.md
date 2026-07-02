# Quelorax

**AI-powered Smart Queue & Crowd Management System** for hospitals and government offices.

Quelorax helps institutions reduce wait times and manage crowd flow using AI-driven predictions, real-time queue tracking, and role-based dashboards for patients, receptionists, nurses, doctors, and administrators.

## What's New in This Version

- **Real authentication** — working signup, login, and forgot/reset password flow backed by a mock auth layer (`src/data/mockAuth.js`) persisted in `localStorage`. Real validation and error messages throughout (no more silent/fake buttons).
- **Working forgot password** — request a reset code, see it in a demo banner (no real SMS/email backend), enter it plus a new password, and log in immediately.
- **Sign Up flow** — full registration form with field validation, mobile OTP verification (demo mode shows the code), duplicate-account detection, and automatic login on success.
- **Fixed module selection** — clicking "Hospital Services" or "Government Services" on the landing page now takes you straight to role selection for that module instead of looping back through "choose a module" again. A standalone *Module Selection* page still exists for anyone who wants to explicitly switch modules later (linked from Role Selection → "Change Module").
- **Module-aware dashboards** — Hospital and Government modules now look and read differently throughout the app (organization name, department names, role titles, sample queue data, system status, etc.), driven by `src/data/moduleContent.js`, instead of every dashboard saying "Hospital" regardless of which module was chosen.
- **All buttons and navigation wired up** — queue actions (Call/Hold/Done/Start Service/Finish Service), document upload/download/preview, report generation/export (PDF/CSV), token booking validation, dashboard search box, profile dropdown with working logout, and the public nav's Home/Features/About/Contact links (smooth-scroll to the matching landing-page section).
- **More attractive landing page** — added a dedicated "Two Modules, One Platform" showcase section and a testimonials section, plus richer hover/transition polish, on top of the existing hero, features, how-it-works, and CTA sections.
- **Patient-relevant analytics, not admin analytics** — the full operational `Analytics` page (crowd %, department traffic share, etc.) has been removed from the patient's sidebar since it isn't meaningful to a patient. In its place, the Patient Dashboard now includes a compact "Your Wait Time Trend" widget showing the patient's own recent wait times and a short explanation of why their wait looks the way it does — kept directly inside the dashboard since it's genuinely useful there.
- **Route guards** — protected pages now require login; visiting a page your role isn't allowed to see redirects you back to your own dashboard instead of rendering a blank screen.

## Demo Accounts

Pre-seeded accounts (also visible to anyone exploring `src/data/mockAuth.js`):

| Role | Email | Password |
|---|---|---|
| Patient | rajesh.kumar@email.com | patient123 |
| Receptionist | priya.sharma@email.com | reception123 |
| Nurse | meena.devi@email.com | nurse123 |
| Doctor | arjun.nair@email.com | doctor123 |
| Admin | admin@quelorax.com | admin123 |

You can also just sign up for a brand new account from the Sign Up page.

## Tech Stack

React 18 (JSX, no TypeScript) · Vite 6 · Tailwind CSS 4 · Recharts · lucide-react

## Getting Started

```bash
npm install
npm run dev       # start dev server
npm run build     # production build
npm run preview   # preview the build
```

## Project Structure

```
quelorax-app/
├── index.html
├── package.json
├── vite.config.js
├── postcss.config.mjs
└── src/
    ├── main.jsx                     # Entry point — mounts <App />
    ├── app/
    │   └── App.jsx                  # Root component: session state, routing/guards, module state
    ├── data/
    │   ├── mockAuth.js              # Mock auth "backend": signup/login/forgot-reset password
    │   ├── moduleContent.js         # Hospital vs Government terminology/content map
    │   └── chartData.js             # Shared mock chart datasets
    ├── components/
    │   ├── ui/                      # Btn, Badge, StatCard
    │   ├── layout/                  # PublicNav, Sidebar, DashboardLayout
    │   └── widgets/
    │       └── VoiceAssistant.jsx
    ├── pages/                       # One file per screen/route
    │   ├── LandingPage.jsx
    │   ├── ModuleSelectionPage.jsx
    │   ├── RoleSelectionPage.jsx
    │   ├── LoginPage.jsx
    │   ├── RegisterPage.jsx
    │   ├── ForgotPasswordPage.jsx
    │   ├── PatientDashboard.jsx
    │   ├── SmartRoutingPage.jsx
    │   ├── TokenBookingPage.jsx
    │   ├── TokenConfirmationPage.jsx
    │   ├── QueueTrackingPage.jsx
    │   ├── NotificationsPage.jsx
    │   ├── UploadDocumentsPage.jsx
    │   ├── PreviousUploadsPage.jsx
    │   ├── ReceptionistDashboard.jsx
    │   ├── NurseDashboard.jsx
    │   ├── DoctorDashboard.jsx
    │   ├── AdminDashboard.jsx
    │   ├── AnalyticsPage.jsx
    │   ├── ReportsPage.jsx
    │   ├── SettingsPage.jsx
    │   └── CCTVPage.jsx
    └── styles/
        ├── index.css
        ├── fonts.css
        ├── tailwind.css
        └── theme.css
```

### How routing & auth work

`App.jsx` holds `page`, `user` (the logged-in session), and `module` (`"hospital"` or `"government"`) in state. `navigate(pageId)` is passed down to every page; it checks whether the target page is public, whether the user is logged in, and whether their role is allowed to see that page — redirecting to login or back to their own dashboard as needed. There's no router library involved; it's a simple state machine, same as the original version, just with real guards now.

`mockAuth.js` simulates a backend entirely in `localStorage` — registered users, password hashes (plaintext for demo purposes only — do not use this approach in production), and short-lived password-reset codes. Swap this file out for real API calls when connecting to a backend.

## Notes

- No real backend — all data is mocked/static for demonstration. `mockAuth.js` is explicitly NOT production-grade (plaintext passwords, no rate limiting, no real email/SMS) — replace it with real API calls before deploying.
- Originally exported from a Figma-based UI tool as a single `App.jsx`; this version splits it into the folder structure above for easier maintenance.
