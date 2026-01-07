# 同步代码

开发的过程中，难免会遇到 bug，如果你已经使用了`rengar-admin`开发项目，通过以下步骤来同步最新的代码：

1.把`rengar-admin`的仓库加入到你的项目：

```bash
  git remote add template git@github.com:RengarJS/rengar-admin.git
```

2.拉取代码，两种方式拉取代码：

- 1. 使用`git pull template main`拉取合并最新的代码, 遇到冲突请自行解决
- 2. 先运行`git fetch template`拉取最新的提交信息（不会合并代码）,再通过`git cherry-pick [commit id]`来合并某次提交，如果遇到冲突，Git 会暂停操作，等待你手动解决冲突。解决完冲突后，需要运行 git cherry-pick --continue 来告诉 Git 冲突已经处理完毕，可以继续应用剩下的变更。
