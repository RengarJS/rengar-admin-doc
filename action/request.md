# 请求

## 项目示例 api

项目 api 接口是真实运行在服务器的接口，[后端仓库](https://github.com/RengarJS/rengar-admin-python)，后端使用了[fastapi](https://fastapi.tiangolo.com/)来开发

[点击查看接口文档](https://s.apifox.cn/36fc3c88-5719-4a7d-a34b-b7c89d4d1c11)，密码为`rengar-admin`，此文档会不定期更新密码。

## request 封装

因为后端的规范是各式各样的，所以`renga-admin`提供了一个**父类**，你可以继承这个父类，然后重写`initializeRequestInterceptor`和`initializeResponseInterceptor`方法，来实现自己的请求拦截器和响应拦截器。代码位于`packages/axios/index.ts`中。

`rengar-admin`的示例请求的自定义请求拦截如下，你可以根据后端的实际情况来实现自己的请求拦截器，代码位于`src/api/request.ts`。

```ts
import BaseHttpClient from "@rengar-admin/axios";
import type { AxiosRequestConfig } from "axios";
import { useRouterHook } from "@/hooks/router";
import { useAuthStore } from "@/stores";
import router from "@/router";
import { useAuthStore } from "@/stores";

import { getServiceBaseUrl } from "@/utils/service";

function showErrorMessage(message: string) {
  window.$message?.error?.(message);
}

class HttpClient extends BaseHttpClient {
  constructor(config: AxiosRequestConfig) {
    super(config);
  }

  // 自定义请求拦截
  // [!code ++]
  protected initializeRequestInterceptor(): number {
    return this.instance.interceptors.request.use(
      (config) => {
        const authStore = useAuthStore();
        if (authStore.user.token) {
          config.headers.Authorization = `Bearer ${authStore.user.token}`;
        }
        // ✅ 记录发起请求时的路由路径
        config.meta = config.meta || {};
        config.meta.routerFullPath = router.currentRoute.value.fullPath;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  private handleUnauthorized(
    message: string = "未授权，请重新登录",
    path?: string
  ) {
    const { routerReplaceToLogin } = useRouterHook(false);
    // ✅ 关键：取消所有请求，避免后续 401 弹窗或跳转
    this.cancelAll();
    showErrorMessage(message);
    const authStore = useAuthStore();
    authStore.reset();
    routerReplaceToLogin(path);
    return Promise.reject(new Error(message));
  }

  // 自定义响应拦截
  // [!code ++]
  protected initializeResponseInterceptor(): number {
    return this.instance.interceptors.response.use(
      (response) => {
        if (response.status === 200 && response.data.code === "000000") {
          return response.data.data;
        } else if (response.data.code === "401") {
          return this.handleUnauthorized(
            undefined,
            response.config.meta?.routerFullPath
          );
        } else {
          showErrorMessage(response.data.message || "请求失败");
          return Promise.reject(new Error(response.data.message || "请求失败"));
        }
      },
      (error) => {
        if (error.response?.status === 401) {
          return this.handleUnauthorized(
            undefined,
            error.config?.meta?.routerFullPath
          );
        }
        showErrorMessage(error?.response?.data?.message || "请求失败");
        return Promise.reject(error);
      }
    );
  }
}

const baseHttp = new HttpClient({
  baseURL: getServiceBaseUrl("default", import.meta.env),
  timeout: 1000 * 10,
});

export { baseHttp };
```

## 代理

在`.env.development`中配置以下可以开启 vite proxy 代理：

```shell
# 开启代理
VITE_HTTP_PROXY=Y   # Y = 开启代理，N 或其他 = 关闭
```

原理是在`src/utils/service.ts`中定义了`createServiceConfig`方法放回相关的 proxy 配置，然后在`build/proxy/index.ts`中转化成代理配置。然后给`axios`赋值 `baseURL`的时候使用`getServiceBaseUrl`方法获取代理地址。

`src/utils/service.ts`：

```ts
type ServiceKey = "default";

interface ServiceConfig {
  key: ServiceKey;
  url: string; // 真实 API 地址
  proxyPattern: string; // 代理匹配路径，如 /proxy-default
}
export function createServiceConfig(env: ImportMetaEnv): ServiceConfig[] {
  return [
    {
      key: "default",
      url: env.VITE_API_URL,
      proxyPattern: "/proxy-default",
    },
  ];
}

export function getServiceConfig(key: ServiceKey, env: ImportMetaEnv) {
  const serviceConfig = createServiceConfig(env);
  const service = serviceConfig.find((item) => item.key === key);
  if (!service) {
    throw new Error(`Service ${key} not found`);
  }
  return service;
}

export function getServiceBaseUrl(key: ServiceKey, env: ImportMetaEnv) {
  const service = getServiceConfig(key, env);
  return env.DEV && env.VITE_HTTP_PROXY === "Y"
    ? service.proxyPattern
    : service.url;
}
```

`build/proxy/index.ts`：

```ts
import { createServiceConfig } from "../../src/utils/service";
import type { ProxyOptions } from "vite";
export function createViteProxy(
  env: ImportMetaEnv,
  mode: string
): Record<string, ProxyOptions> | undefined {
  if (mode !== "development" || env.VITE_HTTP_PROXY !== "Y") return undefined;

  const serivceConfigs = createServiceConfig(env);

  const proxy: Record<string, ProxyOptions> = {};

  for (const service of serivceConfigs) {
    proxy[service.proxyPattern] = {
      target: service.url,
      changeOrigin: true,
      rewrite: (path: string) =>
        path.replace(new RegExp(`^${service.proxyPattern}`), ""),
    };
  }

  return proxy;
}
```

## 多个后端 api

1. 在`.env.xxx`里维护一个环境变量来什么你的 api 地址，假设就叫`VITE_API_OHTER_URL`
   ```shell
    VITE_API_OHTER_URL=http://other-api.com
   ```
2. 在`typings/common/env.d.ts`中申明 ts 类型

   ```ts
   declare interface ImportMetaEnv {
     // [!code ++]
     readonly VITE_API_OHTER_URL: string;
   }
   ```

3. 在`src/uitls/service.ts`中添加配置：

   ```ts
   // [!code ++]
   type ServiceKey = "default" | "other";
   export function createServiceConfig(env: ImportMetaEnv): ServiceConfig[] {
     return [
       // [!code ++]
       {
         // [!code ++]
         key: "other",
         // [!code ++]
         url: env.VITE_API_OHTER_UR,
         // [!code ++]
         proxyPattern: "/proxy-other",
         // [!code ++]
       },
     ];
   }
   ```

4. 创建自己的`otherHttp`实例到`src/api/other-request.ts`:

```ts
import BaseHttpClient from "@rengar-admin/axios";
import type { AxiosRequestConfig } from "axios";
import { useRouterHook } from "@/hooks/router";
import router from "@/router";
import { getServiceBaseUrl } from "@/utils/service";

function showErrorMessage(message: string) {
  window.$message?.error?.(message);
}

class HttpClient extends BaseHttpClient {
  constructor(config: AxiosRequestConfig) {
    super(config);
  }

  protected initializeRequestInterceptor(): number {
    return this.instance.interceptors.request.use(
      (config) => {
        // [!code ++]
        // 这里定义你自己的请求拦截器
        // ✅ 记录发起请求时的路由路径
        config.meta = config.meta || {};
        config.meta.routerFullPath = router.currentRoute.value.fullPath;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  private handleUnauthorized(
    message: string = "未授权，请重新登录",
    path?: string
  ) {
    const { routerReplaceToLogin } = useRouterHook(false);
    // ✅ 关键：取消所有请求，避免后续 401 弹窗或跳转
    this.cancelAll();
    showErrorMessage(message);
    const authStore = useAuthStore();
    authStore.reset();
    routerReplaceToLogin(path);
    return Promise.reject(new Error(message));
  }

  protected initializeResponseInterceptor(): number {
    return this.instance.interceptors.response.use(
      (response) => {
        // [!code ++]
        // 这里定义你自己的响应拦截器
        if (response.status === 200 && response.data.code === "000000") {
          return response.data.data;
        } else if (response.data.code === "401") {
          return this.handleUnauthorized(
            undefined,
            response.config.meta?.routerFullPath
          );
        } else {
          showErrorMessage(response.data.message || "请求失败");
          return Promise.reject(new Error(response.data.message || "请求失败"));
        }
      },
      (error) => {
        if (error.response?.status === 401) {
          return this.handleUnauthorized(
            undefined,
            error.config?.meta?.routerFullPath
          );
        }
        showErrorMessage(error?.response?.data?.message || "请求失败");
        return Promise.reject(error);
      }
    );
  }
}

const otherHttp = new HttpClient({
  // [!code ++]
  baseURL: getServiceBaseUrl("other", import.meta.env),
  timeout: 1000 * 10,
});

export { otherHttp };
```

5. 导入`otherHttp`使用：
   ```ts
   export function getOtherData() {
     return otherHttp.request({});
   }
   ```
