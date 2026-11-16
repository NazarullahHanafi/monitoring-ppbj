# Action Inbox: bounded queries and reliable actions

The Action Inbox checklist endpoint previously allowed any member of the receiving department to modify a task assigned to somebody else. It now uses the same assignment rule as status changes: the assigned receiver or a superadmin in the receiving department can update it. The existing read-only middleware, row locks, current-version checks, transition rules, and activity log remain in place.

## Resulting behavior

- Checklist keys must belong to the current task, be distinct, and contain at most eight entries. Saving an unchanged checklist does not update the row, increment its version, or add an audit entry.
- Creating a task verifies that a submitted PR number matches its selected database ID. The valid checklist label `0` is preserved. The existing lock on the PR row still serializes active-duplicate checks.
- Actions support private JSON responses alongside existing HTML redirects. Requests retain CSRF, PATCH method spoofing, and the task version. Separate rate-limit prefixes isolate list, create, status, and checklist budgets.
- The list omits unused root columns and two unused eager-loaded relationships. Pagination uses ID as a final deterministic tie-breaker. Literal `%`, `_`, `!`, and backslash searches do not become wildcard searches.
- The active assignee directory uses a five-minute cache with only ID, name, department, and role. Account saves/deletes invalidate it after transaction commit. A rollback does not invalidate it. The directory needs one SQL query cold and zero warm.
- PR search aborts immediately when input changes, when the dialog closes, or when the page becomes hidden. Request identity also prevents an obsolete response from replacing current results when the network ignores cancellation.
- One write can be pending at a time, including during cancellation confirmation. Forms retain their drafts on errors; stale versions offer a reload link. A response timeout, HTML login response, failed authorization, or malformed payload is never reported as a successful save. Mutations are not automatically retried.
- Create and note dialogs are inside the fullscreen element. Focus-button labels use the captured button after the asynchronous fullscreen request. Cancellation uses the shared custom confirmation dialog, and validation uses FormUX.

## Validation

- Full PHP suite: **820 tests, 8,944 assertions**, passed.
- Full JavaScript suite: **389 tests**, passed.
- Browser regression: desktop and mobile viewports, real dialog markup with synthetic API responses. Covers obsolete searches, literal text rendering, duplicate submissions, retained drafts, stale-version reload links, custom confirmation, CSRF/version preservation, late responses after page exit, and rejected external redirect targets. The fullscreen API is simulated to exercise its asynchronous completion and dialog ancestry.
- Pint applied to the changed PHP source and feature test; syntax and whitespace checks passed.

Production deployment uses an exact file allowlist, an expected clean baseline, private file/cache/asset backups, and a candidate check before changing application files. The production verifier uses an SQL read-only transaction and an in-memory cache; it checks MariaDB literal escaping, live list query bounds, selected columns, assignment guards on synthetic models, UUID route constraints, and independent rate limits without modifying business records. Public asset hashes, cached routes/views, health endpoints, and unauthenticated access are checked after publication.

These checks cover this release's Action Inbox changes. They do not establish a universal speed or security guarantee for every website feature or external service.
