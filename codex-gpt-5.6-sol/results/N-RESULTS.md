# Codex N: unchanged source-fidelity confirmation

18/18 scheduled trials passed the independent acceptance checks. Plain cost $5.0827568; TokenSaver cost $4.8544112; aggregate saving **4.49%**. The unchanged confirmation did not retain the 15% target; preserve the full result and investigate before another candidate.

Independent confirmation of M using the same pinned public tasks, GPT-5.6 Sol high effort and official Codex 0.152.1. The exact candidate proxy, native host, installed application/worker, command-output hook, task inputs, guides and harness binary were retained. Eighteen new trials, three counterbalanced pairs per task; no runtime change or intermediate tuning. No video was recorded.

| Metric | Plain Codex | TokenSaver |
|---|---:|---:|
| Input including cache | 5,473,008 | 5,433,119 |
| Cached input (subset) | 4,962,432 | 5,021,568 |
| Output including reasoning | 52,774 | 59,979 |
| Model requests | 147 | 171 |
| Tool calls | 112 | 131 |
| Native queries | 0 | 20 |
| Hook invocations | 0 | 110 |
| Hook rewrites | 0 | 34 |

| Task | Plain Codex | TokenSaver | Saving |
|---|---:|---:|---:|
| subscript-pairing / pair 1 | $0.6254648 | $0.8040408 | -28.55% |
| subscript-pairing / pair 2 | $0.7914744 | $0.7160160 | 9.53% |
| subscript-pairing / pair 3 | $0.8766800 | $0.8244024 | 5.96% |
| path-caret-encoding / pair 1 | $0.4620264 | $0.5057312 | -9.46% |
| path-caret-encoding / pair 2 | $0.5410272 | $0.4188640 | 22.58% |
| path-caret-encoding / pair 3 | $0.4213608 | $0.4756856 | -12.89% |
| columns-overflow / pair 1 | $0.4191512 | $0.4819320 | -14.98% |
| columns-overflow / pair 2 | $0.3944888 | $0.2966176 | 24.81% |
| columns-overflow / pair 3 | $0.5510832 | $0.3311216 | 39.91% |

Agent seconds: 1594.916 plain versus 1896.305 TokenSaver. All request usage was independently reconciled and repriced using the fixed [study rates](../evidence/n/rates.json). These are API-equivalent costs, not subscription invoices. Cached input is included in input; output includes reasoning once.

All three optimization paths were configured. Successful native responses and command-hook activity are counted above. The actual client executed 11 optimized command chains. Existing command permissions were retained. Local activity is not converted into monetary savings.

The entire prospectively scheduled 18-trial confirmation is retained, including unfavorable pairs. This tests repeatability on three pinned Rust maintenance tasks, not a universal savings rate or an independent test of new projects. M and N are reported separately; no pooled figure is used to hide a missed confirmation target. [Audited evidence](../evidence/n/independent-audit.json), [per-request usage](../evidence/n/request-usage.jsonl), [integrity](../evidence/n/integrity.json).


## Cost components

Uncached input cost fell 19.39%, but cached-input and output costs rose. Those increases reduced the completed-task saving to 4.49%. Every component was repriced per request and reconciles exactly to the totals. See [cost components](../evidence/n/cost-components.json).

| Cost bucket (USD) | Raw | TokenSaver |
|---|---:|---:|
| Ordinary input | 2.0423040 | 1.6462040 |
| Cached input | 1.9849728 | 2.0086272 |
| Explicit writes | 0 | 0 |
| Output including reasoning | 1.0554800 | 1.1995800 |
