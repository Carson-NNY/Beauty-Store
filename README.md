# Facial

Mobile-first single-store appointment web app foundation.

This codebase sets up a public customer experience with database-backed services, real appointment booking, and email notifications. SMS, payment, AI, authentication, and full admin management are intentionally deferred.

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
  db/             Server-side Prisma client singleton
  validations/     Zod schemas
modules/
  appointments/   Appointment booking use case and repository
  notifications/  Email provider abstraction
  services/       Service catalog domain/application/infrastructure
prisma/
  schema.prisma    Supabase Postgres schema
  seed.mjs         Initial service catalog seed data
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

   For email notifications, also set:

   ```bash
   EMAIL_PROVIDER="brevo"
   BREVO_API_KEY="..."
   EMAIL_FROM="Mei Lan Wellness Spa <appointments@example.com>"
   EMAIL_REPLY_TO="appointments@example.com"
   OWNER_EMAIL="owner@example.com"
   BUSINESS_NAME="Mei Lan Wellness Spa"
   BUSINESS_ADDRESS="1288 Willow Street, Suite 6, Richmond, BC"
   BUSINESS_PHONE="9293911865"
   ```

   Create a Brevo API key and authenticate the sender address or domain used by `EMAIL_FROM` in Brevo. The sender supports either `sender@example.com` or `Business Name <sender@example.com>`. `EMAIL_REPLY_TO` is optional.

   Leave `BREVO_API_KEY` empty in local development to log sanitized email messages to the server console. In Vercel, add the same email variables to the relevant project environments and redeploy after changing them.

4. Generate Prisma client:

   ```bash
   npm run prisma:generate
   ```

5. Create/update the database schema and seed services:

   ```bash
   npm run prisma:migrate
   npm run db:seed
   ```

6. Run the dev server:

   ```bash
   npm run dev
   ```

7. Open `http://localhost:3000`.

## Routes

- `/` public landing page
- `/services` public database-backed services
- `/book` real appointment booking form
- `/contact` public store details placeholder
- `/admin` admin overview
- `/admin/appointments` admin appointment queue placeholder
- `/admin/services` admin service catalog placeholder
- `/admin/settings` admin settings placeholder

## Database

`prisma/schema.prisma` defines the first database-backed foundation:

- `Service`
- `Customer`
- `Appointment`
- `AppointmentStatus`

Services are read through `modules/services/application/service-queries.ts`; UI components do not query Prisma directly.
Appointments are created through `modules/appointments/application/create-appointment.ts`, which validates input, loads the selected service, checks booked-time conflicts, creates/reuses a customer by phone number, creates a booked appointment, and triggers email notifications.

Run migrations and seed locally with:

```bash
npm run prisma:migrate
npm run db:seed
```

## Current Intentional Gaps

- No authentication or authorization yet
- No SMS notifications
- No payment processing
- No AI features
- No referral rewards
- No full admin appointment management yet

These are intentionally deferred so the project starts with a small, understandable foundation.
