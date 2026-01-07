# monorepo 介绍

请先阅读[pnpm monorepo](https://pnpm.io/zh/workspaces)详解。

`monorepo` 是一个概念，它代表一个仓库中包含多个子项目，这些子项目可以共享相同的依赖，也可以共享相同的构建工具。本项目里使用基于`pnpm`的`monorepo` 能力。

pnpm 使用`monorepo`架构只需在根目录新建`pnpm-workspace.yaml`，`rengar-admin`的配置如下：

```yaml
packages:
  # packages/ 直接子目录中的所有包
  - "packages/*"
  # 排除测试目录中的包
  - "!**/test/**"
```

## 全局依赖

在使用了了`monorepo`之后，根目录的`package.json`里面的依赖叫做**全局依赖**，所有制的子包都能直接访问，无需在子包安装

安装全局依赖命令如下：

```shell
pnpm add dayjs -w
```

其中`-w`不能省略。

## 子包依赖

子包依赖安装命令如下：

一种方式是不用切换到子包的目录：

```shell
pnpm add dayjs -F @rengar-admin/axios
```

一种是切换到子包所在的目录，执行：

```shell
pnpm add dayjs
```

## monorepo 在项目中的体现

在`rengar-admin`项目中，在`packages`目录下有多个子包，这些子包均已安装在全局依赖中,其他任何地方都可以使用。

```json
{
  "@rengar-admin/axios": "workspace:^",
  "@rengar-admin/color": "workspace:^",
  "@rengar-admin/unocss": "workspace:^",
  "@rengar-admin/vite-plugin-version": "workspace:^",
  "@rengar-admin/vite-plugin-vue-inject-name": "workspace:^",
  "@rengar-admin/vite-plugin-vue-routes": "workspace:^"
}
```
