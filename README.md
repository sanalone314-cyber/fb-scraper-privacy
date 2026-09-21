# FB SCRAPER v1.0 — Personal Facebook Analytics Dashboard

A full-stack, production-grade web application that connects with **Meta Facebook Login (OAuth)** and the **Meta Graph API**, stores access tokens encrypted with **AES-256** in MongoDB, and presents a visual dashboard with **ChatGPT + Facebook Business Suite + Notion AI** aesthetics.

> **Legal & Compliance Notice**: This application operates strictly through authorized Meta Graph API endpoints with user consent. It does not scrape private pages or circumvent Facebook security boundaries.

---

## 🌟 Features & Modules

- **Meta Facebook Login (OAuth)**: Secure authorization code exchange for 60-day long-lived Graph API tokens.
- **AES-256 Token Encryption**: Access tokens and refresh tokens are encrypted at rest with random IVs before database storage.
- **Interactive Sandbox / Demo Mode**: Instant single-click sandbox environment with pre-seeded Graph API fixtures to test every module right out of the box without requiring manual Meta App setup first.
- **Dashboard Home**: Real-time telemetry summary cards (Logged User, Connected Status, Access Token Lifespan, Total Groups, Posts, Comments, Reactions).
- **Facebook Profile**: Full profile metadata, verified email, Facebook ID, token expiration countdown, and granted permissions audit.
- **Friends Directory**: Searchable directory of authorized friends with Facebook IDs and Graph API policy badges.
- **Groups Explorer**: Facebook groups listing with member counts, privacy status (Public/Closed), and deep-links to feed posts.
- **Group Feed Posts**: Monitored post stream with message text, high-res image previews, video indicators, timestamps, and engagement counters.
- **Comments Discussion**: Threaded comment view for selected posts with commenter names, profile photos, and timestamps.
- **Reaction Sentiment Analysis**: Granular 7-reaction distribution (**Like, Love, Wow, Haha, Sad, Angry, Care**) with interactive Doughnut and comparative progress charts.
- **Advanced Analytics & Export**:
  - Posts Per Day, Comments Per Day, Reactions Per Day timeline charts.
  - Group activity velocity breakdown.
  - Multi-criteria filters (Date Range 7d/14d/30d, Group selector, Keyword filter).
  - **One-click Export to CSV and JSON**.
- **Settings & Integration**: Meta App ID, Graph API version, token expiry countdown, Refresh Connection button, and Disconnect Facebook account.
- **Global Command Palette**: Instant modal search (`Ctrl+K` or `Cmd+K`) across Friends, Groups, Posts, and Comments.
- **Design System**: Glassmorphism cards, rounded 18px corners, Facebook Blue theme (`#1877F2`), fluid Framer Motion transitions, skeleton loaders, and a dark mode toggle.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19 / 18, Vite, TailwindCSS v3.4, React Router v6, React Query (`@tanstack/react-query`), Framer Motion, Chart.js (`react-chartjs-2`), Lucide Icons |
| **Backend** | Node.js, Express, Passport Facebook OAuth, JWT Authentication, Axios, Crypto (AES-256-CBC), Helmet, Rate Limiter, CORS |
| **Database** | MongoDB with Mongoose (with in-memory fallback for instant local preview) |

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** (v18 or higher recommended)
- **MongoDB** (Local or MongoDB Atlas) — *The server runs seamlessly even before MongoDB is started thanks to its embedded memory fallback!*

### 2. Installation
From the root project folder, install all dependencies:
```bash
# Install root, backend, and frontend dependencies in one command
npm run install:all
```
Or install individually:
```bash
npm --prefix backend install
npm --prefix frontend install
```

### 3. Environment Variables
Copy `.env.example` in `backend/`:
```bash
cp backend/.env.example backend/.env
```
Default `.env` configuration:
```env
PORT=5000
FACEBOOK_APP_ID=
FACEBOOK_APP_SECRET=
FACEBOOK_REDIRECT_URI=http://localhost:5000/auth/facebook/callback
FACEBOOK_GRAPH_VERSION=v21.0
JWT_SECRET=super_secret_fb_scraper_jwt_key_2026_change_in_production
ENCRYPTION_KEY=0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef
MONGO_URI=mongodb://127.0.0.1:27017/fb_scraper
CLIENT_URL=http://localhost:5173
```

### 4. Running Locally
Start both backend and frontend concurrently:
```bash
npm run dev
```
- **Backend API**: `http://localhost:5000`
- **Frontend App**: `http://localhost:5173`

---

## 🔑 Meta Facebook App Setup (For Live Mode)

To enable live OAuth login with your personal Facebook account:
1. Go to [Meta for Developers](https://developers.facebook.com/) and click **My Apps** > **Create App**.
2. Select **Authenticate and request data from users with Facebook Login**.
3. Under **Facebook Login** > **Settings**:
   - Add Valid OAuth Redirect URI: `http://localhost:5000/auth/facebook/callback`
4. Copy your **App ID** and **App Secret** from **App Settings** > **Basic**.
5. Paste them into `backend/.env`:
   ```env
   FACEBOOK_APP_ID=your_actual_app_id
   FACEBOOK_APP_SECRET=your_actual_app_secret
   ```
6. Restart backend with `npm --prefix backend run dev`.

---

## 📡 API Endpoints

### Authentication
- `GET /auth/facebook` — Redirect to Facebook OAuth dialog
- `GET /auth/facebook/callback` — OAuth code exchange and JWT issuance
- `POST /auth/demo-login` — Instant Sandbox demo session
- `GET /auth/me` — Current authenticated session status
- `POST /auth/logout` — Revoke and clear session

### Dashboard Resources
- `GET /api/profile` — User profile, permissions, and token lifespan
- `GET /api/friends` — Authorized friends list
- `GET /api/groups` — Facebook groups list
- `GET /api/groups/:groupId/posts` — Posts for selected group
- `GET /api/posts` — All monitored posts across groups
- `GET /api/posts/:postId/comments` — Comments discussion stream
- `GET /api/posts/:postId/reactions` — Like/Love/Wow/Haha/Sad/Angry/Care counts
- `GET /api/reactions/summary` — Aggregate sentiment totals
- `GET /api/analytics` — Timeline metrics (`format=csv` downloads CSV directly)
- `GET /api/search?q=:query` — Global search across all entities
- `GET /api/settings` — App configuration and health
- `POST /api/settings/refresh` — Extend token lifespan
- `POST /api/settings/disconnect` — Wipe token and disconnect

---

## 🔒 Security Architecture
- **Zero Raw Token Exposure**: User access tokens are never sent in plaintext over responses or stored raw in database documents.
- **AES-256-CBC Encryption**: Dynamic 16-byte initialization vectors (IV) generated for every token encryption pass.
- **Helmet**: Secures HTTP response headers against clickjacking, XSS, and sniff vulnerabilities.
- **Rate Limiting**: Automated IP rate limiting prevents token enumeration or brute-force requests.
- **CORS Protection**: Restricted to `CLIENT_URL` credentials-enabled origins.

---

## 📄 License
MIT License. Built for personal Facebook analytics research.
