# Repository Guidelines

## Project Structure & Module Organization
This is a Vite + React + TypeScript admin app.

- `src/app`: application wiring, DI container, use cases, route presentation.
- `src/domain`: business interfaces and domain entities (no UI/framework code).
- `src/data`: repository implementations, DTOs, API/remote integrations.
- `src/shared`: cross-cutting utilities and config used across layers.
- `public/`: static assets served as-is.
- `dist/`: build output (generated, do not edit).

Keep dependencies one-way: `app -> domain -> data/shared` where possible; avoid leaking remote DTOs into UI/domain.

## Build, Test, and Development Commands
- `npm run dev`: start local dev server with HMR.
- `npm run build`: type-check (`tsc -b`) and produce production bundle.
- `npm run lint`: run ESLint over the repository.
- `npm run preview`: serve the built app locally for final verification.

Typical workflow:
```bash
npm run lint
npm run build
npm run dev
```

## Coding Style & Naming Conventions
- TypeScript only for source (`.ts`, `.tsx`).
- Prettier config is enforced: 4-space tabs, single quotes, `printWidth: 100`, no bracket spacing.
- ESLint is configured for TS + React Hooks; resolve warnings before opening a PR.
- Naming:
- React components and files: `PascalCase` (e.g., `HouseForm.tsx`).
- Hooks/utils/modules: `camelCase` (e.g., `resfreshAuthTokens.ts`).
- Route files follow TanStack Router conventions (e.g., `edit.$houseId.tsx`, `__root.tsx`).

## Testing Guidelines
There is currently no dedicated test runner configured (no `npm test` script yet).

Until tests are added:
- Treat `npm run lint` + `npm run build` as required checks.
- For UI changes, verify affected routes manually in `npm run dev`.
- When adding tests, prefer co-located files named `*.test.ts` / `*.test.tsx`.

## Commit & Pull Request Guidelines
Current history is minimal (`init`, `global update`), so apply a clear conventional style going forward:
- Use short imperative commit subjects (e.g., `feat(houses): add create form validation`).
- Keep commits focused and atomic.
- Reference issue IDs in body when relevant.

PRs should include:
- concise change summary and rationale,
- impacted routes/modules,
- screenshots for UI changes,
- confirmation that `npm run lint` and `npm run build` pass.
