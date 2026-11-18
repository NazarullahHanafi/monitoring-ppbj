# SP form lookup reliability - 18 November 2026

This release fixes number-check races in the add/edit SP forms and makes number suggestions and PPBJ checks recover from failed or stalled reads. It targets these form interactions; it does not claim a site-wide response-time improvement or absence of all bugs.

## Behavior

Each number input has its own debounce and cancellation state. A response can update the number/status only while its number, document date, edited record and request generation are still current. Clearing an input, closing a dialog, hiding the page or starting a newer check cancels obsolete reads. Number hints remain visible until the input changes. Suggestions use actual buttons that only fill the number, never submit the form, and old suggestions cannot fill a number for a different document date.

Read deadlines cover the response body as well as the initial connection. Failed number/suggestion/PPBJ checks offer a visible **Cek ulang** action. Session expiry, rate limits, malformed responses and network errors receive readable feedback. PPBJ Select2 reads also have a deadline. These changes add no polling or background save requests.

Server messages and stored number suggestions are escaped or inserted using textContent. PPBJ cancellation/linked messages cannot inject HTML. The helper endpoints reject array-valued, overlong and malformed inputs before executing controller SQL. Valid older document years remain supported; save-time date confirmation behavior is unchanged. Helper JSON is private and no-store; existing authentication, department and read-only guards remain in place.

PPBJ searches retain the term `0` and treat `%`, `_`, `!` and backslashes literally. Options remain capped at 50 and related SPPH vendor metadata is fetched in a batch. Packages over 20 selections return validation feedback instead of silently dropping the excess. The existing SP mutation cache version now invalidates number-availability hints after controller create/update/archive/restore/delete actions. Save-time uniqueness checks remain authoritative; external database changes can still require the existing 30-second hint expiry.

SPPH item auto-fill reads the available column list once when its one-hour schema cache is cold, rather than once for each of five optional price columns. The existing price-column preference, quantity/subtotal calculation and delivery date formatting are preserved. Production candidate measurements reduce that cold PPBJ/SPPH-item path from eight SQL reads to four; warm checks use three when an SPPH and its items are present. No schema migration is needed.

## Verification and rollout

Final checks pass **939 PHP tests / 10,558 assertions**, **497 JavaScript tests**, the desktop/light and mobile/dark browser scenarios, explicit-file Pint, JavaScript syntax checks and git whitespace checks.

Feature coverage checks malformed input before SQL, literal search, bounded/batched options, package ordering/totals, optional price columns and subtotals, privacy headers, cache reuse plus invalidation after a real test save, valid historical dates, Oracle behavior and access guards. JavaScript tests exercise stale/uncooperative responses, independent inputs, hung JSON bodies, deadlines, retries, safe DOM rendering and cancellation.

The actual rendered SP page, SP script, jQuery and Select2 pass desktop/light and mobile/dark browser checks for these interactions, without native dialogs, page errors or procurement writes. The fixture uses an isolated in-memory SQLite database; browser APIs use synthetic responses.

Production verification uses an unsaved synthetic identity, array cache/session, blocked outbound HTTP and a read-only database transaction. Invalid inputs execute zero controller SQL. Options use at most two SQL reads, warm number checks use zero, and Oracle suggestions use zero. The probe never saves a real account, SP or procurement record.

Rollout checks the exact commit/file list, backs up changed application files/cache files and the published SP asset, verifies the staged controller, applies a fast-forward update and atomically publishes the script. The deployed probe, public asset SHA256, health endpoints and unauthenticated access rejection are checked again. Routes, views, configuration caches and schema do not change. Existing unrelated local files are excluded from the commit.
