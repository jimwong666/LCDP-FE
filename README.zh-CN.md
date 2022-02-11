简体中文 | [English](./README.md)

## 介绍

基于 react、node、qiankun、express、antd、webpack、lerna 等

1. 项目结构基于 Lerna
2. 本项目 UI 组化库使用了 [Bubble2](https://github.com/Bubble2) 开发的基于 antd 的基础组件库，并且由于此项目是一个基于 qiankun 的微前端项目，所以通过 lerna 开发了一个业务组件库，供各个子应用共享使用，达到效率和统一
3. 文档系统基于 dumi
4. ...

## 待完成

- ~~TODO: immutable => immutability-helper~~
- ~~TODO: 首页样式问题~~
- TODO: 用 electron 写一个项目启动应用(思考中...)
- TODO: 子应用不支持 webpack 热重载([https://github.com/umijs/qiankun/issues/830](https://github.com/umijs/qiankun/issues/830), issues 表示暂时没有官方方案...目前想使用子应用的热重载可只能再子应用里面开发)
- ~~TODO: react-loadable 配合 qiankun 有问题~~(用 suspense and lazy 的懒加载方案)
- ~~TODO: 主应用路由菜单点击不能匹配到子应用路由~~(routes.jsx 文件里面启动路由严格模式 => exact:true)
- ~~TODO: 主页样式有问题~~(样式解析问题~无解，增加全局 loading)
- TODO: 配置文件里面是否要指定具体协议？(http/https)
- TODO: 生产环境是否要关闭子应用入口
- ~~TODO: 如何统一各个组件？（增加一个可发布的依赖包，存放公共组件）~~（resolved✌✌✌ 爬了很多坑）

## 注意点：

- 子应用需要部署在主应用的二级域名

## 快速开始

### 准备工作

根据项目配置文件设置 host 和 nginx，也遇到问题请咨询我~

### 安装依赖

```
$ npm run install
```

### 启动应用

```
$ npm run all:fe:dev // 启动所有前端应用（开发环境）
$ npm run all:fe:build // 打包所有前端应用（生产环境）
$ npm run all:server // 启动所有node应用（开发环境）
$ npm run all:server:dev // 启动所有node应用（生产环境）
```

### 其他命令

````
$ npm run prettier // 格式化所以代码
$ npm run eslint // 代码语法等校验（js,jsx,tsx,md,json）
$ npm run stylelint // 样式代码语法等校验（css,scss,less）
$ npm run dumi:dev // 预览文档（开发环境）
$ npm run dumi:build // 打包文档（生产环境）
$ npm run build:aeps-rc // 打包aeps-rc组件
$ npm run publish // 发布组件到npm（网络大多数时候是不同的，原因不详，这时使用```npm publish --access public```发布）
$ npm run commit // commit代码
````

### 代码提交步骤

1. 先 `git add .` 将所有文件添加到暂存区
2. 再 `npm run commit` 根据命令行提示一步步完成需要确认的信息（这步很重要）
3. 走后 `git push` 推送到 git
