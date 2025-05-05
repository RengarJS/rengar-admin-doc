# 请求

## 项目示例 api

示例 api 是基于[apiFpx](https://apifox.com/)的 mock 的，所有的 CRUD 接口都没有实际的效果，仅仅只是为了演示。

[点击查看示例文档](https://apifox.com/apidoc/shared/86037536-a9a1-453b-9bcf-28ff484cc199)，密码为`rengar-admin`，此文档会更新密码。

## request 封装

`renga-admin`基于`axios`封装了一个基本的**抽象类**，代码位于`packages/axios/index.ts`中，代码如下：

```ts
import axios from "axios";
import type {
  AxiosInstance,
  AxiosRequestConfig,
  CancelTokenSource,
} from "axios";

abstract class BaseHttpClient {
  protected instance: AxiosInstance;
  protected requestInterceptor: number;
  protected responseInterceptor: number;
  protected cancelTokenSource: CancelTokenSource;

  constructor(config: AxiosRequestConfig) {
    this.cancelTokenSource = axios.CancelToken.source();
    this.instance = axios.create({
      ...config,
      cancelToken: this.cancelTokenSource.token,
    });
    this.requestInterceptor = this.initializeRequestInterceptor();
    this.responseInterceptor = this.initializeResponseInterceptor();
  }

  protected abstract initializeRequestInterceptor(): number;
  protected abstract initializeResponseInterceptor(): number;

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.get<T>(url, config) as Promise<T>;
  }

  public async post<T>(
    url: string,
    data?: Recordable,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.instance.post<T>(url, data, config) as Promise<T>;
  }

  public async request<T>(config: AxiosRequestConfig): Promise<T> {
    return this.instance.request<T>(config) as Promise<T>;
  }

  public async upload<T>(
    url: string,
    file: File,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const formData = new FormData();
    formData.append("file", file);

    return this.instance.post<T>(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      ...config,
    }) as Promise<T>;
  }
}

export default BaseHttpClient;
```
