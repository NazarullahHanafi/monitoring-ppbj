# SP/SPPH raw input safety — 19 November 2026

SP/SPPH create and update processed some raw inputs before checking their structure. A document number or date submitted as an array could reach a string-typed normalizer and cause a server error. A scalar PR list could be coerced into a collection, malformed allocation rows could be discarded, and an explicitly null optional item list could reach an array-typed method. SP update also normalized PR selection before rejecting a user who did not own the document.

## Change

`ProcurementFormInput` checks the raw input before normalization in SP create/update/review preparation and SPPH create/update. It rejects malformed structures through Laravel's usual field validation responses. Raw container limits run before nested wildcard validation: 20 PRs, 20 allocations, 20 SPPH vendors, 50 SP items, and 20 SPPH items. These match the existing business limits. Monetary inputs retain locale-formatted strings and JSON numbers; arrays, booleans, non-finite floats, and strings over 100 characters are rejected before parsing.

SP update now performs the existing ownership check before any input processing or PR existence lookup. The ownership policy itself is unchanged. Explicitly null item lists become empty arrays; absent item keys stay absent, preserving the input representation used by existing SP value approval fingerprints. Existing date, uniqueness, PR existence, allocation, vendor, approval, and transactional checks still run afterward.

## Validation

- Six focused regression tests cover malformed create/edit/review requests, owner refusal, HTTP 422 responses, null-item create/edit, and preservation of valid money/date/approval inputs: 144 assertions.
- The malformed controller test cases perform zero SQL queries after route-model resolution. This does not count authentication or route binding queries in an actual HTTP request.
- Full application PHP suite: 1,058 tests passed with 12,091 assertions. Pint passed for all four changed PHP files. No JavaScript, schema, public asset, cache rebuild, or dependency change is required.
- The production candidate and installed source are checked with synthetic unsaved users/documents, a read-only database transaction, array-backed cache/session, and blocked external HTTP. The probe validates 70 cases and never submits a valid create/update request against business data.

## Scope

This release reduces failures and avoidable database work for malformed SP/SPPH form input. It does not claim an application-wide response-time improvement or that every button and security boundary has been audited. Existing valid saves still perform their business queries. The helper must be published before the controllers during deployment so concurrent requests can resolve the new class.
