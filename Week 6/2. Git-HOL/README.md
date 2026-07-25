# Week 6 · Git Hands-on Lab 2 — `.gitignore`

> Learn what **`.gitignore`** is and how to use it to keep unwanted files and folders out
> of version control. In this lab we create a `.log` file and a `log/` folder in the
> working directory, then write `.gitignore` rules so that **on commit those are ignored**,
> and confirm `git status` reflects it across the working directory, local repo and Git repo.

**Estimated time:** 20 minutes.

## Prerequisites
- Git environment set up (see [`../1. Git-HOL/`](../1.%20Git-HOL/)).
- Notepad++ integrated as the default editor.
- A local Git repository and a remote repository (GitLab/GitHub).

> ⚠️ **Note (from the lab sheet):** use a **free personal** GitHub/GitLab account for the
> remote. **Do not** use Cognizant credentials.

---

## What is `.gitignore`?

`.gitignore` is a plain-text file placed in a repository. Each line is a **pattern**;
any file or folder matching a pattern is **untracked and ignored** by Git — it won't
appear as *untracked* in `git status`, won't be staged by `git add .`, and won't be
committed. It's used for build output, logs, temp files, secrets, and editor cruft that
shouldn't live in source control.

> ⚠️ `.gitignore` only affects files Git isn't **already tracking**. If a file was
> committed before you ignored it, you must untrack it: `git rm --cached <file>`.

---

## What's in this folder

| Path | Description |
|------|-------------|
| [`GitIgnoreDemo/`](./GitIgnoreDemo/) | The solved repository for this lab. |
| `GitIgnoreDemo/.gitignore` | The ignore rules — `*.log` and `log/`. |
| `GitIgnoreDemo/app.txt` | A normal tracked file (committed). |
| `GitIgnoreDemo/debug.log` | A `.log` file — **ignored** (present on disk, not committed). |
| `GitIgnoreDemo/log/` | A folder with `server.log` / `access.log` — **ignored**. |
| [`solve.sh`](./solve.sh) | Every command in one re-runnable Git-Bash script. |

---

## Steps

**1. Initialise a repository:**

```bash
$ git init GitIgnoreDemo
Initialized empty Git repository in .../Week 6/2. Git-HOL/GitIgnoreDemo/.git/
$ cd GitIgnoreDemo
```

**2. Create a tracked file, a `.log` file, and a `log/` folder** in the working directory:

```bash
$ echo "Welcome to gitignore demo" >> app.txt        # a normal file
$ echo "some debug output"        >> debug.log        # a .log file
$ mkdir log
$ echo "runtime log line" >> log/server.log           # files inside a log/ folder
$ echo "info entry"       >> log/access.log
```

**3. Check status BEFORE `.gitignore`** — the log file and `log/` folder show as untracked:

```bash
$ git status
On branch master

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	app.txt
	debug.log
	log/

nothing added to commit but untracked files present (use "git add" to track)
```

**4. Create `.gitignore`** (using your default editor, e.g. `notepad++ .gitignore`) with:

```gitignore
# Ignore all files with a .log extension (anywhere in the repo)
*.log

# Ignore the entire log/ folder and its contents
log/
```

**5. Check status AFTER `.gitignore`** — `debug.log` and `log/` are gone from the list;
only `app.txt` and `.gitignore` remain:

```bash
$ git status
On branch master

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	.gitignore
	app.txt

nothing added to commit but untracked files present (use "git add" to track)
```

**6. Prove they're ignored** with `--ignored` and `check-ignore -v`:

```bash
$ git status --ignored
...
Ignored files:
  (use "git add -f <file>..." to include in what will be committed)
	debug.log
	log/

$ git check-ignore -v debug.log log/server.log log/access.log
.gitignore:2:*.log	debug.log
.gitignore:5:log/	log/server.log
.gitignore:5:log/	log/access.log
```

Each ignored path is matched by a rule (`*.log` on line 2, `log/` on line 5).

**7. Stage & commit** — only the non-ignored files are committed:

```bash
$ git add .
$ git commit -m "Add app.txt and .gitignore (ignore *.log and log/)"
[master (root-commit) 27f9ea9] Add app.txt and .gitignore (ignore *.log and log/)
 2 files changed, 6 insertions(+)
 create mode 100644 .gitignore
 create mode 100644 app.txt
```

**8. Verify** — working tree is clean, and only `.gitignore` + `app.txt` are in the repo
(the `.log` file and `log/` folder are still on disk but were **never committed**):

```bash
$ git status
On branch master
nothing to commit, working tree clean

$ git ls-files
.gitignore
app.txt
```

**Result across the three areas:**
- **Working directory** — `debug.log` and `log/` still exist on disk (ignore ≠ delete).
- **Staging / local repository** — they were never staged or committed.
- **Git repository (remote)** — a `git push` would carry only `.gitignore` and `app.txt`,
  so the ignored files never reach the remote either.

---

## Remote (optional, per lab prerequisite)

```bash
$ git remote add origin https://github.com/<your-user>/GitIgnoreDemo.git
$ git push -u origin master        # only .gitignore + app.txt are pushed
```

> If your remote's default branch is `main`: `git branch -M main` then
> `git push -u origin main`. HTTPS pushes to GitHub need a Personal Access Token.

---

## Verification

Ran locally with **Git 2.49.0.windows.1**:
- Status **before** `.gitignore` listed `debug.log` and `log/` as untracked.
- After adding `.gitignore` (`*.log`, `log/`), status dropped both; `git status --ignored`
  listed them under *Ignored files* and `git check-ignore -v` mapped each to its rule.
- Commit `27f9ea9` contains **only** `.gitignore` and `app.txt` (`git ls-files`), and
  `git status` → **`nothing to commit, working tree clean`**. ✅
