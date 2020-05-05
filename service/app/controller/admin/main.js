'use strict';

const Controller = require('egg').Controller;


class MainController extends Controller {
  async checkLogin() {
    const { ctx } = this;
    const userName = ctx.request.body.userName;
    const password = ctx.request.body.password;
    const sql = `SELECT userName FROM admin_user WHERE userName='${userName}' AND password='${password}'`;
    const res = await this.app.mysql.query(sql);
    if (res.length > 0) {
      const openId = new Date().getTime();
      ctx.session.openId = openId;
      // eslint-disable-next-line no-undef
      ctx.body = { code: 0, data: '登录成功', openId };
    } else {
      ctx.body = { code: 1, data: '账号或密码错误' };
    }
  }

  // 文章分类
  async getTypeInfo() {
    const res = await this.app.mysql.select('type');
    this.ctx.body = { code: 0, data: res };
  }

  // 文章增加修改
  async addArticle() {
    const tmpArticle = this.ctx.request.body;
    const resule = await this.app.mysql.insert('article', tmpArticle);
    const insertSuccess = resule.affectedRows === 1;
    const insertId = resule.insertId;
    this.ctx.body = {
      isScuccess: insertSuccess,
      insertId,
    };
  }
  // 获得文章列表
  async getArticleList() {

    const sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      'article.view_count as view_count ,' +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
      'type.typeName as typeName ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'ORDER BY article.id DESC ';

    const resList = await this.app.mysql.query(sql);
    this.ctx.body = { list: resList };

  }

  async delectArticle() {
    const id = this.ctx.params.id;
    const res = await this.app.mysql.delete('article', { id });
    this.ctx.body = { data: res };
  }

}
module.exports = MainController;
