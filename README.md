English | [简体中文](./README.zh-CN.md)

## Introduction:

based on react、node、qiankun、express、antd、webpack、lerna and more

1. The project structure is based on Lerna
2. The UI library of this project uses [abiz-rc-aeps](https://github.com/Bubble2/abiz-design/tree/master/packages/abiz-rc-aeps)(based on antd), which can be developed by [Bubble2](https://github.com/Bubble2), and because this project is a micro front-end project based on qiankun, so I developed a business component library through lerna for each child-application to share and use, to achieve efficiency and uniformity
3. doc system based on dumi
4. ...

## TODO:

- ~~TODO: immutable => immutability-helper~~
- ~~TODO: home page style fix~~
- TODO: creat an application launcher based on electron(thinking...)
- TODO: micro app don't load when app trigger hot reload([https://github.com/umijs/qiankun/issues/830](https://github.com/umijs/qiankun/issues/830), no solution... )
- ~~TODO: react-loadable has problem~~(switch to suspense and lazy)
- ~~TODO: main app route menu doesn't match to micro app route~~(use exact mode in react-route)
- ~~TODO: home page has some problem on styles~~(add global loading)
- TODO: whether to specify the protocol(http/https)
- TODO: Whether the production environment closes the child-application entrance
- ~~TODO: How to unify the components？（publish a lib to npm）~~（resolved✌✌✌ but a bit hard）

## Attention:

- The child-application needs to be deployed in the second-level domain name of the main-application

## Getting Started

### preparation

Set host and nginx according to the project configuration file, consult me if you have any problems~

### install dependencies

```
$ npm run install
```

### start app

```
$ npm run all:fe:dev // start all app in fe (dev)
$ npm run all:fe:build // build all app in fe (prod)
$ npm run all:server // start all app in be (dev)
$ npm run all:server:dev // start all app in be (prod)
```

### other command

````
$ npm run prettier // formatting all code
$ npm run eslint // code syntax verification and other (js,jsx,tsx,md,json)
$ npm run stylelint // styles verification (css,scss,less)
$ npm run dumi:dev // preview document (dev)
$ npm run dumi:build // build document (prod)
$ npm run build:lcdp-rc // build lcdp-rc lib
$ npm run publish // publish to npm (if fail you can run ```npm publish --access public```)
$ npm run commit // commit code
````

### code commit steps

1. `git add .`
2. `npm run commit` and verify information(important!)
3. `git push`

## Lerna commend

| 命令            | 含义                                                       |
| :-------------- | ---------------------------------------------------------- |
| lerna bootstrap | 安装依赖                                                   |
| lerna clean     | 删除各个包下的 node_modules                                |
| lerna init      | 创建新的 lerna 库                                          |
| lerna list      | 显示 package 列表                                          |
| lerna changed   | 显示自上次 relase tag 以来有修改的包， 选项通 list         |
| lerna diff      | 显示自上次 relase tag 以来有修改的包的差异， 执行 git diff |
| lerna exec      | 在每个包目录下执行任意命令                                 |
| lerna run       | 执行每个包 package.json 中的脚本命令                       |
| lerna add       | 添加一个包的版本为各个包的依赖                             |
| lerna import    | 引入 package                                               |
| lerna link      | 链接互相引用的库                                           |
| lerna create    | 新建 package                                               |
| lerna publish   | 发布                                                       |
