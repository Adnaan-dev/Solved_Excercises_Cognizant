# Week 6 · Git Hands-on Labs + Angular v20 Portal

Two tracks this week:

1. **Git (5 hands-on labs)** — the everyday Git workflow, end to end: setup & first commit,
   `.gitignore`, branching & merging, resolving merge conflicts, and cleaning up / pushing
   back to a remote. Each lab was executed for real with **Git 2.49.0** and captures the
   actual command output.
2. **Angular v20 (10 hands-on exercises)** — a single **Student Course Portal** SPA built
   incrementally, from components through forms, routing, HTTP, NgRx and unit testing.

---

## 🔀 Git Track — `1–5. Git-HOL/`

| # | Lab | Focus | Demo repo |
|:-:|-----|-------|-----------|
| 1 | [`1. Git-HOL`](./1.%20Git-HOL/) | Git config, Notepad++ editor, first `add`/`commit` | `GitDemo/` |
| 2 | [`2. Git-HOL`](./2.%20Git-HOL/) | `.gitignore` — ignoring `*.log` files and a `log/` folder | `GitIgnoreDemo/` |
| 3 | [`3. Git-HOL`](./3.%20Git-HOL/) | Branching & merging (`GitNewBranch` → `master`), P4Merge | `GitBranchDemo/` |
| 4 | [`4. Git-HOL`](./4.%20Git-HOL/) | Merge-conflict resolution (3-way / P4Merge), ignore `*.orig` | `GitConflictDemo/` |
| 5 | [`5. Git-HOL`](./5.%20Git-HOL/) | Clean up & push back to a remote (local bare repo stand-in) | `GitCleanupDemo/` + `RemoteOrigin.git/` |

Each folder has its own `README.md` (full walkthrough with real output) and a re-runnable
`solve.sh`. GUI-only steps (Notepad++ as editor, P4Merge visual diff/merge) and remote
sign-up steps are documented but not executed in a non-interactive shell; where a real
remote was needed, a **local bare repository** stands in for GitLab/GitHub so `pull`/`push`
genuinely run and are verifiable.

---

## ⚛️ Angular Track — `Angular Hands-on/student-course-portal/`

A **10-exercise** progressive build of a **Student Course Portal** (Angular 20, standalone
APIs). Source of the exercises: [`Angular_HandsOn.pdf`](./Angular%20Hands-on/).

| # | Topic |
|:-:|-------|
| 1 | Environment setup, project structure & first components |
| 2 | Data binding, lifecycle hooks, `@Input`/`@Output` |
| 3 | Directives & pipes (built-in + custom) |
| 4 | Template-driven forms & validation |
| 5 | Reactive forms (`FormBuilder`, `FormArray`, custom validators) |
| 6 | Services & dependency injection |
| 7 | Routing — guards, lazy loading, nested routes |
| 8 | HTTP client — RxJS operators & interceptors |
| 9 | State management with NgRx |
| 10 | Unit testing (Jasmine, Karma, TestBed) |

**Verified:** `ng build` compiles (lazy `enrollment-routes` chunk emitted), `ng test` →
**40 specs pass** (headless Chrome), and the JSON Server mock API responds on
`http://localhost:3000`.

> Requires **Node ≥ 20.19 / 22.12** for Angular CLI v20. See the project
> [`README.md`](./Angular%20Hands-on/student-course-portal/README.md) for full run steps
> (`npm install`, `npm run api`, `npm start`, `ng test`).
