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

## MySQL

> 将数据持久化存储的一个容器，并且这个容器处在云端。

在命令行输入 `mysql -u root -p` 命令，会提示「commod not found」，我们还需要将 `mysql` 加入系统环境变量。

1. 进入 `/usr/local/mysql/bin`，查看此目录下是否有 `mysql`
2. 我们在命令行执行指令：`vim ~/.bash_profile`。打开之后，点击键盘 「i」键，进入编辑模式，在 `.bash_profile` 中添加 `mysql/bin` 的目录，结束后点击键盘 「esc」退出编辑，输入 「:wq」回车保存。

![.base_profile](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0ae7412f25a4494abf8e294a744a30b5~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.png)

最后在命令行输入：`source ~/.bash_profile`。再次输入指令尝试登录数据库，如下所示：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e1b563726de846d7af037f5d8f019bb0~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.png)

3. 此时我们要开启服务，就用如下指令：`mysql.server start`

### 安装 egg-mysql 插件

```shell
npm install egg-mysql
```

```js
// config/config.default.js
// 添加 mysql 连接配置项
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: 'admin123', // 初始化密码，没设置的可以不写
      // 数据库名
      database: 'test', // 我们新建的数据库名称
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };
```

### 数据库设计的原则

1. 设计数据库的时间要充裕
2. 多考虑一些性能和优化
3. 添加必要的（冗余）字段
4. 设计合理的表关联（表与表之间的关系复杂的情况下，建议采用第三张映射表来维系两张表之间的关系，达到降低表之间的直接耦合度。）

#### 用户表

![user_table](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bf742e82cb4a4b3f83941b59f1dc2928~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.png)

- id
- username
- password
- signature
- avatar
- ctime

#### 账单表

![bill_table](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0313f4074ed64580b6f1c8dc8bf72083~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.png)

上图为账单首页，首页顶部有两个信息，代表当月「总支出」和「总收入」。一笔账单记为一项，每一项账单包括几个关键属性，分别是账单的**类型**（收入或指出）、账单的**种类**（服饰、交通、奖金等）、账单的**金额**、账单的**日期时间**、账单的**备注**（当种类无法描述清楚时使用）。

- `id`：每张表都需要一个主键，我们照旧，用 id 作为「账单表」的属性。
- `pay_type`：账单类型，账单无非就是两种类型，支出和收入，我们用 pay_type 作为类型字段，这里约定好 1 为支出，2 为收入。
- `amount`：账单价格，每个账单都需有一个价格属性，表示该笔账单你消费或收入了多少钱。
- `date`：账单日期，日期可自由选择，以时间戳的形式存储。
- `type_id`：账单标签 id，如餐饮、交通、日用、学习、购物等。
- `type_name`：账单标签名称，如餐饮、交通、日用、学习、购物等。
- `user_id`：账单归属的用户 id，有多个用户来注册使用，所以存储账单的时候，需要将用户的 id 带上，便于后面查询账单列表之时，过滤出该用户的账单。
- `remark`：账单备注。

#### 标签表 type

一开始我是想在前端把标签定死，比如服饰、交通、医疗等等这类账单种类，写成一个静态的对象，供前端项目使用。但是这样做有一个不好的地方，后续如果希望让用户自己添加自定义标签，就不好拓展。所以这里我们在数据库中设置一张 `type` 表，让用户可以灵活的设置属于自己的自定义标签。

- `id`：唯一标识，设为主键。
- `name`：标签名称，如餐饮、交通、日用、学习、购物等。
- `type`：标签类型，默认 `1` 为收入，`2` 为支出。
- `user_id`：保留字段，设置该标签的用户归属，默认 `0` 为全部用户可见，某个用户单独设置的标签，`user_id` 就是该用户的用户 `id`，在获取列表的时候，方便过滤。

## 鉴权 egg-jwt

鉴权就是用户在浏览网页或 App 时，通过约定好的方式，让网页和用户建立起一种相互信赖的机制，继而返回给用户需要的信息。

- HTTP Basic Authentication
- session-token
- Token 令牌
- OAuth（开放授权）

![注册流程](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/14f50febe2c749b486f7cb2fb4491809~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.png)

### egg-jwt

`npm i egg-jwt -S`

在 `config/plugin.js` 下添加插件：

```js
jwt: {
  enable: true,
  package: 'egg-jwt'
}
```

紧接着前往 `config/config.default.js` 下添加自定义加密字符串：

```js
config.jwt = {
  secret: 'wen'
}
```

### egg 中间件编写

在请求接口的时候，过一层中间件，判断该请求是否是登录状态下发起的。

### token 鉴权

## 一些知识点

app 为全局属性，相当于所有的插件方法都植入了 app 对象。

目不大，但是本项目包含了几个关键的知识点：

- 多用户鉴权
- 一套增删改查
- 表数据的二次处理（图表）
- 列表分页的制作
- 文件数据上传

用“麻雀虽小、五脏俱全”来形容，一点都不为过。
