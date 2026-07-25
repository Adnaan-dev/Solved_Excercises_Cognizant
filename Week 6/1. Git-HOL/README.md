# Week 6 · Git Hands-on Lab (Git-HOL)

> Get familiar with the core Git commands — `git init`, `git status`, `git add`,
> `git commit`, `git push`, and `git pull` — plus machine setup (Git config) and wiring
> **Notepad++** in as the default commit editor.

**Estimated time:** 30 minutes · **Prerequisite:** Git Bash client installed.

> ⚠️ **Note (from the lab sheet):** create a **free personal** account on GitHub/GitLab
> for the remote steps. **Do not** use Cognizant credentials to log in.

---

## What's in this folder

| Path | Description |
|------|-------------|
| [`GitDemo/`](./GitDemo/) | The repository created and solved in this lab (`git init` → commit `welcome.txt`). |
| [`GitDemo/welcome.txt`](./GitDemo/welcome.txt) | The tracked file, content: `Welcome to the version control`. |
| [`solve.sh`](./solve.sh) | Every command from the lab in one Git-Bash script (re-runnable). |

> `GitDemo/` is itself an initialised Git repository (it has its own `.git/`). It is an
> **independent demo repo** nested inside this training repo — that's exactly what the lab
> asks you to produce.

---

## Step 1 — Set up your machine with Git configuration

**1. Check the Git client is installed** (open Git Bash and run):

```bash
$ git version
git version 2.49.0.windows.1
```

If a version prints, the Git client is installed correctly.

**2. Configure user-level identity** (name + email used to stamp every commit):

```bash
$ git config --global user.name  "username"
$ git config --global user.email "username@cognizant.com"
```

> For real commits use your **own** name and a personal email, e.g.
> `git config --global user.name "Adnan Farooq"` /
> `git config --global user.email "you@example.com"`.

**3. Verify the configuration:**

```bash
$ git config --global --list
user.name=username
user.email=username@cognizant.com
```

---

## Step 2 — Integrate Notepad++ and make it the default editor

**1. Check whether Git Bash can already find Notepad++:**

```bash
$ notepad++
bash: notepad++: command not found
```

If you see *command not found*, `notepad++.exe` is **not** on the `PATH`.

**2. Add Notepad++ to the `PATH` (Windows):**
Control Panel → System → Advanced System settings → **Environment Variables** →
under *User variables* select **Path** → **Edit** → **New** → add the Notepad++ install
folder (typically `C:\Program Files\Notepad++`) → **OK**.

Close and reopen Git Bash, then confirm it launches:

```bash
$ notepad++          # Notepad++ now opens from the shell
```

**3. (Optional) Create an alias** so `npp` opens a fresh, single instance. Running the
command below appends the alias line to your `~/.bash_profile`:

```bash
$ notepad++.exe bash -profile
# add this line and save:
alias npp='notepad++.exe -multiInst -nosession'
```

**4. Make Notepad++ the default Git editor:**

```bash
$ git config --global core.editor "notepad++.exe -multiInst -nosession"
```

**5. Verify** (`-e` opens the global config in the editor you just set):

```bash
$ git config --global -e
hint: Waiting for your editor to close the file...
```

The file shows the full global config:

```ini
[user]
    name = username
    email = username@cognizant.com
[core]
    editor = notepad++.exe -multiInst -nosession
```

---

## Step 3 — Add a file to the source-code repository

**1. Create a new project `GitDemo` and initialise it:**

```bash
$ git init GitDemo
Initialized empty Git repository in .../Week 6/1. Git-HOL/GitDemo/.git/
```

**2. Verify the repo — list hidden files (the `.git/` working directory):**

```bash
$ ls -al
total 8
drwxr-xr-x 1 ...  ./
drwxr-xr-x 1 ...  ../
drwxr-xr-x 1 ...  .git/
```

**3. Create `welcome.txt` and add content:**

```bash
$ echo "Welcome to the version control" >> welcome.txt
```

**4. Verify the file was created:**

```bash
$ ls -al
...
-rw-r--r-- 1 ... welcome.txt
```

**5. Verify the content:**

```bash
$ cat welcome.txt
Welcome to the version control
```

**6. Check the status** — the file is in the *working directory*, untracked:

```bash
$ git status
On branch master

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	welcome.txt

nothing added to commit but untracked files present (use "git add" to track)
```

**7. Stage the file so Git starts tracking it:**

```bash
$ git add welcome.txt
warning: LF will be replaced by CRLF in welcome.txt.
The file will have its original line endings in your working directory
```

**8. Commit** — with Notepad++ set as editor, `git commit` opens Notepad++ to type a
multi-line message; save and close to complete the commit. (Non-interactively you can
pass the message inline with `-m`, which is what the verified run below used.)

```bash
$ git commit                       # opens Notepad++ for the message
# — or —
$ git commit -m "Add welcome.txt to version control"
[master (root-commit) 279fe7c] Add welcome.txt to version control
 1 file changed, 1 insertion(+)
 create mode 100644 welcome.txt
```

**9. Confirm working directory and repository are in sync:**

```bash
$ git status
On branch master
nothing to commit, working tree clean
```

`welcome.txt` is now committed to the local repository.

---

## Remote steps (GitHub / GitLab)

**10.** Sign up for a **free personal** GitHub/GitLab account and create a remote
repository named `GitDemo`.

**11.** Point your local repo at the remote and **pull**:

```bash
$ git remote add origin https://github.com/<your-user>/GitDemo.git
$ git pull origin master
```

**12.** **Push** your local commits up to the remote:

```bash
$ git push origin master
```

> Modern GitHub defaults to a `main` branch. If your remote uses `main`, either push with
> `git push origin master:main`, or rename locally first: `git branch -M main` then
> `git push -u origin main`. GitHub also requires a **Personal Access Token** (not your
> account password) for HTTPS pushes.

---

## Verification

Ran locally with **Git 2.49.0.windows.1**. The local lab (Steps 1 & 3) executed
end-to-end and the real output matched the sheet:

- `git init GitDemo` → *Initialized empty Git repository …*
- `git status` before add → *Untracked files: welcome.txt*
- `git add` + `git commit` → *root-commit … 1 file changed, 1 insertion(+)*
- `git status` after commit → **`nothing to commit, working tree clean`** ✅

Step 2 (Notepad++ as the default editor) is a Windows GUI/`PATH` configuration and is
documented above; it isn't captured as terminal output because an interactive editor
can't run in a non-interactive shell.
