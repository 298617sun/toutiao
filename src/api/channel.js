import request from '@/utils/request'

// 获取用户的频道
export const getUserChannel = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}
// 获取所有频道列表
export const getAllChannel = () => {
  return request({
    method: 'GET',
    url: '/v1_0/channels'
  })
}
// 添加用户频道
export const addMyChannel = channel => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels: [channel]
    }
  })
}
// 删除指定用户频道
export const delMyChannel = id => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${id}`
  })
}
