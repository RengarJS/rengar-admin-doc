# 简介

## 介绍

- `rengar-admin`是基于[naive-ui](https://www.naiveui.com)开发的一个`vue3+ts`的**后台管理模板**， `rengar-admin`开源且免费，遵循`MIT`协议。

## 为什么开发 rengar-admin

目前市面上的很多后台模版存在臃肿、过渡封装问题，实际开发中可能并不需要那么多的功能，去改源码是一件很痛苦的事情。于是，决定自己实现一个轻量的后台模版，于是`rengar-admin`就诞生了。

`rengar-admin`的初心是只提供后台模板的基本功能，如：登录、权限、菜单、路由、布局、标签页、面包屑、主题切换、移动端适配等。任何跟业务相关的功能需自行开发，而且也不会引入非必要的 npm 包。

`rengar`一词来源于 lol 的英雄**雷恩加尔**的英文名称，以前很喜欢玩这个英雄。

## 不适合使用 rengar-admin 的情况

- 不需要`typescript`，如果你的项目不需要使用 typescript 或者说你抵触 typescript，请不要使用`rengar-admin`，后续也没有计划纯 js 版本。
- 需要`国际化`方案，`rengar-admin`没有实现国际化方案，如果你想要实现国际化方案，不妨看看[soybean-admin](https://admin-docs.soybeanjs.cn/)
- 需要内置很多复杂功能的用户，`rengar-admin`主打的是轻量、简洁，只提供基本的功能，如果需要复杂功能，请自行实现或者使用其他模版。当然了，如果你需要一些表单表格的增强组件可以看看[naive-ui-components](https://ashuicoder.github.io/naive-ui-components/)

## 技术栈

- [vue3.5](https://v3.cn.vuejs.org/)
- [naive-ui](https://www.naiveui.com/zh-CN/os-theme)
- [pnpm](https://pnpm.io/zh)
- [typescript](https://www.typescriptlang.org/)
- [vite7](https://vitejs.dev/)
- [unocss](https://unocss.dev)
- [pinia](https://pinia.vuejs.org/)

## 特性

- ✅ts 类型覆盖率 100%
- ✅ 全平台使用 setup 语法，使用 vue3.5 的新特性，让代码更优雅
- ✅ 内置 vite 插件，根据目录自动生成路由文件
- ✅ 解决棘手的多级路由 keep-alive 缓存问题
- ✅ 完善的权限系统
- ✅ 兼容移动端
- ✅ 支持主题切换
- ✅ 内置三种常见布局
