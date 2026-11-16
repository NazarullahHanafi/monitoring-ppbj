# Master Kontrak SP reliability - 16 November 2026

The master page could accept malformed filters, treat wildcard characters as search operators, save an unchecked new master as active, and overwrite newer data from an old HTML edit form. Changing a master type invalidated only the new type's dropdown cache. Failed audit insertion could also leave a master deleted without its audit record.

## Reads and cache

- Validate list and print-picker inputs before master SQL. Search is literal, including `%`, `_`, `!`, backslash and `0`, with an explicit SQL escape compatible with SQLite and MariaDB. Pages are positive integers up to 100,000; print pages contain at most 50 options and the main page contains 20.
- The populated main list uses three master SELECTs: total, projected page, and grouped global statistics. The print picker uses two. Both have deterministic ID tie-breaking, private/no-store responses, and select only necessary fields.
- Current selected active print options retain priority. The existing SP/SPPH print-picker JSON shape is preserved.
- Invalidate both old and new type cache keys after a successful commit. Rollbacks retain warm caches. No-op updates do not write, advance timestamps, invalidate caches, or insert audit records.

## Writes and credentials

- Forms send an explicit inactive value when the checkbox is unchecked. Existing JSON callers omitting create status retain the prior default of active.
- HTML and JSON edits require the same content version and recheck it against the locked row. Stale edits return 409 while the interactive form preserves its draft. Legacy forms lacking a version are rejected with instructions to reload rather than overwrite data.
- Validate scalar fields before uniqueness checks. Handle database uniqueness races as a `nama` validation error. Master mutation and its audit record share a transaction for create, update and delete, including ordinary HTML submissions.
- Password-protected deletion requires a currently active, unlocked Superadmin Umum. The legacy named email no longer bypasses role or department after demotion/reassignment. Only IDs and hashes are loaded for candidate verification. Hash comparisons happen outside the write transaction; the matched account's password, eligibility and account state are rechecked under a short lock before deletion.
- Deletion can check a supplied content version; new page buttons send it. Existing callers without a delete version remain compatible. Null bytes and passwords beyond bcrypt's 72-byte limit are rejected before hashing.
- Four isolated per-account route budgets cover index (60/min), create (20/min), update (30/min), and delete (10/min). Existing authentication, department, read-only and three-wrong-password lockout rules remain. Print lookup keeps its separate 60/min budget.

## Buttons and forms

Move inline page logic to a versioned external script. Use shared inline FormUX validation, modal labels, focus handling and a scrolling modal on smaller screens. No browser validation popups or new packages are introduced.

One page operation owns the forms/buttons across confirmation, request handling and successful navigation. Capture form fields and PUT override before freezing controls; retain CSRF. Prevent double submits and closing/replacing a form during a pending write. Verify JSON/content type, response shape and local action URLs. A 30-second deadline covers response body parsing too; writes are never retried automatically.

Failures preserve non-secret form input, including stale edits. Password dialogs clear and mask the password after every attempt. Each retry has its own abort controller; deletion lockout retains its countdown and safely handles a missing/invalid unlock date. Page navigation cancels pending response handling, ignores late responses and releases controls on browser-back restoration with an explicit outcome warning. Successful writes navigate to a known local list URL instead of trusting a server-supplied redirect.

## Verification

Passed **883 PHP tests / 10,035 assertions** and **431 JavaScript tests**. Fourteen new feature regressions cover master reads, cache lifecycle, writes, credentials, permissions and failure atomicity. Desktop and mobile browser tests render the real Blade controls and use actual application CSS, FormUX and SweetAlert assets. They cover explicit unchecked status, version/CSRF/PUT encoding, duplicate writes, custom errors, stale drafts, slow bodies, password clearing, lockout countdown, navigation cancellation and escaped names/messages. Existing print/signing regressions also passed.

Production verification uses a read-only database transaction, synthetic identity and isolated array cache. It checks bounded live reads, literal search, compatibility of existing version hashes, malformed-input rejection and route guards without changing accounts, credentials, masters or procurement records. A private backup and a prepublished version-helper dependency precede deployment; public asset hashes, route/view caches, health and unauthenticated access are verified afterward. No migrations or configuration changes are required.

These are bounded load and reliability improvements for master maintenance. They do not replace document-signing policies or claim a measured speed increase across unrelated website features.
