/* 文章 */
import request from '@/utils/request'

// 获取文章新闻推荐
export const getArticles = data => {
  return request({
    method: 'GET',
    url: '/v1_0/articles',
    params: data
  })
}
