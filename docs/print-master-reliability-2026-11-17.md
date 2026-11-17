# Print master popup reliability - 17 November 2026

The shared print-master popup used by SP and SPPH could overwrite a newer search with an older error, lose unsaved names/active flags during redraws, and remain pending indefinitely on stalled connections. This release fixes that workflow and its parent preview lifecycle without changing signing rules, SQL, permissions or document history.

## Interaction and network work

One dialog promise owns the popup. The initial manager read requests at most 12 projected options. Searches are explicit, cancel previous reads and ignore late successes/errors. No polling, browser storage, persistent cache or new background worker is introduced. A live page that disappears is clamped with at most one additional read.

Draft names, active flags and edit versions survive reads and changes between signer/title/PR-field types within the open popup. Deactivating a different row preserves the draft. Controls and the return action are frozen during a save, repeated submissions are ignored, and edits/deactivations continue sending the existing version hash. Deactivation remains a confirmed PUT, never a DELETE. Blank names receive an inline message rather than native browser validation.

Each request has a 30-second deadline covering both fetch and JSON body parsing, same-origin credentials, status/content-type/redirect checks and bounded response validation. Writes require the CSRF meta token. Server diagnostics from unexpected failures are not displayed. Validation messages and names are escaped; parent preview validation text is also escaped before passing it to SweetAlert's HTML-capable validation API.

Writes never retry automatically. An uncertain transport/server result keeps the draft and requires an explicit successful list refresh before another write. A confirmed save followed by a failed refresh explicitly says the data was saved and asks to reload the list, not submit again. Closing/leaving aborts owned requests and prevents late updates; aborting a client request does not guarantee rollback of a server operation already accepted.

Option choices remain limited to two/three parallel reads of at most 50 active rows, preserving selected-ID priority. Caller cancellation aborts all option requests; a failed lookup cancels its siblings. Repeated SPPH manual-mode clicks share a pending lookup. Returning from the master manager refreshes both manual selectors under the new preview's lifecycle. SP skips option lookups when its preceding context check has already been cancelled. SPPH now also fences page navigation so a closed child manager cannot reopen its parent preview.

The master popup has a bounded flex layout: the heading and return button remain visible while the forms/list scroll. Desktop light mode and mobile dark mode are checked using the actual app CSS, SweetAlert and FormUX assets. Styling is scoped to this popup.

## Verification

JavaScript regressions cover cancellation, stale reads, draft retention across types, duplicate submissions, versioned writes, CSRF, response-body stalls, uncertain results, failed refresh after confirmed save, invalid JSON/HTML/redirect/schema, selected active IDs, page clamping, navigation and escaped error text. A real browser fixture checks the important actions on desktop and a 390px mobile viewport, including bounds of the heading and return action.

Passed the full PHP suite: **892 tests / 10,135 assertions**. The full JavaScript suite passed **456 tests**; after the final empty-success-message fallback, the focused SP/SPPH/master run passed **38 tests**, including the additional fallback/incomplete-confirmation regression. Desktop and mobile browser checks passed again after the final source changes. JavaScript syntax checks and `git diff --check` also passed. Production read-only verification checks all three master types, both 12-row manager and 50-row active-choice modes, the frontend DTO contract, private responses and existing route access/rate guards. It performs no account/master mutations and rolls back its read-only database transaction. The deployed assets are hash-checked through the public website; health and unauthenticated access are checked separately.

No schema, backend query, route, Blade template or configuration changes are required. Existing application caches are preserved during deployment. These checks substantiate this workflow; they do not establish a site-wide speed benchmark or guarantee that unrelated features are free of bugs.
