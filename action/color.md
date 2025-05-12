# 颜色

`rengar-admin`的色彩是基于`tailwindcss3`的色彩值的，颜色值列表可以查看[tailwindcss3-colors](https://www.tailwindcss.cn/docs/customizing-colors)。

这里举个颜色值的例子：

```
  slate: {
    DEFAULT: '#64748b',
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },
```

`tailwindcss`的所有颜色值已经注入为 css 变量，

新增了`primary`的自定义主题色，新增的`primary`颜色是根据颜色自动生成符合以上示例值的颜色。

你可以在代码中直接使用这些颜色值，使用方式`var(--color-[色系]-[值])`，如`var(--color-primary-500)` 、`var(--color-red-500)`。其中，
`DEFAULT`字段使用的时候直接省略，如`var(--color-slate)`、`var(--color-primary)`

示例如下：

```vue
<div class="text-primary"></div>
<div style="color: var(--color-primary)"></div>

<div class="text-primary-200"></div>
<div style="color: var(--color-primary-200)"></div>
```

## 自定义主题色

直接修改`src/config/app.ts`中的代码即可：

```ts{14}
const appConfig: App.BaseConfig = {
  layout: {
    layoutMode: "aside",
    asideWidth: 220,
    headerHeight: 56,
    footerHeight: 46,
    tabHeight: 44,
    gap: 12,
    showTabs: true,
    showBreadcrumb: true,
    showFooter: true,
  },
  theme: {
    primaryColor: "#8b5cf6", #### 自定义主题色，由于naive-ui的局限性，只支持16进制颜色值
  },
};
```
