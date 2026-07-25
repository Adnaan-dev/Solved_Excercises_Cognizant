# Week 6 · Git Hands-on Lab 4 — Resolving Merge Conflicts (3-way / P4Merge)

> Learn how a **merge conflict** happens and how to **resolve** it. Two lines of work edit
> the *same* file (`hello.xml`) differently — one on `master` (the trunk), one on the
> `GitWork` branch. Merging them produces a conflict, which we resolve with a **3-way merge
> tool** (P4Merge), commit the resolution, ignore the tool's backup files, and clean up.

**Estimated time:** 30 minutes.
**Prerequisite:** Hands-on `Git-T03-HOL_001` (branching & merging — see
[`../3. Git-HOL/`](../3.%20Git-HOL/)), with **P4Merge** installed on Windows.

> ⚠️ **Note (from the lab sheet):** use a **free personal** GitHub/GitLab account.
> **Do not** use Cognizant credentials.

---

## Why conflicts happen

Git merges changes automatically when they touch different lines/files. A **conflict**
occurs when the same region of the same file was changed differently on the two branches —
Git can't decide which version wins, so it pauses the merge, writes both versions into the
file surrounded by **conflict markers**, and asks a human to choose. A **3-way merge tool**
(like P4Merge) shows *base*, *theirs*, and *yours* side by side to make that choice easy.

---

## What's in this folder

| Path | Description |
|------|-------------|
| [`GitConflictDemo/`](./GitConflictDemo/) | The solved repo (conflict created, resolved, committed, cleaned up). |
| `GitConflictDemo/hello.xml` | The conflicted file, resolved to contain **both** messages. |
| `GitConflictDemo/hello.xml.orig` | The mergetool backup (kept on disk, **ignored** via `.gitignore`). |
| `GitConflictDemo/.gitignore` | Ignores `*.orig` backup files. |
| [`solve.sh`](./solve.sh) | Every command in one re-runnable Git-Bash script. |

---

## Steps

**1. Verify master is in a clean state:**

```bash
$ git status
On branch master
nothing to commit, working tree clean
```

**2. Create a branch `GitWork` and add `hello.xml`:**

```bash
$ git checkout -b GitWork            # create + switch in one step
Switched to a new branch 'GitWork'
$ echo "<message>Hello from GitWork branch</message>" >> hello.xml
```

**3. Update the content and observe status** — `hello.xml` is untracked on the branch:

```bash
$ git status
On branch GitWork
Untracked files:
	hello.xml
```

**4. Commit the change to the branch:**

```bash
$ git add hello.xml
$ git commit -m "Add hello.xml on GitWork branch"
[GitWork 0da6bd0] Add hello.xml on GitWork branch
 1 file changed, 1 insertion(+)
```

**5. Switch to master:**

```bash
$ git checkout master
Switched to branch 'master'
```

