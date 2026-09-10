# Cohort X (released proxy binary): 18 trials, all correct, 10.83% higher cost

Root identifier `ts-sonnet-real-20260910x-release-proxy`, run 2026-09-10. Identical design to U and V (three counterbalanced pairs per task, same tasks, pinned Claude Code 2.1.236, Claude Sonnet 5 at high effort, explicit five-minute caching verified in all 18 trials, same limits) with one change: the TokenSaver proxy is the released 0.35.0 Linux binary taken from the published release wheel instead of the development build U and V used. All 18 trials passed the project's own test suite and the independent acceptance test. Provider usage for every TokenSaver trial reconciled with the independent proxy counters.

| Task | Plain USD (3 pairs) | TokenSaver USD (3 pairs) | Saving | Per pair |
|---|---:|---:|---:|---|
| Duration carry | 0.3950006 | 0.4102997 | -3.87% | +0.5%, -14.2%, +1.4% |
| UTC offset | 0.7626396 | 1.0200442 | -33.75% | +8.1%, -43.7%, -74.4% |
| Symlink traversal | 1.4028796 | 1.4075775 | -0.33% | +32.3%, -49.6%, +4.1% |
| Total | **2.5605198** | **2.8379214** | **-10.83%** | 5 of 9 |

Elapsed: 1,023.4 seconds plain versus 1,178.9 TokenSaver. Tool calls: 96 versus 93.

| Final provider usage, 18 trials | Plain | TokenSaver |
|---|---:|---:|
| Ordinary input tokens | 208 | 204 |
| Cache read tokens | 4,036,819 | 4,186,592 |
| Five-minute cache write tokens | 353,084 | 388,030 |
| One-hour cache write tokens | 0 | 0 |
| Total input tokens | 4,390,111 | 4,574,826 |
| Output tokens including thinking | 87,003 | 103,012 |

The $0.2774016 increase decomposes into output +$0.1600900, five-minute writes +$0.0873650 and cache reads +$0.0299550. It is concentrated in three trials: UTC pair 2 (9,699 thinking tokens against 5,344 plain, seven edits against four), UTC pair 3 (9,779 against 6,274, 17 requests against 8) and symlink pair 2 (18,861 against 6,112). In every other pair the two arms were within a few percent or TokenSaver won. The request-count reduction that carried U and V is present in X as well (every TokenSaver trial opened with a direct read; every plain trial opened with directory listing or search); the loss is model reasoning variance landing on the treatment side.

## Release binary check

Requested after the result: the released `vic-e` behaved correctly. All 118 upstream requests in X returned status 200 with zero failed or rate-limited requests; prompt-cache continuity held in every treatment trial (no cache-read drops, no rewritten prefixes); compression activity was the same single Grep-result strategy seen in U; the proxy's WARN lines are the same cache-drift heuristics about the client's own request shape that U produced, in proportion to request count. A stopped partial cohort of the same design with a development build of the same source revision (seven complete pairs, not published because it was cut short) sat at +11.2%; identical code and design landing at +11% and -11% is the per-pair variance, not a binary defect. No fix to the binaries is indicated by these data.

## Pooled U + V + X, 54 trials

| | Plain USD | TokenSaver USD | Saving | Pairs won |
|---|---:|---:|---:|---|
| U | 2.9366250 | 2.3043051 | 21.53% | 9 of 9 |
| V | 3.0962909 | 2.6932504 | 13.02% | 6 of 9 |
| X | 2.5605198 | 2.8379214 | -10.83% | 5 of 9 |
| **U + V + X** | **8.5934357** | **7.8354769** | **8.82%** | **20 of 27** |

Sums of costs, all cohorts identified, every trial correct. Per task over the three cohorts: symlink traversal 17.6%, duration carry 7.4%, UTC offset -7.1%. Per-trial detail is in `../evidence/x/independent-audit.json`.
