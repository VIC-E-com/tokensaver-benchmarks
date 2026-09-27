# Codex / GPT-5.6 Sol

Latest completed pilot: [S measured **19.71% lower token-priced cost with 6/6 trials correct**](results/2026-09-27-S-RESULTS.md). All three task pairs cost less; elapsed time was 14.83% longer. This is not independently confirmed and remains below the prospective 30% target.

R remains a separate 15.15% pilot. Earlier unchanged confirmations H and N measured 5.77% and 4.49%, respectively; favorable pilots are not substitutes for confirmation.

Completed-task studies using official Codex 0.152.1 at high effort on Linux/WSL. The evidence bundle covers 120 completed trials across cohorts E–H and J–S. Different configurations are evaluated separately; all scheduled trials are retained.

These studies were conducted by the TokenSaver team. Independent checks refer
to the acceptance grader and usage reconciliation, not a third-party endorsement.

- [H: 18-trial confirmation, 5.77% saving](results/H-RESULTS.md)
- [G: six-trial pilot, 9.44% saving](results/G-RESULTS.md)
- [F: six-trial earlier pilot, increased cost](results/F-RESULTS.md)
- [E: 18-trial earlier configuration, increased cost](results/E-RESULTS.md)

Each evidence directory includes all per-trial totals, reconciled per-request usage, fixed rates, schedule and hashes. The same public task definitions are in [claude-sonnet-5/tasks](../claude-sonnet-5/tasks/); source code is pinned there rather than redistributing full checkouts.

Rates per million: ordinary input $4, cached input $0.40, explicit writes $5, output including reasoning $20. Above 272,000 request-context tokens the rates are $8/$0.80/$10/$30. Tier selection is per request, not per full conversation total. These are fixed study estimates, not current retail pricing or subscription invoices.

Run offline arithmetic tests with `node --test tools/usage.test.mjs tools/hook-audit.test.mjs`. The usage module reprices each request with integer nanodollars. A public verification script checks the exported request sums against every trial and cohort. Raw authenticated sessions and proprietary adapter source are intentionally not distributed; this evidence bundle supports independent repricing, not a claim of a complete public treatment runner.

Run `node tools/verify-evidence.mjs` to verify all 120 trials and their recorded model requests against the exported token buckets and costs.


## Additional development pilot

[J: Native context delivery pilot](results/J-RESULTS.md) completed 6/6 correct with 8.34% aggregate saving. The pilot did not establish the 15% target; retain these results and investigate before changing the candidate. Its different candidate is not pooled with the G/H confirmation.


## Additional development pilot

[K: Command-output coverage pilot](results/K-RESULTS.md) completed 6/6 correct; one raw control required provider-capacity recovery. All reported request costs from both attempts are retained. This is not a clean savings comparison. The pilot did not establish the 15% target; retain these results and investigate before changing the candidate. Its different candidate is not pooled with the G/H confirmation.


## Additional development pilot

[L: Composable structured context pilot](results/L-RESULTS.md) completed 6/6 correct with -2.89% aggregate saving. The pilot did not establish the 15% target; retain these results and investigate before changing the candidate. Its different candidate is not pooled with the G/H confirmation.


## Additional development pilot

[M: Source-fidelity pilot](results/M-RESULTS.md) completed 6/6 correct with 17.44% aggregate saving. The pilot reached 15%, but its unchanged confirmation N returned 4.49%; the target did not hold. Its different candidate is not pooled with the G/H confirmation.


## Unchanged confirmation

[N: Unchanged source-fidelity confirmation](results/N-RESULTS.md) completed 18/18 correct with 4.49% aggregate saving. The unchanged confirmation did not retain the 15% target; preserve the full result and investigate before another candidate. This repeats M unchanged; it is reported separately from its pilot and from the G/H candidate.


## Visible composable-tool guidance pilot

[O](results/O-RESULTS.md): 6/6 correct, -22.47% aggregate saving. Below the15% target. Preserve the entire pilot and do not retry this candidate unchanged.


## Bounded startup repository facts pilot

[P](results/P-RESULTS.md): 6/6 correct, 14.20% aggregate saving. Below the15% target. Preserve the entire pilot and do not retry this candidate unchanged.


## Bounded startup facts pilot

[Q](results/2026-09-15-Q-RESULTS.md): 6/6 correct, 10.70% aggregate saving. Below the20% target. Preserve the entire pilot and do not retry this candidate unchanged.


## Reliability pilot R

[R](results/2026-09-27-R-RESULTS.md): 6/6 correct, 15.15% aggregate cost reduction. Below the prospective 30% target; not independently confirmed. All trials and per-request usage retained.

## Command-output coverage pilot S

[S](results/2026-09-27-S-RESULTS.md): **6/6 correct, 19.71% aggregate cost reduction**, 3/3 task pairs cheaper, 14.83% longer runtime. All 107 requests reconcile. Reported separately from R, with no claim of an isolated feature effect or independent confirmation.
