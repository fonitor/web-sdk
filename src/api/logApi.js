import HttpRequest from './fetch'
import Util from '../util/index'

class Log extends HttpRequest {
  saveLog(data) {
    let options = {
      url: '/api/save/log',
      method: "POST",
      data
    }
    return this.request(options, Util.getInstance().WEB_BASE_URL)
  }
}

/**
 * 发送请求
 * @param {*} data 
 */
export function saveLog(data) {
  let logApi = new Log()
  return logApi.saveLog(data)
}