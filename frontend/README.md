# Frontend (Next.js)

This is the frontend for Persona AI, built with Next.js 14, TypeScript, and Tailwind CSS.

## Features
- Modern UI with light/dark mode
- Animated navigation and sections
- Pages for prediction, dataset, and model notebook

## Setup

1. Install dependencies:
   ```sh
   cd frontend
   npm install
   ```
2. Run the development server:
   ```sh
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure
- `src/app/` — Main app pages
- `src/components/` — UI and page components
- `public/` — Static assets (SVGs, favicon)

## Environment Variables
If your frontend needs to connect to the backend, set the backend API URL in an environment variable (e.g., `.env.local`).

## Scripts
- `npm run dev` — Start dev server
- `npm run build` — Build for production
- `npm run start` — Start production server

## License
MIT
