# Cohort AE (heavier workspace tasks, corrected build, shipping configuration): 18 trials, all correct in both arms, sums 26.6% lower, mean paired cost 23.4% lower, 8 of 9 pairs, every task won

Root identifier `ts-sonnet-real-20260911ae-shipping`, run 2026-09-11. Same three heavier tasks, trees, acceptance tests, limits, guide, pinned Claude Code 2.1.236, Claude Sonnet 5 at high effort and explicit five-minute caching in all 18 trials as cohorts Y through AD. TokenSaver configuration: the corrected build, the small repository summary before the first request (2 to 4 KB, the same summary as cohorts Y through AA, delivered inline), and command-output shortening off. This is the configuration TokenSaver ships for Claude Code from these results. 18 trials in one run without interruption; an earlier launch of this cohort ran a single trial under the wrong summary setting, was stopped before any counted trial and discarded (recorded in the study protocol).

| Task | Pair | Plain USD | TokenSaver USD | Change | Correct (plain / TS) | Requests (plain / TS) | Seconds (plain / TS) |
|---|---:|---:|---:|---:|---|---|---|
| columns-overflow | 1 | 0.5682218 | 0.2846103 | -49.9% | yes / yes | 28 / 13 | 294 / 184 |
| columns-overflow | 2 | 0.3522732 | 0.3291163 | -6.6% | yes / yes | 23 / 16 | 435 / 166 |
| columns-overflow | 3 | 0.4646223 | 0.4980453 | +7.2% | yes / yes | 20 / 22 | 245 / 282 |
| path-caret-encoding | 1 | 0.3752806 | 0.2968477 | -20.9% | yes / yes | 29 / 18 | 150 / 114 |
| path-caret-encoding | 2 | 0.3984030 | 0.3973228 | -0.3% | yes / yes | 24 / 25 | 150 / 157 |
| path-caret-encoding | 3 | 0.5263847 | 0.2911823 | -44.7% | yes / yes | 35 / 21 | 200 / 113 |
| subscript-pairing | 1 | 1.1129377 | 1.0975437 | -1.4% | yes / yes | 43 / 46 | 534 / 493 |
| subscript-pairing | 2 | 2.4666877 | 1.5711260 | -36.3% | yes / yes | 71 / 50 | 1120 / 684 |
| subscript-pairing | 3 | 2.2628178 | 1.4917097 | -34.1% | yes / yes | 58 / 53 | 1071 / 690 |

| Task | Pairs | Plain USD | TokenSaver USD | Saving (sums) | Mean paired change | Pairs won |
|---|---:|---:|---:|---:|---:|---|
| columns-overflow (textwrap) | 3 | 1.3851173 | 1.1117719 | 19.73% | -20.5% | 2 of 3 |
| path-caret-encoding (rust-url) | 3 | 1.3000683 | 0.9853528 | 24.21% | -24.2% | 3 of 3 |
| subscript-pairing (pulldown-cmark) | 3 | 5.8424432 | 4.1603794 | 28.79% | -25.5% | 3 of 3 |
| **All** | 9 | **8.5276288** | **6.2575041** | **26.62%** | **-23.4%** | **8 of 9** |

Mean paired log-ratio -0.267 (SD 0.281, SE 0.094). Correct: 9 of 9 in both arms.

Usage totals (9 trials per arm): plain ordinary input 674 / cache read 19,534,929 / five-minute cache write 655,410 / output including thinking 298,077 / 331 requests / 4,198 s; TokenSaver 546 / 13,655,673 / 569,871 / 210,060 / 264 requests / 2,882 s. No compaction in any trial. The TokenSaver arm made 20% fewer requests, re-read 30% fewer cached tokens, produced 30% fewer output tokens and finished 31% sooner. Directory listing and file-finding commands fell from 30 to 12 over the nine trials, search-tool calls from 42 to 25.

## Reading

This cohort answers the question the previous four left open. Y, Z and AA ran the small summary together with command-output shortening; AC and AD tried a larger summary. Every one of them lost on pulldown-cmark. AE runs the small summary alone, and pulldown-cmark is won in all three pairs (-1%, -36%, -34%) with the TokenSaver trials producing fewer output tokens than plain for the first time on that task. The two components that were removed had each been measured to raise output on the largest crate; the one that remains had been measured to lower requests on every task. The saving is where the cost is: fewer requests, so fewer re-reads of a large context, and less reasoning spent on orientation.

## The heavier cohorts together

| Cohort | Plain USD | TokenSaver USD | Saving (sums) | Mean paired change | Pairs won |
|---|---:|---:|---:|---:|---|
| Y, released 0.35.0 | 8.3555326 | 8.2746755 | 0.97% | -21.8% | 5 of 9 |
| Z, released 0.35.0, repository summary for any size | 6.8715121 | 8.1250533 | -18.24% | -4.1% | 4 of 9 |
| AA, corrected build | 7.9390755 | 8.8114632 | -10.99% | -1.7% | 4 of 9 |
| AC, corrected build, experimental larger summary (retired) | 7.6592548 | 9.7076838 | -26.74% | +5.8% | 3 of 9 |
| AD, as AC with command-output shortening off | 8.4605076 | 9.6212914 | -13.72% | +12.3% | 2 of 9 |
| **AE, shipping configuration** | **8.5276288** | **6.2575041** | **26.62%** | **-23.4%** | **8 of 9** |
| Cohorts with the shipped small summary (Y, Z, AA, AE), 36 pairs | 31.6937 | 31.4688 | 0.7% | -13.3% | 21 of 36 |
| All six, 54 pairs | 47.8136 | 50.7977 | -6.2% | -6.4% | 26 of 54 |

Per task over all six cohorts (18 pairs each): textwrap 19.8% lower (11 of 18), rust-url 11.3% lower (10 of 18), pulldown-cmark 15.2% higher (5 of 18, three of them AE's). 53 of 54 TokenSaver trials and 52 of 54 plain trials correct. AE is one nine-pair cohort (SE 0.09 in log-ratio) and is quoted with the pooled figures beside it; a confirmation run of the same configuration is the next cohort.

Per-trial detail: `../evidence/ae/independent-audit.json`.
