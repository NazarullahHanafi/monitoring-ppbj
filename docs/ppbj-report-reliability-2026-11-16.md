# PPBJ report performance and profile write guards — 16 November 2026

The report now renders a default page of 50 rows rather than up to 1,000 rows in one response. Users can select 25, 50, or 100 rows and navigate every matching record. Summary cards still aggregate the complete filtered result. CSV export remains available for the complete result and is independent of the current table page.

## Report queries and filtering

Report behavior is isolated in `PpbjReportController`, with shared validation and query filters in `PpbjReportFilters`. The large PPBJ controller retains three small forwarding methods for existing integrations and cached routes. Route paths and names remain unchanged.

- Data requests retain four queries: totals, two top-20 breakdowns, and one bounded page. The total already computed for the cards also supplies pagination, avoiding a separate count query.
- Rows use `created_at DESC, id DESC` so identical timestamps do not shuffle records between pages. Out-of-range positive pages are clamped to the final page after counting.
- Date filters are validated before SQL or download headers. Invalid dates, reversed custom ranges, malformed/nested filter values, excessive selections, and unsupported page sizes produce validation errors rather than runtime errors or incomplete CSV files.
- Dates use inclusive start / exclusive end boundaries against the indexed `created_at` column. Leap days and daily/monthly/yearly boundaries are covered.
- Array selections preserve literal vendor names containing commas and the name `0`. Legacy scalar comma-separated lists and plural field aliases remain supported. Each filter allows at most 100 values of 255 characters.
- Legacy month/full-date and year/full-date inputs remain supported. Omitted start dates retain the existing API behavior of reading all dates; the interactive form requires a period value to avoid accidental broad reads.
- Read responses and downloads carry private, no-store headers. Filter-option caching remains five minutes; no shared cache of report contents is introduced.

## CSV export

Export validates filters before streaming and projects only 14 source columns, rather than hydrating full PPBJ models. It fetches at most 500 rows at a time using a composite timestamp/ID cursor, including null timestamps. An upper ID captured before streaming excludes records inserted later. There is no offset pagination between export batches.

The table, cards, and export use the same stored SLA snapshot. Previously CSV accessed the live model accessor while the table/cards used stored values, so their statuses could disagree. This change does not recalculate or modify database SLA values.

UTF-8 BOM, formula-prefix protection, and explicit CSV delimiter/enclosure/empty escape preserve spreadsheet safety and round-trip commas, quotes, newlines, and backslashes. Export is a bounded-memory traversal, not a transaction snapshot of every field: concurrent edits or deletions can still affect a long-running export. The captured upper ID only excludes new insertions.

## Browser controls

The inline report script is now a versioned external asset. Duplicate identical reads share a pending request. Editing filters aborts pending reads immediately, and results are accepted only for the current operation. The deadline covers both network fetch and JSON parsing; hidden/page lifecycle cancellation ignores late results without automatic retries.

Dates are validated with the shared form UI, and the current day follows the configured application timezone. Changing period types clears incompatible date bounds and hidden end dates. Reset clears selections/errors, restores the current month, and requests the first page. Pagination is disabled while results are stale or loading.

CSV uses the browser’s native download path without buffering a complete file in JavaScript. A two-second guard prevents accidental duplicate download clicks; this is a click guard, not confirmation that the server finished the download. Server errors and login redirects produce readable messages without exposing diagnostic text. User-supplied report text is escaped before rendering.

Report page, data, and export budgets are independent: 60, 60, and 10 requests per minute per authenticated user. Existing Umum department and read-only access middleware remain.

## Alternate profile write routes

The legacy `/profile` PATCH/DELETE routes now use the same viewer/global read-only guard as other write features. Their action limits are separate: 20 updates and 5 deletion attempts per minute. Deletion passwords reject arrays, null bytes, and inputs exceeding 1,024 characters before reaching the password hasher. Existing ordinary self-service deletion behavior is otherwise unchanged; no production account is deleted during verification.

## Validation and release

The full regression run passed **858 PHP tests / 9,676 assertions** and **424 JavaScript tests**. After adding cached-route forwarding compatibility, the final targeted run passed **18 tests / 260 assertions**, including the new forwarding regression. Desktop/mobile browser checks and explicit-file Pint checks passed.

Feature regressions cover global totals across 125 rows, supported page sizes, invalid filters before SQL, comma/zero labels, legacy aliases, leap-day boundaries, 1,003-row cursor exports with null timestamps, exclusion of later inserts, CSV safety, stored SLA consistency, department access, isolated budgets, and profile write guards. A compatibility regression also exercises the three forwarding controller methods.

JavaScript regressions cover coherent payload validation, private reads, body timeouts, cancellation, safe errors, redirect rejection, URL origins, and timezone boundaries. Desktop/mobile browser regressions use the actual Blade content, built application CSS, shared form validation, and native CSV downloads.

Deployment verifies the staged candidate before application changes, uses a private file/cache backup, publishes new dependencies before their callers, and checks route/view caches and the public asset hash. Production probes run in a read-only database transaction with an isolated in-memory cache. Any live CSV sample is bounded to 100 rows, held in memory only, and never logged. No procurement records or real accounts are changed by the probes.
