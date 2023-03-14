git checkout origin/app -f
git reset --soft origin/master
pnpm run build
git push -f