# ShiftPilot Project Spec

## Project Summary

ShiftPilot is a coverage-aware workforce scheduling platform for small teams.

It helps managers create role-based roster slots, assign employees, track staffing coverage, prevent overlapping assignments, detect availability conflicts, and manage shift swap requests with approval workflows.

## Core Design Decision

Do not model a shift as one employee's work period.

Instead:

- RosterSlot = a staffing requirement for a specific time, location, and position
- ShiftAssignment = an employee assigned to that roster slot

Example:

A cafe needs 2 baristas on Saturday from 09:00 to 13:00.

This should be represented as:

- One RosterSlot:
  - position: Barista
  - startAt: Saturday 09:00
  - endAt: Saturday 13:00
  - requiredCount: 2

- Multiple ShiftAssignments:
  - Mina assigned
  - Alex assigned

The UI should display:

Barista 09:00-13:00 — 2 / 2 staffed

## MVP 1 Scope

Build only the first working vertical slice:

1. User can register and log in
2. Manager can create a team
3. Manager can add team members
4. Manager can create positions
5. Manager can create roster slots
6. Manager can assign employees to roster slots
7. Weekly roster view shows staffing status:
   - 0 / 2 staffed
   - 1 / 2 staffed
   - 2 / 2 staffed
8. Backend prevents the same employee from being assigned to overlapping roster slots
9. Backend prevents assigning more employees than requiredCount
10. Employee can view their own assigned shifts

## MVP 2 Scope

Add after MVP 1 works:

1. Employee availability
2. Availability conflict warning
3. Employee-position qualification warning
4. Shift swap request
5. Replacement employee accept or decline
6. Manager approve or reject

## Out of Scope for MVP

Do not implement these yet:

- AI auto scheduling
- Payroll
- Award rate / labour law calculation
- Break time calculation
- Multi-branch enterprise support
- Real-time chat
- Mobile native app
- Push notifications
- Calendar sync
- CSV export

## Required Tech Stack

Frontend:
- Next.js
- React
- TypeScript
- Tailwind CSS

Backend:
- NestJS
- TypeScript
- PostgreSQL
- Prisma

DevOps:
- Docker
- GitHub Actions later

Testing:
- Jest for backend business logic
- Playwright later for end-to-end tests

## Core Business Rules

1. One RosterSlot can have multiple ShiftAssignments.
2. The same employee cannot be assigned to overlapping roster slots.
3. Assignment count must not exceed RosterSlot.requiredCount.
4. Availability conflict should be a warning, not a hard block.
5. Position mismatch should be a warning, not a hard block.
6. Shift swap requests belong to ShiftAssignment, not RosterSlot.
7. Manager approval is required before a swap changes the assigned employee.
8. Backend validation is the source of truth.

## First Demo Goal

The first demo should show this flow:

1. Manager logs in
2. Manager creates a team
3. Manager adds employees
4. Manager creates positions
5. Manager creates a roster slot:
   - Saturday 09:00-13:00
   - Position: Barista
   - Required count: 2
6. Manager assigns Mina
7. UI shows 1 / 2 staffed
8. Manager assigns Alex
9. UI shows 2 / 2 staffed
10. Manager tries to assign Mina to another overlapping slot
11. Backend rejects it with a clear error