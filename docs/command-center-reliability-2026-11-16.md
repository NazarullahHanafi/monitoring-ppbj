# Command Center request reliability and export safety

Command Center could render an obsolete search or passport response after a newer request, or reopen results after the user closed the popup. Enter-key submissions also bypassed the disabled button and started duplicate reads. The browser now tracks separate overview, results, passport, and archive operations: identical pending requests are ignored, replacements abort their predecessor, and only the current operation can update the UI. Search, questions, and reconciliation share one results operation.

## Changes

- Input changes cancel obsolete searches immediately. Closing a popup, leaving the page, or hiding the tab cancels applicable reads. Cancellation remains effective even if the underlying transport delivers a late response. There is no automatic polling or retry loop.
- The twelve-second deadline covers both response headers and JSON parsing. HTML login responses, redirects, invalid JSON, malformed payloads, authorization failures, and rate limits are handled with inline text feedback. Private server error details are suppressed.
- Request URLs must use the current origin before receiving the CSRF header. Passport navigation and QR URLs also use the current origin; attachment links retain support for HTTP/HTTPS cloud destinations and reject executable schemes and embedded credentials. Displayed business text is escaped.
- Overview browser cache keys include a hash of the authenticated user and session. Missing scope disables browser caching; invalid/expired cached payloads are ignored. The old unscoped overview key is removed. Successful archive metadata has a sixty-second browser lifetime and at most twenty cached PR entries; failed/unconfigured reads can be retried manually.
- Fullscreen entry/exit is guarded while the browser API is pending, has a CSS fallback when native entry is rejected, and handles Escape on the popup before exiting the fallback layout.
- The phrase `belum SPPH` no longer also applies `belum SP`. Explicit compound questions can still apply both filters. `%`, `_`, `!`, and backslash searches use bound parameters and an explicit LIKE escape character, consistently across SQLite and MariaDB. ID resolves sorting ties deterministically.
- Journey still returns at most fifty tracking events and thirty audit entries, while omitting the potentially large audit `changes` column and unused tracking columns. Existing overview/reconciliation cache and query budgets remain intact.
- All five data endpoints return `private, no-store` while retaining server-side caching. Nine route-specific rate-limit prefixes prevent unrelated actions sharing a counter. Passport/journey route parameters require numeric IDs, and input lengths match server validation.
- Meeting Excel exports write PR numbers, descriptions, buyer names, vendors, and explanations explicitly as strings. Financial values remain numeric. Spreadsheet-looking business text cannot become an executable Excel formula.

## Verification

- Full PHP suite: **826 tests, 9,123 assertions**, passed.
- Full JavaScript suite: **395 tests**, passed.
- Browser regression passed at desktop and mobile sizes, using actual Blade content with synthetic API responses. It covers duplicate refresh/search/question/archive requests, late responses after input changes and popup/page closure, switching passports while an archive request is pending, safe URL/text rendering, scoped caching, shared results ownership, and fullscreen fallback with a deliberately rejected native API request.
- Feature tests verify the SP/SPPH distinction, literal special characters, stable ordering, access controls, independent rate budgets, private headers, bounded/minimal history queries, and actual XLSX cell types and values.
- PHP formatting, syntax, and whitespace checks passed.

The release uses an exact file allowlist, private backups, an expected clean production baseline, and a staged candidate check before changing application files. The production probe uses a read-only SQL transaction and an in-memory cache to check MariaDB searches, SP/SPPH query semantics, overview/reconciliation warm-cache query counts, history projections, input guards, and route middleware. Its XLSX probe exports synthetic text only, then removes the temporary workbook. Publication checks include route/view caches, asset SHA-256 hashes, health endpoints, and unauthenticated access.

This release improves Command Center. These measurements do not establish a universal performance or security guarantee for every website feature or external service.
