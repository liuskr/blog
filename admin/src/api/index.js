import request from '../utils/request.js'
// 登陆
export const Logins = (data) => {
  return request({
    url: 'checkOpenId',
    method: 'post',
    data
  })
}

export const getTypeInfos = () => {
  return request({
    url: 'getTypeInfo',
    method: 'get',
  })
}

export const postArticle = (data) => {
  return request({
    url: 'addArticle',
    method: 'post',
    data
  })

}

export const getUserInfo = () => {
  return request({
    url: 'getArticleList',
    method: 'get'
  })
}
export const delArticle = (id) => {
  return request({
    url: `delectArticle/${id}`,
    method: 'get',
  })
}