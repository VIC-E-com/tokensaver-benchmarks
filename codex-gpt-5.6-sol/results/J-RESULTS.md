# Codex J: native context delivery pilot

6/6 scheduled trials passed the independent acceptance checks. Plain cost $1.6082752; TokenSaver cost $1.4741952; aggregate saving **8.34%**. The pilot did not establish the 15% target; retain these results and investigate before changing the candidate.

Same pinned public tasks, GPT-5.6 Sol high effort and official Codex 0.152.1 as H. This tests an experimental native context-delivery change with matching tool guidance. The proxy, installed application, command-output hook and task inputs were retained. No video was recorded.

| Metric | Plain Codex | TokenSaver |
|---|---:|---:|
| Input including cache | 1,394,121 | 1,489,806 |
| Cached input (subset) | 1,191,808 | 1,342,208 |
| Output including reasoning | 16,115 | 17,346 |
| Model requests | 43 | 50 |
| Tool calls | 32 | 40 |
| Native queries | 0 | 10 |
| Hook invocations | 0 | 30 |
| Hook rewrites | 0 | 5 |

| Task | Plain Codex | TokenSaver | Saving |
|---|---:|---:|---:|
| subscript-pairing | $0.6092440 | $0.8516104 | -39.78% |
| path-caret-encoding | $0.5810408 | $0.3973304 | 31.62% |
| columns-overflow | $0.4179904 | $0.2252544 | 46.11% |

Agent seconds: 488.466 plain versus 571.595 TokenSaver. All request usage was independently reconciled and repriced using the fixed [study rates](../evidence/j/rates.json). These are API-equivalent costs, not subscription invoices. Cached input is included in input; output includes reasoning once.

All three optimization paths were configured. Successful native responses and command-hook activity are counted above. Additional native delivery activity was verified against persisted source evidence in 3/3 treatment trials. Local activity is not converted into monetary savings.

The complete balanced six-trial pilot is retained, including unfavorable pairs. One pair per task is a development signal, not a stable estimate or universal guarantee. J is a different candidate from G/H and is not pooled into their confirmation result. [Audited evidence](../evidence/j/independent-audit.json), [per-request usage](../evidence/j/request-usage.jsonl), [integrity](../evidence/j/integrity.json).
