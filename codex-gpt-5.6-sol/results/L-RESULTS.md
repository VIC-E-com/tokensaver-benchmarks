# Codex L: composable structured context pilot

6/6 scheduled trials passed the independent acceptance checks. Plain cost $1.8844968; TokenSaver cost $1.9389408; aggregate saving **-2.89%**. The pilot did not establish the 15% target; retain these results and investigate before changing the candidate.

Same pinned public tasks, GPT-5.6 Sol high effort and official Codex 0.152.1 as H. This tests structured context tools through the official Codex code-mode interface. The native host, application, proxy and command-output policy are unchanged from K. Only the forced direct context-tool namespace setting was removed. The proxy, installed application, command-output hook and task inputs were retained. No video was recorded.

| Metric | Plain Codex | TokenSaver |
|---|---:|---:|
| Input including cache | 2,224,231 | 2,323,980 |
| Cached input (subset) | 2,058,752 | 2,175,872 |
| Output including reasoning | 19,954 | 23,808 |
| Model requests | 61 | 79 |
| Tool calls | 55 | 61 |
| Native queries | 0 | 0 |
| Hook invocations | 0 | 61 |
| Hook rewrites | 0 | 16 |

| Task | Plain Codex | TokenSaver | Saving |
|---|---:|---:|---:|
| subscript-pairing | $0.9341680 | $0.9739736 | -4.26% |
| path-caret-encoding | $0.4477568 | $0.5740296 | -28.20% |
| columns-overflow | $0.5025720 | $0.3909376 | 22.21% |

Agent seconds: 585.705 plain versus 743.434 TokenSaver. All request usage was independently reconciled and repriced using the fixed [study rates](../evidence/l/rates.json). These are API-equivalent costs, not subscription invoices. Cached input is included in input; output includes reasoning once.

All three optimization paths were configured. Successful native responses and command-hook activity are counted above. Configuration and availability do not prove a tool was used: zero native queries means no source-query contribution was observed for that arm, and no individual-feature savings is claimed. The actual client executed 5 optimized command chains. Existing preapproved command permissions were retained; this extension is inactive for missing or interactive permission modes. Local activity is not converted into monetary savings.

The complete balanced six-trial pilot is retained, including unfavorable pairs. One pair per task is a development signal, not a stable estimate or universal guarantee. L is a different candidate from G/H and is not pooled into their confirmation result. [Audited evidence](../evidence/l/independent-audit.json), [per-request usage](../evidence/l/request-usage.jsonl), [integrity](../evidence/l/integrity.json).
