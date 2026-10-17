# Amparo product requirements

## Purpose

Help Brazilian older adults complete everyday digital tasks with autonomy, accessible interaction, and verified independent assistance. Customers request a standardized service; the platform dispatches it without provider browsing or bidding.

## Milestone 1 boundary

Deliver a runnable, responsive customer prototype in Brazilian Portuguese using fictional information. Support category selection, immediate in-person request, editable fictional address, full fixed price, confirmation, explicit simulated matching, assigned provider identity, replacement, arrival code, lifecycle progression, completion, rating, and browser-local history. No accounts, real verification, payments, server persistence, or operational dispatch exist in this milestone. All state except completed history resets on reload. No personal information should be entered.

## Roles and authorization requirements

- Customer: own requests, completion, reviews, consent and contact revocation.
- Family: only the individual scopes granted by an active explicit customer authorization. Revocation must take effect on every server operation.
- Assistant: apply, manage profile, approved skills and coverage, go online only when approved; respond to offers and operate assigned services.
- Administrator: approve, configure catalog and pricing, handle incidents, suspend accounts and view aggregate operations with immutable audit records.

## Initial catalog

Bills and Pix guidance; medical scheduling; smartphone and app setup; smart TV and streaming; Wi-Fi; government services; forms and documents; general digital assistance. Financial and government categories require additional eligibility and warnings. Prices in the prototype are illustrative BRL amounts, not market quotations.

## Accessibility acceptance criteria

Portuguese labels, semantic landmarks, logical keyboard order, visible focus, primary controls at least 48px, readable responsive text, explicit errors, reduced-motion support, and announcements of matching changes. Assess WCAG 2.2 AA with automated and manual keyboard, screen reader, contrast, zoom and device checks before declaring conformance.

## Operational MVP acceptance criteria

Server authentication and database authorization, consent-backed family access, verified provider workflow, transactional dispatch and booking, reliable deadline worker, authorized lifecycle transitions and arrival verification, private Realtime channels, audit trail, incidents, configurable prices and commissions, simulated payment ledger, operational metrics and automated concurrency tests. Public launch and real transactions require explicit approval and completion of security/privacy review.
