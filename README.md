# GameHub Dashboard

A real-time gaming dashboard built with Angular 21, Express, and MongoDB.

**Live demo:** https://warm-raindrop-f3148f.netlify.app/dashboard

---

## Tech Stack

- **Frontend:** Angular 21 (standalone, signals, Chart.js)
- **Backend:** Express + TypeScript + Mongoose
- **Database:** MongoDB Atlas
- **Deployment:** Netlify (frontend) · Render (backend)

---

## Running Locally

### Backend

```bash
cd server
npm install
npm run dev
```

Server runs on `http://localhost:3000`. Requires a `.env` file in the `server/` directory:

```
PORT=3000
MONGO_URI=your_mongodb_atlas_connection_string
```

To seed the database with sample data:

```bash
npm run seed
```

### Frontend

```bash
# from the project root
npm install
npm start
```

App runs on `http://localhost:4200`. By default it points to `http://localhost:3000/api` for the backend.

---

## Building for Production

```bash
npm run build
```

Output is in `dist/game-dashboard/browser/`.

---

## Deployment

- **Frontend** is deployed to Netlify via `netlify.toml` — connects to the `main` branch and auto-deploys on push.
- **Backend** is deployed to Render via `server/render.yaml` — set `MONGO_URI` as an environment variable in the Render dashboard.
