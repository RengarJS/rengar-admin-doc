# unocss

`rengar-admin`内置了[unocss](https://unocss.dev/)，可以使用`unocss`的特性。

配置文件位于项目根目录`unocss.config.ts`里面。

## 颜色

`tailwindcss`的所有颜色值已经注入为 css 变量，同时也新增了`primary`的自定义主题色，你可以在代码中直接使用这些颜色值，使用方式`var(--color-[色系]-[值])`，如`var(--color-primary-500)` 、`var(--color-red-500)`。其中，每个色系都有一个默认值，如`var(--color-primary)`和`var(--color-red-500)`相同。

当然，你可以使用`class`的方式使用这些颜色值，如`text-primary`、`text-red`。

## 图标

`rengar-admin`内置了[iconify](https://icones.js.org/)的图标库，你可以直接使用这些图标，如`i-ri-home-3-line`。
