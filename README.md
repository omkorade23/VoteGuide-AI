# VotePath AI — Election Assistant

> An AI-powered guide to the Indian election process. Built for every citizen.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Cloud%20Run-4285F4?logo=google-cloud&logoColor=white)](https://voteguide-ai.example.run.app)
[![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![Powered by Gemini](https://img.shields.io/badge/AI-Gemini%20Flash-8E44AD?logo=google&logoColor=white)](https://ai.google.dev)

---

## Overview

VotePath AI is a full-stack web application that simplifies the Indian electoral process for first-time and returning voters. It combines structured, ECI-verified data with a Gemini Flash–powered chatbot that answers election questions in four languages — English, Hindi, Tamil, and Marathi.

The application serves the React frontend as static files from the Express backend in production, deployed as a single container on Google Cloud Run.

---

## Live Demo

> **[https://github.com/omkorade23/VoteGuide-AI](https://github.com/omkorade23/VoteGuide-AI)**  
> *(Replace with your Cloud Run service URL after deployment)*

---

## Features

| Feature | Description |
|---|---|
| **Voter Journey** | 6-step guided walkthrough of the complete voting process |
| **Election Timeline** | Phase-by-phase breakdown of the Indian election cycle |
| **Eligibility Checker** | Covers citizenship, age, residence, documents, and disqualification rules |
| **AI Chat Assistant** | Gemini Flash answers grounded in official ECI JSON data |
| **Multilingual Responses** | English, Hindi (Devanagari), Tamil, and Marathi |
| **Fallback Handling** | Off-topic or unknown queries redirect to eci.gov.in and Voter Helpline 1950 |
| **Rate Limiting** | Global 60 req/min limit; stricter 10 req/min on the `/api/chat` endpoint |
| **FAQ Section** | Common voter questions answered inline on the landing page |

---

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 18 | UI framework |
| Vite | 5 | Build tool and dev server |
| Tailwind CSS | 3 | Styling |
| React Router DOM | 6 | Client-side routing |
| Axios | 1 | HTTP client |
| Lucide React | 0.378 | Icon library |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | 20 | Runtime |
| Express | 4 | HTTP server |
| @google/generative-ai | 0.21 | Gemini Flash integration |
| express-rate-limit | 7 | API rate limiting |
| dotenv | 16 | Environment variable management |

### Infrastructure
| Service | Purpose |
|---|---|
| Google Cloud Run | Containerized deployment |
| Docker (multi-stage) | Build and package |
| Google Gemini Flash | AI inference |

---

## Project Structure

```
ELECTION-NAV/
├── Dockerfile                        # Multi-stage: Vite build → Express server
│
├── election-frontend/
│   ├── index.html                    # Entry HTML, SEO meta tags, Inter font
│   ├── vite.config.js                # Dev proxy → localhost:3000
│   ├── tailwind.config.js
│   └── src/
│       ├── App.jsx                   # BrowserRouter + route definitions
│       ├── api/
│       │   └── client.js             # Axios instance + API helpers
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Footer.jsx
│       │   └── ui/
│       └── pages/
│           ├── LandingPage.jsx       # Hero, features, FAQ accordion
│           ├── JourneyPage.jsx       # 6-step voter journey
│           ├── TimelinePage.jsx      # Election phase timeline
│           ├── EligibilityPage.jsx   # Eligibility categories
│           └── ChatPage.jsx          # AI chatbot with language selector
│
└── election-backend/
    ├── .env.example
    └── src/
        ├── server.js                 # Express app, CORS, rate limits, static serving
        ├── routes/
        │   ├── chat.js               # POST /api/chat
        │   ├── eligibility.js        # GET  /api/eligibility
        │   ├── journey.js            # GET  /api/journey[/:step]
        │   └── timeline.js           # GET  /api/timeline
        ├── services/
        │   ├── gemini.js             # Gemini Flash wrapper + system prompt
        │   └── router.js             # Keyword-based query classifier + data slice selector
        ├── middleware/
        │   └── validate.js           # Request validation middleware
        └── data/
            ├── eligibility.json
            ├── journey.json
            ├── timeline.json
            └── faq.json
```

---

## Local Setup

### Prerequisites

- Node.js 20+
- A [Google Gemini API key](https://ai.google.dev/)

### 1. Clone the repository

```bash
git clone https://github.com/omkorade23/VoteGuide-AI.git
cd VoteGuide-AI
```

### 2. Configure environment variables

```bash
cp election-backend/.env.example election-backend/.env
```

Open `election-backend/.env` and fill in the values:

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3000
ALLOWED_ORIGIN=http://localhost:5173
NODE_ENV=development
```

### 3. Install and start the backend

```bash
cd election-backend
npm install
npm run dev
```

The backend starts at `http://localhost:3000`.

### 4. Install and start the frontend

In a new terminal:

```bash
cd election-frontend
npm install
npm run dev
```

The frontend starts at `http://localhost:5173`. API calls are proxied to `localhost:3000` via Vite's dev proxy.

---

## Environment Variables

All variables are consumed by the backend. There are no frontend `.env` files required for local development (Vite's proxy handles API routing).

| Variable | Required | Default | Description |
|---|---|---|---|
| `GEMINI_API_KEY` | Yes | — | Google Gemini API key |
| `PORT` | No | `8080` | Port the Express server listens on |
| `ALLOWED_ORIGIN` | No | `http://localhost:5173` | CORS allowed origin |
| `NODE_ENV` | No | `development` | `production` enables static file serving |

---

## API Endpoints

Base URL (production): your Cloud Run service URL  
Base URL (local): `http://localhost:3000`

### Health

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health check |

### Chat (AI)

| Method | Endpoint | Body | Description |
|---|---|---|---|
| `POST` | `/api/chat` | `{ query: string, language?: "english"\|"hindi"\|"tamil"\|"marathi" }` | Returns a Gemini-generated answer grounded in ECI data |

Rate limit: 10 requests per minute per IP.

### Eligibility

| Method | Endpoint | Query Params | Description |
|---|---|---|---|
| `GET` | `/api/eligibility` | `?topic=all\|citizenship\|age\|residence\|disqualification\|documents\|special_cases` | Returns eligibility data filtered by topic |

### Voter Journey

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/journey` | All 6 journey steps |
| `GET` | `/api/journey/:step` | Single step (1–6) |

### Election Timeline

| Method | Endpoint | Query Params | Description |
|---|---|---|---|
| `GET` | `/api/timeline` | `?phase=all\|1\|2\|3\|4\|5\|6` | Returns timeline phases |

### Response shape (all endpoints)

```json
{
  "success": true,
  "data": [...],
  "meta": {
    "timestamp": "ISO 8601",
    "source": "Election Commission of India"
  }
}
```

---

## Deployment (Google Cloud Run)

The root `Dockerfile` uses a two-stage build:

1. **Stage 1 — Frontend builder**: Installs deps and runs `vite build`, producing `election-frontend/dist/`.
2. **Stage 2 — Production server**: Installs backend production deps only, copies the `dist/` from Stage 1, and starts Express. With `NODE_ENV=production`, Express serves the Vite build as static files and falls back to `index.html` for all non-API routes.

### Build and push

```bash
# Authenticate
gcloud auth login
gcloud config set project YOUR_GCP_PROJECT_ID

# Build and push the container
gcloud builds submit --tag gcr.io/YOUR_GCP_PROJECT_ID/votepath-ai .

# Deploy to Cloud Run
gcloud run deploy votepath-ai \
  --image gcr.io/YOUR_GCP_PROJECT_ID/votepath-ai \
  --platform managed \
  --region asia-south1 \
  --allow-unauthenticated \
  --set-env-vars GEMINI_API_KEY=your_key_here,NODE_ENV=production,ALLOWED_ORIGIN=https://your-service-url.run.app
```

The service listens on port `8080` (Cloud Run default, set in `server.js`).

---

## Future Improvements

- **Voter roll search**: Integrate with `electoralsearch.eci.gov.in` API (when available) to let users verify their registration by name or EPIC number.
- **Polling booth locator**: Surface booth address data using ECI's constituency-level datasets.
- **Streaming responses**: Replace single-shot Gemini calls with streaming (`generateContentStream`) for a faster perceived response time on the chat page.
- **Conversation context**: Maintain a short message history in the chat route to support multi-turn dialogue.
- **Additional languages**: Extend the language selector to Bengali, Telugu, and Kannada.
- **PWA support**: Add a service worker and manifest so the app works offline for pre-cached static content.

---

## Author

**Om Korade**  
GitHub: [@omkorade23](https://github.com/omkorade23)

---

## Data Sources

All election content is derived from official [Election Commission of India](https://eci.gov.in) publications and guidelines. VotePath AI does not express opinions on political parties, candidates, or election outcomes.

For authoritative information, always refer to **[eci.gov.in](https://eci.gov.in)** or call the **Voter Helpline: 1950**.
