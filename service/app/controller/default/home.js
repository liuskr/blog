'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  // 浏览量
  async pageViews(id) {
    const sql = 'UPDATE article set view_count=view_count+1 where id= ' + id;
    await this.app.mysql.query(sql);
  }
  async getArticleList() {
    const { ctx } = this;
    const sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
      'article.view_count as view_count,' +
      '.type.typeName as typeName ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id';
    const results = await this.app.mysql.query(sql);
    ctx.body = { data: results };
  }
  // 文章类目
  async getArticleById() {
    const { ctx } = this;
    const id = ctx.params.id;
    if (id) {
      const result = await this.app.mysql.get('article', { id });
      const typeId = result.type_id;
      const results = await this.app.mysql.get('type', { id: typeId });
      result.typeName = results.typeName;
      this.pageViews(id);
      ctx.body = { data: result };
    } else {
      ctx.body = { data: '数据不存在' };
    }
  }
  //  NVB 标题
  async getTypeInfo() {
    const { ctx } = this;
    const results = await this.app.mysql.select('type');
    ctx.body = { data: results };
  }

  //  根据类别ID获得文章列表
  async getListById() {
    const { ctx } = this;
    const id = ctx.params.id;
    if (id) {
      const sql = 'SELECT article.id as id,' +
        'article.title as title,' +
        'article.introduce as introduce,' +
        "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
        'article.view_count as view_count ,' +
        'type.typeName as typeName ' +
        'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
        'WHERE type_id=' + id;
      const result = await this.app.mysql.query(sql);
      this.ctx.body = { data: result };
    } else {
      this.ctx.body = { data: '数据不存在' };
    }
  }

}

module.exports = HomeController;
