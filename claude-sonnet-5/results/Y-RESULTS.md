# Cohort Y (heavier workspace tasks, released 0.35.0): 18 trials, 16 correct, mean paired cost 21.8% lower, sums 1.0% lower

Root identifier `ts-sonnet-real-20260910y-heavier-tasks`, run 2026-09-10. Same design as U, V and X (three counterbalanced pairs per task, pinned Claude Code 2.1.236, Claude Sonnet 5 at high effort, explicit five-minute caching verified in all 18 trials, TokenSaver installed from release 0.35.0), applied to three heavier real fixes in multi-crate Rust workspaces instead of the lean humantime tasks:

| Task | Upstream fix | What the agent had to do |
|---|---|---|
| `subscript-pairing` | pulldown-cmark `48b08b96c8` | fix tilde delimiter pairing in a 14,000-line inline parser when subscript is enabled without strikethrough, and keep the spec-generated test suite consistent |
| `path-caret-encoding` | rust-url `25137be1fc` | bring the path percent-encode set in line with the WHATWG URL Standard (`^` becomes `%5E`) without changing userinfo encoding, and update the web-platform expected-failure list |
| `columns-overflow` | textwrap `a4f893b596` | remove an arithmetic overflow in `wrap_columns` for huge column counts while preserving results and the documented panic |

The agent starts from the parent of each fix commit and never sees the fix or the acceptance test. Limits per trial: 100 requests, 1800 seconds, 8 USD budget cap; each test-suite run 300 seconds (`../tasks/<task>/layout.json`). The task prompts, shared guide, acceptance tests and grading records are in `../tasks/`.

| Task | Pair | Plain USD | TokenSaver USD | Change | Correct (plain / TS) | Requests (plain / TS) | Seconds (plain / TS) |
|---|---:|---:|---:|---:|---|---|---|
| columns-overflow | 1 | 0.3676965 | 0.1700588 | -53.8% | yes / yes | 22 / 9 | 196 / 104 |
| columns-overflow | 2 | 0.2676547 | 0.3222058 | +20.4% | yes / yes | 16 / 15 | 162 / 395 |
| columns-overflow | 3 | 0.5734144 | 0.1915529 | -66.6% | yes / yes | 32 / 8 | 435 / 144 |
| path-caret-encoding | 1 | 0.2868543 | 0.3068208 | +7.0% | yes / yes | 25 / 22 | 142 / 113 |
| path-caret-encoding | 2 | 0.4502322 | 0.2047444 | -54.5% | yes / yes | 31 / 15 | 198 / 97 |
| path-caret-encoding | 3 | 0.4110552 | 0.3294613 | -19.8% | yes / yes | 34 / 24 | 159 / 164 |
| subscript-pairing | 1 | 2.4773964 | 2.6470860 | +6.8% | yes / yes | 66 / 70 | 1168 / 1174 |
| subscript-pairing | 2 | 2.1226342 | 2.0771344 | -2.1% | yes / yes | 59 / 64 | 855 / 1052 |
| subscript-pairing | 3 | 1.3985947 | 2.0256111 | +44.8% | no / no | 53 / 68 | 543 / 897 |

| Task | Pairs | Plain USD | TokenSaver USD | Saving (sums) | Mean paired change | Pairs won |
|---|---:|---:|---:|---:|---:|---|
| columns-overflow (textwrap) | 3 | 1.2087656 | 0.6838175 | 43.43% | -42.9% | 2 of 3 |
| path-caret-encoding (rust-url) | 3 | 1.1481417 | 0.8410265 | 26.75% | -26.9% | 2 of 3 |
| subscript-pairing (pulldown-cmark) | 3 | 5.9986253 | 6.7498315 | -12.52% | +14.8% | 1 of 3 |
| **Total** | 9 | **8.3555326** | **8.2746755** | **0.97%** | **-21.8%** | **5 of 9** |

Two figures are reported because they answer different questions. The sum of costs (0.97% lower) is what these nine pairs cost in total; it is dominated by pulldown-cmark, whose trials cost five to eight times the others and went against TokenSaver. The mean paired change (-21.8%, the preregistered primary outcome: mean of the per-pair log cost ratios, standard deviation 0.51, standard error 0.17) is the typical effect on a pair regardless of its size. Over the eight pairs in which both arms were correct: sums 6.9569379 versus 6.2490644 (10.18% lower), mean paired change -27.6%, 5 of 8 pairs.

| Final provider usage, 18 trials | Plain | TokenSaver |
|---|---:|---:|
| Ordinary input tokens | 682 | 576 |
| Cache read tokens | 18,966,818 | 18,951,030 |
| Five-minute cache write tokens | 717,230 | 639,067 |
| One-hour cache write tokens | 0 | 0 |
| Output tokens including thinking | 276,773 | 288,565 |
| Requests | 338 | 295 |

Requests fell 13% and cache writes 11%; cache reads were level and output rose 4%. Every TokenSaver trial's provider usage reconciled exactly with the independent counters, and every trial's aggregate usage with the CLI's per-model accounting. Claude Code's own auto-compaction requests are priced when they occur; none occurred in the eighteen counted trials.

## Correctness

16 of 18 trials passed both the project's own test suite and the held-out acceptance test. Pair 3 of `subscript-pairing` failed in both arms on the same explicit requirement of the task prompt (a paragraph that must render with every tilde literal); both agents also rewrote the generated spec expectation so that their own suites passed, which the acceptance test caught. Pairs 1 and 2 of the same task were correct in both arms.

## Where the saving came from

On the two smaller workspaces (textwrap, 45 source and manifest files; rust-url, 40) TokenSaver trials went straight to the implementation and needed far fewer requests: 22/16/32 became 9/15/8 on textwrap and 25/31/34 became 22/15/24 on rust-url. On pulldown-cmark, the largest checkout (69 source and manifest files), release 0.35.0 did not reduce requests (70/64/68 against 66/59/53) and cost more in two pairs of three. The next release changes TokenSaver's behaviour on repositories of that size and is measured on these same tasks, trees and binaries as cohort Z.

Cost on these tasks is dominated by re-reading the growing context on every request and by reasoning tokens: in pulldown-cmark pair 1 the TokenSaver trial spent 6.60M cache-read tokens ($1.32), 92.8k output tokens ($0.93, most of it thinking) and 159k cache-write tokens ($0.40). Both arms carry the same reasoning budget.

## Interruptions, all preserved

Six scheduled trials failed before any model call when the subscription login expired mid-cohort, and one treatment trial timed out after the agent's own test called `wrap_columns` with `usize::MAX` columns (an unbounded loop in that crate at the base commit); these labels were rerun after the login was renewed. One further treatment attempt was rejected by the accounting check because Claude Code auto-compacted and the aggregate usage omitted the compaction request; the pricing was extended to include such requests and the label rerun. Every attempt, complete or not, is kept in the private record; none entered the figures twice. Wall time is not comparable across the cohort because the last six trials ran without the two-core CPU quota the others had; token counts and costs are unaffected.

## Reading

TokenSaver 0.35.0 cut cost sharply on the two smaller workspaces (43% and 27% lower sums, 4 of 6 pairs) and made no saving on the largest one (12.5% higher sums, 1 of 3 pairs). Per-pair variance on heavier tasks is twice that of the humantime cohorts, so nine pairs cannot separate the sum figure from the mean-pair figure with confidence; quote them together. Per-trial detail is in `../evidence/y/independent-audit.json`.
