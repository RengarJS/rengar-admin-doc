# 路由系统

## 自动生成路由

`rengar-admin`的路由是基于`src/views`目录自动生成路由文件，无需手动配置， 自动生成的路由文件在`src/router/routes.ts`中，自动生成的路由的`name`类型文件位于`typings/common/vite-plugin-routes.d.ts`中。

::: tip 提示
在生成的路由文件中，手动修改 meta 的配置、`redirect`配置不会被自动覆盖，其他的均会被自动覆盖。
:::

### 生成规则

1. 路由的`path`根据文件夹来命名。
2. 叶子节点必须存在`index.vue`或者`[xxx].vue`的文件，否则会被忽略，不会生成路由。
3. 路由的`name`为祖先的目录命名，以`-`连接。
4. 路由的`meta`的`title`为祖先的目录命名，以`_`连接。
5. 以`[xxx].vue`的文件，会被认为是动态路由，生成路由时，会自动生成`params`参数，如`[id].vue`会生成`/:id`

### 单层路由

假设`src/views`目录下有如下目录结构：

```bash
src
└── views
    ├── dashboard
    │   └── index.vue


```

则会自动生成如下路由：

```ts
[
  {
    path: "/dashboard",
    name: "dashboard",
    meta: {
      title: 'dashboard'
    }
    component: () => import("@/views/dashboard/index.vue"),
  }
];
```

### 多级路由

假设`src/views`目录下有如下目录结构：

```bash
src
└── views
    ├── dashboard
    │   ├── index.vue
    │   └── analysis
    │       └── index.vue
    ├── user
    │   └── list
    │       └── index.vue
    │   └── add
    │       └── [index].vue
    │   └── edit
    │       └── [id].vue   # 动态路由

```

则会自动生成如下路由：

```ts
[
  {
    path: "/dashboard",
    name: "dashboard",
    meta: {
      title: 'dashboard'
    }
    component: () => import("@/views/dashboard/index.vue"),
    children: [
      {
        path: "/dashboard/analysis",
        name: "dashboard-analysis",
        meta: {
          title: 'dashboard_analysis'
        }
        component: () => import("@/views/dashboard/analysis/index.vue"),
      }
    ]
  },
  {
    path: "/user",
    name: "user",
    meta: {
      title: 'user'
    }
    children: [
      {
        path: "list",
        name: "user-list",
        meta: {
          title: 'user_list'
        }
        component: () => import("@/views/user/list/index.vue"),
      },
      {
        path: "add",
        name: "user-add",
        meta: {
          title: 'user_add'
        }
        component: () => import("@/views/user/add/index.vue"),
      },
      {
        path: "edit/:id",  # 动态路由
        name: "user-edit",
        meta: {
          title: 'user_edit'
        },
        component: () => import("@/views/user/edit/[id].vue"),
      }
    ]
  }
]
```

## meta 配置

| 属性       | 类型            | 默认值   | 说明                                                           |
| ---------- | --------------- | -------- | -------------------------------------------------------------- |
| title      | string          | 自动生成 | 路由的标题，会被用于生成面包屑和菜单的名称                     |
| layut      | "base"或"blank" | base     | 页面的布局，默认为 base                                        |
| roles      | string[]        | -        | 权限设置                                                       |
| icon       | string          | -        | 菜单的图标，直接使用"iconify"的图标名                          |
| localIcon  | string          | -        | 菜单的本地图标                                                 |
| keepAlive  | boolean         | -        | 页面是否缓存                                                   |
| hideInMenu | boolean         | -        | 是否在菜单中隐藏                                               |
| hideInTab  | boolean         | -        | 是否在 tab 栏中隐藏                                            |
| activeMenu | string          | -        | 当此页面被激活时，高亮显示的菜单的 name                        |
| constant   | boolean         | -        | 是否是常量路由，设置了该选项后，不需要登录、不需要鉴权就能访问 |
| order      | number          | -        | 排序                                                           |
| href       | string          | -        | 设置了会外部跳转该链接                                         |
| fixedInTab | boolean         | -        | 是否固定在 tab 栏中                                            |

## keep-alive

