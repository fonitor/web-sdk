import axios from 'axios'
import * as error from '../config'
import Qs from 'qs'


class HttpRequest {

    constructor(option = {}) {
        this.option = option
    }

    // 发起请求
    async request(options, baseUrl) {
        options.baseURL = baseUrl
        const instance = axios.create()
        await this.interceptors(instance, options.url)
        return instance(options)
    }

    // 拦截器
    async interceptors(instance, url) {
        // 请求拦截
        instance.interceptors.request.use((config) => {
            if (config.method === 'post' && typeof config.data === 'string') {
                config.data = Qs.stringify(config.data)
            }
            return config
        }, (error) => {
            console.error(error)
            return Promise.reject(error)
        })
        // 响应拦截
        instance.interceptors.response.use((res) => {
            const { data } = res
            return Promise.resolve(data)
        }, (error) => {
            if (url) {
                // this.destroy(url)
            }
            console.error(error)
            return Promise.reject(error)
        })
    }
}

export default HttpRequest
