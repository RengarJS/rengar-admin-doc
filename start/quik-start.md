# 快速开始

## 环境要求

- [node.js](https://nodejs.org/): >= 20
- [pnpm](https://pnpm.io/): >= 9
- [git](https://git-scm.com/)

## 创建项目

```bash
git clone git@github.com:RengarJS/rengar-admin.git your-project-name
```

## 安装依赖

::: danger 注意
`rengar-admin`使用了基于`pnpm`的`monorepo`架构，所以请使用`pnpm`进行依赖安装。
:::

```bash
pnpm install
```

## 启动项目

```bash
pnpm dev
```

## 打包项目

```bash
pnpm build
```

## VSCode 扩展

::: tip 提示
你无需手动去安装以下扩展，使用`vscode`打开会提示你安装这些推荐的扩展。
:::

为了体验到更好的开发体验，提供了一些`vscode`扩展：

- [Vue Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar)：Vue 官方推荐的语法高亮与类型支持插件，适用于 Vue 3 项目。
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)：代码规范检查工具，帮助保持代码风格一致。
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)：代码格式化工具，提升代码可读性。
- [UnoCSS](https://marketplace.visualstudio.com/items?itemName=antfu.unocss)：原子化 CSS 引擎，支持即时按需生成样式。
- [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify)：为 Iconify 图标库提供智能提示和补全。
- [icones](https://marketplace.visualstudio.com/items?itemName=afzalsayed96.icones)：图标管理与搜索工具，便于快速查找和复制 SVG 图标。
- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)：统一不同编辑器和 IDE 的代码风格配置。
- [Vue VSCode Snippets](https://marketplace.visualstudio.com/items?itemName=sdras.vue-vscode-snippets)：常用 Vue 代码片段，提升开发效率。

## 最佳实践

首先请阅读一下全部的文档，大致了解一下`reangar-admin`的功能，然后参照以下步骤修改，快速开发

1. 修改`.env.development`的`VITE_API_URL`为你自己的后端 api
2. 修改`src/api/request.ts`的请求拦截器和响应拦截器的方法
3. 修改`src/views/login/index.vue`的登录参数和相关的后端 api 请求、响应参数
4. 修改`src/stores/modules/auth.ts`的逻辑，打通用户详情接口
5. logo 修改： `public/favicon.ico`、`src/assets/svg-icons/logo.svg`修改为自己的 logo，文件名和格式不能改变
