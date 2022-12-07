import request from '@/utils/request'

// 获取用户的频道
export const getUserChannel = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}
