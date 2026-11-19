# Batch PR existence validation — 19 November 2026

## Problem and change

SP and SPPH create/update validated `exists:ppbj,ppbj_no` on every `nomor_prs.*` element. A package of 20 PRs therefore issued 20 separate existence queries before the save transaction.

The existence rule now applies to the bounded `nomor_prs` array. Laravel's database presence verifier uses one parameter-bound `WHERE IN` query with a distinct count to check that every selected PR exists. Empty lists require no existence query. Per-element string, length, and distinct validation remains. The raw shape checks introduced in the previous release run first; the parent rule also uses `bail` before database validation.

Only the four create/update validation rule sets changed. Ownership checks, mode handling, PR normalization/order, allocation calculations, vendor checks, approval fingerprints, row locks, transaction conflict checks, links, and synchronization remain in place. SP review preparation and SPPH preview are outside this change.

An unknown PR now produces the standard `nomor_prs` field error for the package instead of an indexed `nomor_prs.N` error. The existing form handlers display the first server field message for either shape; no frontend asset changes are needed. A partly valid package is still rejected as a whole. SQL wildcard characters are treated as literal equality values, not search patterns.

## Evidence

- Before the change, the new budget test reproduced 20 existence queries for a 20-PR SP package.
- Four regression tests pass with 64 assertions: constant query budget in SP/SPPH create and edit, missing/literal wildcard PR rejection, empty packages, and successful create/edit synchronization of all 20 PRs in the selected order.
- Focused related tests: 53 passed, 492 assertions, including approval consumption, value/allocation checks, money formatting, lifecycle, edit ownership, and raw input safety.
- Full PHP suite: 1,062 passed, 12,155 assertions. Pint passes for all three changed PHP files.

The production deployment gate compares the old and incoming controllers against 20 existing PR references in package sizes 0, 1, 5, and 20, for all four create/update paths. A required PIC is deliberately omitted, ensuring validation always stops before business persistence. It compares validation results for existing references, checks unknown-reference rejection, counts existence queries, and inspects index use. It uses synthetic unsaved users/documents, a read-only transaction, array cache/session, and blocked external HTTP. No valid business save is submitted.

## Limits and deployment

At 20 PRs, existence-validation queries fall from 20 to 1 (19 fewer, or 95% fewer for this stage). This is not a measurement of whole-request latency or the speed of the entire website; transaction and synchronization queries still run on a valid save. No schema migration, dependency, new class, public asset, or cache rebuild is needed. Deployment backs up the previous application files and verifies staged source before fast-forwarding production.
