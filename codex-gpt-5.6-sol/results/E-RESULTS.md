# Codex E: Original long-task configuration

18/18 scheduled trials correct. **-19.73% aggregate cost saving** (negative means increased cost): plain $4.2180664, TokenSaver $5.0501440. 0/9 matched pairs cost less with TokenSaver. Savings are the ratio of summed dollars, not an average of pair percentages.

| Task | Pair | Plain USD | TokenSaver USD | Saving |
|---|---:|---:|---:|---:|
| subscript-pairing | 1 | $0.5696536 | $0.8868664 | -55.69% |
| subscript-pairing | 2 | $0.8746568 | $0.9829824 | -12.38% |
| subscript-pairing | 3 | $0.4997976 | $0.6466800 | -29.39% |
| path-caret-encoding | 1 | $0.3704152 | $0.3948400 | -6.59% |
| path-caret-encoding | 2 | $0.4642056 | $0.5127712 | -10.46% |
| path-caret-encoding | 3 | $0.4625456 | $0.4868864 | -5.26% |
| columns-overflow | 1 | $0.3375000 | $0.4179600 | -23.84% |
| columns-overflow | 2 | $0.3093408 | $0.3218616 | -4.05% |
| columns-overflow | 3 | $0.3299512 | $0.3992960 | -21.02% |

| Metric | Plain | TokenSaver |
|---|---:|---:|
| Input including cache | 4,130,909 | 6,166,315 |
| Cached input (subset) | 3,700,736 | 5,775,360 |
| Ordinary input | 430,173 | 390,955 |
| Output including reasoning | 50,854 | 58,809 |
| Model requests | 131 | 214 |
| Tool calls | 118 | 171 |
| Native context queries | 0 | 0 |
| Hook invocations | 0 | 171 |
| Hook rewrites | 0 | 26 |
| Agent elapsed seconds, summed | 1549.685 | 2075.490 |

Wall time changed by 33.93%. Explicit cache writes were zero in every reconciled request. Input includes cache reads; do not add the cached subset again. Reasoning is included in priced output once. These fixed-rate API-equivalent costs are not subscription invoices.

## Method and interpretation

GPT-5.6 Sol, high effort, official Codex CLI 0.152.1, Linux under WSL. Real historical Rust maintenance tasks: inspect source, edit code, run project tests, then independent acceptance checks. Both arms use the same pinned task inputs, guide, model and effort. Trials run sequentially with bounded CPU, memory and process counts. Task definitions are shared with [the heavier Claude tasks](../../claude-sonnet-5/tasks/).

Treatment uses TokenSaver context tools, proxy compression and the installed command-output hook. Tool use is optional. Treatment uses HTTP Responses; plain Codex uses its native direct-provider path. Provider caching is observed, not controlled. This three-task study is inspired by completed-agent-task comparisons; it is not a replication of the much larger JetBrains study or a competitor ranking.

This configuration lost in aggregate and was not repeated unchanged to select a better outcome. Later configurations are separate cohorts, not replacements for this result.



## Evidence

- [Independent audit](../evidence/e/independent-audit.json)
- [Reconciled per-request usage](../evidence/e/request-usage.jsonl)
- [Frozen-source integrity verification](../evidence/e/integrity.json)
- [Prespecified order](../evidence/e/schedule.json) and [fixed study tariffs](../evidence/e/rates.json)

The released evidence excludes authentication, private session transcripts and proprietary implementation. Original local evidence is retained.
