#!/usr/bin/env bash
# Week 6 - Git HOL 4: Resolving merge conflicts (3-way / P4Merge).
# Run in Git Bash from the "4. Git-HOL" folder:  bash solve.sh
set -e

# --- base repo on master ---
rm -rf GitConflictDemo
git init GitConflictDemo
cd GitConflictDemo
echo "project readme" >> README.txt
git add README.txt
git commit -m "Initial commit on master"

# 1. Verify master is clean
git status

# 2. Create branch GitWork, add hello.xml
git checkout -b GitWork
echo "<message>Hello from GitWork branch</message>" >> hello.xml

# 3. Observe status
git status

# 4. Commit to the branch
git add hello.xml
git commit -m "Add hello.xml on GitWork branch"

# 5. Switch to master
git checkout master

# 6. Add hello.xml on master with DIFFERENT content
echo "<message>Hello from master trunk</message>" >> hello.xml
git add hello.xml

# 7. Commit to master
git commit -m "Add hello.xml on master with different content"

# 8. Observe diverged log
git log --oneline --graph --decorate --all

# 9. Differences with the diff tool
git diff master GitWork

# 10. Visual differences with P4Merge (configure once, then launch - GUI)
# git config --global diff.tool p4merge
# git config --global difftool.p4merge.path "C:/Program Files/Perforce/p4merge.exe"
# git config --global merge.tool p4merge
# git config --global mergetool.p4merge.path "C:/Program Files/Perforce/p4merge.exe"
# git difftool master GitWork

# 11. Merge the branch into master -> CONFLICT
git merge GitWork || true

# 12. Observe the git markup
git status
cat hello.xml

# 13. Resolve with 3-way merge tool (GUI):  git mergetool
#     Here we resolve directly to the combined result P4Merge would produce:
printf '<message>Hello from master trunk and GitWork branch</message>' > hello.xml
# (git mergetool would leave a hello.xml.orig backup - simulate it:)
printf '<<<<<<< HEAD\n<message>Hello from master trunk</message>\n=======\n<message>Hello from GitWork branch</message>\n>>>>>>> GitWork\n' > hello.xml.orig

# 14. Commit the resolution
git add hello.xml
git commit -m "Merge GitWork into master; resolve hello.xml conflict"

# 15. Observe status + ignore the *.orig backup
git status
printf '# Ignore P4Merge / git mergetool backup files\n*.orig\n' > .gitignore
git status

# 16. Commit the .gitignore
git add .gitignore
git commit -m "Ignore *.orig merge backup files"

# 17. List all branches
git branch -a

# 18. Delete the merged branch
git branch -d GitWork

# 19. Final log
git log --oneline --graph --decorate
