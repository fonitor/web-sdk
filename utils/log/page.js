import Util from "../util"
import * as error from '../config/index'

const util = Util.getInstance()

/**
 * 统计页面性能
 */
export default class pageLog {

    constructor() {

    }

    /**
     * 单例
     * @return {?}
     */
    static getInstance() {
        if (!Page.instance) {
            Page.instance = new Page()
        }
        return Page.instance
    }

    /**
     * https://blog.csdn.net/lovenjoe/article/details/80260658
     * DNS查询耗时 ：domainLookupEnd - domainLookupStart
     * TCP链接耗时 ：connectEnd - connectStart
     * request请求耗时 ：responseEnd - responseStart
     * 解析dom树耗时 ： domComplete- domInteractive
     * 白屏时间 ：responseStart - navigationStart
     * domready时间 ：domContentLoadedEventEnd - navigationStart
     * onload时间 ：loadEventEnd - navigationStart
     * 相关资料
     * https://segmentfault.com/a/1190000004010453
     * https://github.com/fredshare/blog/issues/5
     * https://javascript.ruanyifeng.com/bom/performance.html#toc5
     */
    pagePerformance() {
        window.onload = () => {
            let performance = window.performance
            if (!performance) {
                // 当前浏览器不支持
                console.log('你的浏览器不支持 performance 接口');
                return;
            }
            let times = performance.timing.toJSON()
            // 发送页面性能指标数据, 上报内容 => 
            let perf = this._objectSpread({}, times, {
                url: "".concat(window.location.host).concat(window.location.pathname)
            })
            // 页面耗时
            // console.log(perf)
            // 资源耗时
            // console.log(performance.getEntries())
            // 浏览器内存情况 usedJSHeapSize表示所有被使用的js堆栈内存；totalJSHeapSize表示当前js堆栈内存总大小，这表示usedJSHeapSize不能大于totalJSHeapSize，如果大于，有可能出现了内存泄漏。
            // console.log(performance.memory)
        }
    }

    /**
     * @param {*} target 
     */
    _objectSpread(target) {
        for (let i = 1; i < arguments.length; i++) {
            let source = arguments[i] != null ? arguments[i] : {}
            let ownKeys = Object.keys(source)
            if (typeof Object.getOwnPropertySymbols === 'function') {
                ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter((sym) => {
                    return Object.getOwnPropertyDescriptor(source, sym).enumerable
                }))
            }
            ownKeys.forEach((key) => {
                this._defineProperty(target, key, source[key])
            })
        }
        return target
    }

    /**
     * @param {*} obj 
     * @param {*} key 
     * @param {*} value 
     */
    _defineProperty(obj, key, value) {
        if (key in obj) {
            Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true })
        } else {
            obj[key] = value
        } return obj
    }
}