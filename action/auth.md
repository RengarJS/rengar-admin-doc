# 权限系统

`rengar-admin`通过`src/stores/module/auth.ts`的`roleMap`来存储用户的权限数据。你需要后端 api 返回该用户所有的权限数据，然后将其存储到`roleMap`中。

## 页面权限

`rengar-admin`并没有采用传统的`addRoute`方案，而是通过全局路由守卫来判断用户是否具有访问该页面的权限，代码位于`src/router/guard.ts`中。

配置页面的路由权限非常简单，在路由中设置的`meta`字段设置`roles`字段，如：

```ts
meta: {
  roles: ["xxxx"];
}
```

## 组件、按钮权限

1. 可以直接使用封装好的自定义指令`v-role`来实现按钮、组件的鉴权。
   ```vue
   <button v-role="['xxxx']">按钮</button>
   <custom-component v-role="['xxxx']">组件</custom-component>
   ```
2. 也可以通过封装的`useAuth`的 hook 来实现鉴权。
   ```vue
   <script setup lang="ts">
   import { useAuth } from "@/hooks/auth";
   </script>
   <template>
     <div v-if="useAuth('xxxx')">组件</div>
   </template>
   ```
