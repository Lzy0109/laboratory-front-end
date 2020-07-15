# 2020软件项目管理-实验室部分前端

> 模板： vue-admin-template

## Extra
如果你想要根据用户角色来动态生成侧边栏和 router，你可以使用该分支[permission-control](https://github.com/PanJiaChen/vue-admin-template/tree/permission-control)

## 相关项目

- [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)

- [electron-vue-admin](https://github.com/PanJiaChen/electron-vue-admin)

- [vue-typescript-admin-template](https://github.com/Armour/vue-typescript-admin-template)

- [awesome-project](https://github.com/PanJiaChen/vue-element-admin/issues/2312)

## Build Setup

```bash
# 克隆项目
git clone https://github.com/PanJiaChen/vue-admin-template.git

# 进入项目目录
cd vue-admin-template

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 [http://localhost:9528](http://localhost:9528)

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```

更多信息请参考 [使用文档](https://panjiachen.github.io/vue-element-admin-site/zh/)

## License

[MIT](https://github.com/PanJiaChen/vue-admin-template/blob/master/LICENSE) license.

Copyright (c) 2017-present PanJiaChen

## 实验室部分前端完成的工作

### vue页面部分

页面主要文件：`src/views/laboratory_1` 该目录下所有文件

抽离的子组件：`src/components/DictionaryForSelect/index.vue`

抽离的子组件：`src/components/DictionaryRadios/index.vue`

### js部分

前端路由文件：`src/router/modules` 该目录下所有文件

前端接口文件：`src/api/laboratory_1`  该目录下所有文件

自定义的中英文验证规则：`src/utils/fieldValidate.js`

抽离的方法：`src/utils/get-select-value.js`

### mock假数据部分

mock 该目录下全部文件（除了原本存在的文件：utils.js	user.js	table.js	index.js）

