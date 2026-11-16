# Procurement preview and SP value-approval reliability

An HTML/redirect response or incomplete SP preview could previously reach the confirmation dialog, and concurrent preview/request handlers could share or replace that dialog. The approval decision page also lacked a check that the reviewer was still deciding the same stored content they had opened.

## Changes

- Preview, approval request, and delete preview share one pending review operation. Duplicate calls do not start another request/dialog. Pending operations abort on page exit, retain the form's original interaction state, and ignore late responses.
- Preview transport checks response type, redirects, status, and payload shape. SP preview must include its approval flags and numeric totals. A thirty-second deadline covers response-body parsing even if transport cancellation stalls. There is no automatic retry or document save after an unverified response.
- An approval request has a pending-send guard and verified success/ID/message contract. Its dialog cannot be dismissed by Escape/outside click while sending. An explicit retry after an uncertain response uses a new request controller; the old response cannot acknowledge the new attempt. Existing server-side duplicate detection remains in place.
- The reviewer form includes an HMAC token covering the persisted approval context, including snapshot, reason, state, expiry, reviewer, and timestamps. Under the existing row lock, the decision endpoint compares that context before writing. Missing/changed tokens receive a conflict and require reloading/reviewing the current content. This is a context check; existing department, read-only, no-self-approval, pending-state, and expiry checks still enforce authorization.
- Decision forms retain the clicked approve/reject value, CSRF token, review token, and note. One decision can be pending across the page. Validation errors retain the draft; conflicts provide a reload link. Buttons remain locked after confirmed success until navigation. HTML redirects remain supported for native form submissions.
- Legacy reference previews read at most twenty PR numbers and a separate scalar total, instead of hydrating an unlimited list. Removal previews report sample size and total explicitly. Actual document/reference mutation rules are unchanged.
- Approval pagination is bounded, an empty status falls back to pending, and list/preview/request/decision actions have four separate rate-limit prefixes. Preview and approval JSON responses are private and non-cacheable. The existing server duplicate-prevention index and transaction/audit behavior remain in place.
- Approval consumption requires expiry strictly after the current time, matching the decision/preview checks at the exact expiry boundary.

## Verification

- Full PHP suite: **838 tests, 9,343 assertions**, passed.
- Full JavaScript suite: **411 tests**, passed.
- Browser tests passed for real decision forms at desktop and mobile sizes: selected decision and context token, duplicate blocking, retained drafts, literal errors, conflict reload links, late responses, and locked success navigation.
- Real SweetAlert browser test passed for approval request acknowledgement and Escape blocking while sending, without saving an SP. Existing SP/SPPH save browser regression passed all eight combinations of create/edit and success/HTML-error responses.
- Feature tests cover changed reasons/snapshots/expiry, missing/forged tokens, no self-approval, one decision/audit, native HTML compatibility, forty-seven legacy references with explicit twenty-item samples, expiry boundary, roles, pagination, and independent budgets. The directory budget regression now counts the added approval-list prefix while still asserting every prefix is distinct.
- Formatting, syntax, and whitespace checks passed.

Deployment uses an exact fifteen-file allowlist, expected clean baseline, private backups, and staged candidate checks. The production verifier uses a read-only SQL transaction and in-memory cache. It checks the unique requester/fingerprint index, approval-list query bounds, token stability on hydrated models, token changes on synthetic context, bounded SP/SPPH reference previews, invalid-filter rejection, and route guards. It does not request or decide a real approval, save a document, or alter business data. Public assets, route/view caches, health/login endpoints, and unauthenticated access are verified after publication.

The context token detects changes to the stored content; it is not a separate monotonic revision counter. These checks cover this release and do not establish a universal performance or security guarantee for the whole website.
