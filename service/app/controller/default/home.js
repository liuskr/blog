'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // 查找文章目录表
    ctx.body = 'api hi';
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
    const sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      'article.article_content as article_content,' +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
      'article.view_count as view_count ,' +
      'type.typeName as typeName ,' +
      'type.id as typeId ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'WHERE article.id=' + id;
    const results = await this.app.mysql.query(sql);
    ctx.body = { data: results };
  }
  //  NVB 标题
  async getTypeInfo() {
    const { ctx } = this;
    const results = await this.app.mysql.select('type');
    ctx.body = { data: results };
  }
  //  根据类别ID获得文章列表
  async getListById() {
    const id = this.ctx.params.id;
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

  }
}

module.exports = HomeController;
