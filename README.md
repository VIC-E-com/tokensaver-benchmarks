# TokenSaver Benchmarks

**Independent, reproducible measurements of what TokenSaver saves on real coding-agent work.**

TokenSaver reduces what a coding agent costs to run without changing the model, the effort level, the prompt or the code the agent produces. This repository publishes the proof: complete methodology, every trial's provider usage, correctness grades, and the scripts that reprice and audit them. Nothing here is a demo or a token-counter estimate. Every number is a completed, graded task paid for at the provider, with the plain client run side by side under identical conditions.

> **Claude Code + Claude Sonnet 5, 54 matched trials across three cohorts: 8.8% lower cost, every trial correct, 20 of 27 pairs won.**
> Cohort results ranged from 21.5% lower to 10.8% higher; the pooled figure is the one to quote.

---

## Why these numbers can be trusted

Most savings claims count compressed characters or cheaper requests. This benchmark measures the only thing that matters to a user: **what a whole task costs, and whether the agent still got it right.**

| Principle | How it is enforced |
|---|---|
| Same model, same brain | Claude Sonnet 5 at high effort in both arms; no effort or model downgrade |
| Same client | Pinned Claude Code 2.1.236, same system prompt, same tools, same guide text |
| Same caching | Explicit five-minute prompt caching in both arms, verified in every trial |
| Real tasks, real grading | Three maintenance fixes from public Rust repositories at pinned commits; a trial counts only if the project's own test suite **and** an independent held-out acceptance test pass |
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

Read the spread as part of the result. Between identical runs the cost of a single pair varies by about 25%, so nine-pair cohorts of the same design can land a full swing apart, as U and X did. That is why every cohort has three pairs per task, why every scheduled cohort is published whether it wins or loses, and why only the pooled sum across all cohorts is quoted as the saving.

---

## What is in the repository

```
claude-sonnet-5/
  results/    per-cohort write-ups with full usage tables
  evidence/   audited per-cohort evidence (u, v, x)
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

`claude-sonnet-5/tasks/` holds the three task prompts, the shared guide, and the independent acceptance test the agent never sees, plus `tasks.json` with the upstream repositories and pinned commits: humantime (duration carry, UTC offset) and glob (symlink traversal).

`claude-sonnet-5/tools/`: `audit.mjs` reprices every trial from its original provider events with integer nanodollar arithmetic and checks the reconciliation; `inspect-request-usage.mjs` and `inspect-completed-tools.mjs` produce the per-request and per-tool views; `monitor-study.mjs` reports cohort progress.

---

## Reproducing

Run the same three tasks with a plain Claude Code installation and with TokenSaver installed from its release, on Linux with systemd user services and cgroup v2 (these runs used WSL2 Ubuntu), pinned Claude Code 2.1.236, Claude Sonnet 5 at high effort, explicit five-minute caching in both arms, one agent at a time. Grade each trial with the project's test suite and the acceptance test in `tasks/`. Reprice the recorded provider usage with `tools/audit.mjs`. Run at least three pairs per task, keep every outcome, and judge only pooled sums of cost.

---

## Limits

Three tasks, one model, one client version, one workload shape: lean Rust maintenance with tailed test output. Savings depend on the workload; heavier tool outputs and long sessions were not measured here. Costs are API-equivalent at fixed tariffs computed from provider usage fields, not billed invoices. Nothing in this repository is a universal savings figure.

---

## License

MIT, see [LICENSE](LICENSE). Task sources belong to their upstream projects under their own licenses; only prompts, acceptance tests and pinned commit references are included here.
