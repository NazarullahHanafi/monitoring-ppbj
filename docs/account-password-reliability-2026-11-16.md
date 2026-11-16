# Account password validation and reliable saves

The account page used `Math.random()` to generate passwords and depended on a successful clipboard write to finish its feedback. Its authenticated alternative `/password` route did not share the account route's read-only guard or attempt budget. Password writes also needed consistent handling of null bytes, byte limits, and concurrent credential changes.

## Changes

- Account, profile-password, and token-reset validation reject arrays, null bytes, and oversized new passwords before hashing. The shared storage rule enforces bcrypt's 72-byte limit while allowing the configured Argon driver to use longer passwords within the 255-character bound. Existing complexity policies and HTML redirects/error bags are preserved. Confirmation input and reset token/email shapes are bounded too.
- Both authenticated self-change routes share five attempts per minute per user and the read-only guard. Token reset and password confirmation have separate five-attempt budgets.
- Authenticated self-changes compute the new hash before taking the row lock, then re-read only ID, password, remember token, active state, and role. An intervening password change produces a conflict rather than being overwritten. A newly disabled/viewer account cannot save. Only credentials are changed, preserving concurrent edits to other profile fields.
- Successful self-change rotates the remember-me token. This invalidates older remember-me credentials; it does not perform a logout of other existing sessions.
- The account form uses a versioned external script, shared FormUX field validation, and private JSON success responses, while native HTML submission remains supported. One save can be pending at a time; errors restore controls and retain the new-password draft. A credential conflict clears the stale current password.
- The response deadline covers body parsing as well as the fetch. HTML responses, redirects, malformed payloads, server failures, or connection loss cannot be mistaken for confirmation. Saves are never retried automatically; uncertain results tell the user to check before trying again.
- The generator uses Web Crypto with rejection sampling and a Fisher–Yates shuffle, producing sixteen characters with uppercase, lowercase, digits, and symbols. Clipboard rejection has an inline manual-copy fallback. Generated passwords remain masked until explicitly revealed.
- Success clears all password fields. Leaving the page clears and masks them, including before a back/forward-cache restore; late responses cannot clear a subsequent draft. Hiding the tab masks any revealed fields. The script does not store credentials in browser storage.

## Verification

- Full PHP suite: **833 tests, 9,254 assertions**, passed.
- Full JavaScript suite: **401 tests**, passed.
- Browser regression passed for desktop and mobile sizes using the real account form with synthetic responses. It covers field validation, multibyte limits, crypto generation, denied clipboard access, duplicate submissions, literal error rendering, stale credentials, malformed responses, clearing on success/navigation, masking, and late responses.
- Feature tests verify changes limited to the authenticated account, token rotation, a two-query write budget, stale-password conflicts on both routes, fresh role/active-state checks, valid one-time reset tokens, shared/independent rate budgets, and preservation of error bags and secrets exclusions from flash input.
- Pint, syntax, and whitespace checks passed.

The deployment uses a clean expected baseline, an exact thirteen-file allowlist, private backups, and a staged candidate check. Production verification uses a read-only SQL transaction, an in-memory cache, synthetic credentials, and a no-op updater for the success-response contract. It validates input boundaries and middleware without invoking a real password update or sending account recovery messages. The new public asset is published before the view references it; route/view caches, public asset SHA-256, health/login/recovery pages, and unauthenticated account access are checked afterward.

These checks cover this release's password workflows. They do not establish a universal performance or security guarantee for every feature.
