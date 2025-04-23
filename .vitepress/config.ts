import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "rengar-admin文档",
  description: "开发文档",
  base: "/rengar-admin-doc/",

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "文档", link: "/start/introduction" },
    ],

    sidebar: [
      {
        text: "开始",
        items: [
          { text: "简介", link: "/start/introduction" },
          { text: "快速开始", link: "/start/quik-start" },
          { text: "monorepo", link: "/start/monorepo" },
          { text: "同步代码", link: "/start/sync" },
        ],
      },

      {
        text: "功能说明",
        items: [{ text: "目录结构", link: "/action/directory" }],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/RengarJS/rengar-admin" },
    ],
  },
});
