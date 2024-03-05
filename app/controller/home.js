/*
 * @Author: 温少昌 wenshaochang@huizhihuyu.com
 * @Date: 2024-03-05 14:06:10
 * @LastEditors: 温少昌 wenshaochang@huizhihuyu.com
 * @LastEditTime: 2024-03-05 15:42:07
 * @FilePath: /egg/app/controller/home.js
 * @Description: controller
 */
const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    /* // 通过 query 获取申明参数
    const { id } = ctx.query;
    ctx.body = id; */

    // ctx.render 默认会去 view 文件夹下的 index.html，这是 Egg 约定好的。
    await ctx.render('index.html', {
      title: '俺是熊大', // 将 title 传入 index.html
    });
  }

  // 获取用户信息
  async user() {
    const { ctx } = this;
    /* // 通过 params 获取申明参数
    const { id } = ctx.params;
    ctx.body = id; */

    const { name, slogen } = await ctx.service.home.user(ctx.params.id);
    ctx.body = { name, slogen };
  }

  // post 请求方法
  // WARN 66301 [-/127.0.0.1/-/3ms POST /add] invalid csrf token. See https://eggjs.org/zh-cn/core/security.html#安全威胁csrf的防范
  // 前往 config/config.default.js 做好白名单配置，这里我直接全部允许请求：
  /*
    config.security = {
      csrf: {
        enable: false,
        ignoreJSON: true
      },
      domainWhiteList: [ '*' ], // 配置白名单
    };
  */
  async add() {
    const { ctx } = this;
    const { title } = ctx.request.body;
    // Egg 框架内置了 bodyParser 中间件来对 POST 请求 body 解析成 object 挂载到 ctx.request.body 上
    ctx.body = {
      title,
    };
  }
}

module.exports = HomeController;

/**
 * app/controller/xx
 * 用于解析用户的输入，处理后返回相应的结果。Controller 要做的事情就是响应用户的诉求。
 */
