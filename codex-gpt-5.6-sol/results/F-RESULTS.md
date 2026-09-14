# Codex F: Direct context-tool pilot

6/6 scheduled trials correct. **-37.69% aggregate cost saving** (negative means increased cost): plain $1.4121216, TokenSaver $1.9443032. 0/3 matched pairs cost less with TokenSaver. Savings are the ratio of summed dollars, not an average of pair percentages.

| Task | Pair | Plain USD | TokenSaver USD | Saving |
|---|---:|---:|---:|---:|
| subscript-pairing | 1 | $0.6737920 | $0.7503480 | -11.36% |
| path-caret-encoding | 1 | $0.2960648 | $0.7173936 | -142.31% |
| columns-overflow | 1 | $0.4422648 | $0.4765616 | -7.75% |

| Metric | Plain | TokenSaver |
|---|---:|---:|
| Input including cache | 1,484,150 | 2,323,147 |
| Cached input (subset) | 1,346,944 | 2,157,568 |
| Ordinary input | 137,206 | 165,579 |
| Output including reasoning | 16,226 | 20,948 |
| Model requests | 47 | 69 |
| Tool calls | 35 | 55 |
| Native context queries | 0 | 12 |
| Hook invocations | 0 | 40 |
| Hook rewrites | 0 | 9 |
| Agent elapsed seconds, summed | 552.586 | 696.555 |

Wall time changed by 26.05%. Explicit cache writes were zero in every reconciled request. Input includes cache reads; do not add the cached subset again. Reasoning is included in priced output once. These fixed-rate API-equivalent costs are not subscription invoices.

## Method and interpretation

GPT-5.6 Sol, high effort, official Codex CLI 0.152.1, Linux under WSL. Real historical Rust maintenance tasks: inspect source, edit code, run project tests, then independent acceptance checks. Both arms use the same pinned task inputs, guide, model and effort. Trials run sequentially with bounded CPU, memory and process counts. Task definitions are shared with [the heavier Claude tasks](../../claude-sonnet-5/tasks/).

Treatment uses TokenSaver context tools, proxy compression and the installed command-output hook. Tool use is optional. Treatment uses HTTP Responses; plain Codex uses its native direct-provider path. Provider caching is observed, not controlled. This three-task study is inspired by completed-agent-task comparisons; it is not a replication of the much larger JetBrains study or a competitor ranking.

This configuration lost in aggregate and was not repeated unchanged to select a better outcome. Later configurations are separate cohorts, not replacements for this result.



## Evidence

- [Independent audit](../evidence/f/independent-audit.json)
- [Reconciled per-request usage](../evidence/f/request-usage.jsonl)
- [Frozen-source integrity verification](../evidence/f/integrity.json)
- [Prespecified order](../evidence/f/schedule.json) and [fixed study tariffs](../evidence/f/rates.json)

The released evidence excludes authentication, private session transcripts and proprietary implementation. Original local evidence is retained.
