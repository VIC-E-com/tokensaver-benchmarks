# Cohorts AH and AI (heavier workspace tasks, shipping configuration plus an experimental effort cap): AH stopped after 4 trials; AI 18 trials, all correct in both arms, sums 9.4% higher, mean paired cost 12.0% higher, 4 of 9 pairs; the cap is retired

Run 2026-09-11 and 2026-09-12 on the same three heavier tasks, trees, acceptance tests, limits, guide, pinned Claude Code 2.1.236, Claude Sonnet 5 at high effort and explicit five-minute caching as cohorts Y through AG. Both cohorts add one experimental behaviour to the shipping configuration: after the agent has finished orienting (its first edit, or eight requests), TokenSaver lowers the model's reasoning effort setting from high to medium for the rest of the task, in an attempt to bound the long reasoning episodes that decide single pairs in AE and AF. Correctness was the pre-registered gate; cost against plain the outcome.

## AH (root `ts-sonnet-real-20260911ah-governor`): stopped after 4 of 18 trials

The first version restored high effort after every failed command. Each change of the effort setting between consecutive requests invalidated the model's prompt cache, so the TokenSaver arm paid three to four times the plain arm in cache writes for the same output (rust-url pair 1: identical output, +72% cost). The treatment was defective as built, not merely losing; the cohort was stopped, its four trials are kept, and the rule was corrected to change effort at most once per task.

| Task | Pair | Plain USD | TokenSaver USD | Change | Correct |
|---|---:|---:|---:|---:|---|
| subscript-pairing | 1 | 1.7134980 | 2.8563960 | +66.7% | yes / yes |
| path-caret-encoding | 1 | 0.2543000 | 0.4375280 | +72.1% | yes / yes |

## AI (root `ts-sonnet-real-20260911ai-governor-budget`): 18 trials

| Task | Pair | Plain USD | TokenSaver USD | Change | Correct (plain / TS) | Requests (plain / TS) | Seconds (plain / TS) |
|---|---:|---:|---:|---:|---|---|---|
| columns-overflow | 1 | 0.1279990 | 0.1765562 | +37.9% | yes / yes | 9 / 8 | 73 / 79 |
| columns-overflow | 2 | 0.3799518 | 0.3146006 | -17.2% | yes / yes | 21 / 15 | 203 / 118 |
| columns-overflow | 3 | 0.3843691 | 0.3775856 | -1.8% | yes / yes | 18 / 23 | 321 / 255 |
| path-caret-encoding | 1 | 0.4232484 | 0.4055407 | -4.2% | yes / yes | 31 / 25 | 155 / 111 |
| path-caret-encoding | 2 | 0.3046080 | 0.3405955 | +11.8% | yes / yes | 24 / 20 | 120 / 108 |
| path-caret-encoding | 3 | 0.3323731 | 0.3952653 | +18.9% | yes / yes | 23 / 21 | 111 / 117 |
| subscript-pairing | 1 | 1.7124268 | 1.9598220 | +14.4% | yes / yes | 46 / 58 | 766 / 841 |
| subscript-pairing | 2 | 2.4427594 | 1.9021353 | -22.1% | yes / yes | 61 / 59 | 949 / 832 |
| subscript-pairing | 3 | 0.7510840 | 1.6336177 | +117.5% | yes / yes | 44 / 54 | 298 / 743 |

| Task | Pairs | Plain USD | TokenSaver USD | Saving (sums) | Mean paired change | Pairs won |
|---|---:|---:|---:|---:|---:|---|
| columns-overflow (textwrap) | 3 | 0.8923199 | 0.8687424 | 2.64% | +3.9% | 2 of 3 |
| path-caret-encoding (rust-url) | 3 | 1.0602295 | 1.1414015 | -7.66% | +8.4% | 1 of 3 |
| subscript-pairing (pulldown-cmark) | 3 | 4.9062702 | 5.4955750 | -12.01% | +24.7% | 1 of 3 |
| **All** | 9 | **6.8588196** | **7.5057189** | **-9.43%** | **+12.0%** | **4 of 9** |

Mean paired log-ratio +0.113 (SD 0.307, SE 0.102); median pair +11.8%. Correct: 9 of 9 in both arms. Usage totals (9 trials per arm): plain cache read 15,919,728 / five-minute cache write 542,632 / output including thinking 231,715 / 277 requests; TokenSaver 15,504,792 / 791,821 / 242,404 / 283 requests.

## Reading

The corrected cap did what it was told, once per trial, and correctness held in all 18 trials. It did not lower cost. Lowering the effort setting to medium did not reduce the model's reasoning on these tasks (output 242k tokens against 232k plain), and the single change of setting still costs one rewrite of the cached prompt, about $0.07 per trial at the five-minute cache price, which is 20% of a small task. Against the same configuration without the cap (AE and AF: sums 13.9% lower, mean paired 18.7% lower, 15 of 18 pairs) this is a clear regression, so the cap is retired and is not part of what TokenSaver installs. The long reasoning episodes that decide single pairs remain a property of the model; the answer to them is pooled cohorts, which is why the shipping configuration is quoted from AE, AF and AG together.

Per-trial detail: `../evidence/ai/independent-audit.json`.
