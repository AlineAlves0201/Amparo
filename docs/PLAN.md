# Implementation milestones

1. Foundation and customer prototype: current delivery. Next.js, responsive reusable UI, eight categories, fictional immediate in-person flow, safety warnings, simulated lifecycle and local history. Verify build, domain tests and available browser checks. Authentication is not part of this delivery.
2. Supabase Auth, migrations, seed, RLS, role authorization and isolated database policy tests. No self-service admin elevation.
3. Assistant applications, identity status, admin approval, approved skills and area coverage, heartbeat-backed online availability.
4. Immediate requests, database dispatch rounds and acceptance RPC, deadline outbox worker, atomic matching and real PostgreSQL concurrency tests. Review MATCHING.md first.
5. Authorized lifecycle, arrival verification, customer completion and review, private Realtime refresh with reconnect behavior.
6. Transactional scheduled reservations, shared occupancy constraints, explicit revocable family permission scopes.
7. Administration, incident/dispute workflow, account suspension, private aggregate analytics and broad end-to-end/accessibility coverage.
8. Deployment preparation: environment checks, secure headers, dependency and RLS audit, backup/recovery and worker monitoring, demo seed and operations runbook. Public release requires explicit approval.

## Milestone 1 manual test

Run the app using README instructions. Choose a category, edit the fictional address, review the total and confirm. Observe simulated search and Ana's fictional profile. Try replacement to see the next eligible demo profile. Advance the simulated service; enter code 4826 at arrival, confirm completion and submit a star rating. Open Meus atendimentos and reload to check browser-local history. Test a sensitive category and verify safety acknowledgment is required. Navigate entirely by keyboard and at narrow viewport/200% zoom.

## Outstanding limitations

No Supabase project or credentials, authentication, real verification, live dispatch, durable server state, scheduled/remote service, trusted family access, admin console, incident submission, real analytics, payment processing or deployment. The demo does not broadcast offers, run a 10-second acceptance race or enforce authorization. PWA is a manifest foundation without offline support. Formal WCAG conformance has not been established. Browser history storage is limited to demonstration summaries; clear site storage to reset it.
