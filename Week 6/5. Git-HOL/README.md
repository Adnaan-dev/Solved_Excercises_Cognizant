# Week 6 · Git Hands-on Lab 5 — Clean up & Push back to Remote

> Learn how to **clean up and push local work back to the remote Git repository**: confirm
> a clean state, inspect branches, `pull` to sync with the remote, then `push` the commits
> still pending from the previous hands-on, and confirm they show up on the remote.

**Estimated time:** 10 minutes.
**Prerequisite:** Hands-on `Git-T03-HOL_002` (the conflict-resolution lab —
[`../4. Git-HOL/`](../4.%20Git-HOL/)), which leaves committed-but-unpushed work.

> ⚠️ **Note (from the lab sheet):** use a **free personal** GitHub/GitLab account.
> **Do not** use Cognizant credentials.

---

## How the remote is simulated here

The lab targets a real GitLab/GitHub remote. To run and **verify** it without external
credentials, this solution uses a **local bare repository** (`RemoteOrigin.git`) as the
`origin` — a bare repo is exactly what a Git server hosts, so `git pull`/`git push` behave
identically. To point at a real remote instead, just swap the URL:

```bash
$ git remote set-url origin https://github.com/<your-user>/<repo>.git
```

**Set-up (done once):**

```bash
$ git init --bare RemoteOrigin.git          # stands in for the GitLab/GitHub server
$ git clone RemoteOrigin.git GitCleanupDemo # working copy, origin already wired
$ cd GitCleanupDemo
$ echo "project readme" >> README.txt
$ git add README.txt && git commit -m "Initial commit"
$ git push -u origin master                 # * [new branch] master -> master
```

Then a **pending commit** is created to represent the unpushed work carried over from
`Git-T03-HOL_002`:

```bash
$ echo "<message>resolved content from Git-T03-HOL_002</message>" >> hello.xml
$ git add hello.xml
$ git commit -m "Add hello.xml (pending work from Git-T03-HOL_002)"
```

---

## What's in this folder

| Path | Description |
|------|-------------|
| [`RemoteOrigin.git/`](./RemoteOrigin.git/) | Bare repo acting as the **remote** (`origin`). |
| [`GitCleanupDemo/`](./GitCleanupDemo/) | The local working repository. |
| [`solve.sh`](./solve.sh) | Every command (incl. set-up) in one re-runnable Git-Bash script. |

---

## Steps

**1. Verify master is in a clean state** — the working tree is clean; note it reports the
local branch is *ahead* of the remote by the pending commit:

```bash
$ git status
On branch master
Your branch is ahead of 'origin/master' by 1 commit.
  (use "git push" to publish your local commits)

nothing to commit, working tree clean
```

**2. List all available branches** (local + remote-tracking):

```bash
$ git branch -a
* master
  remotes/origin/master
```

**3. Pull the remote repository into master** — sync down any changes others pushed:

```bash
$ git pull origin master
From .../RemoteOrigin
 * branch            master     -> FETCH_HEAD
Already up to date.
```

**4. Push the pending changes** (from `Git-T03-HOL_002`) to the remote:

```bash
$ git push origin master
   c050de2..8416cff  master -> master

$ git status
On branch master
Your branch is up to date with 'origin/master'.

nothing to commit, working tree clean
```

**5. Observe that the changes are reflected in the remote repository.** Read the remote
directly to prove the commit and file arrived:

```bash
$ git ls-remote RemoteOrigin.git
8416cff...	HEAD
8416cff...	refs/heads/master

$ git --git-dir=RemoteOrigin.git log --oneline
8416cff Add hello.xml (pending work from Git-T03-HOL_002)
c050de2 Initial commit

$ git --git-dir=RemoteOrigin.git ls-tree --name-only -r master
README.txt
hello.xml

$ git --git-dir=RemoteOrigin.git show master:hello.xml
<message>resolved content from Git-T03-HOL_002</message>
```

The remote's `master` tip is now the pushed commit `8416cff` and contains `hello.xml` with
the expected content — the local work is fully published. On real GitLab/GitHub you'd
confirm the same by refreshing the repository page.

---

## Verification

Ran locally with **Git 2.49.0.windows.1** against a bare `origin`:
- `git status` → working tree clean, *ahead of origin/master by 1 commit*.
- `git branch -a` → `* master`, `remotes/origin/master`.
- `git pull origin master` → *Already up to date*.
- `git push origin master` → **`c050de2..8416cff  master -> master`**; status then
  *up to date with 'origin/master'*.
- Remote inspected directly: `ls-remote` and the bare repo's `log`/`ls-tree`/`show` all
  confirm commit `8416cff` and `hello.xml` are present on the remote. ✅
