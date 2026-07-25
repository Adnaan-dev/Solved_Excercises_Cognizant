#!/usr/bin/env bash
# Week 6 - Git HOL 3: Branching & Merging (with P4Merge). Run in Git Bash from
# the "3. Git-HOL" folder:  bash solve.sh
set -e

# --- base repo on master ---
rm -rf GitBranchDemo
git init GitBranchDemo
cd GitBranchDemo
echo "line one on master" >> README.txt
git add README.txt
git commit -m "Initial commit on master"

# ============================ BRANCHING ============================
# 1. Create a new branch
git branch GitNewBranch

# 2. List all local + remote branches (* = current)
git branch -a

# 3. Switch to the branch, add files with content
git checkout GitNewBranch            # or: git switch GitNewBranch
echo "feature work in branch"          >> feature.txt
echo "line two added on GitNewBranch"  >> README.txt

# 4. Commit the changes on the branch
git add .
git commit -m "Add feature.txt and update README on GitNewBranch"

# 5. Check status
git status

# ============================ MERGING ==============================
# 1. Switch to master (trunk)
git checkout master

# 2. CLI differences between trunk and branch
git diff master GitNewBranch

# 3. Visual differences with P4Merge (one-time config, then launch).
#    Adjust the path to your P4Merge install.
# git config --global diff.tool p4merge
# git config --global difftool.p4merge.path "C:/Program Files/Perforce/p4merge.exe"
# git config --global merge.tool p4merge
# git config --global mergetool.p4merge.path "C:/Program Files/Perforce/p4merge.exe"
# git config --global difftool.prompt false
# git difftool master GitNewBranch

# 4. Merge the branch into the trunk (use --no-ff to force a merge commit)
git merge GitNewBranch

# 5. History graph after merging
git log --oneline --graph --decorate

# 6. Delete the merged branch and observe status
git branch -d GitNewBranch
git status
git branch -a

# GitLab flow (optional):
# git push -u origin GitNewBranch   # then open a Merge Request in GitLab
