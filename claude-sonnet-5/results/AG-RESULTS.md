# Cohort AG (heavier workspace tasks, shipping configuration, second confirmation of AE): 18 trials, all correct in both arms, sums 2.7% higher, mean paired cost 7.9% higher, 3 of 9 pairs

Root identifier `ts-sonnet-real-20260911ag-confirm-2`, run 2026-09-12. Identical to cohorts AE and AF in every input: same three heavier tasks, trees, acceptance tests, limits, guide, pinned Claude Code 2.1.236, Claude Sonnet 5 at high effort, explicit five-minute caching in all 18 trials, corrected build, the small repository summary before the first request, command-output shortening off. One trial (textwrap pair 2, plain) ended without a result and was re-run; the failed attempt is preserved as `pair2-raw-incomplete-1`.

| Task | Pair | Plain USD | TokenSaver USD | Change | Correct (plain / TS) | Requests (plain / TS) | Seconds (plain / TS) |
|---|---:|---:|---:|---:|---|---|---|
| columns-overflow | 1 | 0.1676145 | 0.3006927 | +79.4% | yes / yes | 12 / 12 | 99 / 192 |
| columns-overflow | 2 | 0.2621313 | 0.2955058 | +12.7% | yes / yes | 18 / 15 | 266 / 154 |
| columns-overflow | 3 | 0.5078534 | 0.3707956 | -27.0% | yes / yes | 30 / 20 | 240 / 389 |
| path-caret-encoding | 1 | 0.2462967 | 0.3333020 | +35.3% | yes / yes | 20 / 21 | 117 / 118 |
| path-caret-encoding | 2 | 0.3581388 | 0.3414144 | -4.7% | yes / yes | 27 / 23 | 152 / 125 |
| path-caret-encoding | 3 | 0.2690838 | 0.2827871 | +5.1% | yes / yes | 21 / 15 | 118 / 101 |
| subscript-pairing | 1 | 1.6983018 | 2.0423953 | +20.3% | yes / yes | 54 / 62 | 676 / 810 |
| subscript-pairing | 2 | 2.2144416 | 1.2239641 | -44.7% | yes / yes | 66 / 36 | 891 / 612 |
| subscript-pairing | 3 | 1.5107830 | 2.2427052 | +48.4% | yes / yes | 56 / 60 | 632 / 1080 |

| Task | Pairs | Plain USD | TokenSaver USD | Saving (sums) | Mean paired change | Pairs won |
|---|---:|---:|---:|---:|---:|---|
| columns-overflow (textwrap) | 3 | 0.9375992 | 0.9669941 | -3.14% | +13.9% | 1 of 3 |
| path-caret-encoding (rust-url) | 3 | 0.8735193 | 0.9575035 | -9.61% | +10.7% | 1 of 3 |
| subscript-pairing (pulldown-cmark) | 3 | 5.4235264 | 5.5090646 | -1.58% | -0.4% | 1 of 3 |
| **All** | 9 | **7.2346449** | **7.4335622** | **-2.75%** | **+7.9%** | **3 of 9** |

Mean paired log-ratio +0.076 (SD 0.361, SE 0.120); median pair +5.1%. Correct: 9 of 9 in both arms. Usage totals (9 trials per arm): plain cache read 17,457,557 / five-minute cache write 550,243 / output including thinking 236,629 / 304 requests; TokenSaver 16,033,551 / 637,288 / 263,254 / 264 requests.

## Shipping configuration, pooled over three identical cohorts

| Cohorts | Pairs | Correct (plain, TS) | Plain USD | TokenSaver USD | Saving (sums) | Mean paired saving | Median pair saving | Pairs won |
|---|---:|---|---:|---:|---:|---:|---:|---|
| AE | 9 | 9/9, 9/9 | 8.5276288 | 6.2575041 | 26.6% | 23.4% | 20.9% | 8 of 9 |
| AF | 9 | 9/9, 9/9 | 8.2325665 | 8.1719366 | 0.7% | 13.8% | 21.1% | 7 of 9 |
| AG | 9 | 9/9, 9/9 | 7.2346449 | 7.4335622 | -2.7% | -7.9% | -5.1% | 3 of 9 |
| **AE + AF + AG** | **27** | **27/27, 27/27** | **23.9948402** | **21.8630029** | **8.9%** | **10.7%** | **6.6%** | **18 of 27** |

Pooled mean paired log-ratio -0.113 (SD 0.32, SE 0.06). Per task over 27 pairs: textwrap 9.7% lower (5 of 9), rust-url 14.9% lower (7 of 9), pulldown-cmark 7.4% lower (6 of 9).

## Reading

Three identical cohorts of one configuration landed at 23% lower, 14% lower and 8% higher on the typical pair. That spread is the central fact of these heavier tasks: the cost of a trial is decided by a few requests in which the model reasons for minutes, and those fall on either arm with equal odds. It is why no nine-pair cohort is quoted alone, why every cohort is published, and why the heavier-task figure for this configuration is the pooled one: 8.9% lower cost over 54 trials, all correct, the typical pair 10.7% lower, 18 of 27 pairs won.

Per-trial detail: `../evidence/ag/independent-audit.json`.
