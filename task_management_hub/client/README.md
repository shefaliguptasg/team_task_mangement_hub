# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.
## Getting Started
- Install dependencies: `npm install`
- Start the development server: `npm run dev`
- Run unit tests: `npm test`
- Build for production: `npm run build`

## Architecture
This app is built with React, TypeScript, Vite, Tailwind CSS, and Redux Toolkit.
- `src/pages/Dashboard.tsx` is the main page that connects state, search, and task actions.
- `src/features/tasks/taskSlice.ts` contains async task logic and Redux state updates.
- `src/features/tasks/taskSelector.ts` exposes derived task data like filtered results.
- `src/componenets/TaskForm.tsx`, `SearchBar.tsx`, and `TaskList.tsx` are reusable UI components.
- Tailwind CSS is configured via `tailwind.config.js` and imported in `src/index.css`.

Currently, the app uses debounced search input and Redux to keep UI state and task state separate for clearer data flow.


