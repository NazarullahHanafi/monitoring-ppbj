# SP number conflict recovery - 18 November 2026

The SP edit form's **Ambil Nomor Terbaru** action previously used the add form's date. It also offered renumbering for every HTTP 409, including an already-linked PR. Recovery now selects the appropriate action for the actual conflict and reads suggestions for the active form's document date.

## Number and write protection

The number-recovery read uses the existing bounded read helper: same-origin requests, JSON/status checks, a 20-second deadline through response-body parsing, cancellation and private/no-store server responses. Oracle mode never requests an automatic number. Before changing an input, the helper checks the original number, date, form action, record ID, modal visibility and edit-load generation. A newer recovery request supersedes the previous one. Malformed, expired, cancelled, redirected or failed responses retain the user's number. The selected number still goes through the existing number check; users review it and save explicitly. Recovery never automatically repeats a POST.

SP uniqueness races now return a typed conflict. The controller checks the conflicting SP number after the failed write transaction rolls back, includes archived documents and excludes the record being edited. An automatic-number conflict can offer a new number. Oracle conflicts direct the user to check Oracle. Other uniqueness conflicts and PPBJ link conflicts ask the user to inspect their references instead of changing an unrelated number. Unclassified/legacy 409 responses also retain the form without offering an automatic number.

Ordinary database errors are allowed to reach the normal exception handler, rather than being mislabeled as duplicate numbers. The transactional write retains its existing retry count and rollback behavior. Classification adds one read only after a uniqueness race; successful reads and writes gain no new query. The PPBJ conflict classification adds no SQL. No schema, route, template, polling or cloud-storage change is involved.

## Verification and rollout

Final validation passes **947 PHP tests / 10,615 assertions** and **520 JavaScript tests**, explicit-file Pint, JavaScript syntax and whitespace checks. Browser recovery and edit-read scenarios pass on desktop/light and mobile/dark. All eight existing SP/SPPH create/edit success/HTML-response save scenarios also pass, with one write attempt each and original dates retained.

Feature tests simulate competing inserts at the transaction boundary, including archived-number and Oracle conflicts. They verify typed recovery choices, update self-exclusion, preserved original documents, PPBJ links, and propagation of non-unique database errors for both create and edit. JavaScript tests check form-specific dates, draft/date/action/record/generation changes, read deadlines, cancellation, invalid responses, Oracle behavior, classified conflict dialogs and exactly one save attempt.

The actual rendered page, SP script, jQuery, Select2 and SweetAlert run in desktop/light and mobile/dark browser tests. Real form submit handlers receive synthetic 409 responses: PPBJ conflicts offer inspection without a number GET, recognized SP conflicts fetch using the edit date, and a stalled suggestion body reaches its deadline and releases the form. Messages remain escaped, dialogs fit the viewport, the add draft remains intact and no automatic resubmission occurs. Existing edit-read browser scenarios are repeated.

Production candidate checks use an unsaved synthetic account, array cache/session, blocked outbound HTTP and a read-only database transaction. Typed classification is invoked without attempting a write; it checks auto, Oracle, self-exclusion and synthetic PPBJ conflicts without exposing record contents. Earlier bounded-query/privacy checks are repeated. Deployment verifies an exact commit/file allowlist, backs up modified files and the public SP asset, checks the candidate, fast-forwards and atomically publishes the script. Post-deployment probes, asset SHA256, public health and unauthenticated access checks run again. File rollback is prepared; existing cache artifacts and unrelated local files are preserved.
