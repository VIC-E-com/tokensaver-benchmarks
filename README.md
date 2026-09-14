# TokenSaver Benchmarks

**Independent, reproducible measurements of what TokenSaver saves on real coding-agent work.**

These studies test whether TokenSaver reduces whole-task cost while keeping the model, effort level and task prompt fixed. Agents produce their own edits, which independent acceptance tests check. This repository publishes the proof: complete methodology, every trial's provider usage, correctness grades, and the scripts that reprice and audit them. Nothing here is a demo or a token-counter estimate. Every number is a completed, graded task paid for at the provider, with the plain client run side by side under identical conditions.

> **Claude Code + Claude Sonnet 5, lean tasks, 54 matched trials across three cohorts: 8.8% lower cost, every trial correct, 20 of 27 pairs won.**
> Cohort results ranged from 21.5% lower to 10.8% higher; the pooled figure is the one to quote.
>
> **Heavier workspace tasks, shipping configuration (cohorts AE and AF, 36 trials): 13.9% lower cost, mean paired 18.7% lower, median pair 21% lower, 15 of 18 pairs won, every trial correct.** Across all six heavier cohorts (108 trials, including two retired candidates and the defective 0.35.0 build): mean paired cost 6.4% lower, sums 6.2% higher, 26 of 54 pairs, 53 of 54 TokenSaver trials correct.
> The two medium workspaces saved 20 to 35% in every cohort; the largest checkout lost in five cohorts until the shipping configuration, which wins it in all three pairs. Read the cohort table for how that configuration was reached.

---

## Why these numbers can be trusted

Most savings claims count compressed characters or cheaper requests. This benchmark measures the only thing that matters to a user: **what a whole task costs, and whether the agent still got it right.**

| Principle | How it is enforced |
|---|---|
| Same model, same brain | Claude Sonnet 5 at high effort in both arms; no effort or model downgrade |
| Same client | Pinned Claude Code 2.1.236, same system prompt, same tools, same guide text |
| Same caching | Explicit five-minute prompt caching in both arms, verified in every trial |
| Real tasks, real grading | Six maintenance fixes from public Rust repositories at pinned commits (three lean single-crate fixes, three heavier multi-crate workspace fixes); a trial counts only if the project's own test suite **and** an independent held-out acceptance test pass |
| No cherry-picking | Every scheduled trial is kept; cohorts are preregistered before any model call and never rerun |
| Paired and counterbalanced | Each task runs as plain / TokenSaver pairs with alternating order, three pairs per task per cohort |
| Independent accounting | Costs come from the provider's final usage fields, repriced with integer arithmetic at fixed tariffs, and reconciled against TokenSaver's own counters |
| Confirmation before claims | A favorable pilot was repeated unchanged, then measured again with the released binary, before being reported |

Fixed study tariffs, USD per million tokens: ordinary input 2, cache read 0.2, five-minute cache write 2.5, one-hour cache write 4, output including thinking 10. They make cohorts comparable; they are not invoices.

---

## Results: Claude Code with Claude Sonnet 5

| Cohort | Trials | Correct | Plain Claude Code | With TokenSaver | Saving | Pairs won | Wall time |
|---|---:|---:|---:|---:|---:|---|---:|
| U, pilot (development build) | 18 | 18 / 18 | $2.9366 | $2.3043 | **21.5%** | 9 of 9 | -21% |
| V, unchanged confirmation (development build) | 18 | 18 / 18 | $3.0963 | $2.6933 | **13.0%** | 6 of 9 | -21% |
| X, released 0.35.0 binary | 18 | 18 / 18 | $2.5605 | $2.8379 | **-10.8%** | 5 of 9 | +15% |
| **U + V + X pooled** | **54** | **54 / 54** | **$8.5934** | **$7.8355** | **8.8%** | **20 of 27** | |

Per task, pooled over the three cohorts: symlink traversal 17.6%, duration carry 7.4%, UTC offset -7.1%. In U and V tool calls fell from 127 to 77 and from 117 to 100; in X they were level (96 to 93) while three treatment trials spent roughly twice the reasoning tokens of their counterparts.

Details: [`U-RESULTS.md`](claude-sonnet-5/results/U-RESULTS.md), [`V-RESULTS.md`](claude-sonnet-5/results/V-RESULTS.md), [`X-RESULTS.md`](claude-sonnet-5/results/X-RESULTS.md).

