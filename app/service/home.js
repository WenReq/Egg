/*
 * @Author: 温少昌 wenshaochang@huizhihuyu.com
 * @Date: 2024-03-05 15:22:53
 * @LastEditors: 温少昌 wenshaochang@huizhihuyu.com
 * @LastEditTime: 2024-03-08 10:43:17
 * @FilePath: /egg/app/service/home.js
 * @Description: 在复杂业务场景下用于做业务逻辑封装的一个抽象层。我们换一种理解方式，`Service` 层就是用于数据库的查询，我们尽量将粒度细化，这样以便多个 `Controller` 共同调用同一个 `Service`。
 */
const Service = require('egg').Service;

// HomeService 中的 user 方法内部，在后续链接数据库之后，可以 this 上下文，拿到 MySQL 的实力方法，对数据库进行 CRUD 操作。
class HomeService extends Service {
  // 查询
  async user() {
    const { app } = this;
    const QUERY_STR = 'id, name';
    const sql = `select ${QUERY_STR} from list`; // 获取 id 的 sql 语句
    try {
      const result = await app.mysql.query(sql); // mysql 实例已经挂载到 app 对象下，可以通过 app.mysql 获取到。
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  // 新增
  async addUser(name) {
    const { app } = this;
    try {
      const result = await app.mysql.insert('list', { name }); // 给 list 表，新增一条数据
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  // 编辑
  async editUser(id, name) {
    const { app } = this;
    try {
      const result = await app.mysql.update('list', { name }, { where: { id } }); // 更新 list 表，id 为 id 的数据
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  // 删除
  async deleteUser(id) {
    const { app } = this;
    try {
      const result = await app.mysql.delete('list', { id }); // 删除 list 表，id 为 id 的
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

module.exports = HomeService;
