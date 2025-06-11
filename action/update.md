# 自动更新

`rengar-admin`内置了部署后自动提醒用户更新的功能。

**原理**：每一次打包的时候，`packages/vite-plugin-version`的插件会自动生成版本文件`version.json`并放到打包的`output`目录中。`src/app.vue`导入了`useUpdateChecker`hooks 函数，轮训访问`version.json`文件，对比版本号，若有更新则提示用户更新。

如果你不需要该功能，可以删除`src/app.vue`中的`useUpdateChecker`函数。
