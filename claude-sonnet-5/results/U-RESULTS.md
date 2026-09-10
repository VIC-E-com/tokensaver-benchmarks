# Cohort U: 18 trials, all correct, 21.53% lower cost

Root identifier `ts-sonnet-real-20260909u-facts-only`, run 2026-09-09. Three counterbalanced pairs per task. All 18 trials passed the project's own test suite and the independent acceptance test. Both arms used explicit five-minute prompt caching (verified per trial), Claude Sonnet 5 at high effort, pinned Claude Code 2.1.236, the same guide text, the same 600-second / 40-turn / $4 CLI limits, one agent at a time under fixed CPU and memory quotas. Provider usage for every TokenSaver trial reconciled with TokenSaver's independent proxy counters.

| Task | Raw USD (3 pairs) | TokenSaver USD (3 pairs) | Saving | Per pair |
|---|---:|---:|---:|---|
| Duration carry | 0.4850264 | 0.3885514 | 19.89% | +5.4%, +16.6%, +33.8% |
| UTC offset | 0.9463173 | 0.7584083 | 19.86% | +3.8%, +41.5%, +4.1% |
| Symlink traversal | 1.5052813 | 1.1573454 | 23.11% | +18.1%, +12.5%, +35.1% |
| Total | **2.9366250** | **2.3043051** | **21.53%** | 9 of 9 |

Elapsed: 1,074.7 seconds raw versus 846.3 TokenSaver (21% less). Tool calls: 127 versus 77. Provider requests are visible per trial in `request-usage.jsonl`.

| Final provider usage, 18 trials | Raw | TokenSaver |
|---|---:|---:|
| Ordinary input tokens | 266 | 172 |
| Cache read tokens | 5,359,390 | 3,231,693 |
| Five-minute cache write tokens | 374,546 | 363,121 |
| One-hour cache write tokens | 0 | 0 |
| Total input tokens | 5,734,202 | 3,594,986 |
| Output tokens including thinking | 92,785 | 74,982 |

Cost decomposition of the $0.6323199 saving at the fixed tariffs: cache reads -$0.4255390, output -$0.1780300, five-minute writes -$0.0285630, ordinary input -$0.0001880.

Per-trial detail, including correctness, resources and the proxy reconciliation deltas, is in `../evidence/u/independent-audit.json`; the full tool-call sequences are in `../evidence/u/tool-sequences.jsonl`.
