# Codex K: command-output coverage pilot

6/6 scheduled trials passed the independent acceptance checks. Reported-request cost: plain $1.9018960; TokenSaver $1.9071736. **This cohort is not a clean savings comparison.** One raw trial encountered provider capacity and completed by resuming the same session. Both usage segments are included. The failed request supplied no usage; its cost remains unknown. The arithmetic difference across reported requests is -0.28%, which does not qualify the 15% target. The pilot did not establish the 15% target; retain these results and investigate before changing the candidate.

Same pinned public tasks, GPT-5.6 Sol high effort and official Codex 0.152.1 as H. This tests an experimental command-output hook coverage change, with H context presentation unchanged. The proxy, installed application, command-output hook and task inputs were retained. No video was recorded.

| Metric | Plain Codex | TokenSaver |
|---|---:|---:|
| Input including cache | 1,712,671 | 2,153,759 |
| Cached input (subset) | 1,489,280 | 1,977,984 |
| Output including reasoning | 20,631 | 20,644 |
| Model requests | 49 | 59 |
| Tool calls | 45 | 50 |
| Native queries | 0 | 8 |
| Hook invocations | 0 | 41 |
| Hook rewrites | 0 | 14 |

| Task | Plain Codex | TokenSaver | Saving |
|---|---:|---:|---:|
| subscript-pairing | $0.9988560 | $1.1946480 | Not qualified |
| path-caret-encoding | $0.4380936 | $0.4386688 | -0.13% |
| columns-overflow | $0.4649464 | $0.2738568 | 41.10% |

Agent seconds: 619.721 plain versus 668.646 TokenSaver. All available reported request usage was independently reconciled and repriced using the fixed [study rates](../evidence/k/rates.json). These are API-equivalent costs, not subscription invoices. Cached input is included in input; output includes reasoning once.

All three optimization paths were configured. Successful native responses and command-hook activity are counted above. The actual client executed 6 optimized command chains. Existing preapproved command permissions were retained; this extension is inactive for missing or interactive permission modes. Local activity is not converted into monetary savings.

The complete planned six-trial schedule is retained, including unfavorable pairs and the interrupted control. Original failed events and both request-usage segments are preserved. Recovered controls are explicitly excluded from clean savings qualification. One pair per task is a development signal, not a stable estimate or universal guarantee. K is a different candidate from G/H and is not pooled into their confirmation result. [Audited evidence](../evidence/k/independent-audit.json), [per-request usage](../evidence/k/request-usage.jsonl), [integrity](../evidence/k/integrity.json).
