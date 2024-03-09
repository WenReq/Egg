/*
 * @Author: 温少昌 wenshaochang@huizhihuyu.com
 * @Date: 2024-03-09 09:43:58
 * @LastEditors: 温少昌 wenshaochang@huizhihuyu.com
 * @LastEditTime: 2024-03-09 13:36:08
 * @FilePath: /egg/app/controller/upload.js
 * @Description: 上传的控制器
 */
const fs = require('fs');
const moment = require('moment');
const mkdirp = require('mkdirp');
const path = require('path');

const Controller = require('egg').Controller;

class UploadController extends Controller {
    async upload() {
        const { ctx } = this;
        // 需要前往 config/config.default.js 设置 config.multipart 的 mode 属性为 file
        let file = ctx.request.files[0];

        // 声明存放资源的路径
        let uploadDir = '';

        try {
            console.log(file, 'file----')
            // ctx.request.files[0] 表示获取第一个文件，若前端上传多个文件则遍历这个数组对象
            let ff = fs.readFileSync(file.filepath);
            console.log(ff, 'ff');
            // 1. 获取当前日期
            let day = moment(new Date()).format('YYYY-MM-DD');
            // 2. 创建图片保存的路径
            let dir = path.join(this.config.uploadDir, day);
            let date = Date.now(); // 毫秒数
            await mkdirp.mkdirp(dir); // 不存在就创建目录
            // 返回图片保存的路径
            uploadDir = path.join(dir, date + path.extname(file.filename));
            // 写入文件夹
            if(!fs.existsSync(path.dirname(uploadDir))) {
                fs.mkdirSync(path.dirname(uploadDir), { recursive: true });
            }
            fs.writeFileSync(uploadDir, ff);
        } finally {
            // 删除临时文件
            ctx.cleanupRequestFiles();
        }
        console.log('uploadDir', uploadDir)
        ctx.body = {
            code: 200,
            msg: '上传成功',
            data: uploadDir.replace('/app', ''),
        }
    }
}

module.exports = UploadController;
