let url = 'http://127.0.0.1:7001/default/';

let servicePath = {
  getArticleList: url + 'getArticleList',  //  首页文章列表接口
  getArticleById: url + 'getArticleById/',  // 文章详细页内容接口 ,需要接收参数
  getTypeInfo: url + 'getTypeInfo',// 导航栏
  getListById: url + 'getListById/',  // 文章详细页内容接口 ,需要接收参数
}

export default servicePath