### Heavier workspace tasks

Cohort Y applies the same design to three real fixes in multi-crate Rust workspaces: pulldown-cmark (inline parser delimiter pairing), rust-url (WHATWG percent-encoding) and textwrap (arithmetic overflow). Trials are five to twenty times more expensive than the lean tasks, take up to 70 requests and 20 minutes, and are graded the same way.

**Shipping configuration** (small repository summary before the first prompt, command-output shortening off, corrected build). This is what TokenSaver installs for Claude Code; every cohort of it is listed here and the pooled row is the heavier-task saving to quote.

| Cohort | Trials | Correct (plain, TS) | Plain Claude Code | With TokenSaver | Saving (sums) | Mean paired saving | Pairs won |
|---|---:|---:|---:|---:|---:|---:|---|
| AE | 18 | 9/9, 9/9 | $8.5276 | $6.2575 | 26.6% | 23.4% | 8 of 9 |
| AF, identical confirmation | 18 | 9/9, 9/9 | $8.2326 | $8.1719 | 0.7% | 13.8% | 7 of 9 |
| **Shipping configuration, pooled** | **36** | **18/18, 18/18** | **$16.7602** | **$14.4294** | **13.9%** | **18.7%** | **15 of 18** |

**How the configuration was found.** Seven earlier cohorts on the same tasks measured configurations that are not shipped: the released 0.35.0 build (which shortened the agent's search results before the model saw them), the corrected build still combined with command-output shortening, an enlarged repository summary, and an experimental cap on the model's reasoning effort (AH, AI). Each lost and each is published in full, including the one that was stopped for a defect; their sums are the cost of the search, not a property of the product.

| Cohort | Trials | Correct (plain, TS) | Plain Claude Code | With TokenSaver | Saving (sums) | Mean paired saving | Pairs won |
|---|---:|---:|---:|---:|---:|---:|---|
| Y, released 0.35.0 | 18 | 8/9, 8/9 | $8.3555 | $8.2747 | 1.0% | 21.8% | 5 of 9 |
| Z, released 0.35.0, repository summary for any size | 18 | 8/9, 9/9 | $6.8715 | $8.1251 | -18.2% | 4.1% | 4 of 9 |
| AA, corrected build, command-output shortening still on | 18 | 9/9, 9/9 | $7.9391 | $8.8115 | -11.0% | 1.7% | 4 of 9 |
| AC, corrected build, experimental larger repository summary (retired by its pre-registered rule) | 18 | 9/9, 9/9 | $7.6593 | $9.7077 | -26.7% | -5.8% | 3 of 9 |
| AD, as AC with command-output shortening off | 18 | 9/9, 9/9 | $8.4605 | $9.6213 | -13.7% | -12.3% | 2 of 9 |
| AH, shipping configuration plus an experimental reasoning-effort cap (stopped after 4 trials: each change of the effort setting invalidated the prompt cache) | 4 | 2/2, 2/2 | $1.9678 | $3.2939 | -67.4% | -69.4% | 0 of 2 |
| AI, shipping configuration plus the corrected effort cap (retired) | 18 | 9/9, 9/9 | $6.8588 | $7.5057 | -9.4% | -12.0% | 4 of 9 |
| Superseded configurations, pooled | 112 | 54/56, 55/56 | $48.1125 | $55.3398 | -15.0% | -0.7% | 22 of 56 |
| All heavier cohorts including the shipping configuration | 148 | 72/74, 73/74 | $64.8727 | $69.7692 | -7.5% | 6.4% | 37 of 74 |

AF repeats AE in seven of nine pairs; its sum is flat because one pulldown-cmark pair lost 38% on a single long reasoning episode (fewer tool calls than plain, far more output), the same shape as every remaining loss in this configuration. The median pair over the 18 shipping-configuration pairs is 21% lower. Both percentage columns are positive when TokenSaver is cheaper. "Saving (sums)" compares cohort totals; "Mean paired saving" is the typical effect on one pair (the mean of per-pair log cost ratios, sign flipped), which is why a cohort dominated by one expensive task can show the two with opposite signs. The per-cohort result pages report the same quantity as a signed change (negative when TokenSaver is cheaper).

Per task in the shipping configuration: textwrap 20% lower, rust-url 24% lower, pulldown-cmark 26% lower. Per task over all six cohorts (eighteen pairs each): textwrap 20% lower, rust-url 11% lower, pulldown-cmark 15% higher. The sums are dominated by pulldown-cmark, whose trials cost five to eight times the others; the mean paired change is the typical effect on a pair regardless of its size. Both are reported because on heavier tasks the per-pair spread is twice that of the lean tasks, so nine-pair cohorts cannot separate them. How the configuration was reached: after Z, release 0.35.0 was found to shorten single-file search results before the model saw them (reproduced by replay, corrected); AA showed the correction was necessary but not sufficient; AC tried a larger repository summary and retired it; AD removed command-output shortening and brought pulldown-cmark level; AE keeps only the small summary and the corrected build and wins every task, with TokenSaver trials making 20% fewer requests and producing 30% fewer output tokens than plain. AE and AF are two nine-pair cohorts of the same configuration; a third is queued, and every one is published whatever it shows. Details: [`Y-RESULTS.md`](claude-sonnet-5/results/Y-RESULTS.md), [`Z-RESULTS.md`](claude-sonnet-5/results/Z-RESULTS.md), [`AA-RESULTS.md`](claude-sonnet-5/results/AA-RESULTS.md), [`AC-RESULTS.md`](claude-sonnet-5/results/AC-RESULTS.md), [`AD-RESULTS.md`](claude-sonnet-5/results/AD-RESULTS.md), [`AE-RESULTS.md`](claude-sonnet-5/results/AE-RESULTS.md), [`AF-RESULTS.md`](claude-sonnet-5/results/AF-RESULTS.md), [`AI-RESULTS.md`](claude-sonnet-5/results/AI-RESULTS.md) (covers AH and AI).

Read the spread as part of the result. Between identical runs the cost of a single pair varies by about 25%, so nine-pair cohorts of the same design can land a full swing apart, as U and X did. That is why every cohort has three pairs per task, why every scheduled cohort is published whether it wins or loses, and why the saving quoted for a configuration is its pooled sum across all cohorts that ran it.

---

## Results: Codex with GPT-5.6 Sol

The independent 18-trial confirmation H completed with **18/18 correct and 5.77% lower total API-equivalent cost**. It confirms the direction of the six-trial pilot, with a smaller saving. Agent elapsed time was 13.74% higher, so this is a cost result, not a speed claim.

| Cohort | Trials | Correct | Plain Codex | With TokenSaver | Saving | Pairs won |
|---|---:|---:|---:|---:|---:|---:|
| [E: Original long-task configuration](codex-gpt-5.6-sol/results/E-RESULTS.md) | 18 | 18/18 | $4.2180664 | $5.0501440 | -19.73% | 0/9 |
| [F: Direct context-tool pilot](codex-gpt-5.6-sol/results/F-RESULTS.md) | 6 | 6/6 | $1.4121216 | $1.9443032 | -37.69% | 0/3 |
| [G: Structured context presentation pilot](codex-gpt-5.6-sol/results/G-RESULTS.md) | 6 | 6/6 | $1.5826472 | $1.4332192 | 9.44% | 1/3 |
| [H: Independent structured-context confirmation](codex-gpt-5.6-sol/results/H-RESULTS.md) | 18 | 18/18 | $5.0232864 | $4.7334304 | 5.77% | 6/9 |
| [J: Native context delivery pilot](codex-gpt-5.6-sol/results/J-RESULTS.md) | 6 | 6/6 | $1.6082752 | $1.4741952 | 8.34% | 2/3 |
| [K: Command-output coverage pilot](codex-gpt-5.6-sol/results/K-RESULTS.md) | 6 | 6/6 | $1.9018960 | $1.9071736 | Not qualified (capacity recovery) | Not comparable |
| [L: Composable structured context pilot](codex-gpt-5.6-sol/results/L-RESULTS.md) | 6 | 6/6 | $1.8844968 | $1.9389408 | -2.89% | 1/3 |
| [M: Source-fidelity pilot](codex-gpt-5.6-sol/results/M-RESULTS.md) | 6 | 6/6 | $1.9337648 | $1.5964504 | 17.44% | 2/3 |
| [N: Unchanged source-fidelity confirmation](codex-gpt-5.6-sol/results/N-RESULTS.md) | 18 | 18/18 | $5.0827568 | $4.8544112 | 4.49% | 5/9 |
| [O: Visible composable-tool guidance](codex-gpt-5.6-sol/results/O-RESULTS.md) | 6 | 6/6 | $1.5717752 | $1.9249512 | -22.47% | 0/3 |
| [P: Bounded startup repository facts](codex-gpt-5.6-sol/results/P-RESULTS.md) | 6 | 6/6 | $1.6391448 | $1.4064104 | 14.20% | 2/3 |

Latest completed source-fidelity confirmation N: **4.49% savings, 18/18 correct**. M's 17.44% pilot did not hold at the 15% target. Both full cohorts are preserved separately; the target remains unmet.

G + H together: 24/24 correct, $6.6059336 plain versus $6.1666496 with TokenSaver, **6.65% pooled saving**. H includes disclosed logging and malformed-input hardening in the experimental harness; the task/model/product configuration and optimization behavior are unchanged. E and F tested earlier configurations and remain reported separately. These Codex results are not pooled with Claude.

See [Codex methodology and evidence](codex-gpt-5.6-sol/README.md).

[Q is offline-qualified](codex-gpt-5.6-sol/results/Q-OFFLINE.md) for the next Codex development pilot. No Q model cohort has run and no Q cost saving is claimed; the 15% confirmation target remains unmet.

---

## What is in the repository

```
claude-sonnet-5/
  results/    per-cohort write-ups with full usage tables
  evidence/   audited per-cohort evidence (u, v, x, y, z, aa, ac, ad, ae, af, ai)
  tasks/      task prompts, shared guide, acceptance tests, pinned upstream commits
  tools/      audit and inspection scripts (Node, no dependencies)
```

Inside each `evidence/<cohort>/` directory:

| File | Contents |
|---|---|
| `independent-audit.json` | Per-trial final provider usage buckets, repriced cost, correctness, tool calls, seconds, process resources, and the reconciliation against TokenSaver's counters |
| `request-usage.jsonl` | Per-request cache read and write tokens for every trial: the request-count difference is visible directly |
| `tool-sequences.jsonl` | Every tool call in order per trial, with commands and file paths (edit contents omitted) |
| `schedule.json` | The preregistered trial order |
| `study-artifacts.sha256`, `confirmation-*.json`, `logs/` | Frozen-input hashes, completion markers and the run log |

`claude-sonnet-5/tasks/` holds the task prompts, the shared guide, and the independent acceptance test the agent never sees, plus `tasks.json` with the upstream repositories and pinned commits: humantime (duration carry, UTC offset) and glob (symlink traversal) for the lean cohorts; pulldown-cmark (subscript pairing), rust-url (path caret encoding) and textwrap (columns overflow) for cohort Y, each with a `layout.json` giving the workspace member, the writable paths and the per-trial limits, and a `preflight.json` recording that the reference fix passes the acceptance test and the unchanged base fails it.

`claude-sonnet-5/tools/`: `audit.mjs` reprices every trial from its original provider events with integer nanodollar arithmetic and checks the reconciliation; `inspect-request-usage.mjs` and `inspect-completed-tools.mjs` produce the per-request and per-tool views; `monitor-study.mjs` reports cohort progress.

---

## Reproducing

Run the same three tasks with a plain Claude Code installation and with TokenSaver installed from its release, on Linux with systemd user services and cgroup v2 (these runs used WSL2 Ubuntu), pinned Claude Code 2.1.236, Claude Sonnet 5 at high effort, explicit five-minute caching in both arms, one agent at a time. Grade each trial with the project's test suite and the acceptance test in `tasks/`. Reprice the recorded provider usage with `tools/audit.mjs`. Run at least three pairs per task, keep every outcome, and judge only pooled sums of cost.

---

## Limits

Six task definitions across the Claude and Codex studies, with the model and client version pinned within each study; Rust maintenance work only. Savings depend on the workload: the lean cohorts and the heavier cohorts disagree on where the saving lands, and on the largest checkout measured TokenSaver cost more in five cohorts before the shipping configuration was reached in the sixth, which won that task in all three pairs; that configuration has two nine-pair cohorts behind it so far. Costs are API-equivalent at fixed tariffs computed from provider usage fields, not billed invoices; Claude Code's own auto-compaction requests are included when they occur. Nothing in this repository is a universal savings figure.

---

## License

MIT, see [LICENSE](LICENSE). Task sources belong to their upstream projects under their own licenses; only prompts, acceptance tests and pinned commit references are included here.
