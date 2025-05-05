# 目录结构

以下是`rengar-admin`目录结构及说明：

```
├── .editorconfig                # 编辑器配置文件，统一代码风格
├── .env                         # 环境变量配置文件
├── .env.development             # 开发环境变量
├── .env.production              # 生产环境变量
├── .env.test                    # 测试环境变量
├── .github/                     # GitHub相关配置，此目录可直接删除
│   └── workflows/               # GitHub Actions工作流
├── .gitignore                   # Git忽略文件配置
├── .husky/                      # Husky钩子配置
│   ├── _/
│   └── pre-commit               # 提交前钩子脚本
├── .npmrc                       # npm配置文件
├── .prettierignore              # Prettier忽略文件配置
├── .vscode/                     # VSCode编辑器配置
│   └── extensions.json          # 推荐插件列表
├── 404.html                     # 404错误页面，可直接删除
├── README.md                    # 项目说明文档
├── build/                       # 构建相关文件
│   └── plugins/                 # 构建插件
├── eslint.config.ts             # ESLint配置
├── index.html                   # 项目入口HTML
├── package.json                 # 项目依赖及脚本配置
├── packages/                    # Monorepo子包
│   ├── axios/                   # axios相关封装
│   ├── color/                   # 颜色工具
│   ├── unocss/                  # UnoCSS自定义预设
│   ├── vite-plugin-version/     # Vite版本插件，用户打包自动生成版本信息
│   ├── vite-plugin-vue-inject-name/ # Vite插件，自动注入name到页面中
│   └── vite-plugin-vue-routes/  # Vite路由插件，根绝目录自动生成路由
├── pnpm-lock.yaml               # pnpm锁定文件
├── pnpm-workspace.yaml          # pnpm工作区配置
├── prettier.config.js           # Prettier格式化配置
├── public/                      # 公共静态资源
│   ├── favicon.ico              # 网站图标
│   └── version.json             # 版本信息
├── src/                         # 源码目录
│   ├── App.vue                  # Vue主组件
│   ├── api/                     # API请求接口
│   ├── assets/                  # 静态资源
│   ├── components/              # 公共组件
│   ├── config/                  # 配置文件
│   ├── hooks/                   # 自定义Hooks
│   ├── layouts/                 # 布局组件
│   ├── main.ts                  # 入口TS文件
│   ├── plugins/                 # 插件
│   ├── router/                  # 路由配置
│   ├── stores/                  # 状态管理
│   ├── utils/                   # 工具函数
│   └── views/                   # 页面视图
├── tsconfig.app.json            # TS应用配置
├── tsconfig.json                # TS全局配置
├── tsconfig.node.json           # TS Node配置
├── typings/                     # 类型定义
│   ├── app/                     # 应用相关类型
│   └── common/                  # 通用类型
│   └── node/                    # Node相关类型
├── uno.config.ts                # UnoCSS配置
└── vite.config.ts               # Vite配置
```
