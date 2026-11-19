# SPPH number-check cache coherence — 19 November 2026

## Reproduced issue

SPPH's advisory number-check response is cached for 30 seconds. The create/update/archive/restore/permanent-delete paths invalidated some reference caches but left number checks reachable under the same key. A previously available number could still appear available immediately after save, a renamed number could retain its previous duplicate status, and a permanently deleted number could still appear reserved until the hint expired. Database uniqueness validation remained the final save guard; this was a stale advisory result, not evidence of overwritten data.

## Change

The number-check cache key now includes a `spph:number-check:version` generation. The five controller mutation paths share `invalidateSpphIndexCaches`, replacing repeated invalidation blocks. Its callback runs through `DB::afterCommit`: it clears the same reference caches and rotates the hint generation only after persistence commits. Rolled-back work discards the callback. An old hint can finish populating its old key without becoming reachable from the new generation.

The 30-second hint TTL, query logic, number normalization, edit exclusion, historical-date behavior, private/no-store response headers, read/write authorization, archive reservation, and final database uniqueness checks are preserved. Old hint entries expire naturally; no cache scan or global flush is used. Each lookup now performs a generation cache read in addition to the existing response-cache operation. Warm hints still require zero SQL queries.

## Verification

Five new regression tests exercise an available number immediately after create, renaming with old/new/edit-excluded hints, archive/restore/permanent deletion, commit versus rollback timing, unrelated-cache preservation, warm lookup SQL reuse, and failed/unauthorized saves leaving the generation unchanged. The baseline reproduced stale statuses after create, rename, and permanent deletion. Related tests cover numbering suggestions, malformed inputs, lookup authorization, lifecycle, PR grouping, vendor synchronization, and allocations.

The five new tests passed with 86 assertions. Focused related tests passed: 47 tests, 393 assertions. The complete PHP suite passed: 1,077 tests, 12,424 assertions. Pint passed for both changed PHP files.

The production candidate was checked against an existing SPPH without saving/deleting a business document. Ordinary duplicate, excluded-edit, and empty responses matched the old controller, with cold SQL counts of one, three, and zero respectively; repeated checks used zero SQL queries. Stale hints were injected only into a process-local array cache. A read-only transaction commit advanced that local generation, changing the stale `ok` result to the correct `duplicate` result in one refresh query; the next lookup required none. A rolled-back callback left the local generation/reference caches unchanged. No SQL writes, shared-cache writes, or external HTTP calls occurred.

## Deployment and scope

This release changes SPPH controller cache behavior. It does not measure whole-site latency or audit every feature. No schema migration, dependency, new class, frontend asset, or cache rebuild is required. Staged and installed source are checked with the isolated-cache production probe; deployment also backs up changed files and checks health/login responses, authentication boundaries, and source hashes.
