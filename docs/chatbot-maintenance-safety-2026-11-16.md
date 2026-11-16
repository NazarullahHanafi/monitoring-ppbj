# Chatbot maintenance safety - 16 November 2026

Maintenance commands could previously execute when a chat message merely mentioned a command, including a question or negation. Array input could throw a TypeError; nonzero Artisan exit codes were reported as successful. Independent direct/chat route limits also allowed overlapping maintenance operations.

## Execution behavior

- Only a complete, whitelisted command executes. Accepted prefixes are `php artisan`, `artisan`, `run`, `jalankan`, and `execute`; the bare command is also accepted. Case and horizontal spacing are normalized. Additional prose, questions, negations, options, shell operators, multiple commands, and embedded newlines are rejected with HTTP 422.
- Input must be a string of at most 200 characters. Authorization precedes validation. The existing Superadmin Umum restriction, authenticated routes, CSRF, and read-only middleware remain.
- All nine existing commands remain available. Chat intent recognition now also recognizes bare `config:cache`, `route:cache`, and `view:cache`. A mention receives a local rejection/instruction instead of executing it.
- Successful exit code zero is required before reporting success. Nonzero exits and Throwables return explicit failures. Command output is discarded with NullOutput; responses and audit logs do not include raw output, stack traces, server paths, or email addresses. Logs retain actor ID, command, exit code or exception class.
- Command/list responses are private and not stored by caches. The existing chatbot handles JSON errors without native browser validation dialogs; no new frontend bundle is required.

## Server load protection

`MaintenanceCommandGate` uses a nonblocking OS file lock held throughout execution. A competing request receives HTTP 409 immediately. There is no lock lease that can expire while a long-running command is still executing; process exit releases the lock.

The same file records at most five execution attempts in a rolling 60-second window, shared across both endpoints and all admins on this application host. Failed commands consume capacity too. HTTP 429 includes Retry-After. The file lives at `storage/framework/chatbot-maintenance.lock`, outside application cache, so cache clearing cannot remove this command lock or budget. Malformed/unreadable/unwritable guard storage fails closed. This protection introduces no procurement queries, migrations, polling, packages, or background jobs.

The guard protects chatbot maintenance on this host. It does not coordinate separate hosts, deployment commands, cron jobs, or direct SSH commands. Existing cache-clearing semantics are unchanged: these commands can invalidate application cache and cause subsequent requests to rebuild it. This release does not claim that running maintenance repeatedly makes normal requests faster, nor does it change the application's cache/session configuration.

## Verification and release

Ten feature regressions exercise exact command parsing, malformed input, guest/role/read-only access, all nine commands through chat, nonzero exits, PHP Errors, lock contention, shared budgets surviving a simulated cache flush, expiration, corrupt storage, and nested workers. Actual maintenance commands are mocked in these tests.

Verification passed: **869 PHP tests / 9,900 assertions**, **424 JavaScript tests**, and explicit-file Pint checks. After strengthening corrupt-guard assertions, the final targeted run also passed **16 tests / 268 assertions**.

Production candidate and deployed verification use synthetic identities, an isolated array cache, a private temporary guard file, a read-only database transaction, and a fake Artisan facade. They verify rejection, serialization, budgets, error handling, private responses, and route guards without executing production maintenance or changing real accounts/documents. Deployment takes a private backup and publishes the new gate dependency before controller changes. Health/authentication checks follow deployment. Existing route/view/config cache files are preserved because no routes, templates, or configuration changed.