得益于[vue-router](https://router.vuejs.org/zh/guide/essentials/nested-routes.html#%E5%BF%BD%E7%95%A5%E7%88%B6%E7%BB%84%E4%BB%B6-)的新特性，实现多级`keep-alive`非常简单，
要想实现页面`kee-alive`缓存，需要做如下配置：

1. 路由的`meta`中设置`keepAlive: true`
2. 当前路由的祖先路由中不允许出现`component`字段。

如：

```ts
{
    path: "/user",
    name: "user",
    meta: {
      title: 'user'
    }， # 这里没有component字段
    children: [
      {
        path: "list",
        name: "user-list",
        meta: {
          title: 'user_list',
          keepAlive: true
        }
        component: () => import("@/views/user/list/index.vue"),
      },
    ]
  }
```

原理： `rengar-admin`会在构建的时候自动注入`defineOptions({name: 'xxx'})`，`xxx`为当前路由的`name`。也就是说，在开发中手动设置路由组件的`name`是无效的。该自动注入插件位于`packages/vite-plugin-vue-inject-name`中。

## 路由跳转

为了路由跳转能获得类型提示，`rengar-admin`封装了自定义 hooks，位于`src/hooks/router.ts`中。

## 一个基本的路由示例

常见的列表、新增、编辑的示例。

目录结构：

```bash
src
└── views
    ├── user
    │   └── list
    │       └── index.vue
    │   └── add
    │       └── index.vue
    │   └── edit
    │       └── [id].vue
```

路由：

```ts
[
  {
    path: "/user",
    name: "user",
    meta: {
      title: '用户管理'
    },
    redirect: '/user/list',
    children: [
      {
        path: "list",
        name: "user-list",
        meta: {
          title: '用户列表',
          hideInMenu: true,
          activeMenu: 'user'
        }
        component: () => import("@/views/user/list/index.vue"),
      },
      {
        path: "add",
        name: "user-add",
        meta: {
          title: '新增用户',
          hideInMenu: true,
          activeMenu: 'user'
        }
        component: () => import("@/views/user/add/index.vue"),
      },
      {
        path: "edit/:id",  # 动态路由
        name: "user-edit",
        meta: {
          title: '编辑用户',
          hideInMenu: true,
          activeMenu: 'user'
        },
        component: () => import("@/views/user/edit/[id].vue"),
      }
    ]
  }
]
```

## 全局路由守卫流程图

全局路由守卫代码位于`src/router/guard.ts`中。

```
┌───────────────┐
│  路由跳转前   │
└──────┬────────┘
       │
       ▼
┌───────────────────────────────┐
│ 是否为常量路由?               │
│ (to.meta.constant)            │
└──────┬───────────────┬────────┘
       │是             │否
       ▼               ▼
   [直接放行]      ┌───────────────────────────────┐
                  │ 是否访问登录页?               │
                  │ (to.path === '/login')        │
                  └──────┬───────────────┬────────┘
                         │是             │否
                         ▼               ▼
                ┌─────────────────┐   ┌───────────────────────────────┐
                │ 已登录?         │   │ 已登录?                       │
                │ (isLogin)       │   │ (isLogin)                     │
                └──────┬────┬─────┘   └──────┬───────────────┬────────┘
                       │是   │否            │是             │否
                       ▼     ▼              ▼               ▼
                  [跳转/   [放行]      ┌────────────────┐ [跳转到
                  首页]                │ 用户信息完整?  │ 登录页]
                                       │ (isUserDetail) │
                                       └──────┬────┬────┘
                                              │是  │否
                                              ▼    ▼
                                         [继续]  [获取用户信息]
                                                 │
                                                 ▼
                                         [失败?]
                                         │是   │否
                                         ▼     ▼
                                    [重置并  [生成菜单等]
                                    跳转登录]
       ▼
┌───────────────────────────────┐
│ 是否为重定向路由?             │
│ (to.redirectedFrom)           │
└──────┬───────────────┬────────┘
       │是             │否
       ▼               ▼
[检查权限,无权限跳404]   ┌───────────────────────────────┐
                        │ 路由需要权限?                  │
                        │ (needPermission(to))           │
                        └──────┬───────────────┬────────┘
                               │否             │是
                               ▼               ▼
                          [放行]         ┌───────────────┐
                                         │ 有权限?      │
                                         │ (hasPerssion)│
                                         └────┬───┬─────┘
                                              │是 │否
                                              ▼  ▼
                                         [放行][跳404]
```
