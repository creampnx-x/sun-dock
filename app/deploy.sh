git checkout origin/app
git reset --soft origin/master
pnpm run build
git push -f