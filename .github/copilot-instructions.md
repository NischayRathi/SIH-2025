# Copilot Instructions for SIH-Prakriti-main

## Project Overview
- This is a Next.js app using the App Router, TypeScript, and custom API routes.
- Main features: authentication (NextAuth), dashboard, chat, health tracker, appointments, medicines, nearby centers, and data visualization (charts, maps).

## Key Architecture & Patterns
- **Pages & Routing**: All routes are under `app/`. Top-level pages (e.g., `app/page.tsx`) and nested routes (e.g., `app/dashboard/home/page.tsx`).
- **API Routes**: Custom API endpoints in `app/api/`, e.g., `app/api/auth/[...nextauth]/route.ts` for authentication, `app/api/chat/route.ts` for chat.
- **Components**: Shared React components in `app/components/` (e.g., `Charts.tsx`, `LeafletMap.tsx`, `Sidebar.tsx`).
- **Dashboard**: Client dashboard logic in `app/dashboard/` with subfolders for each feature.
- **Auth**: Uses NextAuth, with logic in `lib/auth.ts` and user model in `models/User.ts`.
- **Database**: MongoDB connection logic in `lib/mongodb.ts`.

## Developer Workflows
- **Start Dev Server**: `npm run dev` (default port 3000)
- **Build**: `npm run build`
- **Lint**: `npm run lint` (uses ESLint config in `eslint.config.mjs`)
- **Type Checking**: `tsc` (config in `tsconfig.json`)
- **Hot Reload**: Editing files in `app/` auto-updates the browser.

## Project-Specific Conventions
- **File Naming**: Use `page.tsx` for route entry points, `route.ts` for API endpoints.
- **Component Structure**: Place shared UI in `app/components/`, keep feature logic in respective dashboard subfolders.
- **Auth Flow**: All authentication logic is handled via NextAuth in `app/api/auth/[...nextauth]/route.ts` and `lib/auth.ts`.
- **Models**: User schema is defined in `models/User.ts`.
- **Styling**: Global styles in `app/globals.css`, custom styles per component/page as needed.

## Integration Points
- **NextAuth**: Handles user sessions and authentication.
- **MongoDB**: Used for persistent data (users, etc.), connection via `lib/mongodb.ts`.
- **Leaflet**: For map visualizations in `LeafletMap.tsx`.
- **Charts**: Data visualization in `Charts.tsx`.

## Examples
- To add a new dashboard feature, create a folder in `app/dashboard/` and add a `page.tsx`.
- To add a new API route, create a folder in `app/api/` and add a `route.ts`.
- To use MongoDB, import from `lib/mongodb.ts`.

## References
- See `README.md` for Next.js basics and deployment.
- Key files: `app/page.tsx`, `app/api/auth/[...nextauth]/route.ts`, `lib/auth.ts`, `models/User.ts`, `app/components/Sidebar.tsx`, `app/dashboard/home/page.tsx`.

---
For questions or unclear conventions, ask for clarification or review the referenced files above.