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
$ npm run build:aeps-rc // build aeps-rc lib
$ npm run publish // publish to npm (if fail you can run ```npm publish --access public```)
$ npm run commit // commit code
````

### code commit steps

1. `git add .`
2. `npm run commit` and verify information(important!)
3. `git push`
