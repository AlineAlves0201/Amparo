# Architecture

## Current implementation

Next.js App Router, React, TypeScript, Tailwind CSS v4 and Zod. `app/page.tsx` owns the bounded demonstration state machine; `components/ui.tsx` provides shared button and safety primitives; `lib/demo.ts` defines fictional categories, validation, illustrative Bayesian rating selection and finite lifecycle progression. Vitest covers domain examples and Playwright defines the complete customer journey. Browser-local completed history contains only category, illustrative price and rating. No Supabase connection is claimed.

## Target architecture

Split modules into identity, catalog/pricing, dispatch, services, bookings, family authorization, incidents, administration and analytics. Route handlers/server actions validate Zod input, authenticate with Supabase Auth, authorize the actor against database state, and call narrowly scoped PostgreSQL RPC transactions. Supabase PostgreSQL is authoritative. Use Supabase Realtime only for notification and refresh; reconnecting clients fetch canonical state. Never trust client role, price, eligibility, time or lifecycle fields.

Use `@supabase/ssr` request-scoped server clients with verified user identity. Customer/assistant operations use their JWT under RLS. Service credentials remain server-only and are limited to worker operations. Administrative privileges come from protected database records, never editable user metadata. Mutations require CSRF/origin controls, rate limits and idempotency keys. Logs must redact addresses, tokens and health/financial details.

## Deployment and PWA

Standard Next.js Node runtime supports Vercel deployment. Add security headers, environment validation and dependency scanning before release. The current manifest and SVG icon provide a PWA foundation; installation across browsers requires additional raster icons and browser checks. Offline operation, service worker, push delivery and background synchronization are deferred. Sensitive authenticated pages must never be cached offline.

## Failure handling

Production request creation and dispatch enqueue must commit atomically through an outbox. Queue delivery is at least once; operations are idempotent. Clients display canonical failures, no-provider outcomes and retry/schedule alternatives. Worker monitoring alerts on overdue windows and failed notifications. No frontend timeout may assign a provider.
