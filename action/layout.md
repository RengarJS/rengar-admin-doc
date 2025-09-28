# 布局

## 布局说明

`rengar-admin`内置了两个布局（基础布局、空白布局），位于`src/layouts`下，布局使用方式位于`src/App.vue`中。

默认布局为`BasicLayout`，如果需要使用空白布局，请在路由配置将`meta.layout`字段设置为`"blank"`。

```vue
<template>
  <component :is="layoutComponent"></component>
</template>

<script setup lang="ts">
// 基础布局
import BasicLayout from "@/layouts/base/index.vue";

// 空白布局
import BlankLayout from "@/layouts/blank/index.vue";

const route = useRoute();
const layoutComponent = computed(() => {
  const layout = route.meta.layout;
  if (!layout || layout === "base") return BasicLayout;
  return BlankLayout;
});
</script>
```

你也可以自定义布局，只需要在`src/layouts`目录下创建一个布局文件，在`App.vue`中引入该布局组件，自行修改`layoutComponent`方法渲染布局，并设置`meta.layout`字段为该布局文件的名称即可。

## 基础布局

基础布局目前有三种布局：

1. 侧边栏布局
2. 头部布局
3. 头部和侧边栏布局

代码位于`src/layouts/strategies/index.ts`，使用策略模式实现布局功能，每个布局互不干扰，方面修改或者扩展。

如果这三个布局不能满足你的系统，你可以修改或自定义自己的布局。
