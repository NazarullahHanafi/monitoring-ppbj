# SP cache invalidation commit timing — 19 November 2026

## Reproduced issue

`SpController::invalidateSpIndexCaches` cleared its reference caches and rotated `sp:index-stats:version` inside the save/archive/restore/delete transaction. That version is used by both number hints and index summary caches. Publishing it before commit allows an overlapping reader to populate the new generation using the last committed database state, leaving a stale hint or summary reachable after the write commits. A rollback also changed cache state even though persistence was cancelled.

The regression tests reproduced premature generation publication and a modeled overlapping hint fill remaining reachable after commit. This is a controlled interleaving test, not a claim that a particular production document was affected or overwritten.

## Change

The existing invalidation body now runs through `DB::afterCommit`. It clears the same five reference keys and rotates the same generation when the database state is committed. All five controller mutation paths already use this method. A reader overlapping the transaction fills the old generation, which becomes unreachable after the commit callback rotates it. Rollback discards the queued callback.

Cache key formats, hint/summary TTLs, uniqueness checks, historical dates, normal/Oracle numbering, authorization, archive reservation, allocations, approval fingerprints, and business persistence are unchanged. No extra SQL or new cache reads are introduced. The existing six cache operations move outside the database transaction's lock-holding period; whole-request latency and lock-contention gains have not been benchmarked. Old summary and hint entries still expire naturally; no global cache flush is used.

## Verification

Five regression tests exercise commit/rollback timing and reference preservation, a hint filled while a transaction is open, all create/edit/archive/restore/permanent-delete paths in auto and Oracle modes, index summary totals after committed mutations, warm hint SQL reuse, and invalid/unauthorized writes leaving the generation unchanged. Related tests cover numbering lookups, suggestions, value approvals, money, lifecycle, allocations, and list filters.

All five new tests passed with 146 assertions. Focused related tests passed: 69 tests, 750 assertions. The complete PHP suite passed: 1,082 tests, 12,570 assertions. Pint passed for both changed PHP files.

The production candidate check matched existing duplicate, edit-excluded, and empty lookup responses against the old controller. Cold query counts remained one, three, and zero; warm reads used zero SQL. A modeled overlapping reader filled an intentionally stale hint in a process-local array cache: the baseline published its generation before the read-only transaction committed and retained that hint afterward, while the candidate delayed generation publication and returned the correct duplicate status after commit in one refresh query, then zero warm queries. Rollback left the generation and reference markers unchanged. Auto-mode references were available in the production sample; Oracle behavior is covered by local tests.

Production verification uses read-only database transactions, process-local cache/session, and blocked external HTTP. It never invokes document mutation methods and prints only aggregate counts and equality/timing checks. No business SQL writes or shared-cache writes occurred.

## Scope and deployment

The release adjusts SP controller invalidation timing, not every cache producer in the application. No schema migration, dependency, new class, public asset, or cache rebuild is needed. Deployment backs up changed source, validates staged and installed code with the isolated probe, and checks source hashes, health/login responses, and authentication boundaries.
