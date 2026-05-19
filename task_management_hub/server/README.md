# Task Management Hub Server

## Start the app

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run in development mode:
   ```bash
   npm run dev
   ```
3. Build and start the production bundle:
   ```bash
   npm run build
   npm start
   ```

The server listens on `PORT` from the environment or defaults to `5000`.

## Architecture

This project follows a simple modular Express architecture:

- `src/server.ts` - application entrypoint, starts the Express server.
- `src/app.ts` - configures middleware, routes, and global handlers.
- `src/routes/task.route.ts` - defines task-related HTTP endpoints and applies per-route middleware.
- `src/controller/task.controller.ts` - handles request/response logic and delegates business operations.
- `src/services/task.service.ts` - implements task business logic and in-memory task storage.
- `src/schemas/task.schema.ts` - validates incoming task payloads with Zod.
- `src/middleware/validate.middleware.ts` - validates request bodies against schema definitions.
- `src/middleware/auth.middleware.ts` - protects delete operations with a simple header-based secret.
- `src/middleware/error.middleware.ts` - centralizes error handling and sends consistent error responses.

## Design decisions

- The app separates routing, controller logic, validation, and business services to keep each concern focused and maintainable.
- Validation is done before task creation using Zod, ensuring only valid payloads reach the service layer.
- Authorization is enforced on delete operations via a custom middleware (`x-delete-secret` header) to demonstrate route-level protection.
- In-memory storage is used for simplicity and rapid prototyping; it can be replaced with a database layer later without changing the route/controller structure.
- `helmet` and `cors` are enabled for basic security and cross-origin request support, while `morgan` logs HTTP requests during development.
