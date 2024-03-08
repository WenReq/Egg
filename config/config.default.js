/*
 * @Author: 温少昌 wenshaochang@huizhihuyu.com
 * @Date: 2024-03-05 14:06:10
 * @LastEditors: 温少昌 wenshaochang@huizhihuyu.com
 * @LastEditTime: 2024-03-08 15:37:58
 * @FilePath: /egg/config/config.default.js
 * @Description: 用于编写配置文件。`config/config.default.js` 文件，这个是 Egg 框架约定好的，你可以在内部设置一些全局的配置常量，在任何地方都可以通过 `app.config` 获取到 `config.default.js` 文件内的配置项。
 */
/* eslint valid-jsdoc: "off" */

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1709618766496_6182';

  // add your middleware config here
  config.middleware = [];

  // post 请求，注意关键字「安全威胁 csrf 的防范」，简单说就是网络请求的安防策略，比如你 Egg 启动的是本地地址 http://127.0.0.1:7001 ，但是你请求的 POST 或 GET 接口是非本地计算机（别人的电脑），或者使用 Postman 发起请求，都会触发安防策略。
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [ '*' ],
  };

  config.view = {
    // 左边写成 .html 后缀，会自动渲染 .html 文件
    mapping: { '.html': 'ejs' },
    // 上述的配置，指的是将 view 文件夹下的 .html 后缀的文件，识别为 .ejs。
  };

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
      database: 'juejue-cost', // 我们新建的数据库名称
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  config.jwt = {
    // secret 加密字符串，将在后续用于结合用户信息生成一串 token。
    secret: 'wen'
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
