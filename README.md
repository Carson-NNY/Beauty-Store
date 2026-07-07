# Facial

Mobile-first single-store appointment web app foundation.

This initial codebase sets up the structure for a public customer experience and an admin area without implementing full booking logic, SMS, payment, or AI integrations.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui-style local components
- Prisma
- Supabase Postgres
- Zod
- React Hook Form

## Project Structure

```text
app/
  (public)/        Public customer routes
  admin/           Admin routes
components/
  appointments/    Appointment UI placeholders
  layout/          Shared public/admin shells
  ui/              shadcn/ui-style primitives
lib/
  validations/     Zod schemas
  prisma.ts        Prisma client singleton
prisma/
  schema.prisma    Supabase Postgres schema draft
```

## Local Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy environment variables:

   ```bash
   cp .env.example .env
   ```

3. Add Supabase Postgres connection strings to `.env`:

   ```bash
   DATABASE_URL="postgresql://..."
   DIRECT_URL="postgresql://..."
   ```

4. Generate Prisma client:

   ```bash
   npm run prisma:generate
   ```

5. Run the dev server:

   ```bash
   npm run dev
   ```

6. Open `http://localhost:3000`.

## Routes

- `/` public landing page
- `/services` public service placeholders
- `/book` booking-request placeholder form
- `/contact` public store details placeholder
- `/admin` admin overview
- `/admin/appointments` admin appointment queue placeholder
- `/admin/services` admin service catalog placeholder
- `/admin/settings` admin settings placeholder

## Database

`prisma/schema.prisma` drafts the core single-store appointment model:

- `Store`
- `Service`
- `StaffMember`
- `Customer`
- `Appointment`
- `AppointmentStatus`

Run migrations only after the schema is reviewed:

```bash
npm run prisma:migrate
```

## Current Intentional Gaps

- No full booking workflow
- No appointment creation action
- No authentication or authorization yet
- No SMS notifications
- No payment processing
- No AI features

These are intentionally deferred so the project starts with a small, understandable foundation.
