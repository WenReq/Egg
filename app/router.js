/*
 * @Author: 温少昌 wenshaochang@huizhihuyu.com
 * @Date: 2024-03-05 14:06:10
 * @LastEditors: 温少昌 wenshaochang@huizhihuyu.com
 * @LastEditTime: 2024-03-08 16:25:10
 * @FilePath: /egg/app/router.js
 * @Description: 约定式开发 router
 */
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;

  // Demo
  // router.get、router.post、router.delete、router.put 等
  router.get('/', controller.home.index);
  router.get('/user', controller.home.user); // 查询用户
  router.post('/add', controller.home.add);
  router.post('/add_user', controller.home.addUser); // 添加用户
  router.post('/edit_user', controller.home.editUser); // 编辑用户
  router.post('/delete_user', controller.home.deleteUser); // 删除用户

  // 中间件
  const _jwt = middleware.jwtErr(app.config.jwt.secret); // 传入加密字符串

  // 记账本项目接口
  router.post('/api/user/register', controller.user.register);
  // 登录接口，生成 token
  router.post('/api/user/login', controller.user.login);
  // 通过 token 拿用户信息
  router.get('/api/user/verify', _jwt, controller.user.verify);
};
