# Codex M: source-fidelity pilot

6/6 scheduled trials passed the independent acceptance checks. Plain cost $1.9337648; TokenSaver cost $1.5964504; aggregate saving **17.44%**. The pilot reached the 15% target; independent unchanged confirmation is required.

Same pinned public tasks, GPT-5.6 Sol high effort and official Codex 0.152.1 as H. This tests a source-fidelity correction in the proxy. K’s direct context presentation, native host, installed application, command-output hook, task inputs and harness binary were retained. The proxy was built from its previous frozen source revision plus the correction, excluding unrelated recent changes. No video was recorded.

| Metric | Plain Codex | TokenSaver |
|---|---:|---:|
| Input including cache | 2,079,743 | 1,691,533 |
| Cached input (subset) | 1,873,152 | 1,529,856 |
| Output including reasoning | 17,907 | 16,890 |
| Model requests | 59 | 53 |
| Tool calls | 36 | 41 |
| Native queries | 0 | 8 |
| Hook invocations | 0 | 33 |
| Hook rewrites | 0 | 8 |

| Task | Plain Codex | TokenSaver | Saving |
|---|---:|---:|---:|
| subscript-pairing | $0.8258936 | $0.6407024 | 22.42% |
| path-caret-encoding | $0.4946624 | $0.5582712 | -12.86% |
| columns-overflow | $0.6132088 | $0.3974768 | 35.18% |

Agent seconds: 482.104 plain versus 505.885 TokenSaver. All request usage was independently reconciled and repriced using the fixed [study rates](../evidence/m/rates.json). These are API-equivalent costs, not subscription invoices. Cached input is included in input; output includes reasoning once.

All three optimization paths were configured. Successful native responses and command-hook activity are counted above. The actual client executed 3 optimized command chains. Existing command permissions were retained. Local activity is not converted into monetary savings.

The complete balanced six-trial pilot is retained, including unfavorable pairs. One pair per task is a development signal, not a stable estimate or universal guarantee. M is a different candidate from G/H and is not pooled into their confirmation result. [Audited evidence](../evidence/m/independent-audit.json), [per-request usage](../evidence/m/request-usage.jsonl), [integrity](../evidence/m/integrity.json).
