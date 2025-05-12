# 图标

## 线上图标

`rengar-admin`内置了[iconify](https://icones.js.org/)的图标库，你可以直接使用这些图标。**所有图标的前缀必须以`i-`开头**。

1. 使用封装的组件引入：
   ```vue
   <SvgIcon icon="i-ri-home-3-line" />
   ```
   `SvgIcon`会自动引入，无需手动引入
1. 使用`class`的方式引入：
   ```vue
   <i class="i-ri-home-3-line"></i>
   ```
   ::: tip 提示
   图标规则，i-[iconify 图标库名称]-[图标名称]
   :::

## 本地 svg 图标

把需要使用的 svg 图标放到项目的`src/assets/svg-icons`目录下即可使用。**所有图标的前缀必须以`i-loacal-`开头**。

假如你有一个`src/assets/svg-icons/logo.svg`的图标，你可以这样使用：

1. 使用封装的组件引入：
   ```vue
   <SvgIcon local-icon="i-local-logo" />
   ```
2. 使用`class`的方式引入：
   ```vue
   <i class="i-local-logo"></i>
   ```

::: tip 提示
导入新图标后，需要重启项目
:::
