# SP/SPPH print confirmation reliability - 17 November 2026

Print-context requests could remain pending indefinitely during a stalled response body. Repeated confirmation callbacks could issue duplicate checks, and a closed preview could receive a late validation result while another popup was visible. Malformed selection parameters were rejected only after print policy/database work.

## Server validation and work avoided

`PrintSelectionInput` performs structural validation before SP/SPPH context reads, SP confirmation locks/mapping work and document generation. It rejects array-valued fields, invalid modes/IDs/booleans, oversized strings, incomplete manual selections and invalid fingerprint shapes. It does not query the database or replace live policy checks. Permissions, monetary thresholds, master activity, selected field types, fingerprint equality, manual reason requirements and mapping-learning rules remain enforced by the existing services.

Legacy automatic links can still omit the fingerprint, including the existing `bambang` alias. POST confirmation still requires a 64-character fingerprint. Unknown layout/vendor parameters are not reinterpreted by the structural validator. SPPH checks the signer before loading document items or resolving a vendor, and retains the existing checked selection cache within a single print operation.

Production candidate verification rejected 12 malformed context/confirmation inputs with zero SQL statements in their controller/service checks. Actual context reads on sampled SP and SPPH records each used three SELECTs and returned at most 20 PR detail rows. This does not claim fewer normal context queries; the avoided queries are those previously spent on malformed requests, plus duplicate client requests now suppressed.

## Browser request lifecycle

The already loaded shared print helper exposes its existing bounded JSON transport to the parent confirmations. It keeps same-origin credentials, CSRF validation for POST, status/content-type/redirect handling and a 30-second deadline that includes response body parsing. Validation field errors survive transport so SP can refresh a stale fingerprint through a read-only context request. Unexpected server diagnostics are hidden. Older helper versions retain the existing fallback path during publication; the new helper is published before its callers.

Parent confirmations validate bounded context arrays and required types before rendering. Before navigation they validate the selection structure, its fingerprint and permitted parameter names. SPPH retains its selected vendor URL parameter. A malformed or incomplete response cannot navigate the browser into a purportedly confirmed preview.

One confirmation owns its submit lifecycle. Repeated callbacks are ignored, mode/manager actions and Escape/outside closing are guarded while a check is pending, and explicit close/navigation abort owned requests. Closed or superseded dialogs ignore late success/error responses. Timeout and validation failures retain draft selections/reasons, and another request requires an explicit user action; no POST retry is automatic. An aborted client request does not guarantee rollback of a server action already accepted.

SP/SPPH confirmations now share the existing bounded popup layout with master dialogs. The heading, validation message and action buttons remain inside the viewport while the document details scroll, including mobile manual mode and a visible validation error. The style is scoped to these print dialogs.

## Verification and rollout

Passed **908 PHP tests / 10,241 assertions** and **478 JavaScript tests**. Seven new feature tests cover malformed inputs before policy SQL/locks/generation, SP field shapes, required POST basis and legacy/manual compatibility. Seventeen combined helper/parent tests cover stalled bodies, cancellation, duplicate confirmations, same-tab selection/vendor handling, CSRF, response schemas, server-error redaction, escaped validation and stale-basis refresh. After the final layout adjustment, the focused JavaScript run passed **55 tests**.

The actual SweetAlert/helper/parent assets pass SP/SPPH desktop/mobile browser tests for drafts, response-body deadlines, changed-basis reconfirmation, escaped errors, closing and viewport bounds. Existing desktop/mobile print-master browser tests also pass. Explicit-file Pint, JavaScript syntax and whitespace checks pass.

Candidate/deployed production checks use a synthetic unsaved identity, array cache/session and a read-only database transaction. They read current context data and route guards, make no real account/document mutations and generate no documents. Deployment backs up changed code/assets, prepublishes the new independent support class before its callers, preserves route/view/config caches, and checks asset hashes, public health and unauthenticated access afterward. No migrations, signing configurations or document templates change.
