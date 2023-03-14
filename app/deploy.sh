# 切换到 app 分支
git checkout origin/app
git reset --hard origin/master
pnpm run build
git push -f