# Portfolio mapping reliability - 16 November 2026

The SP portfolio-to-PR-field popup could lose drafts during redraws, display late search errors over newer results, remain busy indefinitely on a stalled response, and reload unrelated signer/title lists. Unchanged saves rewrote the last editor and produced audit records unnecessarily.

## Reads and server work

The popup now opens with two parallel requests for an editor: its mappings/portfolio suggestions and one active PR-field lookup. Previously it requested the mapping list plus all three print-master lists. A viewer now makes only the mapping request. Field searches run explicitly on submit, return at most 50 options, and retain the current selection; editing a field beyond the first 50 requests its selected ID. Filtering portfolio suggestions remains local without extra requests.

The populated mapping list uses three projected SELECTs (count, 12-row page, related fields). Optional portfolio suggestions retain the existing four separate queries capped at 251 values each and at most 500 merged suggestions. No text UNION or new cache is introduced, preserving legacy mixed-collation compatibility and freshness. Literal searches include percent, underscore, exclamation mark, backslash and zero. Page values are bounded; malformed filters fail before SQL. IDs too large for PHP return 404 instead of a type error.

Saving reads the selected PR field once under a lock, verifies that it is still an active `bidang_pr`, then checks the mapping version and canonical portfolio uniqueness. It reuses that projected field for the response. The former separate existence query and full-field reload are removed. No-op saves preserve timestamps, last editor, version and audit history without database writes. Actual mutations and audit records remain in one transaction. Canonically blank portfolio names are rejected with a field error; duplicate races return a private 409 response. Existing route budgets, auth, Umum department and read-only guards remain.

## Interaction behavior

Independent abortable reads ignore stale success and failure responses. Captured drafts and focus survive redraws, map searches and field lookups. A shared dialog promise prevents duplicate popups. One save owns the buttons and return action; repeated submissions cannot issue another write while it is pending. Requests retain CSRF and same-origin credentials, validate JSON/status/schema, and hide server diagnostics. A 30-second deadline includes response body parsing, and writes never retry automatically.

Failed saves retain editable drafts. A confirmed save followed by a failed list refresh explicitly says the mapping was saved and asks to refresh the list rather than submit again. Live page shrinkage triggers at most one clamped read. Closing the popup or leaving the page cancels owned requests and ignores their late results. A subsequent opening warns about an interrupted write. The parent SP preview also invalidates its pending generation on pagehide so closing a mapping popup during navigation cannot reopen the preview.

No signing rules, historical Word documents, mapping-key format, migrations or configuration are changed. Fields that are unavailable are labelled rather than silently replaced with another field. The server continues to require a valid active PR field before accepting a save.

## Verification

Passed **892 PHP tests / 10,135 assertions**, **440 JavaScript tests**, explicit-file Pint and desktop/mobile browser checks. The final focused JavaScript run also passed **23 tests** after adding the missing-CSRF assertion.

Nine new feature regressions cover bounded/projection reads, literal search, malformed inputs and oversized IDs, no-op behavior, field validation, duplicate races, audit rollback and access guards. JavaScript regressions cover read races, draft retention, selected IDs outside the first field page, duplicates, response-body timeouts, missing CSRF, invalid responses, page lifecycle and parent preview cancellation. Browser tests use actual SweetAlert/FormUX/print CSS on desktop and mobile, checking real controls and network payloads.

Production candidate and deployed verification run inside read-only database transactions with synthetic identity and isolated array cache. They check live query bounds, literal matching, version compatibility, DTO privacy, malformed-input rejection and route guards, without saving mappings or changing real accounts/documents. Deployment creates a private backup, publishes both JavaScript assets, and verifies public asset hashes and health/access responses. Existing route/view/config caches are preserved because these files do not change.
