# Proposed PostgreSQL schema

Design only; do not treat this document as deployed migrations. Milestone 2 will add executable migrations, seed records, RLS policies and database tests against Supabase. Use UUID primary keys, `timestamptz` server defaults, explicit foreign keys and indexes on every frequently joined foreign key. Money is integer BRL cents with nonnegative checks. Status fields use enums or constrained lookup values.

| Table                       | Key fields and constraints                                                                                                                                                    |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| users                       | id references auth.users, role, active/suspended status; no self-editable role                                                                                                |
| customer_profiles           | user_id unique FK, display_name, accessibility preferences                                                                                                                    |
| assistant_profiles          | user_id unique FK, verification and approval status, approved_by FK, rating aggregate; no customer addresses                                                                  |
| assistant_skills            | assistant_id + category_id unique, approval status, sensitive authorization, expires_at                                                                                       |
| assistant_presence          | assistant_id PK, online flag, heartbeat_at, approximate location freshness                                                                                                    |
| assistant_coverage_areas    | assistant_id + area_id unique, approved operational area                                                                                                                      |
| service_categories          | unique slug, pt-BR label, description, enabled and sensitive flags                                                                                                            |
| pricing_rules               | category_id FK, effective time range, duration_minutes > 0, price_cents >= 0, commission_bps between 0 and 10000; prevent overlapping effective rules                         |
| service_requests            | customer_id, requested_by, category_id, area_id, state, mode, price/duration/commission snapshot; unique customer_id + idempotency_key                                        |
| request_addresses           | request_id PK, full address; separate restricted table                                                                                                                        |
| dispatch_rounds             | request_id + round_number unique, opens_at, deadline_at > opens_at, finalized_at                                                                                              |
| dispatch_offers             | round_id + assistant_id unique, offered/declined/expired/filled state; approximate area only                                                                                  |
| dispatch_acceptances        | offer_id unique FK, assistant_id FK, accepted_at server timestamp                                                                                                             |
| assignments                 | request_id unique FK, assistant_id FK, lifecycle timestamps; exclusion on assistant and active reserved tstzrange using btree_gist                                            |
| assistant_occupancies       | assistant_id, request_id unique, half-open time range; exclusion on assistant_id with = and time range with && for active reservations, shared by bookings and immediate work |
| bookings                    | request_id unique FK, reserved range, status; transactional occupancy reservation prevents overlaps                                                                           |
| arrival_challenges          | request_id unique, salted code hash, expiry, attempt count and consumed_at; never plaintext in events                                                                         |
| service_events              | request_id, actor_id, event_type, previous/new state, redacted payload, occurred_at; append only, deny update/delete                                                          |
| reviews                     | assignment_id + customer_id unique, stars between 1 and 5, optional bounded comment; only completed own services                                                              |
| trusted_contacts            | customer_id + family_user_id unique, explicit accepted/revoked timestamps                                                                                                     |
| trusted_contact_permissions | contact_id + scope unique; request_service/view_progress scopes, expiry and revocation                                                                                        |
| incident_reports            | reporter_id, request_id, category, bounded description, status; restricted support access                                                                                     |
| dispatch_exclusions         | request_id + assistant_id unique, reason                                                                                                                                      |
| outbox_jobs                 | unique deduplication_key, available_at, leased_until, attempt count, status, minimal payload                                                                                  |
| admin_events                | actor_id, action, target, redacted immutable change record                                                                                                                    |

## RLS policy design

Enable and force RLS on application tables. Anonymous users may read only enabled catalog and public prices. Customers read/write their own permitted records; family reads/mutations require current explicit scope, contact identity and expiry checks on each operation. Assistants see their own profile, approvals, offers and assigned requests. Full address access requires a confirmed current assignment, and ends when access is no longer operationally required. Do not expose private fields by broad request SELECT policies. Admin access uses a protected authorization helper and creates audit events. Restrict security-definer RPC search_path, grant execute narrowly, and revoke public access. Prevent direct mutation of matching/lifecycle/role/approval/pricing fields. Worker access is server-only.

## Lifecycle proposal

created → searching → offered → assigned → on_the_way → arrived → in_progress → completed. Dispatch worker controls searching/offered/assigned/no_provider_available/expired. Assigned assistant controls on_the_way and arrival request; arrival RPC requires the service-specific challenge and rate limiting. Customer confirms completion; disputed and cancellation transitions have explicit state-specific policy. Customer may cancel pre-completion, assistant may relinquish according to policy, admin resolves exceptions. All transitions lock request state and append an event. Final authorization matrix and cancellation/timeout rules must be specified and tested before Milestone 5 production implementation.
