
<p align="center">
   <img height="100" src="http://oxn840edb.bkt.clouddn.com/title.png" alt="package name">
</p>

这个网站为用户解释前端工程`package.json`中所有包的用处。

### 关于

我喜欢折腾前端构建，从头开始那种，可以掌握工程构建的每个细节，项目开发中也会使用许多第三方 `package`。

我会去了解每一个 `package` 的作用和用法，但是自己总容易忘，而且 `package` 在不断升级，很多细节也在变化。

所以我整了这个网站，帮大家速查 `package` 作用。


### 如何参与

大家可以对自己熟知 `package` 的作用进行描述，我会选择:+1:最多的 `issue` 或者其他评论录入数据库。

`issue` 或者其他评论超过<b>50</b>个:+1:，我将关闭对应的 `issue`，因为已经描述的够好了。

欢迎提交 [issues](https://github.com/gitdust/wstpd/issues)，格式如下：

- issue 标题为<font color='red'>安装之后</font>的包名
- issue 内容格式：
  - fullName：owner/name，如"facebook/react"
  - describe：作用描述

`issue` 的评论直接写描述即可

> 默认描述全部采用官方描述

### TODO

- SSR ❌
- webpack 4 ✅
- PWA ❌
- web worker ✅
- ...

### 本地开发

```bash
$ yarn && cd server/ && yarn
$ npm run web
$ npm run server
```

> 本地`web`端口`3002`，`server`端口`3003`
