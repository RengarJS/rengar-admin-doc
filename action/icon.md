# 图标

::: danger 提示
非常不建议使用 naive-ui 推荐的图标库[xicons](https://xicons.org/)，亲测了安装了多个图标库，直接会导致 ts 卡死，具体原因是这个图标库里有成千上万的 ts 类型文件。
:::

`rengar-admin`内置了[iconify](https://icones.js.org/)的图标库。

## 使用iconify在线图标

::: danger 注意
在线引入需要依赖外网访问，如果你的系统是内网环境，请使用离线方式
:::

1. 使用封装的组件引入：

   ```vue
   <SvgIcon icon="ri-home-3-line" />
   ```

   `SvgIcon`会自动引入，无需手动引入

2. 使用官方组件：

   ```vue
   <template>
     <Icon icon="mdi:ab-testing"></Icon>
   </template>

   <script setup lang="ts">
   import { Icon } from "@iconify/vue";
   </script>
   ```

## 使用iconify离线图标

1. 使用`class`的方式引入：

   ```vue
   <div class="i-ri-home-3-line"></div>
   ```

   ::: tip 提示
   图标规则，i-[iconify 图标库名称]-[图标名称]
   :::

2. 使用组件方式引入：

   ```vue
   <i-ri-home-3-line></i-ri-home-3-line>
   ```

   ::: tip 提示
   `v2.5.0`支持此功能。
   图标规则，i-[iconify 图标库名称]-[图标名称]
   :::

3. 手动引入使用：

   ```vue
   <template>
     <HomeIcon></HomeIcon>
     <SettingIcon></SettingIcon>
   </template>

   <script setup lang="ts">
   import HomeIcon from "~icons/mingcute/home-2-line";
   import SettingIcon from "~icons/mingcute/settings-5-line";
   </script>
   ```

   ::: tip 提示
   `v2.5.0`支持此功能。
   引入规则，`~icons`/`[iconify 图标库名称]`/`[图标名称]`
   :::

## 本地 svg 图标

把需要使用的 svg 图标放到项目的`src/assets/svg-icons`目录下即可使用。**所有图标的前缀必须以`i-local-`开头**。

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

## logo

logo 修改： `public/favicon.ico`、`src/assets/svg-icons/logo.svg`修改为自己的 logo，文件名和格式不能改变。
