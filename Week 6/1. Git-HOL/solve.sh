#!/usr/bin/env bash
# Week 6 - Git HOL: every command from the lab, runnable in Git Bash.
# Run from the "1. Git-HOL" folder:  bash solve.sh
set -e

# ---------------------------------------------------------------------------
# Step 1 - Machine setup / Git configuration
# ---------------------------------------------------------------------------
git version

# Use your OWN personal identity (do NOT use Cognizant credentials for remotes):
git config --global user.name  "Adnan Farooq"
git config --global user.email "you@example.com"
git config --global --list

# ---------------------------------------------------------------------------
# Step 2 - Make Notepad++ the default Git editor (Windows)
#   Prereq: add Notepad++ install dir (e.g. C:\Program Files\Notepad++) to PATH.
# ---------------------------------------------------------------------------
git config --global core.editor "notepad++.exe -multiInst -nosession"
# Optional alias (append to ~/.bash_profile), then `source ~/.bash_profile`:
#   alias npp='notepad++.exe -multiInst -nosession'
# git config --global -e        # opens the global config in Notepad++

# ---------------------------------------------------------------------------
# Step 3 - Add a file to the repository
# ---------------------------------------------------------------------------
rm -rf GitDemo
git init GitDemo
cd GitDemo

echo "Welcome to the version control" >> welcome.txt
ls -al
cat welcome.txt

git status                 # welcome.txt shows as untracked
git add welcome.txt
# Interactive (opens Notepad++):  git commit
git commit -m "Add welcome.txt to version control"
git status                 # -> nothing to commit, working tree clean
git log --oneline

# ---------------------------------------------------------------------------
# Remote (GitHub / GitLab) - create a free PERSONAL repo named GitDemo first
# ---------------------------------------------------------------------------
# git remote add origin https://github.com/<your-user>/GitDemo.git
# git pull origin master
# git push origin master
