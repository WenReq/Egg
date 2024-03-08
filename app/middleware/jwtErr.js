/*
 * @Author: 温少昌 wenshaochang@huizhihuyu.com
 * @Date: 2024-03-08 16:16:23
 * @LastEditors: 温少昌 wenshaochang@huizhihuyu.com
 * @LastEditTime: 2024-03-08 16:22:52
 * @FilePath: /egg/app/middleware/jwtErr.js
 * @Description: jwt 中间件
 */
module.exports = (secret) => {
    return async function jwtErr(ctx, next) {
        const token = ctx.header.authorization; // 若是没 token，返回的是 null 字符串
        let decode;
        if (token != 'null' && token) {
            try {
                decode = ctx.app.jwt.verify(token, secret); // 验证 token
                await next();
            } catch (error) {
                console.log('error', error);
                ctx.status = 200;
                ctx.body = {
                    msg: 'token已过期，请重新登录',
                    code: 401,
                };
                return;
            }
        } else {
            ctx.status = 200;
            ctx.body = {
                code: 401,
                msg: 'token不存在',
            };
            return;
        }
    }
}