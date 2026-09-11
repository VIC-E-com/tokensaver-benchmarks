# Cohort AA (heavier workspace tasks, corrected build): 18 trials, all correct in both arms, sums 11.0% higher, mean paired cost 1.7% lower, 4 of 9 pairs

Root identifier `ts-sonnet-real-20260911aa-grep-fix`, run 2026-09-11. Identical to cohort Z (same three heavier tasks, trees, acceptance tests, limits, guide, pinned Claude Code 2.1.236, Claude Sonnet 5 at high effort, explicit five-minute caching in all 18 trials, repository summary before the first request) with one change: the TokenSaver build is the corrected one in which the agent's search results reach the model unchanged. Cohort Z had found that release 0.35.0 shortened single-file search results on every request of the affected trials; AA measures the same tasks without that defect. One interruption (a WSL virtual-machine failure after ten trials) was resumed; the interrupted attempt is preserved in the evidence as `pair2-raw-incomplete-1`.

| Task | Pair | Plain USD | TokenSaver USD | Change | Correct (plain / TS) | Requests (plain / TS) | Seconds (plain / TS) | Compactions (plain / TS) |
|---|---:|---:|---:|---:|---|---|---|---|
| columns-overflow | 1 | 0.2906341 | 0.3445111 | +18.5% | yes / yes | 18 / 17 | 232 / 179 | 0 / 0 |
| columns-overflow | 2 | 0.5507053 | 0.4060122 | -26.3% | yes / yes | 33 / 10 | 520 / 271 | 0 / 0 |
| columns-overflow | 3 | 0.3875292 | 0.4979518 | +28.5% | yes / yes | 20 / 24 | 194 / 381 | 0 / 0 |
| path-caret-encoding | 1 | 0.2375837 | 0.3090530 | +30.1% | yes / yes | 19 / 22 | 109 / 105 | 0 / 0 |
| path-caret-encoding | 2 | 0.4281010 | 0.3181899 | -25.7% | yes / yes | 27 / 22 | 143 / 115 | 0 / 0 |
| path-caret-encoding | 3 | 0.4427211 | 0.2369449 | -46.5% | yes / yes | 31 / 16 | 126 / 102 | 0 / 0 |
| subscript-pairing | 1 | 1.9262784 | 2.2767007 | +18.2% | yes / yes | 65 / 56 | 748 / 979 | 0 / 0 |
| subscript-pairing | 2 | 1.6675044 | 1.3596408 | -18.5% | yes / yes | 59 / 44 | 756 / 542 | 0 / 0 |
| subscript-pairing | 3 | 2.0080183 | 3.0624588 | +52.5% | yes / yes | 57 / 82 | 905 / 1116 | 0 / 1 |

| Task | Pairs | Plain USD | TokenSaver USD | Saving (sums) | Mean paired change | Pairs won |
|---|---:|---:|---:|---:|---:|---|
| columns-overflow (textwrap) | 3 | 1.2288686 | 1.2484751 | -1.60% | +3.9% | 1 of 3 |
| path-caret-encoding (rust-url) | 3 | 1.1084058 | 0.8641878 | 22.03% | -19.7% | 2 of 3 |
| subscript-pairing (pulldown-cmark) | 3 | 5.6018011 | 6.6988003 | -19.58% | +13.7% | 1 of 3 |
| **All** | 9 | **7.9390755** | **8.8114632** | **-10.99%** | **-1.7%** | **4 of 9** |

Mean paired log-ratio -0.018 (SD 0.350, SE 0.117). Correct: 9 of 9 in both arms.

Usage totals (9 trials per arm): plain ordinary input 666 / cache read 18,304,730 / five-minute cache write 645,287 / output including thinking 266,358 / 329 requests / 3,733 s; TokenSaver 3,021 / 20,042,531 / 694,754 / 306,003 / 293 requests / 3,790 s. One compaction (TokenSaver, pulldown-cmark pair 3), priced from the client's own model usage.

## The three heavier cohorts together

| Cohort | Plain USD | TokenSaver USD | Saving (sums) | Mean paired change | Pairs won |
|---|---:|---:|---:|---:|---|
| Y, released 0.35.0 | 8.3555326 | 8.2746755 | 0.97% | -21.8% | 5 of 9 |
| Z, released 0.35.0, repository summary for any size | 6.8715121 | 8.1250533 | -18.24% | -4.1% | 4 of 9 |
| AA, corrected build | 7.9390755 | 8.8114632 | -10.99% | -1.7% | 4 of 9 |
| **Y + Z + AA** | **23.1661202** | **25.2111920** | **-8.8%** | **-9.7%** | **13 of 27** |

Pooled mean paired log-ratio -0.102 (SD 0.44, SE 0.08 over 27 pairs).

| Task, 9 pairs each | Saving (sums) | Mean paired change | Pairs won | Mean cost plain / TS | Mean output tokens plain / TS | Mean tool calls plain / TS |
|---|---:|---:|---|---:|---:|---:|
| columns-overflow (textwrap) | 23.9% | -25.1% | 5 of 9 | 0.449 / 0.342 | 16,545 / 14,854 | 24.7 / 15.1 |
| path-caret-encoding (rust-url) | 20.5% | -19.9% | 6 of 9 | 0.369 / 0.293 | 9,325 / 7,249 | 27.2 / 20.7 |
| subscript-pairing (pulldown-cmark) | -23.4% | +22.8% | 2 of 9 | 1.756 / 2.166 | 60,053 / 73,253 | 56.2 / 64.2 |

## Reading

The defect found in Z was real, and correcting it was necessary, but it was not what made pulldown-cmark expensive: with search results untouched, the task still cost 20% more under TokenSaver over these three pairs and 23% pooled over nine. The extra money on that task is output tokens (22% more per trial, reasoning and written code) and tool calls (14% more); in pair 1 TokenSaver made fewer requests than plain and still cost 18% more through output alone, and pair 3 is a long tail in which the TokenSaver trial wrote six scratch programs, edited eleven times and crossed the client's compaction threshold. On the two medium tasks the pooled saving stands at 20 to 25% over nine pairs each, though AA's textwrap result (+3.9%) contradicts Y and Z, which is the per-pair spread doing what it does (SD 0.35 to 0.51 in log-ratio on these tasks).

The heavier-task figures to quote are the pooled ones: sums 8.8% higher, mean paired cost 9.7% lower, 13 of 27 pairs, all TokenSaver trials correct and one plain failure. The next cohorts measure each TokenSaver component alone against plain on pulldown-cmark and textwrap, and a repository summary that maps the definitions of the large crate the agent must navigate.

Per-trial detail: `../evidence/aa/independent-audit.json`.
