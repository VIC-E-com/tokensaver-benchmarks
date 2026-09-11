# Cohort AF (heavier workspace tasks, shipping configuration, confirmation of AE): 18 trials, all correct in both arms, sums 0.7% lower, mean paired cost 13.8% lower, 7 of 9 pairs

Root identifier `ts-sonnet-real-20260911af-confirm`, run 2026-09-11. Identical to cohort AE in every input: same three heavier tasks, trees, acceptance tests, limits, guide, pinned Claude Code 2.1.236, Claude Sonnet 5 at high effort, explicit five-minute caching in all 18 trials, corrected build, the small repository summary before the first request, command-output shortening off. One interruption: the subscription login expired after four trials; the fourteen failed attempts are preserved as `*-incomplete-1` and the cohort resumed after the login was renewed.

| Task | Pair | Plain USD | TokenSaver USD | Change | Correct (plain / TS) | Requests (plain / TS) | Seconds (plain / TS) | Compactions (plain / TS) |
|---|---:|---:|---:|---:|---|---|---|---|
| columns-overflow | 1 | 0.3587613 | 0.4085322 | +13.9% | yes / yes | 21 / 14 | 158 / 231 | 0 / 0 |
| columns-overflow | 2 | 0.3339064 | 0.2255893 | -32.4% | yes / yes | 22 / 13 | 505 / 101 | 0 / 0 |
| columns-overflow | 3 | 0.6779119 | 0.4739137 | -30.1% | yes / yes | 37 / 18 | 620 / 270 | 0 / 0 |
| path-caret-encoding | 1 | 0.3593294 | 0.2788412 | -22.4% | yes / yes | 26 / 20 | 133 / 105 | 0 / 0 |
| path-caret-encoding | 2 | 0.3995565 | 0.3152171 | -21.1% | yes / yes | 30 / 24 | 128 / 115 | 0 / 0 |
| path-caret-encoding | 3 | 0.3406558 | 0.2212604 | -35.0% | yes / yes | 24 / 16 | 141 / 85 | 0 / 0 |
| subscript-pairing | 1 | 2.1186898 | 2.0889182 | -1.4% | yes / yes | 67 / 67 | 808 / 964 | 0 / 0 |
| subscript-pairing | 2 | 1.8134190 | 2.5086497 | +38.3% | yes / yes | 61 / 55 | 826 / 1196 | 0 / 1 |
| subscript-pairing | 3 | 1.8303364 | 1.6510148 | -9.8% | yes / yes | 61 / 51 | 788 / 737 | 0 / 0 |

| Task | Pairs | Plain USD | TokenSaver USD | Saving (sums) | Mean paired change | Pairs won |
|---|---:|---:|---:|---:|---:|---|
| columns-overflow (textwrap) | 3 | 1.3705796 | 1.1080352 | 19.16% | -18.7% | 2 of 3 |
| path-caret-encoding (rust-url) | 3 | 1.0995417 | 0.8153187 | 25.85% | -26.5% | 3 of 3 |
| subscript-pairing (pulldown-cmark) | 3 | 5.7624452 | 6.2485827 | -8.44% | +7.2% | 2 of 3 |
| **All** | 9 | **8.2325665** | **8.1719366** | **0.74%** | **-13.8%** | **7 of 9** |

Mean paired log-ratio -0.148 (SD 0.256, SE 0.085); median pair -21.1%. Correct: 9 of 9 in both arms.

Usage totals (9 trials per arm): plain ordinary input 710 / cache read 19,605,820 / five-minute cache write 616,693 / output including thinking 276,825 / 349 requests / 4,107 s; TokenSaver 3,893 / 17,030,353 / 686,692 / 304,135 / 278 requests / 3,803 s. One compaction (TokenSaver, pulldown-cmark pair 2), priced from the client's own model usage.

## Reading

Seven of nine pairs repeat AE: fewer requests (278 against 349 over the cohort), the medium tasks 19 to 35% cheaper in five of six pairs, pulldown-cmark level or cheaper in two of three. The cohort's sum is nevertheless flat because one pulldown-cmark pair went the other way by 38%: the TokenSaver trial made fewer tool calls than its plain counterpart (55 against 61) but produced far more output, crossed the client's compaction threshold, and paid for it. This is the shape every remaining loss in the shipping configuration has taken, in AE and AF alike: not more searching or reading, but one or two requests in which the model reasons for minutes. It falls on either arm with equal odds (over the fifteen textwrap pairs across all cohorts the two arms think the same amount on average), which is why the median pair (-21%) and the mean pair (-14%) are the steadier readings and why the sum of a nine-pair cohort can swing on one trial.

## Shipping configuration, pooled

| Cohorts | Pairs | Correct (plain, TS) | Plain USD | TokenSaver USD | Saving (sums) | Mean paired change | Median pair | Pairs won |
|---|---:|---|---:|---:|---:|---:|---:|---|
| AE | 9 | 9/9, 9/9 | 8.5276288 | 6.2575041 | 26.62% | -23.4% | -20.9% | 8 of 9 |
| AF | 9 | 9/9, 9/9 | 8.2325665 | 8.1719366 | 0.74% | -13.8% | -21.1% | 7 of 9 |
| **AE + AF** | **18** | **18/18, 18/18** | **16.7601953** | **14.4294407** | **13.9%** | **-18.7%** | **-21.0%** | **15 of 18** |

Per task over the 18 pairs: textwrap 19.6% lower (4 of 6), rust-url 25.3% lower (6 of 6), pulldown-cmark 10.6% lower (5 of 6). A third identical cohort follows; the next cohort before it measures a bounded-effort variant aimed at the reasoning spikes described above, with correctness as its gate.

Per-trial detail: `../evidence/af/independent-audit.json`.
