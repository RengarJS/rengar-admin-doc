# 请求

## 项目示例 api

示例 api 是基于[apiFpx](https://apifox.com/)的 mock 的，所有的 CRUD 接口都没有实际的效果，仅仅只是为了演示。

[点击查看示例文档](https://apifox.com/apidoc/shared/86037536-a9a1-453b-9bcf-28ff484cc199)，密码为`rengar-admin`，此文档会更新密码。

## request 封装

因为后端的规范是各式各样的，所以`renga-admin`提供了一个**抽象类**，你可以继承这个抽象类，然后重写`initializeRequestInterceptor`和`initializeResponseInterceptor`方法，来实现自己的请求拦截器和响应拦截器。

`rengar-admin`的示例请求的自定义请求拦截如下，你可以根据后端的实际情况来实现自己的请求拦截器

```ts
import BaseHttpClient from "@rengar-admin/axios";
import type { AxiosRequestConfig } from "axios";
import { useRouterHook } from "@/hooks/router";
import { useAuthStore } from "@/stores";
import router from "@/router";

function showErrorMessage(message: string) {
  window.$message.error(message);
}

class HttpClient extends BaseHttpClient {
  constructor(config: AxiosRequestConfig) {
    super(config);
  }

  protected initializeRequestInterceptor(): number {
    return this.instance.interceptors.request.use(
      (config) => {
        const authStore = useAuthStore();
        if (authStore.user.token) {
          config.headers.Authorization = `Bearer ${authStore.user.token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  private handleUnauthorized(message: string = "未授权，请重新登录") {
    const { routerReplaceToLogin } = useRouterHook(false);
    this.cancel();
    showErrorMessage(message);
    const authStore = useAuthStore();
    authStore.reset();
    routerReplaceToLogin(router.currentRoute.value.fullPath);
    return Promise.reject(new Error(message));
  }

  protected initializeResponseInterceptor(): number {
    return this.instance.interceptors.response.use(
      (response) => {
        if (response.status === 200 && response.data.code === "000000") {
          return response.data.data;
        } else if (response.data.code === "401") {
          return this.handleUnauthorized();
        } else {
          showErrorMessage(response.data.msg || "请求失败");
          return Promise.reject(new Error(response.data.msg || "请求失败"));
        }
      },
      (error) => {
        if (error.response?.status === 401) {
          return this.handleUnauthorized();
        }
        showErrorMessage("请求失败");
        return Promise.reject(error);
      }
    );
  }
}

const baseHttp = new HttpClient({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 1000 * 10,
});

export { baseHttp };
```

## 多个后端 api

如果你的项目有多个 api，你需要根据不同的 api 来创建不同的`BaseHttpClient`实例，然后在不同的地方使用不同的实例。至于多个 api 的地址自行在环境变量里维护。
