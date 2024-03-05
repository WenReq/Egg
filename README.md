# egg



## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
npm i
npm run dev
open http://localhost:7001/
```

### Deploy

```bash
npm start
npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.

[egg]: https://eggjs.org

## Learn

### app/service/xx

**Service** 就是在复杂业务场景下用于做业务逻辑封装的一个抽象层。我们换一种理解方式，`Service` 层就是用于数据库的查询，我们尽量将粒度细化，这样以便多个 `Controller` 共同调用同一个 `Service`。

### app/middleware/xx

在路由配置里设置了中间件的路由，每次请求命中后，都要过一层中间件。在我们后续的开发中，也会利用到这个中间件的原理做用户鉴权。当用户未登录的情况下，是不能调用某些接口的。

当然，你可以每次都在 `Controller` 判断，当前请求是否携带有效的用户认证信息。接口一多，到处都是这样的判断，逻辑重复。所以，中间件在某种程度上，也算是优化代码结构的一种方式。

### app/public/xx

用于放置静态资源。后续我们将会有一个上传静态资源的接口，包括图片、文本文档、excel、word等，都可以通过服务端读取文件之后，将其写入 `app/public` 文件夹中。在目前没有 `OSS` 服务的情况下，姑且先用这种方式存储静态资源，会消耗一点服务器的内存。

### config/config.{env}.js

用于编写配置文件。`config/config.default.js` 文件，这个是 Egg 框架约定好的，你可以在内部设置一些全局的配置常量，在任何地方都可以通过 `app.config` 获取到 `config.default.js` 文件内的配置项。

### config/plugin.js

用于配置需要加载的插件。比如 `egg-mysql`、`egg-cors`、`egg-jwt` 等官方提供的插件，你也可以自己编写 `Egg` 插件。

## Egg.js 中使用前端模板

`npm install egg-view-ejs -save`

```js
// config/plugin.js
module.exports = {
  ejs: {
    enable: true,
    package: 'egg-view-ejs'
  }
};
```