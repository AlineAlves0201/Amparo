# Proposed simultaneous matching and concurrency strategy

Status: design for review before implementing the real matching engine. The browser demonstration does not implement this algorithm and its 2.5-second animation is unrelated to the production 10-second window.

## Creation and broadcast

1. Authenticate customer or explicitly authorized family actor. Validate category, address/area, sensitive-service consent and active price rule. Snapshot price, duration and commission using integer minor units.
2. In one PostgreSQL transaction, insert the request with a unique `(customer_id, idempotency_key)`, create dispatch round 1 with database `opens_at` and `deadline_at` (initially 10 seconds), materialize offers for all eligible assistants, append immutable events, and insert a unique outbox deadline job. Eligibility includes active approved identity/account, category-approved skill, online unexpired heartbeat, no occupied service interval, coverage and sensitive authorization.
3. Publish offer notifications through the outbox/Realtime to each recipient. Reveal category, compensation, approximate area and duration only. Store full addresses separately under assignment-scoped RLS. Offer projections must not join private address fields.

## Acceptance

Use a restricted RPC. Lock the request/round row first, validate authenticated offer ownership and open deadline using `clock_timestamp()` after lock acquisition, then insert acceptance with database timestamp and unique offer constraint. Client timestamps are ignored. Decline is terminal for that offer. Repeated identical acceptances return the persisted result. Accepting does not reserve an assistant and never guarantees assignment. A deadline comparison excludes timestamps at or after the deadline.

## Finalization transaction

A durable scheduled worker calls a restricted idempotent RPC after the deadline. Use an outbox consumer with leased jobs, bounded exponential retries, dead-letter alerts and a periodic catch-up sweep. Supabase Cron may run the catch-up sweep; the 10-second deadline needs an actual delayed job mechanism with measured latency, not a minute-resolution cron guarantee.

Lock the request row; return existing result if already finalized or assigned. Reject early invocation. Lock affected assistant occupancy rows in sorted UUID order to avoid deadlocks. Re-evaluate all eligibility at finalization, including suspension, fresh presence, approved skill, coverage and scheduling conflicts. Locking and rechecks must share the same transaction with assignment.

Rank valid acceptances using Bayesian score `(rating_sum + prior_mean * prior_weight) / (review_count + prior_weight)`, initially prior mean 4.5 and weight 20. Read confirmed reviews from authoritative aggregates. Descending adjusted score, then ascending reliable ETA only when the compared candidates have comparable fresh routing data; otherwise skip ETA for the round; then ascending UUID. Snapshot ranking inputs and policy version in audit events. Do not use raw stars or earliest frontend click as the winner.

Attempt insertion of one assignment, acquire the assistant occupancy interval, transition the request to assigned, close all offers, append audit events and enqueue winner/customer/nonwinner notifications atomically. Unique request assignment and exclusion constraints remain the final guard against duplicate jobs. On an occupancy conflict, rollback to a savepoint, recheck and try the next eligible accepted candidate. All transactions acquire locks in the same order. Competing finalizers return the one persisted result. Deterministic candidate order does not promise the same result if another request occupies an assistant concurrently.

If no valid acceptance remains, persist no_provider_available and notify the customer with retry and scheduling alternatives. A retry is a new uniquely numbered round; never reopen expired offers. A declined assigned assistant is released in a transaction, recorded in an exclusion table for the request, and dispatch starts a new round. Cancellation is serialized on the request lock. Disconnects are handled by heartbeat expiry and canonical-state refresh. Scheduled intervals must participate in the same occupancy mechanism as immediate work.

## Required database integration tests (Milestone 4)

Run against real isolated PostgreSQL with parallel independent connections, not an in-memory mock: dozens of simultaneous acceptances; duplicate acceptance retries; acceptance/deadline races; repeated finalizers; two requests competing for the same assistant; cancellation versus finalization; suspension/offline/skill removal during the window; booking overlap; worker crash after commit; no-provider and reassignment exclusion; unauthorized actor and private-address reads. Assert exactly one winner per request, no overlap per assistant, correct authoritative timestamps, immutable events and notification outbox idempotency. These tests have not been implemented or run in Milestone 1.
