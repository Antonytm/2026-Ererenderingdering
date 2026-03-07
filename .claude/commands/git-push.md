# Git Commit and Push

Commit all changes and push to remote.

## Instructions

1. Run `git status` to see all changes
2. Run `git diff` to review the changes (staged and unstaged)
3. Run `git log --oneline -3` to see recent commit message style
4. Add all changes with `git add -A`
5. Create a commit with a descriptive message summarizing the changes
6. Determine the current branch with `git branch --show-current`
7. If on `main`:
   - Run `git push origin main`
8. If on a feature branch:
   - Save the current branch name
   - Run `git checkout main`
   - Run `git merge <branch>` to merge the feature branch into main
   - Run `git push origin main`
   - Run `git checkout <branch>` to return to the feature branch
9. Confirm success with `git status`

Always include the co-author line:
```
Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
```
