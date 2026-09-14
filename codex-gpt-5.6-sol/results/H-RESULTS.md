# Codex H: Independent structured-context confirmation

18/18 scheduled trials correct. **5.77% aggregate cost saving** (negative means increased cost): plain $5.0232864, TokenSaver $4.7334304. 6/9 matched pairs cost less with TokenSaver. Savings are the ratio of summed dollars, not an average of pair percentages.

| Task | Pair | Plain USD | TokenSaver USD | Saving |
|---|---:|---:|---:|---:|
| subscript-pairing | 1 | $0.7995856 | $0.7844872 | 1.89% |
| subscript-pairing | 2 | $0.5995760 | $0.8899408 | -48.43% |
| subscript-pairing | 3 | $0.7229160 | $0.5900472 | 18.38% |
| path-caret-encoding | 1 | $0.4510576 | $0.4119216 | 8.68% |
| path-caret-encoding | 2 | $0.4293944 | $0.3631992 | 15.42% |
| path-caret-encoding | 3 | $0.4898288 | $0.5115328 | -4.43% |
| columns-overflow | 1 | $0.6614616 | $0.4205000 | 36.43% |
| columns-overflow | 2 | $0.5337224 | $0.3728552 | 30.14% |
| columns-overflow | 3 | $0.3357440 | $0.3889464 | -15.85% |

| Metric | Plain | TokenSaver |
|---|---:|---:|
| Input including cache | 5,118,760 | 5,527,845 |
| Cached input (subset) | 4,613,376 | 5,150,336 |
| Ordinary input | 505,384 | 377,509 |
| Output including reasoning | 57,820 | 58,163 |
| Model requests | 146 | 183 |
| Tool calls | 121 | 144 |
| Native context queries | 0 | 24 |
| Hook invocations | 0 | 119 |
| Hook rewrites | 0 | 19 |
| Agent elapsed seconds, summed | 1636.683 | 1861.640 |

Wall time changed by 13.74%. Explicit cache writes were zero in every reconciled request. Input includes cache reads; do not add the cached subset again. Reasoning is included in priced output once. These fixed-rate API-equivalent costs are not subscription invoices.

## Method and interpretation

GPT-5.6 Sol, high effort, official Codex CLI 0.152.1, Linux under WSL. Real historical Rust maintenance tasks: inspect source, edit code, run project tests, then independent acceptance checks. Both arms use the same pinned task inputs, guide, model and effort. Trials run sequentially with bounded CPU, memory and process counts. Task definitions are shared with [the heavier Claude tasks](../../claude-sonnet-5/tasks/).

Treatment uses TokenSaver context tools, proxy compression and the installed command-output hook. Tool use is optional. Treatment uses HTTP Responses; plain Codex uses its native direct-provider path. Provider caching is observed, not controlled. This three-task study is inspired by completed-agent-task comparisons; it is not a replication of the much larger JetBrains study or a competitor ranking.

This 18-trial confirmation follows G. Product binaries, task inputs and optimization behavior remained fixed. Two harness-only changes prevent interleaved auxiliary log records and safely handle a missing initialization field; therefore the harness executable is not byte-identical to G. All hook records are complete. An offline startup-path failure was corrected before inference using digest-verified packaged dependencies; no live trial was dropped. The final audit initially retained a six-trial assertion; a separate reporting amendment changes it to 18, leaving usage arithmetic and original evidence untouched.

The confirmation supports lower cost on this workload, not higher speed or universally lower token totals. More cached input can coexist with lower cost when ordinary input falls. No guaranteed savings rate is established.

## Evidence

- [Independent audit](../evidence/h/independent-audit.json)
- [Reconciled per-request usage](../evidence/h/request-usage.jsonl)
- [Frozen-source integrity verification](../evidence/h/integrity.json)
- [Prespecified order](../evidence/h/schedule.json) and [fixed study tariffs](../evidence/h/rates.json)

The released evidence excludes authentication, private session transcripts and proprietary implementation. Original local evidence is retained.
