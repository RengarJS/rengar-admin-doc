# 版本日志

- `v2.0.0`:

  - 路由 meta 新增`multipleTab`、`showBack`参数
  - 路由动画优化
  - 后端 api 由原来的`apifox`mock 改为真实线上接口，[后端项目](https://github.com/RengarJS/rengar-admin-python)
  - .env 新增 vite proxy 代理字段
  - 新增多种路由动画
  - 优化暗黑模式切换闪屏
  - 修复菜单折叠问题
  - axios 请求代码重构，修复 token 失效不能取消 api 的问题
  - 修复登录成功后无法跳转到之前的页面

- `v1.4.0`：

  - fix：修复 eslint 报错

- `v1.1.0`：
  - layout 布局重构，现在新增或者修改布局更为简单
  - 新增在头部、菜单栏深色功能
- `v1.0.0`：代码整理，生产环境验证
- `v0.2.0`：修复路由守卫跳转 404bug，修复授权 bug
- `v0.1.0`：vite 升级到 7 版本，unocss 版本升级
- `v0.0.4`：vite 插件本地打包成 js 文件，可使用 monorepo 直接导入使用
- `v0.0.3`：优化系统自动更新逻辑
- `v0.0.2`：tab 栏新增动画和拖拽功能
- `v0.0.1`：初始版本
