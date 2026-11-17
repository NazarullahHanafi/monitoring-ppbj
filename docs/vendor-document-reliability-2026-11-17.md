# Vendor document search and reader reliability - 17 November 2026

The vendor attachment list made a separate database round trip for each diagnostic word when a search returned no results. Unchanged metadata reviews rewrote the document, incremented its version, rebuilt its entire text index and created audit entries. Cancelling a reader could also leave the form frozen until its promise settled, and old transfer/ZIP status requests could outlive their popup.

## Server work and data correctness

An empty first-page search now uses at most three SELECTs: the bounded list, one diagnostic query with up to eight indexed scalar probes, and the transfer counts. Previously eight diagnostic words required up to ten SELECTs. Each probe stops at its first match. This consolidates database round trips; it does not eliminate the individual indexed lookups. Normal reads remain two SELECTs and at most 20 returned documents, with snippets limited to 240 characters and complete scan text/cloud identifiers excluded.

Diagnostic word order, prefix matching, suggestions and filtering remain unchanged. Vendor, document type, attention criteria and ready status still constrain the diagnosis. No diagnostics run for subsequent pages. Filter types are checked before querying; array inputs are rejected. Token normalization is computed once inside the model search scope.

Reviewing identical canonical metadata now performs one locked document read and no document/index/audit writes. It preserves the version and timestamp and reuses the locked model for the response instead of querying it again. A stale version is still rejected, even if its submitted content matches the current document. Actual changes still increment the version and update the document, index and audit in one transaction. The vendor association is checked again under the row lock. Responses remain private.

The literal string `0` is now preserved in document numbers and confirmed scan text instead of being converted to null by PHP truthiness. It remains indexed and searchable. No original files, cloud paths, schema, routes, permissions, rate limits, workers or signing rules are changed.

## Browser behavior

Request cancellation now settles independently of whether fetch/body parsing cooperates with its AbortSignal. Request deadlines retain a visible timeout message rather than being mistaken for a silent cancellation. Request timers/listeners are cleaned up on completion. Existing credentials, CSRF headers and upload retry identifiers remain.

The complete read operation, including downloading an existing file, has a four-minute deadline. Cancel immediately restores the form and keeps its previous text. Late results/progress from an old reader cannot overwrite the form or its status. This protects the UI even if a reader implementation fails to stop promptly; it does not claim to terminate a third-party computation that ignores cancellation.

Opening an already open/busy attachment popup no longer resets its vendor or draft. Transfer and ZIP status requests belong to a popup generation and are aborted when it closes or the page is left. Late successes/errors cannot update a reopened popup, including for the same vendor. Navigation also cancels pending list/read requests. Uploads accepted by the server continue using the existing background transfer workflow; cancelling a client request is not a server rollback guarantee.

## Verification and deployment

Nine new PHP regressions cover bounded diagnostics, scope isolation, list projection, malformed filters, no-op writes/versions/index/audit, changed review and stale versions, zero text, audit rollback and malformed type inputs. Four JavaScript tests cover cancellation during stalled fetch/body, already-cancelled reads, timeout classification and preserved request headers. A new desktop/mobile browser fixture checks cancelled readers, late progress, stalled extraction bodies, successful reads, timeouts, duplicate open protection, status request ownership and page navigation.

The existing vendor document browser regression also covers manual filters, draft/retry identifiers, viewers, PDF/image reading and no external reader requests. The transfer browser regression covers background uploads, status refresh, ZIP preparation and stopping polling on close. The full PHP suite passed **901 tests / 10,199 assertions**, and the full JavaScript suite passed **461 tests**. Both desktop/mobile browser regressions and the new lifecycle fixture passed, including actual PDF/image reader checks. Explicit-file Pint, JavaScript syntax checks and `git diff --check` passed.

Candidate and deployed production verification run in read-only database transactions with a synthetic, unsaved identity and isolated array cache/session. They check MariaDB compatibility, query bounds, DTO privacy, typed filters and existing route guards, comparing the new diagnosis with the previous algorithm. They make no cloud calls or account/document mutations. A private backup precedes publication; the public asset hash, health endpoints and unauthenticated access are checked afterward. Existing route/view/config caches are retained.

The measured query reductions apply to this workflow. They are not a site-wide latency benchmark or a guarantee that unrelated website features are free of bugs.
