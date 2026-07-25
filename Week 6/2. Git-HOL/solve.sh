#!/usr/bin/env bash
# Week 6 - Git HOL 2: .gitignore. Run in Git Bash from the "2. Git-HOL" folder:
#   bash solve.sh
set -e

# 1. Initialise a repo
rm -rf GitIgnoreDemo
git init GitIgnoreDemo
cd GitIgnoreDemo

# 2. Create a normal file, a .log file, and a log/ folder
echo "Welcome to gitignore demo" >> app.txt
echo "some debug output"        >> debug.log
mkdir -p log
echo "runtime log line" >> log/server.log
echo "info entry"       >> log/access.log

# 3. Status BEFORE .gitignore -> debug.log and log/ appear as untracked
git status

# 4. Create .gitignore (in real life: notepad++ .gitignore)
cat > .gitignore <<'EOF'
# Ignore all files with a .log extension (anywhere in the repo)
*.log

# Ignore the entire log/ folder and its contents
log/
EOF

# 5. Status AFTER .gitignore -> debug.log and log/ are gone from the list
git status

# 6. Prove they are ignored
git status --ignored
git check-ignore -v debug.log log/server.log log/access.log

# 7. Stage & commit -> only .gitignore + app.txt are committed
git add .
git commit -m "Add app.txt and .gitignore (ignore *.log and log/)"

# 8. Verify
git status            # nothing to commit, working tree clean
git ls-files          # .gitignore  app.txt   (no *.log, no log/)

# Remote (optional):
# git remote add origin https://github.com/<your-user>/GitIgnoreDemo.git
# git push -u origin master
