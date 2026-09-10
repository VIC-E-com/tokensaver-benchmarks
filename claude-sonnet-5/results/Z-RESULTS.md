# Cohort Z (heavier workspace tasks, released 0.35.0 with a repository-listing change): 18 trials, TokenSaver 9 of 9 correct, sums 18.2% higher, mean paired cost 4.1% lower

Root identifier `ts-sonnet-real-20260910z-listing-v2`, run 2026-09-10. Identical to cohort Y (same three heavier tasks, trees, acceptance tests, limits, guide, released 0.35.0 binary, pinned Claude Code 2.1.236, Claude Sonnet 5 at high effort, explicit five-minute caching in all 18 trials) with one change on the TokenSaver side: the repository summary the agent receives before its first request now covers repositories of any size, with line counts. Two interruptions (a power outage after trial 1, a WSL virtual-machine failure after trial 10) were resumed; the interrupted attempts are preserved in the private record and none entered the figures.

| Task | Pair | Plain USD | TokenSaver USD | Change | Correct (plain / TS) | Requests (plain / TS) | Seconds (plain / TS) |
|---|---:|---:|---:|---:|---|---|---|
| columns-overflow | 1 | 0.4482184 | 0.5221369 | +16.5% | yes / yes | 25 / 26 | 564 / 250 |
| columns-overflow | 2 | 0.4382636 | 0.3062235 | -30.1% | yes / yes | 26 / 8 | 212 / 203 |
| columns-overflow | 3 | 0.7152934 | 0.3132285 | -56.2% | yes / yes | 30 / 19 | 332 / 147 |
| path-caret-encoding | 1 | 0.3660172 | 0.3399878 | -7.1% | yes / yes | 27 / 23 | 121 / 109 |
| path-caret-encoding | 2 | 0.4120406 | 0.2441271 | -40.8% | yes / yes | 30 / 19 | 140 / 97 |
| path-caret-encoding | 3 | 0.2869886 | 0.3516419 | +22.5% | yes / yes | 21 / 23 | 120 / 131 |
| subscript-pairing | 1 | 1.3900979 | 1.4750851 | +6.1% | yes / yes | 40 / 49 | 621 / 755 |
| subscript-pairing | 2 | 1.1812803 | 2.1405897 | +81.2% | yes / yes | 44 / 69 | 504 / 781 |
| subscript-pairing | 3 | 1.6333121 | 2.4320328 | +48.9% | no / yes | 63 / 76 | 590 / 922 |

| Task | Pairs | Plain USD | TokenSaver USD | Saving (sums) | Mean paired change | Pairs won |
|---|---:|---:|---:|---:|---:|---|
| columns-overflow (textwrap) | 3 | 1.6017754 | 1.1415889 | 28.73% | -29.1% | 2 of 3 |
| path-caret-encoding (rust-url) | 3 | 1.0650464 | 0.9357568 | 12.14% | -12.3% | 2 of 3 |
| subscript-pairing (pulldown-cmark) | 3 | 4.2046903 | 6.0477076 | -43.83% | +42.0% | 0 of 3 |
| **Total** | 9 | **6.8715121** | **8.1250533** | **-18.24%** | **-4.1%** | **4 of 9** |

Mean paired change is the preregistered primary outcome (mean of per-pair log cost ratios; standard deviation 0.46, standard error 0.15). TokenSaver was correct in all nine trials; the plain arm failed pulldown-cmark pair 3 on an explicit requirement of the task prompt. Over the eight pairs correct in both arms: sums 5.2382 versus 5.6931 (8.7% higher), mean paired change -9.2%, 4 of 8 pairs.

| Final provider usage, 18 trials | Plain | TokenSaver |
|---|---:|---:|
| Ordinary input tokens | 622 | 642 |
| Cache read tokens | 15,322,953 | 19,402,384 |
| Five-minute cache write tokens | 601,539 | 642,701 |
| One-hour cache write tokens | 0 | 0 |
| Output tokens including thinking | 230,183 | 263,654 |
| Requests | 306 | 312 |

## Y and Z together (18 pairs on the heavier tasks, release 0.35.0)

| | Plain USD | TokenSaver USD | Saving (sums) | Mean paired change | Pairs won |
|---|---:|---:|---:|---:|---|
| Y | 8.3555326 | 8.2746755 | 0.97% | -21.8% | 5 of 9 |
| Z | 6.8715121 | 8.1250533 | -18.24% | -4.1% | 4 of 9 |
| **Y + Z** | **15.2270447** | **16.3997288** | **-7.7%** | **-13.4%** | **9 of 18** |

Per task over both cohorts: textwrap 35% lower, rust-url 20% lower, pulldown-cmark 25% higher. The plain arm's pulldown-cmark trials happened to cost 30% less in Z than in Y with no change to their configuration, which is the size of the per-pair spread on these tasks; the TokenSaver arm's cost on that task barely moved between the cohorts. On pulldown-cmark, TokenSaver made more requests than the plain arm in all six pairs.

## A defect found, and what changes

The heavier tasks exercised something the lean tasks did not: searches inside one large file. Investigating the extra requests on pulldown-cmark showed that release 0.35.0 shortened the agent's search results for such single-file searches before the model saw them, removing some matched lines, including lines the fix depended on, and doing so on every request of the affected trials. Replaying a recorded conversation through the released binary reproduced it exactly. The tokens this removed were worth about one cent per task; the extra searching and reading it caused is the most likely reason the treatment cost more on pulldown-cmark and saved less on rust-url than on textwrap. The behaviour is corrected in the next release, which will be measured on these same tasks. Until then, the Y and Z figures describe release 0.35.0 as shipped: strong savings on the two medium workspaces, a loss on the hardest task.

Per-trial detail: `../evidence/z/independent-audit.json`.
