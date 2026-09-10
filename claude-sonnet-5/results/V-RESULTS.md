# Cohort V (unchanged confirmation of U): 18 trials, all correct, 13.02% lower cost

Root identifier `ts-sonnet-real-20260909v-facts-confirm`, run 2026-09-10. Identical configuration, binaries, tasks, schedule design and limits to cohort U; only the root differs. All 18 trials passed the project's own test suite and the independent acceptance test. Explicit five-minute prompt caching verified in all 18 trials. Provider usage for every TokenSaver trial reconciled with the independent proxy counters.

| Task | Raw USD (3 pairs) | TokenSaver USD (3 pairs) | Saving | Per pair |
|---|---:|---:|---:|---|
| Duration carry | 0.5306942 | 0.5081498 | 4.25% | +9.4%, -3.1%, +4.2% |
| UTC offset | 0.7561505 | 0.8619505 | -13.99% | +3.3%, -3.2%, -44.4% |
| Symlink traversal | 1.8094462 | 1.3231501 | 26.88% | +31.7%, +33.3%, +9.4% |
| Total | **3.0962909** | **2.6932504** | **13.02%** | 6 of 9 |

Elapsed: 1,287.5 seconds raw versus 1,010.8 TokenSaver (21% less). Tool calls: 117 versus 100.

| Final provider usage, 18 trials | Raw | TokenSaver |
|---|---:|---:|
| Ordinary input tokens | 244 | 216 |
| Cache read tokens | 5,043,677 | 4,331,917 |
| Five-minute cache write tokens | 383,627 | 376,538 |
| One-hour cache write tokens | 0 | 0 |
| Total input tokens | 5,427,548 | 4,708,671 |
| Output tokens including thinking | 112,800 | 88,509 |

Cost decomposition of the $0.4030405 saving: output -$0.2429100, cache reads -$0.1423520, five-minute writes -$0.0177220, ordinary input -$0.0000560.

The one large loss (UTC pair 3, TokenSaver $0.3516 versus raw $0.2436) is a reasoning spike: 12,605 thinking tokens against 5,123 in a shorter 8-request trial. It illustrates the roughly 25% per-pair variance that makes single pairs uninterpretable; the same task won all three pairs in U.

## Pooled U + V, 36 trials

| | Raw USD | TokenSaver USD | Saving |
|---|---:|---:|---:|
| U | 2.9366250 | 2.3043051 | 21.53% |
| V | 3.0962909 | 2.6932504 | 13.02% |
| **U + V** | **6.0329159** | **4.9975555** | **17.16%** |

Sums of costs, both cohorts identified, 15 of 18 pairs favorable, every trial correct. Per task over both cohorts: duration 11.7%, UTC 4.9%, symlink 25.2%. Per-trial detail is in `../evidence/v/independent-audit.json`.
