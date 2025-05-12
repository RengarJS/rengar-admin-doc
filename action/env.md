# 环境变量

`rengar-admin`在项目根目录新建了环境变量文件，规范如下：

- `.env`：公共的环境变量；
- `.env.development`：开发环境变量；
- `.env.production`：生产环境变量；
- `.env.test`：测试环境变量。

`package.json`的`scripts`脚本示例如下：

```json
"scripts": {
  "dev": "vite",
  "dev:prod": "vite --mode production",
  "build": "vite build",
  "build:test": "vite build --mode test",
}
```

新增环境变量：

所有的环境变量都应该以`VITE`开头，在配置文件添加环境变量后，在`typings/common/env.d.ts`中配置类型以获得自动提示：

```ts
declare interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_PORT: string;
  readonly VITE_API_URL: string;
  readonly VITE_BASE_URL: string;
  readonly VITE_APP_TOKEN_STORAGE: "sessionStorage" | "localStorage";

  readonly 变量名: 类型;
}
```

获取环境变量：`import.meta.env.环境变量名`
