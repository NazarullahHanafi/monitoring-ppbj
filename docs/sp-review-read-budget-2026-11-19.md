# SP review read budget — 19 November 2026

## Change

`SpController::reviewData`, used by the SP save simulation and value-approval preparation, loaded every PR column. In the current schema that meant 64 attributes per PR, including rich descriptions, notes, and downstream metadata that are not used to construct the review snapshot.

The PR read now projects only `id`, `ppbj_no`, `status`, `awarding_sp`, and `total_sebelum_ppn`. These cover snapshot identity and budget, selected order, cancellation/link conflict checks, and allocation calculation. Rich body text and unrelated metadata remain in the database and are not hydrated for this operation.

An empty selected-PR list now uses an empty collection directly. This removes a `SELECT ... WHERE 0 = 1` round trip. A manual PR reference still runs its existing database existence guard, which prevents a known PPBJ from bypassing the PPBJ selection path, but no longer follows it with an empty select.

Snapshot fields, `details_hash`, complete snapshot fingerprints, SP version fingerprints, proportional/manual allocations, item-derived totals, validation, and conflict handling are unchanged. Save transactions still read and lock the complete records they need; only the read-only review preparation changes. No new caching is introduced.

## Evidence

The regression baseline reproduced 64 hydrated fields per PR instead of five, one needless SQL query for an empty PPBJ list, and two reads for a manual reference instead of one. Four new tests cover rich 20-PR packages, create/edit fingerprint equality against full records, empty/manual query budgets, and rejection of missing/cancelled/conflicting PRs. Related tests cover value-approval consumption, ownership, lifecycle, money, allocations, and raw form input.

All four new tests passed with 154 assertions. Focused related tests passed: 41 tests, 540 assertions. The complete PHP suite passed: 1,072 tests, 12,338 assertions. Pint passed for both changed PHP files.

The production candidate check compared the old and incoming controllers in eight scenarios: create/edit with 20 available PRs, five PRs, manual allocations, item-derived totals, empty selection, manual reference, and an unknown PR in a package. Results, full snapshot fingerprints, or conflict responses matched in every comparison. Index use was verified.

For the 20-PR sample, selected column-value bytes fell from 6,137 to 764 and fields per row fell from 64 to five. This byte count sums the selected values before model hydration; it excludes protocol/column metadata and is not a network wire-size measurement. A populated package still performs one PR query. Empty selection fell from one query to zero, and manual reference from two to one. These are operation-specific measurements, not a claim about whole-site latency.

The candidate check ran in a read-only transaction with array-backed cache/session and external HTTP blocked, and never invoked a business save method. Only counts and equality checks were printed; no PR bodies or reference numbers were exported. No SQL writes occurred.

## Deployment

No schema, dependency, new class, public asset, or cache rebuild is required. Deployment backs up the modified source and cache directory, lints incoming PHP, compares staged source before the fast-forward update, and checks installed source hashes, health/login responses, and authentication boundaries afterward.
