`renger-admin`菜单数据是根据路由文件自动生成的，默认展示路由的`meta.title`字段，如果需要自定义菜单名称，请在路由的`meta`字段中修改`title`字段。如：

```javascript
{
  meta: {
    title: "自定义菜单名称", // [!code ++]
  }
}
```

如果你希望某些路由页面不现实在菜单中，请将`meta.hideInMenu`字段设置为`true`。如：

```javascript
{
  meta: {
    title: "自定义菜单名称",
    hideInMenu: true, // [!code ++]
  }
}
```
