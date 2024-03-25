/*
 * @Author: 温少昌 wenshaochang@huizhihuyu.com
 * @Date: 2024-03-05 14:06:10
 * @LastEditors: 温少昌 wenshaochang@huizhihuyu.com
 * @LastEditTime: 2024-03-22 15:45:47
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
  // 获取用户信息
  router.get('/api/user/get_userinfo', _jwt, controller.user.getUserInfo);
  // 修改个性签名
  router.post('/api/user/edit_userinfo', _jwt, controller.user.editUserInfo);
  // 上传图像
  router.post('/api/upload', controller.upload.upload);

  // 记账
  // 添加账单
  router.post('/api/bill/add', _jwt, controller.bill.add);
  // 列表获取
  router.get('/api/bill/list', _jwt, controller.bill.list);
  // 获取详情
  router.get('/api/bill/detail', _jwt, controller.bill.detail);
  // 账单更新
  router.post('/api/bill/update', _jwt, controller.bill.update);
  // 删除账单
  router.post('/api/bill/delete', _jwt, controller.bill.delete);
  // 统计数据
  router.get('/api/bill/data', _jwt, controller.bill.data); 
};
