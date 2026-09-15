# Grok 4.6 — heavy agent maintenance pilot D

Official Grok Build 1.0.30, **Grok 4.6, high effort**. Six planned trials: three matched public Rust maintenance tasks. **4 trials completed correctly; 2 were interrupted or blocked by the budget guard.**

The six-trial comparison did not complete. **No aggregate Grok savings claim is established.** Completed pairs, if any, are shown separately; they do not replace the full planned cohort.

| Task | Arm | Status | Known provider cost | Input incl. cache | Cached subset | Output incl. reasoning | Seconds |
|---|---|---|---:|---:|---:|---:|---:|
| subscript-pairing | TokenSaver | Correct, complete usage | $1.386552 | 2003340 | 1889792 | 35760 | 623.1 |
| subscript-pairing | Raw | Correct, complete usage | $2.241478 | 3005465 | 2694144 | 45294 | 969.2 |
| path-caret-encoding | Raw | Correct, complete usage | $0.443948 | 516562 | 437632 | 11212 | 192.6 |
| path-caret-encoding | TokenSaver | Correct, complete usage | $0.760140 | 738768 | 534272 | 14002 | 237.8 |
| columns-overflow | TokenSaver | Stopped by budget guard | $0.147910 | 121337 | 82176 | 4750 | 82.1 |
| columns-overflow | Raw | Stopped by budget guard | $0.000000 | 0 | 0 | 0 | 0.4 |

## Matched pairs

- subscript-pairing: 38.14% savings ($2.241478 raw; $1.386552 TokenSaver).
- path-caret-encoding: -71.22% savings ($0.443948 raw; $0.760140 TokenSaver).
- columns-overflow: No complete, all-correct comparison.

## Measurement and budget

Verified D provider cost: **$4.980028**. The user kept the entire study budget at **$25**. Earlier attempts and the credential check have **$3.624202** in verified usage, plus one canceled request with unknown cost. Its **$8.20 reserved amount is not measured spend**. Reservations are retained conservatively and can stop the study before the nominal cash limit. The earlier attempts are excluded from D comparisons and retained as study expenses.

Costs come from retained provider usage and independently reconciled `cost_in_usd_ticks`. Input includes cached input; output includes reasoning exactly once. Rates per million: below 200,000 request input tokens, $2 ordinary / $0.50 cached / $6 output; at or above that threshold, $4 / $1 / $12. These are token-priced API costs. [xAI pricing](https://docs.x.ai/developers/pricing).

## Study design

The prompts, public source snapshots, project tests and independent held-out checks are the heavy pulldown-cmark, rust-url and textwrap tasks used in Codex cohort P. Agents can inspect, edit and test code. One agent runs at a time under the same resource limits. Sources, runtime binaries and task artifacts are frozen and hashed. Model responses and provider caching remain variable; a single pair cannot establish sustained savings.

Both arms use the same model and effort. Optional Grok turn summaries and title refresh are disabled equally, because the CLI canceled its final background summary before a receipt in the earlier trial. Initial session-title inference remains enabled and is counted. The observer preserves ordinary cancellation; missing usage stops subsequent inference.

TokenSaver enables proxy compression, the native context engine and the installed command-output optimizer. The Codex-specific startup enhancement is not included. Enabled features and actual use are reported separately below. This is a Grok integration pilot, not a claim about identical default behavior across agent clients.

| Task | Arm | Tool calls | Successful context queries | Hook calls | Rewritten commands |
|---|---|---:|---:|---:|---:|
| subscript-pairing | vice | 71 | 0 | 9 | 0 |
| subscript-pairing | raw | 83 | 0 | 0 | 0 |
| path-caret-encoding | raw | 45 | 0 | 0 | 0 |
| path-caret-encoding | vice | 34 | 4 | 3 | 1 |
| columns-overflow | vice | 18 | 1 | 0 | 0 |
| columns-overflow | raw | 0 | 0 | 0 | 0 |

93 deterministic study-harness tests and strict Clippy passed. An offline test using the installed Grok CLI verified actual native context use, hook rewrite execution, high effort and filesystem isolation. This validation supplements the live experiment; it does not imply universal savings.

[Audited usage and outcomes](../evidence/d/audit.json) · [Frozen artifact provenance](../evidence/d/provenance.json). Raw agent evidence and incomplete diagnostic attempts remain in the private WSL study directories. No video was recorded.

## Completed-pair subset

2 complete matched pairs: raw **$2.685426**, TokenSaver **$2.146692**, or **20.06% lower cost** on this subset. This excludes the interrupted columns task and is **not the planned full-cohort result**. All incurred cost of the interrupted trial remains in the spending audit.

All 113 paid requests in D have complete reconciled receipts. Source and frozen artifact checks passed. The guard stopped because another $8.20 reservation would bring commitments to $25.004230, above $25. Verified expense across the initial check and all attempts is $8.604230; the earlier canceled request remains unknown.

Local compression counters measure removed context, not end-to-end savings. The JSON audit separately includes provider token buckets, cached input, timing, request/response bytes, process resources, actual native/hook activity and proxy counters. No result has been published or independently confirmed.
