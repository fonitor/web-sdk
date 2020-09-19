import fetch from './fetch'

// 发送请求
export function saveLog (data) {
  return fetch({
    url: '/api/save/log',
    method: 'post',
    data
  })
}