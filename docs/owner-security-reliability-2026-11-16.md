# Owner security center reliability — 16 November 2026

The security center now counts all active registry entries independently of the visible page. Previously the summary silently stopped at the latest 100 devices. Pages contain at most 50 devices, use a deterministic activity/ID order, and put the current device first. The global count also drives the bulk-action button, including on an empty or later page.

## Read performance and privacy

- Four data SELECTs: device totals, one device page, 30 recent honeypot entries, and combined honeypot totals. Table existence is checked once per table rather than repeated by the security score.
- The device page excludes encrypted session IDs. Honeypot rows exclude unused method/status/agent payloads.
- Page inputs are validated before security queries. HTML carries `Cache-Control: private, no-store`; no cross-user dashboard cache is introduced.
- Today’s probe count and distinct sources over the existing 30-day boundary retain their original meaning.

## Revocation behavior

- The decrypted ID must match the registry HMAC before any session handler is called. The current owner session remains protected.
- Cookie, null, and request-local array handlers cannot claim remote revocation. The security score also checks that a server-side session driver is configured.
- Removal is verified by reading the handler afterward. An already-expired key can be cleaned up safely, while a false return with surviving data, a misleading true return, or a storage exception preserves the registry entry and produces an explicit warning/error.
- Bulk processing selects at most 101 rows and processes at most 100. The extra row only signals that another batch is needed. Newly created devices outside that selection are not swept into an ongoing action.
- Confirmed entries are removed with one bounded DELETE. Registry cleanup and audit insertion share a short database transaction after remote storage calls finish. Audit failure rolls back registry cleanup, leaving entries available for inspection/retry; it cannot undo a session already removed from Redis.
- Bulk audit records use model ID `0` to identify an aggregate action. The previous `null` value violated the non-null database schema. Counts for completed, failed, and remaining batches are recorded without storing session credentials.
- Individual/bulk outcomes distinguish verified completion, partial failure, and additional batches. There is no automatic retry.

## Controls and access

The page uses the shared accessible confirmation dialog instead of browser `confirm()`. One operation owns the controls across all revocation forms, including while confirmation is open and while native navigation is pending. CSRF and the DELETE override remain in normal form encoding. Cancel/back/page lifecycle releases controls and dismisses only the dialog owned by this page.

Existing authentication, owner identity/role/department checks, and read-only guards remain. Separate limits prevent list refreshes from consuming revocation capacity: 60 reads, 20 individual actions, and 5 batch actions per minute per authenticated owner.

## Verification

Full regression suite: **848 PHP tests / 9,456 assertions** and **416 JavaScript tests** passed. The desktop/mobile browser regressions and explicit-file Pint checks also passed.

Feature regressions cover global totals across 125 active devices, stable pagination, current-device ordering, query bounds, private responses, date aggregation, malformed pages, real database-session removal, expired keys, storage failures, mismatched ciphertext, unsupported handlers, partial batches, audit rollback, owner access, read-only mode, and independent action limits.

JavaScript regressions cover cancellation, cross-form duplicate prevention, native submit failures, and stale confirmations after navigation. Browser regressions use the actual Blade forms, built application CSS, and shared dialog on desktop and mobile; they verify CSRF/DELETE encoding and one native POST despite repeated actions.

Production verification runs in a read-only database transaction with an isolated array cache. It compares live aggregates and query limits, renders the candidate page, validates route guards, and exercises revocation only against an isolated synthetic handler. No real user session is revoked during deployment. A private backup precedes deployment; the public asset hash, route/view caches, health endpoints, and unauthenticated access guard are checked afterward.

Registry activity is telemetry refreshed periodically, not proof that a person is actively using the browser. Storage verification confirms removal at that instant; an already-running application request or a later successful login can create session state again. This change does not rotate users’ remember-me credentials or claim a global account lockout.
