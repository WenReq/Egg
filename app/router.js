/*
 * @Author: 温少昌 wenshaochang@huizhihuyu.com
 * @Date: 2024-03-05 14:06:10
 * @LastEditors: 温少昌 wenshaochang@huizhihuyu.com
 * @LastEditTime: 2024-03-05 15:11:34
 * @FilePath: /egg/app/router.js
 * @Description: 约定式开发 router
 */
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // router.get、router.post、router.delete、router.put 等
  router.get('/', controller.home.index);
  router.get('/user/:id', controller.home.user);
  router.post('/add', controller.home.add);
};
