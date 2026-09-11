# Cohort AC (heavier workspace tasks, corrected build with an experimental larger repository summary): 18 trials, all correct in both arms, sums 26.7% higher, mean paired cost 5.8% higher, 3 of 9 pairs

Root identifier `ts-sonnet-real-20260911ac-item-map`, run 2026-09-11. Identical to cohort AA (same three heavier tasks, trees, acceptance tests, limits, guide, pinned Claude Code 2.1.236, Claude Sonnet 5 at high effort, explicit five-minute caching in all 18 trials, corrected build) with one change: the repository summary the agent receives before its first request was enlarged to list the definitions of the crate under repair with their line numbers (12 to 14 KB on the two workspaces, 3 KB on textwrap), and to fold workspace members outside the default build into one entry each. This was a pre-registered candidate: it would be kept only if the largest task was not costlier than plain over its three pairs and the two smaller tasks kept their saving. The first launch fell entirely into an expired login and every trial failed within a second; those attempts are preserved as `*-incomplete-1`, and the cohort ran after the login was renewed.

| Task | Pair | Plain USD | TokenSaver USD | Change | Correct (plain / TS) | Requests (plain / TS) | Seconds (plain / TS) | Compactions (plain / TS) |
|---|---:|---:|---:|---:|---|---|---|---|
| columns-overflow | 1 | 0.3920534 | 0.2896845 | -26.1% | yes / yes | 20 / 14 | 228 / 157 | 0 / 0 |
| columns-overflow | 2 | 0.3523349 | 0.6403044 | +81.7% | yes / yes | 20 / 22 | 382 / 380 | 0 / 0 |
| columns-overflow | 3 | 0.5977736 | 0.2519522 | -57.9% | yes / yes | 22 / 13 | 380 / 131 | 0 / 0 |
| path-caret-encoding | 1 | 0.3681733 | 0.4026227 | +9.4% | yes / yes | 28 / 27 | 137 / 173 | 0 / 0 |
| path-caret-encoding | 2 | 0.3032947 | 0.3167819 | +4.4% | yes / yes | 25 / 24 | 120 / 133 | 0 / 0 |
| path-caret-encoding | 3 | 0.4112747 | 0.3617638 | -12.0% | yes / yes | 27 / 26 | 156 / 155 | 0 / 0 |
| subscript-pairing | 1 | 1.4861529 | 2.4551219 | +65.2% | yes / yes | 55 / 54 | 615 / 1153 | 0 / 0 |
| subscript-pairing | 2 | 2.0464727 | 2.2812810 | +11.5% | yes / yes | 62 / 54 | 979 / 964 | 0 / 0 |
| subscript-pairing | 3 | 1.7017246 | 2.7081714 | +59.1% | yes / yes | 56 / 58 | 731 / 1322 | 0 / 1 |

| Task | Pairs | Plain USD | TokenSaver USD | Saving (sums) | Mean paired change | Pairs won |
|---|---:|---:|---:|---:|---:|---|
| columns-overflow (textwrap) | 3 | 1.3421619 | 1.1819411 | 11.94% | -17.3% | 2 of 3 |
| path-caret-encoding (rust-url) | 3 | 1.0827427 | 1.0811684 | 0.15% | +0.2% | 1 of 3 |
| subscript-pairing (pulldown-cmark) | 3 | 5.2343502 | 7.4445743 | -42.23% | +43.1% | 0 of 3 |
| **All** | 9 | **7.6592548** | **9.7076838** | **-26.74%** | **+5.8%** | **3 of 9** |

Mean paired log-ratio +0.057 (SD 0.457, SE 0.152). Correct: 9 of 9 in both arms.

Usage totals (9 trials per arm): plain ordinary input 646 / cache read 17,917,889 / five-minute cache write 595,330 / output including thinking 258,606 / 315 requests / 3,729 s; TokenSaver 3,371 / 21,166,484 / 820,738 / 341,580 / 292 requests / 4,568 s. One compaction (TokenSaver, pulldown-cmark pair 3), priced from the client's own model usage.

## Reading

The larger summary did what it was designed to do and did not pay for it. On pulldown-cmark the TokenSaver arm searched less (18 search-tool calls against 23, 42 shell greps against 72 over the nine trials) and made fewer requests over the cohort (292 against 315), yet it produced 32% more output tokens and wrote 38% more new content into the cache, at the same number of tool calls. On the largest task the three pairs are +65%, +12% and +59%, entirely output-driven. The pre-registered rule therefore retires the enlarged summary; the small summary measured in earlier cohorts remains the configuration.

A delivery detail matters for reading the two workspaces: Claude Code 2.1.236 does not place a prompt-time context of this size (about 15 KB) into the conversation directly; it saves it to a file and tells the model where it is. On pulldown-cmark every TokenSaver trial began by reading that file (one extra request); on rust-url no TokenSaver trial read it, so those trials effectively ran without any repository summary, which is why rust-url's saving disappeared in this cohort. The small summary of the earlier cohorts (2 to 4 KB) is delivered inline and is unaffected.

| pulldown-cmark pair | Output tokens plain / TS | Tool calls plain / TS |
|---|---:|---:|
| 1 | 45,153 / 84,739 | 55 / 54 |
| 2 | 73,345 / 76,200 | 62 / 54 |
| 3 | 55,075 / 109,202 | 56 / 58 |

## The four heavier cohorts together

| Cohort | Plain USD | TokenSaver USD | Saving (sums) | Mean paired change | Pairs won |
|---|---:|---:|---:|---:|---|
| Y, released 0.35.0 | 8.3555326 | 8.2746755 | 0.97% | -21.8% | 5 of 9 |
| Z, released 0.35.0, repository summary for any size | 6.8715121 | 8.1250533 | -18.24% | -4.1% | 4 of 9 |
| AA, corrected build | 7.9390755 | 8.8114632 | -10.99% | -1.7% | 4 of 9 |
| AC, corrected build, experimental larger summary (retired) | 7.6592548 | 9.7076838 | -26.74% | +5.8% | 3 of 9 |
| **Y + Z + AA + AC** | **30.8253750** | **34.9188758** | **-13.3%** | **-6.0%** | **16 of 36** |

Pooled mean paired log-ratio -0.062 (SD 0.44, SE 0.07 over 36 pairs). Per task over 12 pairs each: textwrap 23.2% lower (7 of 12), rust-url 15.3% lower (7 of 12), pulldown-cmark 27.6% higher (2 of 12; TokenSaver trials produce 30% more output tokens on that task at equal tool counts). 35 of 36 TokenSaver trials and 34 of 36 plain trials correct (the two misses are cohort Y's pulldown-cmark pair 3, wrong in both arms, and cohort Z's plain pair 3).

Per-trial detail: `../evidence/ac/independent-audit.json`.
