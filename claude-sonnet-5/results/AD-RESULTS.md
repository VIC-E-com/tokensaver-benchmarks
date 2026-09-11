# Cohort AD (heavier workspace tasks, corrected build, experimental larger summary with command-output shortening off): 18 trials, all correct in both arms, sums 13.7% higher, mean paired cost 12.3% higher, 2 of 9 pairs

Root identifier `ts-sonnet-real-20260911ad-facts-only`, run 2026-09-11. Identical to cohort AC (same three heavier tasks, trees, acceptance tests, limits, guide, pinned Claude Code 2.1.236, Claude Sonnet 5 at high effort, explicit five-minute caching in all 18 trials, corrected build, the experimental larger repository summary) with one change: TokenSaver's shortening of long command output was switched off, so the TokenSaver arm differed from plain only by the repository summary. This was a pre-registered comparison against AC. No interruptions.

| Task | Pair | Plain USD | TokenSaver USD | Change | Correct (plain / TS) | Requests (plain / TS) | Seconds (plain / TS) | Compactions (plain / TS) |
|---|---:|---:|---:|---:|---|---|---|---|
| columns-overflow | 1 | 0.4449502 | 0.3251868 | -26.9% | yes / yes | 25 / 14 | 271 / 179 | 0 / 0 |
| columns-overflow | 2 | 0.3868356 | 0.3013225 | -22.1% | yes / yes | 20 / 14 | 421 / 160 | 0 / 0 |
| columns-overflow | 3 | 0.2145012 | 0.3323398 | +54.9% | yes / yes | 12 / 14 | 148 / 205 | 0 / 0 |
| path-caret-encoding | 1 | 0.2318943 | 0.3342994 | +44.2% | yes / yes | 21 / 20 | 114 / 128 | 0 / 0 |
| path-caret-encoding | 2 | 0.2961138 | 0.2969594 | +0.3% | yes / yes | 25 / 19 | 137 / 111 | 0 / 0 |
| path-caret-encoding | 3 | 0.3254061 | 0.4363599 | +34.1% | yes / yes | 28 / 28 | 130 / 158 | 0 / 0 |
| subscript-pairing | 1 | 2.6078819 | 2.6409423 | +1.3% | yes / yes | 78 / 67 | 1042 / 1018 | 0 / 0 |
| subscript-pairing | 2 | 2.3919685 | 2.4252168 | +1.4% | yes / yes | 67 / 66 | 1107 / 1038 | 0 / 0 |
| subscript-pairing | 3 | 1.5609560 | 2.5286645 | +62.0% | yes / yes | 52 / 64 | 746 / 993 | 0 / 0 |

| Task | Pairs | Plain USD | TokenSaver USD | Saving (sums) | Mean paired change | Pairs won |
|---|---:|---:|---:|---:|---:|---|
| columns-overflow (textwrap) | 3 | 1.0462870 | 0.9588491 | 8.36% | -4.1% | 2 of 3 |
| path-caret-encoding (rust-url) | 3 | 0.8534142 | 1.0676187 | -25.10% | +24.7% | 0 of 3 |
| subscript-pairing (pulldown-cmark) | 3 | 6.5608064 | 7.5948236 | -15.76% | +18.5% | 0 of 3 |
| **All** | 9 | **8.4605076** | **9.6212914** | **-13.72%** | **+12.3%** | **2 of 9** |

Mean paired log-ratio +0.116 (SD 0.292, SE 0.097). Correct: 9 of 9 in both arms.

Usage totals (9 trials per arm): plain ordinary input 642 / cache read 20,103,243 / five-minute cache write 594,558 / output including thinking 295,218 / 328 requests / 4,116 s; TokenSaver 630 / 23,465,357 / 732,324 / 309,615 / 306 requests / 3,990 s. No compaction.

## Reading

As in AC, the enlarged summary was saved to a file by Claude Code on the two workspaces rather than placed in the conversation; the pulldown-cmark agents read it (one extra request each), the rust-url agents did not. So on rust-url the TokenSaver arm differed from plain by nothing the model could see, and its three pairs (+44%, +0%, +34%) show the size of the run-to-run spread on a task that costs about thirty cents.

On pulldown-cmark, switching the command-output shortening off took the task from +65%, +12%, +59% in AC to +1%, +1%, +62% here: level in two pairs, with one long tail in which the TokenSaver trial produced 43% more output tokens than its plain counterpart. Across the five heavier cohorts the configuration that has actually lowered cost on pulldown-cmark is the small summary alone (about 3 KB, delivered inline), measured in the component runs that preceded these cohorts. The next cohort measures exactly that configuration on all three tasks.

## The five heavier cohorts together

| Cohort | Plain USD | TokenSaver USD | Saving (sums) | Mean paired change | Pairs won |
|---|---:|---:|---:|---:|---|
| Y, released 0.35.0 | 8.3555326 | 8.2746755 | 0.97% | -21.8% | 5 of 9 |
| Z, released 0.35.0, repository summary for any size | 6.8715121 | 8.1250533 | -18.24% | -4.1% | 4 of 9 |
| AA, corrected build | 7.9390755 | 8.8114632 | -10.99% | -1.7% | 4 of 9 |
| AC, corrected build, experimental larger summary (retired) | 7.6592548 | 9.7076838 | -26.74% | +5.8% | 3 of 9 |
| AD, as AC with command-output shortening off | 8.4605076 | 9.6212914 | -13.72% | +12.3% | 2 of 9 |
| **Y + Z + AA + AC + AD** | **39.2858826** | **44.5401672** | **-13.4%** | **-2.6%** | **18 of 45** |

Pooled mean paired log-ratio -0.026 (SD 0.42, SE 0.06 over 45 pairs). Per task over 15 pairs each: textwrap 19.7% lower (9 of 15), rust-url 8.5% lower (7 of 15), pulldown-cmark 25.7% higher (2 of 15). 44 of 45 TokenSaver trials and 43 of 45 plain trials correct.

Per-trial detail: `../evidence/ad/independent-audit.json`.
