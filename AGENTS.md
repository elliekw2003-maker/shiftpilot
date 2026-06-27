# Agent Instructions for ShiftPilot

You are assisting with a portfolio project called ShiftPilot.

## Important Rules

- Do not expand the scope beyond PROJECT_SPEC.md.
- Do not add AI scheduling, payroll, chat, mobile app, or notifications unless explicitly asked.
- Keep implementation simple and production-aware.
- Prefer readable code over clever abstractions.
- Before editing files, explain the plan.
- After editing files, summarize exactly what changed.
- Do not create large features in one step.
- Do not install unnecessary dependencies.
- Do not put secrets in source code.
- Do not modify .env files with real credentials.
- Do not create fake complex architecture unless needed.

## Architecture Direction

The app should use:

- frontend/ for Next.js
- backend/ for NestJS
- PostgreSQL via Docker
- Prisma in the backend

## Domain Model Priority

The most important design decision is separating:

- RosterSlot: staffing requirement
- ShiftAssignment: actual employee assigned to the requirement

Do not collapse these into a single Shift model.

## First Implementation Priority

Start with the backend schema and basic APIs for:

- User
- Team
- TeamMember
- Position
- RosterSlot
- ShiftAssignment

Do not implement availability or shift swaps in the first implementation step.

## Validation Priority

The first important validation is:

- The same employee cannot be assigned to overlapping roster slots.
- A roster slot cannot have more assignments than requiredCount.

These validations must exist on the backend.