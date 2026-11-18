# Safe SP edit reads - 18 November 2026

This release prevents failed, late or incomplete SP edit reads from replacing the data shown for another document. It also consolidates the duplicate manual-PR check implementations and removes HTML interpretation from their server messages. The scope is SP form reads and their save guard, rather than a claim of faster response times across the whole website.

## Data protection and recovery

The previous item loader checked the record ID only on success; an older failure could replace the latest form with an error. Reopening the same record could also accept an older success. The item loader now tracks the dialog generation as well as the ID and cancels obsolete requests. It uses the existing 20-second deadline, including response-body parsing, and rejects malformed item collections. Closing a dialog prevents late results from changing its contents.

Loading/error states for saved items and PR references prevent both the edit submit handler and the AJAX save function from beginning review or writing an incomplete form. This matters because the update operation replaces existing SP items with submitted items. The user can retry each failed read without closing the dialog; the original saved header fields stay available. Adding rows is deferred while saved items are still loading or in error, avoiding edits that would be overwritten by the initial load. A legitimately empty item list still creates the ordinary blank entry row.

Saved PPBJ selections are populated immediately. A failed metadata request retains that selection and its PPBJ mode, instead of converting it into a manual PR. Metadata reads use the same cancellation/deadline helper and offer **Cek ulang**. A successful response determines whether a legacy PR really is manual; cancelled PPBJ references require review or an explicit new selection. A user switching mode or selection invalidates the pending metadata read. Hydration does not overwrite saved descriptions, values or vendor names. Vendor lookup now compares option values directly, so quotes and selector characters in a name cannot break edit initialization.

Add/edit manual-PR checks share one implementation with separate debounce/cancellation state per form. Clearing the input, switching modes, changing edited records, closing or hiding the page prevents stale feedback. Messages are rendered as escaped text, and failed/expired/malformed responses cannot claim that a PR is available. Explicit retries only repeat GET reads. Existing submit validation and server-side write checks remain in place.

The item endpoint now sends private/no-store JSON. Its existing narrow column selection, item order, rich-text field, money formatting and delivery dates are preserved. It still performs one item query. No schema, route, view, document template, timer-based polling or cloud-storage change is introduced.

## Verification and deployment

Final validation passes **941 PHP tests / 10,575 assertions**, **508 JavaScript tests**, desktop/light and mobile/dark edit-read browser scenarios, the earlier SP lookup browser regression, explicit-file Pint, syntax and whitespace checks.

Feature tests cover item ordering, response columns, formatted prices/subtotals, dates, rich-text preservation, empty results, privacy and existing access guards. JavaScript tests cover add/edit independence, stale and same-record races, clearing/cancellation, mode/record changes, hung response bodies, retries, safe messages, malformed collections and save prevention before any preparation or write.

The full rendered page with actual SP/jQuery/Select2 assets is checked in desktop/light and mobile/dark browsers. Tests open records in quick succession, reopen the same ID, reject old failures and successes, exercise both readiness guards and item/metadata retries, preserve PPBJ mode after a simulated outage, render malicious manual-PR feedback literally and initialize quoted vendor names. No real procurement POST is sent. The prior number/PPBJ lookup browser scenarios also pass.

Production checks use an unsaved synthetic account, array cache/session, blocked outbound HTTP and a read-only transaction. The item response is checked without printing document data; the earlier helper privacy, query bounds and access-guard checks are repeated. Rollout backs up modified files and the published SP script, checks an exact file/commit list, verifies the staged candidate, applies a fast-forward update and atomically publishes the script. Post-deployment probes, public asset SHA256, health and unauthenticated access checks run again. File rollback is prepared. Existing route/view/configuration caches and unrelated local files are preserved.
