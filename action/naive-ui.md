# naive-ui 组件库使用说明

在开发的过程中，发现很多人对于`naive-ui`的使用不是很熟悉，可能是因为`naive-ui`这个组件库比较特殊，跟其他的组件库不太一样，所以在使用的过程中，可能会遇到一些问题。

## 受控和非受控

一个组件的行为可以分为受控模式和非受控模式两种。非受控模式指的是只监听组件的变化，而不去控制组件的 value，受控模式指的是控制组件的值。

### 非受控模式

在这种情况下，你不能控制 <n-input /> 的 value，而只能监听它的变化，组件值的变化由组件自身控制。

```vue
<n-input @update:value="handleUpdateValue" />
```

### 受控模式

在这种情况下，你既监听了组件的变化，然后也控制了组件的值。如果你不更新 value，那么组件的值不会改变，组件值的变化由你控制。

```vue
<n-input :value="value" @update:value="handleUpdateValue" />
```

### v-model

v-model 控制的组件在受控模式下，因为 vue3 中 v-model 不加参数等同于 `:model-value` 和 `@update:model-value`的组合。
在`naive-ui` 中的受控模式：

```vue
<n-input v-model:value="value" />

const value = ref('');
```

在`naive-ui`中，只要看到组件的 props 的某个字段有`受控`的字样，你就可以使用`v-model:xxx`的方式来控制组件的值。

## @update:xxx 和 on-update:xxx 的区别

### 情况 1

如果你没有在同一个组件上同时使用 v-model:xxx 和 on-update:xxx，@update:xxx 和 on-update:xxx 在模版中使用时没有任何区别。

在 Naive UI 中，全部的 API 文档使用 on-update:xxx 格式，因为 @ 只是 Vue 提供的一种简写。

如果你偏爱 camelCase，可以使用 onUpdate:xxx。

如果你在使用 JSX，可以使用 onUpdateXxx（所有的 onUpdate:xxx 都有一个 onUpdateXxx 的对等实现）。

#### 情况 2

如果你在一个组件上使用了 v-model:xxx，你应该使用 @update:xxx。

✅ 例子 `<n-input v-model:value="xxx" @update:value="yyy" />`。

❌ 例子 `<n-input v-model:value="xxx" :on-update:value="yyy" />`。

这是因为 v-model:value="xxx" 会被转化为 :onUpdate:value="xxx"。如果你同时使用了 @update:value="yyy"，他们会被转化为 :onUpdate:value="[xxx, yyy]"，然后 Naive UI 会来处理这种情况。

然而如果你使用了 on-update:value="yyy"，Vue 会生成类似于 :onUpdate:value="xxx" :on-update:value="yyy" 的代码，然后第二个属性会在运行时覆盖掉第一个，v-model:value 会崩掉。

## 结合 naive-ui 使用 jsx

在`naive-ui`中，到处都能看到`自定义渲染`，比如在`NDataTable`的`columns`中，你可以使用`render`来渲染自定义的内容。

只要是可以`自定义渲染`的地方，都可以使用 vue 原生的`h`函数或者`jsx`语法来渲染，`h`函数写和读都是非常痛苦的，所以介绍一下`jsx`的写法：

```vue
<template>
  <n-data-table :columns />
</template>

// [!code ++]
<script setup lang="tsx">

 //  [!code ++]
import  { NTag,  type DataTableColumns } from "naive-ui";

intrface Row {
 name: string
 status: 1 | 2
}

const columns: DataTableColumns<> = [
  {
    title: 'name',
    key: 'name',
  },
  {
    title: '状态',
    key: 'status',
     //  [!code ++]
    render(row) {
       //  [!code ++]
      return <NTag>{row.status === 1 ? "已启用" : "已禁用" }</NTag>
       //  [!code ++]

    }
  }
]
</script>
```

::: tip 提示
在使用`jsx`语法时，你需要在`script`标签中添加`lang="tsx"`，需要手动引入使用的组件，如`import { NTag } from "naive-ui"`。
:::

## 重置表单值

在`naive-ui`中，表单的重置并没有提供原生的重置方法，你需要手动重置表单的每个项的值为`null`。

```vue
<template>
  <n-form :model="form">
  </n-form>
</template>

<script setup lang="ts">
const form = reactive<Record<string, any>>({})
function resetForm() {
  for(const key in form) {
    form[key] = null
  }
}
```
