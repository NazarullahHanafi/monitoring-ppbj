# Presence and mood reliability — 17 November 2026

This release fixes the shared online-user/mood path used across authenticated pages. It does not claim a measured speedup for every page or complete security coverage of the application.

## Failure cases corrected

Changing mood after the presence entry expired used to create a cache row containing only `mood`. The online registry treated that row as active; sorting or rendering could then fail because `name` and other fields were absent. Mood changes now update only a complete matching presence row. Invalid partial rows are discarded, while the separate daily mood is retained for the next heartbeat.

The registry rejects malformed IDs, expired/partial rows, mismatched identities and invalid UTF-8 in required fields. Optional initials, color, mood and idle state are normalized. Responses expose an explicit public field set instead of forwarding arbitrary cached fields. Name sorting, own-account ordering, hidden-owner exclusion and viewer access remain covered by tests.

Mood input accepts existing plain text and Unicode emoji, including joined emoji, while rejecting HTML delimiters, control characters and invalid UTF-8. Existing unsafe cached moods are returned as `null`. The browser also escapes names, initials and moods in both the avatar stack and presence panel, validates colors and discards malformed rows. This closes an HTML-injection path through mood/initials without relying solely on new-input validation. Responses are marked `private, no-store`.

## Work avoided and concurrency

The online snapshot previously used two bulk cache reads per heartbeat: one for registry pruning and another for the response. The same validated snapshot now serves both purposes, using one bulk read on the healthy path. This reduction concerns presence data reads, not every cache operation in the request.

Registry locking no longer waits up to two seconds for a busy lock. A contended request returns a local snapshot without releasing another worker's lock or overwriting its registry. Membership changes persist on a later heartbeat that obtains the lock; presence remains eventually consistent. The existing 300-second presence TTL and last-seen write gate remain unchanged. A heartbeat within the 60-second last-seen gate performs zero SQL in the direct controller check; normal heartbeats outside that gate still perform the existing last-seen work and notification decisions.

Heartbeat, mood reads and mood writes have independent per-user request budgets: 60, 60 and 20 per minute respectively. Authentication and read-only middleware remain in place. The normal shell heartbeat stays at 120 seconds, with the existing single-flight/cancellation behavior. No polling frequency increase, migration, new background job or schema change is introduced.

## Verification

Passed **917 PHP tests / 10,327 assertions** and **483 JavaScript tests**. New feature tests exercise expired presence, corrupt registry/cache data, Unicode compatibility, invalid inputs, public field projection, lock contention, the single bulk read, zero warm SQL and isolated rate limits. Existing last-seen, mood visibility, viewer and polling tests also pass. Explicit-file Pint and whitespace checks pass.

The actual presence IIFE and shared background-read helper pass headless Chrome tests on desktop and mobile in light and dark modes. Checks cover live response rendering, counts/overflow, scroll controls, chat-button payloads, outside/programmatic close, literal rendering of unsafe strings and absence of injected DOM/event attributes. Browser fixtures use synthetic data and do not send real chat messages.

A production candidate check passes using unsaved synthetic identities, an array cache/session and a read-only database transaction. It confirms one bulk presence read, zero warm SQL, malformed-input rejection, cache normalization, contended-lock behavior and route guards/budgets. No real accounts, real presence cache, documents or notification channels are modified. Array-cache timing is not a Redis or whole-site performance benchmark.

Rollout backs up changed application files, route caches and the published shell asset; checks the exact commit/file allowlist; verifies the staged candidate; rebuilds route cache; and publishes the shell asset atomically. Deployed checks repeat the synthetic probe and verify public asset hashes, public health and unauthenticated access. A file/cache rollback is prepared if verification fails.
