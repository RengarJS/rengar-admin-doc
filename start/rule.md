# 项目规范

## 自动引入

`rengar-admin`使用了`unplugin-auto-import`来自动引入`vue`、`vue-router`、`pinia`、`naive-ui`等常用的库，在开发中无需手动引入（使用 tsx 除外）你可以在`build/plugins/import.ts`中查看自动引入的库。

当然，在`src/components`下的组件也会自动引入，无需手动引入。在新建好组件后，需要重启项目才能获得 ts 类型提示。组件名称就是文件夹的名称。假如存在`src/components/SvgIcon/index.vue`，在`.vue`中直接使用`SvgIcon`即可，无需手动引入。

## 组件命名

组件命名规范为`PascalCase`，如`UserCard`、`CustomButton`等。

### 全局组件

在`src/components`的组件应该是全局组件，命名应该遵循`PascalCase/index.vue`的格式，即目录名遵循`PascalCase`，`.vue`文件命名为`index.vue`，如`src/components/UserCard/index.vue`。

### 局部组件

`局部组件`应该是跟随路由页面放在`src/views`下，应该始终放在`components`目录下，采用`PascalCase`命名，如`src/views/user/components/UserCard.vue`。

## 代码规范

`rengar-admin`使用了`eslint`来规范代码，使用了`prettier`来格式化代码在开发中会自动检查代码是否符合规范，在提交代码时会自动检查代码是否符合规范，如果不符合规范会阻止提交。

## 提交校验

`rengar-admin`使用了`husky`来校验代码，在提交代码时会自动校验代码是否符合规范。

如果你不需要在提交的时候校验代码，可以在`package.json`中删除以下代码：

```json
{
  // [!code --]
  "lint-staged": {
    // [!code --]
    "*.{js,jsx,ts,tsx,vue}": ["prettier --write", "eslint --fix"] // [!code --]
  } // [!code --]
}
```

再删除根目录的`.husky`文件夹。然后再卸载依赖：

```bash
pnpm remove husky lint-staged  -D
```

::: danger 提示
此操作不可逆，谨慎操作！
:::

## ts 类型规范

建议把`api`的类型放在`typings/app/api.d.ts`中，通过命名空间来区分不同的接口。详细使用请查看代码。

::: tip 提示
所有的`.d.ts`文件不能够出现`import`、`export`关键字。也就是说类型是静态的，不能动态导入导出，不然就会降级为一个普通的`.ts`文件了，就不能直接访问类型了。
:::
