/*
 * @Author: 温少昌 wenshaochang@huizhihuyu.com
 * @Date: 2024-03-05 15:22:53
 * @LastEditors: 温少昌 wenshaochang@huizhihuyu.com
 * @LastEditTime: 2024-03-05 15:34:26
 * @FilePath: /egg/app/service/home.js
 * @Description: 在复杂业务场景下用于做业务逻辑封装的一个抽象层。我们换一种理解方式，`Service` 层就是用于数据库的查询，我们尽量将粒度细化，这样以便多个 `Controller` 共同调用同一个 `Service`。
 */
const Service = require('egg').Service;

// HomeService 中的 user 方法内部，在后续链接数据库之后，可以 this 上下文，拿到 MySQL 的实力方法，对数据库进行 CRUD 操作。
class HomeService extends Service {
  async user() {
    // 假设从数据库中获取到用户数据
    return {
      name: '光头强',
      slogen: '俺要把树都砍倒',
    };
  }
}

module.exports = HomeService;
