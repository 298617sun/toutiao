import request from '@/utils/request.js'

// 登录
export const login = data => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}

// 验证码
export const sendSex = data => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${data}`
  })
}
