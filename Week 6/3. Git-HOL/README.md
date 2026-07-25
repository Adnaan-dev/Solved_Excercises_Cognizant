# Week 6 · Git Hands-on Lab 3 — Branching & Merging (with P4Merge)

> Learn **branching and merging**, and how branch/merge requests work in GitLab. In this
> lab we construct a branch `GitNewBranch`, make changes and commit them on it, then merge
> it back into `master` (the trunk), inspect differences (CLI + the **P4Merge** visual
> tool), view the history graph, and finally delete the merged branch.

**Estimated time:** 30 minutes.

## Prerequisites
- Git environment set up (see [`../1. Git-HOL/`](../1.%20Git-HOL/)) with the **P4Merge**
  tool installed on Windows for visual diffs/merges.

> ⚠️ **Note (from the lab sheet):** use a **free personal** GitHub/GitLab account.
> **Do not** use Cognizant credentials.

---

## Concepts

- **Branch** — a movable pointer to a commit. Work on a branch is isolated from the trunk
  (`master`/`main`) until merged, so features can be developed without breaking the trunk.
- **Merge** — integrates a branch's commits back into another branch. A **fast-forward**
  merge just moves the trunk pointer forward when it has no new commits of its own; a
  **3-way merge** (or `--no-ff`) creates a dedicated merge commit.
- **GitLab branch request / merge request (MR)** — the GitLab web UI equivalent: you push
  a branch, open a **Merge Request** (GitHub calls it a Pull Request), review the diff, and
  merge into the target branch through the UI. The local commands below are what an MR does
  under the hood.

---

## What's in this folder

| Path | Description |
|------|-------------|
| [`GitBranchDemo/`](./GitBranchDemo/) | The solved repository (branch created, committed, merged, deleted). |
| `GitBranchDemo/README.txt` | Edited on the branch (a second line added). |
| `GitBranchDemo/feature.txt` | New file added on the branch, now merged into master. |
| [`solve.sh`](./solve.sh) | Every command in one re-runnable Git-Bash script. |

---

## Set-up (base repo on master)

```bash
$ git init GitBranchDemo && cd GitBranchDemo
$ echo "line one on master" >> README.txt
$ git add README.txt && git commit -m "Initial commit on master"
```

---

## Branching

**1. Create a new branch `GitNewBranch`:**

```bash
$ git branch GitNewBranch
```

**2. List all local and remote branches** — the `*` marks the current branch:

```bash
$ git branch -a
  GitNewBranch
* master
```

**3. Switch to the new branch and add files/content:**

```bash
$ git checkout GitNewBranch          # (or: git switch GitNewBranch)
Switched to branch 'GitNewBranch'
$ echo "feature work in branch"          >> feature.txt
$ echo "line two added on GitNewBranch"  >> README.txt
```

**4. Commit the changes on the branch:**

```bash
$ git add .
$ git commit -m "Add feature.txt and update README on GitNewBranch"
[GitNewBranch 62972d5] Add feature.txt and update README on GitNewBranch
 2 files changed, 3 insertions(+), 1 deletion(-)
 create mode 100644 feature.txt
```

**5. Check status:**

```bash
$ git status
On branch GitNewBranch
nothing to commit, working tree clean
```

---

## Merging

**1. Switch back to master (the trunk):**

```bash
$ git checkout master
Switched to branch 'master'
```

**2. List the differences between trunk and branch on the command line:**

```bash
$ git diff master GitNewBranch
diff --git a/README.txt b/README.txt
@@ -1 +1,2 @@
-line one on master
+line one on master
+line two added on GitNewBranch
diff --git a/feature.txt b/feature.txt
new file mode 100644
@@ -0,0 +1 @@
+feature work in branch
```

**3. Visual differences with the P4Merge tool.** First configure P4Merge as Git's diff/merge
tool (one-time), then launch it:

```bash
# one-time configuration (adjust the path to your P4Merge install)
$ git config --global diff.tool p4merge
$ git config --global difftool.p4merge.path "C:/Program Files/Perforce/p4merge.exe"
$ git config --global merge.tool p4merge
$ git config --global mergetool.p4merge.path "C:/Program Files/Perforce/p4merge.exe"
$ git config --global difftool.prompt false

# open the visual diff between master and the branch
$ git difftool master GitNewBranch
```

P4Merge opens showing the two versions side by side (added lines highlighted, `feature.txt`
shown as new). *(This is a GUI step — not captured as terminal output here.)*

**4. Merge the source branch into the trunk:**

```bash
$ git merge GitNewBranch
Updating e4c0758..62972d5
Fast-forward
 README.txt  | 3 ++-
 feature.txt | 1 +
 2 files changed, 3 insertions(+), 1 deletion(-)
 create mode 100644 feature.txt
```

> Because `master` had no new commits of its own, Git performs a **fast-forward** merge
> (it just advances the pointer). To force a dedicated merge commit instead, use
> `git merge --no-ff GitNewBranch`.

**5. Observe the history graph after merging:**

```bash
$ git log --oneline --graph --decorate
* 62972d5 (HEAD -> master, GitNewBranch) Add feature.txt and update README on GitNewBranch
* e4c0758 Initial commit on master
```

Both `master` and `GitNewBranch` now point at the same commit `62972d5`.

**6. Delete the branch after merging and observe status:**

```bash
$ git branch -d GitNewBranch
Deleted branch GitNewBranch (was 62972d5).

$ git status
On branch master
nothing to commit, working tree clean

$ git branch -a
* master
```

`git branch -d` (safe delete) only succeeds because the branch is fully merged; use
`-D` to force-delete an unmerged branch.

---

## GitLab flow (optional, per objectives)

```bash
$ git push -u origin GitNewBranch     # push the branch to the remote
```
Then in GitLab: open **Merge Requests → New merge request**, pick `GitNewBranch` as the
source and `master`/`main` as the target, review the diff, and click **Merge**. That MR is
the web equivalent of the local `git merge` above.

---

## Verification

Ran locally with **Git 2.49.0.windows.1**:
- `git branch GitNewBranch` + `git branch -a` → `* master`, `GitNewBranch` listed.
- Committed on the branch → commit `62972d5` (`feature.txt` added, `README.txt` edited).
- `git diff master GitNewBranch` showed the added README line and the new `feature.txt`.
- `git merge GitNewBranch` → **Fast-forward** `e4c0758..62972d5`.
- `git log --oneline --graph --decorate` → both refs on `62972d5`.
- `git branch -d GitNewBranch` → *Deleted branch GitNewBranch*; `git status` → **clean**,
  branch list back to just `* master`. ✅

P4Merge steps (visual diff/merge) are GUI actions and are documented above; they aren't
captured as terminal output because P4Merge can't launch in a non-interactive shell.
