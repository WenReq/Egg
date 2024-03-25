/*
 * @Author: 温少昌 wenshaochang@huizhihuyu.com
 * @Date: 2024-03-08 14:58:02
 * @LastEditors: 温少昌 wenshaochang@huizhihuyu.com
 * @LastEditTime: 2024-03-22 11:39:00
 * @FilePath: /egg/app/controller/user.js
 * @Description: 用户模块的控制器
 */

const Controller = require('egg').Controller;

class UserController extends Controller {
    // 注册
    async register() {
        const { ctx } = this;
        const { username, password } = ctx.request.body; // 获取注册需要的参数
        // 判断参数是否为空
        if (!username || !password) {
            ctx.body = {
                code: 500,
                msg: '账号密码不能为空',
                data: null,
            };
        }

        // 验证数据库内容是否已经有该账户名
        const userInfo = await ctx.service.user.getUserByName(username);
        // 判断是否已存在
        if (userInfo && userInfo.id) {
            ctx.body = {
                code: 500,
                msg: '账户名已被注册，请重新输入',
                data: null,
            };
            // 返回出去
            return;
        }

        // 经过上述两层判断之后，接下便可将账号和密码写入数据库
        // 默认头像，放在 user.js 的最外，避免重复声明。
        const defaultAvatar = 'http://s.yezgea02.com/1615973940679/WeChat77d6d2ac093e247c361f0b8a7aeb6c2a.png';
        // 调用 service 的方法，将数据写入数据库
        const result = await ctx.service.user.resister({
            username,
            password,
            avatar: defaultAvatar,
            signature: '这个人很懒，什么都没留下',
            ctime: Date.now(),
        });
        if (result) {
            ctx.body = {
                code: 200,
                msg: '注册成功',
                data: null,
            }
        } else {
            ctx.body = {
                code: 500,
                msg: '注册失败，请稍后重试',
                data: null,
            }
        }
    }

    // 登录
    async login() {
        // app 为全局属性，相当于所有的插件方法都植入了 app 对象。
        const { ctx, app } = this;
        const { username, password } = ctx.request.body;
        // 根据用户名，在数据库查找相对应的 id 操作
        const userInfo = await ctx.service.user.getUserByName(username);
        // 没有找到说明没有改用户
        if (!userInfo && !userInfo.id) {
            ctx.body = {
                code: 500,
                msg: '用户名不存在',
                data: null,
            }
            return;
        }
        // 找到用户后，判断密码是否正确
        if (userInfo && userInfo.password != password) {
            ctx.body = {
                code: 500,
                msg: '密码错误',
                data: null,
            }
            return;
        }
        // 生成 token 加盐
        // app.jwt.sign 方法接受两个参数，第一个对对象，对象内是需要加密的内容；第二个是加密的字符串。
        const token = app.jwt.sign({
            id: userInfo.id,
            username: userInfo.username,
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // token 有效期为 24 小时
        }, app.config.jwt.secret);
        ctx.body = {
            code: 200,
            message: '登录成功',
            data: {
                token
            },
        };
    }

    // 验证方法
    async verify() {
        const { ctx, app } = this;
        // 通过 token 解析，拿到 user_id
        const token = ctx.request.header.authorization;
        // 通过 app.jwt.verify + 加密字符串 解析出 token 的值
        const decode = app.jwt.verify(token, app.config.jwt.secret);
        // 响应接口
        ctx.body = {
            code: 200,
            message: '获取成功',
            data: {
                ...decode
            }
        }
    }

    // 获取用户信息
    async getUserInfo() {
        const { ctx, app } = this;
        const token = ctx.request.header.authorization;
        // 通过 app.jwt.verify + 加密字符串 解析出 token 内的用户信息
        const decode = app.jwt.verify(token, app.config.jwt.secret);
        // 通过 getUserName 方法，已用户名 decode.username 为参数，从数据库获取到该用户名下的信息
        const userInfo = await ctx.service.user.getUserByName(decode.username);
        // uerInfo 中应该有密码信息，所以我们指定下面四项返回给客户端
        const defaultAvatar = 'http://s.yezgea02.com/1615973940679/WeChat77d6d2ac093e247c361f0b8a7aeb6c2a.png';
        ctx.body = {
            code: 200,
            msg: '请求成功',
            data: {
                id: userInfo.id,
                username: userInfo.username,
                signature: userInfo.signature || '',
                avatar: userInfo.avatar || defaultAvatar,
            }
        }
    }

    // 修改个人信息
    async editUserInfo() {
        const { ctx, app } = this;
        // 通过 post 请求，在请求体中获取签名字段 signature
        const { signature = '', avatar = '' } = ctx.request.body

        try {
            let user_id
            const token = ctx.request.header.authorization;
            // 解密 token 中的用户名称
            const decode = await app.jwt.verify(token, app.config.jwt.secret);
            if (!decode) return
            user_id = decode.id
            // 通过 username 查找 userInfo 完整信息
            const userInfo = await ctx.service.user.getUserByName(decode.username)
            // 通过 service 方法 editUserInfo 修改 signature 信息。
            const result = await ctx.service.user.editUserInfo({
                ...userInfo,
                signature,
                avatar,
            });

            ctx.body = {
                code: 200,
                msg: '请求成功',
                data: {
                    id: user_id,
                    signature,
                    username: userInfo.username,
                    avatar,
                }
            }
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = UserController;