**6. Add `hello.xml` to master with _different_ content** (this is the "another user
updated the trunk" scenario):

```bash
$ echo "<message>Hello from master trunk</message>" >> hello.xml
$ git add hello.xml
```

**7. Commit to master:**

```bash
$ git commit -m "Add hello.xml on master with different content"
[master fba2cc4] Add hello.xml on master with different content
```

**8. Observe the diverged history** (`--all` shows both branches):

```bash
$ git log --oneline --graph --decorate --all
* fba2cc4 (HEAD -> master) Add hello.xml on master with different content
| * 0da6bd0 (GitWork) Add hello.xml on GitWork branch
|/
* 3e0a10c Initial commit on master
```

**9. Check the differences with the diff tool:**

```bash
$ git diff master GitWork
diff --git a/hello.xml b/hello.xml
@@ -1 +1 @@
-<message>Hello from master trunk</message>
+<message>Hello from GitWork branch</message>
```

**10. Visualise the differences with P4Merge** (configure once, then launch):

```bash
$ git config --global diff.tool p4merge
$ git config --global difftool.p4merge.path "C:/Program Files/Perforce/p4merge.exe"
$ git config --global merge.tool p4merge
$ git config --global mergetool.p4merge.path "C:/Program Files/Perforce/p4merge.exe"
$ git difftool master GitWork          # opens P4Merge (GUI)
```

**11. Merge the branch into master** — this fails with a conflict:

```bash
$ git merge GitWork
Auto-merging hello.xml
CONFLICT (add/add): Merge conflict in hello.xml
Automatic merge failed; fix conflicts and then commit the result.
```

**12. Observe the Git conflict markup** that Git wrote into `hello.xml`:

```bash
$ git status
On branch master
You have unmerged paths.
Unmerged paths:
  (use "git add <file>..." to mark resolution)
	both added:      hello.xml

$ cat hello.xml
<<<<<<< HEAD
<message>Hello from master trunk</message>
=======
<message>Hello from GitWork branch</message>
>>>>>>> GitWork
```

- `<<<<<<< HEAD` … `=======` — the version currently on **master** ("ours").
- `=======` … `>>>>>>> GitWork` — the version from the **GitWork** branch ("theirs").

**13. Resolve with the 3-way merge tool:**

```bash
$ git mergetool          # opens P4Merge with base / master / GitWork panes
```

In P4Merge you pick lines from either side (or edit freely) to produce the final result.
Here the resolution combines both messages and removes the conflict markers:

```xml
<message>Hello from master trunk and GitWork branch</message>
```

> `git mergetool` writes the resolved file and leaves a backup named **`hello.xml.orig`**
> (that's the backup the next steps ignore). If you resolve by hand in an editor instead,
> just delete the markers and save.

**14. Commit the resolution to master** (mark resolved with `git add`, then commit):

```bash
$ git add hello.xml
$ git commit -m "Merge GitWork into master; resolve hello.xml conflict"
[master 8576bbc] Merge GitWork into master; resolve hello.xml conflict
```

**15. Observe status and add the backup file to `.gitignore`** — the `*.orig` mergetool
backup shows as untracked, so ignore it:

```bash
$ git status
On branch master
Untracked files:
	hello.xml.orig

# create/append .gitignore:
*.orig
```

After the rule, `hello.xml.orig` disappears from `git status` (only `.gitignore` is left).

**16. Commit the `.gitignore`:**

```bash
$ git add .gitignore
$ git commit -m "Ignore *.orig merge backup files"
[master 723d05c] Ignore *.orig merge backup files
 1 file changed, 2 insertions(+)
```

**17. List all available branches:**

```bash
$ git branch -a
  GitWork
* master
```

**18. Delete the branch that was merged into master:**

```bash
$ git branch -d GitWork
Deleted branch GitWork (was 0da6bd0).
```

**19. Observe the final log** — the merge commit ties the two lines of history together:

```bash
$ git log --oneline --graph --decorate
* 723d05c (HEAD -> master) Ignore *.orig merge backup files
*   8576bbc Merge GitWork into master; resolve hello.xml conflict
|\
| * 0da6bd0 Add hello.xml on GitWork branch
* | fba2cc4 Add hello.xml on master with different content
|/
* 3e0a10c Initial commit on master
```

---

## Verification

Ran locally with **Git 2.49.0.windows.1**:
- master started **clean**; `GitWork` added/committed `hello.xml` (`0da6bd0`); master
  committed a **different** `hello.xml` (`fba2cc4`) → diverged history in `log --all`.
- `git merge GitWork` → **`CONFLICT (add/add): Merge conflict in hello.xml`**; `git status`
  showed `both added: hello.xml`; the file contained `<<<<<<<`/`=======`/`>>>>>>>` markers.
- Resolved (both messages combined), `git add` + commit → merge commit `8576bbc`.
- `*.orig` backup ignored via `.gitignore`, committed `723d05c`; `git branch -d GitWork` →
  *Deleted*; final `git log --graph` shows the merge joining both branches. ✅

The P4Merge steps (10 & 13, visual diff / 3-way merge) are GUI actions — documented with
their exact `git config` / `git difftool` / `git mergetool` commands; the conflict was
resolved to the same result a P4Merge session would produce, since the GUI can't launch in
a non-interactive shell.
