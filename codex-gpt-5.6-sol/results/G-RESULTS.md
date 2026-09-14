# Codex G: Structured context presentation pilot

6/6 scheduled trials correct. **9.44% aggregate cost saving** (negative means increased cost): plain $1.5826472, TokenSaver $1.4332192. 1/3 matched pairs cost less with TokenSaver. Savings are the ratio of summed dollars, not an average of pair percentages.

| Task | Pair | Plain USD | TokenSaver USD | Saving |
|---|---:|---:|---:|---:|
| subscript-pairing | 1 | $0.6447992 | $0.6883336 | -6.75% |
| path-caret-encoding | 1 | $0.6243552 | $0.4310864 | 30.95% |
| columns-overflow | 1 | $0.3134928 | $0.3137992 | -0.10% |

| Metric | Plain | TokenSaver |
|---|---:|---:|
| Input including cache | 1,630,954 | 1,495,724 |
| Cached input (subset) | 1,470,208 | 1,369,088 |
| Ordinary input | 160,746 | 126,636 |
| Output including reasoning | 17,579 | 18,952 |
| Model requests | 45 | 51 |
| Tool calls | 37 | 46 |
| Native context queries | 0 | 9 |
| Hook invocations | 0 | Unavailable |
| Hook rewrites | 0 | Unavailable |
| Agent elapsed seconds, summed | 525.316 | 645.051 |

Wall time changed by 22.79%. Explicit cache writes were zero in every reconciled request. Input includes cache reads; do not add the cached subset again. Reasoning is included in priced output once. These fixed-rate API-equivalent costs are not subscription invoices.

## Method and interpretation

GPT-5.6 Sol, high effort, official Codex CLI 0.152.1, Linux under WSL. Real historical Rust maintenance tasks: inspect source, edit code, run project tests, then independent acceptance checks. Both arms use the same pinned task inputs, guide, model and effort. Trials run sequentially with bounded CPU, memory and process counts. Task definitions are shared with [the heavier Claude tasks](../../claude-sonnet-5/tasks/).

Treatment uses TokenSaver context tools, proxy compression and the installed command-output hook. Tool use is optional. Treatment uses HTTP Responses; plain Codex uses its native direct-provider path. Provider caching is observed, not controlled. This three-task study is inspired by completed-agent-task comparisons; it is not a replication of the much larger JetBrains study or a competitor ranking.

This six-trial pilot required confirmation. Auxiliary hook records interleaved during simultaneous writes, so hook counts are unavailable. Original records are preserved; provider request usage and correctness reconciled independently.



## Evidence

- [Independent audit](../evidence/g/independent-audit.json)
- [Reconciled per-request usage](../evidence/g/request-usage.jsonl)
- [Frozen-source integrity verification](../evidence/g/integrity.json)
- [Prespecified order](../evidence/g/schedule.json) and [fixed study tariffs](../evidence/g/rates.json)

The released evidence excludes authentication, private session transcripts and proprietary implementation. Original local evidence is retained.
