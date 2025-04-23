# monorepo 介绍

`monorepo` 是一个概念，它代表一个仓库中包含多个子项目，这些子项目可以共享相同的依赖，也可以共享相同的构建工具。本项目里使用基于`pnpm`的`monorepo 能力。

pnpm 使用`monorepo`架构只需在根目录新建`pnpm-workspace.yaml`，`rengar-admin`的配置如下：

```yaml
packages:
  # packages/ 直接子目录中的所有包
  - "packages/*"
  # 排除测试目录中的包
  - "!**/test/**"
```

该配置会把`packages`下的所有直接子目录作为包

由于使用了`monorepo`，安装依赖有所不同，以下是安装依赖的示例：

- 安装`dayjs`到根目录，执行`pnpm add dayjs -w`，`-w`表示安装到根目录。
- 安装`dayjs`到`packages/axios`，
