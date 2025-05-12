# 颜色

`tailwindcss`的所有颜色值已经注入为 css 变量，同时也新增了`primary`的自定义主题色，你可以在代码中直接使用这些颜色值，使用方式`var(--color-[色系]-[值])`，如`var(--color-primary-500)` 、`var(--color-red-500)`。其中，每个色系都有一个默认值，如`var(--color-primary)`和`var(--color-red-500)`相同。

当然，你可以使用`class`的方式使用这些颜色值，如`text-primary`、`text-red`。

示例如下：

```vue
<div class="text-primary"></div>
<div style="color: var(--color-primary)"></div>
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
