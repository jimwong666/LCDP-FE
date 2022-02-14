---
title: 更新日志
---

`aeps-rc` 严格遵循 [Semantic Versioning 2.0.0](http://semver.org/lang/zh-CN/) 语义化版本规范。

#### 发布周期

- 修订版本号：无固定时间
- 次版本号：无固定时间
- 主版本号：无固定时间

---

## 0.1.5

`2021-11.03`

- 更新：更改目录结构，细分组件功能（layout,business,widgets）

## 0.1.3

`2021-10.14`

- 更新：支持 `lerna` 的内部 link，link 目录是 src（不用打包即可下开发是使用），组件改用 jsx（避 tou 免 lan 在原来项目的 webpack 中加入 ts 的支持）
  > 注意：此时原项目在开发环境时的 webpack 配置需要改动（即：include 的范围，需要加入此目录（即：形如 packages/aeps-rc 这个目录。看着确实像在 node_modules 中，但实则不在））
  > 生产环境的话，这个包我会发布到 npm，但的确也用不到，因为打包时应该还是会用本地的包。也许在单独切项目里面的子包（app1,app2...）时会有用吧~~~
