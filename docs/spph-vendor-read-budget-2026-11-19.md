# SPPH final-vendor read budget — 19 November 2026

## Change

When creating or editing SPPH, each linked PR with an SP reference looks up that SP's final vendor. The existing request cache avoids repeat reads for the same SP, but a package containing 20 different SPs still made 20 scalar queries.

Before synchronizing the selected PRs, `SpphController` now primes its existing vendor cache with a parameter-bound `WHERE IN` read selecting only `nomor_sp` and `nama_vendor`. It trims references, retains the first spelling for each existing cache key, preserves literal zero, ignores blank references, and uses batches of at most 100 references. Current save input is already limited to 20 PRs. Soft-deleted SPs remain excluded by the model scope.

If the batch finds no active SP at all, those misses can be cached as null according to the database's own comparison rules. If it finds active SPs, matching cache keys are primed and unresolved spellings retain the existing scalar lookup. This matters where database comparisons equate accents or other characters that PHP case folding does not. A mixed or unusual reference set can therefore require extra scalar reads; this release does not promise one query for every legacy combination.

The vendor cache is cleared at the start of each create/update transaction attempt, including transaction retries. A previous attempt must not supply stale final vendors. Within an attempt the cache is reused. No global vendor cache or TTL is introduced.

## Behavior preserved

An active SP's final vendor still takes precedence over SPPH candidates. Missing/archived SPs and empty final vendor values retain the existing fallback to the candidate vendor summary. Selected PR ordering, links, document fields, ownership checks, validation, row locks, and transaction checks remain in place. Removed PR handling and permanent deletion continue to use the existing scalar resolver; this change primes the selected PR synchronization path only.

## Verification

The baseline regression reproduced 20 vendor queries for 20 distinct active SPs, and 20 for a package of missing/archived references. New feature tests exercise create/edit with all 20 final vendors and links, changed vendors across saves, missing/archived/blank references, zero and whitespace, first-reference cache semantics, accent-insensitive SQLite comparison through a custom collation, and stale cache discarded at transaction entry. Related feature tests cover ownership, lifecycle, allocations, and raw form validation.

All six new tests passed with 29 assertions. Focused related tests passed: 35 tests, 329 assertions. After the transaction-attempt cache reset was included, the complete PHP suite passed: 1,068 tests, 12,184 assertions. Pint passed for the two changed PHP files.

Production release verification compares the unchanged scalar resolver in the prior controller with the incoming controller using existing SP references and synthetic unsaved PR models. It checks active, trimmed, lowercase, repeated, empty, missing, mixed, and archived references where available, identical final vendor values, warm-cache query reuse, and index use. Only aggregate counts and equality results are printed. It runs in a read-only transaction with array cache/session and blocked external HTTP, and never calls a business save method.

The production candidate comparison passed eight packages. Twenty distinct active SP references used 20 queries before and one after, with identical vendor results; trimmed and lowercase variants also used one. Twenty unknown references used one read, blank references used none, and repeated reads after priming used none. A mixed package of 15 references used 15 reads before and six after. No archived SP sample was available in this production check; archived behavior is covered by the local feature tests. No SQL writes or external HTTP calls occurred.

For a package of 20 matching active SP references, the vendor lookup stage uses one query instead of 20. This is a query-count improvement for that stage, not a whole-site latency measurement. No schema migration, dependency, new class, frontend asset, or cache rebuild is needed.
