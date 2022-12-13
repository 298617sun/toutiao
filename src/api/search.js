/* 搜索 */
import request from '@/utils/request'

// 获取联想建议
export const getSuggestion = params => {
  return request({
    method: 'GET',
    url: '/v1_0/suggestion',
    params
  })
}

// 获取搜索结果
export const getSearchArticles = params => {
  return request({
    method: 'GET',
    url: '/v1_0/search',
    params
  })
}
