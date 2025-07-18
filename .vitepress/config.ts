import { defineConfig } from "vitepress";

const base = "/rengar-admin-doc/";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "rengar-admin文档",

  description: "开发文档",
  base,
  markdown: {
    lineNumbers: true,
  },
  lang: "zh-CN",
  head: [["link", { rel: "icon", href: `${base}favicon.ico` }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "文档", link: "/start/introduction" },
      { text: "在线预览", link: "https://rengarjs.github.io/rengar-admin/" },
    ],

    sidebar: [
      {
        text: "开始",
        items: [
          { text: "简介", link: "/start/introduction" },
          { text: "快速开始", link: "/start/quik-start" },
          { text: "monorepo", link: "/start/monorepo" },
          { text: "项目规范", link: "/start/rule" },
          { text: "同步代码", link: "/start/sync" },
          { text: "交流群", link: "/start/chat" },
        ],
      },

      {
        text: "功能说明",
        items: [
          { text: "版本日志", link: "/action/changelog" },
          { text: "目录结构", link: "/action/directory" },
          { text: "颜色", link: "/action/color" },
          { text: "图标", link: "/action/icon" },
          { text: "请求", link: "/action/request" },
          { text: "路由系统", link: "/action/router" },
          { text: "权限系统", link: "/action/auth" },
          { text: "菜单", link: "/action/menu" },
          { text: "布局", link: "/action/layout" },
          { text: "环境变量", link: "/action/env" },
          { text: "自动更新", link: "/action/update" },
          { text: "naive-ui", link: "/action/naive-ui" },
        ],
      },
    ],

    socialLinks: [
      {
        icon: "github",
        ariaLabel: "github",
        link: "https://github.com/RengarJS/rengar-admin",
      },
    ],
  },
});
