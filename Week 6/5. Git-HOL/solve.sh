#!/usr/bin/env bash
# Week 6 - Git HOL 5: Clean up & push back to remote.
# Run in Git Bash from the "5. Git-HOL" folder:  bash solve.sh
set -e

# ---- set-up: a bare repo stands in for the GitLab/GitHub remote ----
rm -rf RemoteOrigin.git GitCleanupDemo
git init --bare RemoteOrigin.git
git clone RemoteOrigin.git GitCleanupDemo
cd GitCleanupDemo
echo "project readme" >> README.txt
git add README.txt
git commit -m "Initial commit"
git push -u origin master

# pending (unpushed) work carried over from Git-T03-HOL_002
echo "<message>resolved content from Git-T03-HOL_002</message>" >> hello.xml
git add hello.xml
git commit -m "Add hello.xml (pending work from Git-T03-HOL_002)"

# 1. Verify master is clean (note: ahead of origin/master by 1 commit)
git status

# 2. List all branches (local + remote-tracking)
git branch -a

# 3. Pull the remote into master
git pull origin master

# 4. Push the pending changes to the remote
git push origin master
git status

# 5. Observe that the changes are reflected in the remote
git ls-remote RemoteOrigin.git 2>/dev/null || git ls-remote ../RemoteOrigin.git
git --git-dir=../RemoteOrigin.git log --oneline
git --git-dir=../RemoteOrigin.git ls-tree --name-only -r master
git --git-dir=../RemoteOrigin.git show master:hello.xml

# For a REAL remote instead of the local bare repo:
#   git remote set-url origin https://github.com/<your-user>/<repo>.git
#   git push origin master
