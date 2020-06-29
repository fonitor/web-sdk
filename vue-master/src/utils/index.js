import Util from './util/index'
import * as error from './config/index'

// let util = new Util()

export default class Monitor {
    constructor(options) {
        this.util = Util.getInstance()
        // 初始化框架基础参数
        this.options = this.util.isType().isPlainObject(options) ? options : {}

        window.onload = () => {
            this.init()
            this.content()
        }
    }

    /**
     * 初始化
     */
    init() {
        // 获取设备信息
        this.util.getDevice()
        // 存储唯一uuid
        this.util.getCustomerKey()
        // 存储ip地址
        this.util.getIp()
        // // http请求
        // this.timeRecordArray = []
    }

    
    /**
     * 运行监听
     */
    run() {
        // 监控js
        this.recordJavaScriptError()
        // 资源监控
        this.recordResourceError()
        // http 请求监控
        this.recordHttpError()
        window.addEventListener('hashchange', (e) => {
            console.log('ceshi1')
            console.log(e)
        })
    }

    /**
     * 启动发送
     */
    content() {

    }


    // /**
    //  * 监控js报错
    //  * onerror https://segmentfault.com/a/1190000011041164
    //  */
    // recordJavaScriptError() {
    //     let siftAndMakeUpMessage = (origin_errorMsg, origin_url, origin_lineNumber, origin_columnNumber, origin_errorObj) => {
    //         let errorMsg = origin_errorMsg ? origin_errorMsg : ''
    //         let errorObj = origin_errorObj ? origin_errorObj : ''
    //         let errorType = ""
    //         if (errorMsg) {
    //             let errorStackStr = JSON.stringify(errorObj)
    //             errorType = errorStackStr.split(": ")[0].replace('"', "");
    //         }
    //         let javaScriptErrorInfo = this.javaScriptErrorInfo(error.JS_ERROR, errorType + ": " + errorMsg, errorObj)
    //         console.log(javaScriptErrorInfo)
    //     }

    //     let jsMonitorStarted;
    //     // 重写console.error, 可以捕获更全面的报错信息
    //     let oldError = console.error;
    //     console.error = () => {
    //         // arguments的长度为2时，才是error上报的时机
    //         // if (arguments.length < 2) return;
    //         let errorMsg = arguments[0] && arguments[0].message
    //         let url = util.o
    //         let lineNumber = 0
    //         let columnNumber = 0
    //         let errorObj = arguments[0] && arguments[0].stack
    //         if (!errorObj) errorObj = arguments[0]
    //         // 如果onerror重写成功，就无需在这里进行上报了
    //         !jsMonitorStarted && siftAndMakeUpMessage(errorMsg, url, lineNumber, columnNumber, errorObj)
    //         return oldError.apply(console, arguments)
    //     }

    //     // 重写 onerror 进行jsError的监听
    //     window.onerror = (errorMsg, url, lineNumber, columnNumber, errorObj) => {
    //         console.log(errorMsg)
    //         jsMonitorStarted = true
    //         let errorStack = errorObj ? errorObj.stack : null
    //         siftAndMakeUpMessage(errorMsg, url, lineNumber, columnNumber, errorStack)
    //     }


    // }

    // /**
    //  * js 错误（注意内存，使用深拷贝，以免基本信息被改动）
    //  * @param {*} uploadType 
    //  * @param {*} errorMsg 
    //  * @param {*} errorStack 
    //  */
    // javaScriptErrorInfo(uploadType, errorMsg, errorStack) {
    //     // 避免原数据错乱
    //     let obj = JSON.parse(JSON.stringify(this.getCommonProperty()))
    //     obj.uploadType = uploadType
    //     obj.errorMessage = encodeURIComponent(errorMsg)
    //     obj.errorStack = errorStack
    //     obj.browserInfo = ''
    //     return obj
    // }

    // /**
    //  * 资源报错监控
    //  * 1）使用script标签的回调方法，在网络上搜索过，看到有人说可以用onerror方法监控报错的情况， 但是经过试验后，发现并没有监控到报错情况，至少在静态资源跨域加载的时候是无法获取的。
    //  * 2）利用 performance.getEntries()方法，获取到所有加载成功的资源列表，在onload事件中遍历出所有页面资源集合，利用排除法，到所有集合中过滤掉成功的资源列表，即为加载失败的资源。 此方法看似合理，也确实能够排查出加载失败的静态资源，但是检查的时机很难掌握，另外，如果遇到异步加载的js也就歇菜了。
    //  * 3）添加一个Listener（error）来捕获前端的异常，也是我正在使用的方法，比较靠谱。但是这个方法会监控到很多的error, 所以我们要从中筛选出静态资源加载报错的error, 代码如下：
    //  */
    // recordResourceError() {
    //     window.addEventListener('error', (e) => {
    //         let typeName = e.target.localName
    //         let sourceUrl = ""
    //         switch (typeName) {
    //             case 'link':
    //                 sourceUrl = e.target.href || ''
    //                 break
    //             case 'script':
    //                 sourceUrl = e.target.src || ''
    //                 break
    //             case 'img':
    //                 sourceUrl = e.target.src || ''
    //                 break
    //             default:
    //                 sourceUrl = e.target.src || ''
    //         }
    //         if (sourceUrl) sourceUrl = util.b64EncodeUnicode(encodeURIComponent(sourceUrl))

    //         this.resourceErrorInfo(error.RESOURCE_LOAD, sourceUrl, typeName)
    //     }, true);
    // }

    // /**
    //  * 资源错误监控基础字段（注意内存，使用深拷贝，以免基本信息被改动）
    //  * @param {*} uploadType 
    //  * @param {*} sourceUrl 
    //  * @param {*} typeName 
    //  */
    // resourceErrorInfo(uploadType, sourceUrl, typeName) {
    //     let obj = JSON.parse(JSON.stringify(this.getCommonProperty()))
    //     obj.uploadType = uploadType
    //     obj.errorUrl = sourceUrl
    //     obj.errorName = typeName;
    //     obj.browserInfo = '';
    //     return obj
    // }

    // /**
    //  * 监听jquery、zepto、自己封装ajax方法报错
    //  * 我们监听 XMLHttpRequest 对象的两个事件 loadstart， loadend
    //  * @return {?}
    //  */
    // recordHttpError() {
    //     let oldXHR = window.XMLHttpRequest

    //     let ajaxEventTrigger = () => {
    //         let ajaxEvent = new CustomEvent(event, { detail: this });
    //         window.dispatchEvent(ajaxEvent);
    //     }

    //     let newXHR = () => {
    //         let realXHR = new oldXHR()
    //         realXHR.addEventListener('abort', function () { ajaxEventTrigger.call(this, 'ajaxAbort') }, false)
    //         realXHR.addEventListener('error', function () { ajaxEventTrigger.call(this, 'ajaxError') }, false)
    //         realXHR.addEventListener('load', function () { ajaxEventTrigger.call(this, 'ajaxLoad') }, false)
    //         realXHR.addEventListener('loadstart', function () { ajaxEventTrigger.call(this, 'ajaxLoadStart') }, false)
    //         realXHR.addEventListener('progress', function () { ajaxEventTrigger.call(this, 'ajaxProgress') }, false)
    //         realXHR.addEventListener('timeout', function () { ajaxEventTrigger.call(this, 'ajaxTimeout') }, false)
    //         realXHR.addEventListener('loadend', function () { ajaxEventTrigger.call(this, 'ajaxLoadEnd') }, false)
    //         realXHR.addEventListener('readystatechange', function () { ajaxEventTrigger.call(this, 'ajaxReadyStateChange') }, false)

    //         // 此处的捕获的异常会连日志接口也一起捕获，如果日志上报接口异常了，就会导致死循环了。
    //         // realXHR.onerror = function () {
    //         //   siftAndMakeUpMessage("Uncaught FetchError: Failed to ajax", WEB_LOCATION, 0, 0, {});
    //         // }
    //         return realXHR;
    //     }

    //     window.XMLHttpRequest = newXHR
    //     window.addEventListener('ajaxLoadStart', (e) => {
    //         let tempObj = {
    //             timeStamp: new Date().getTime(),
    //             event: e,
    //             simpleUrl: window.location.href.split('?')[0].replace('#', ''),
    //             uploadFlag: false,
    //         }
    //         this.timeRecordArray.push(tempObj)
    //     })

    //     window.addEventListener('ajaxLoadEnd', _ => {
    //         /** @type {number} */
    //         let i = 0;
    //         for (i; i < this.timeRecordArray.length; i++) {
    //             // uploadFlag == true 代表这个请求已经被上传过了
    //             if (this.timeRecordArray[i].uploadFlag === true) continue

    //             if (this.timeRecordArray[i].event.detail.status > 0) {
    //                 let rType = (this.timeRecordArray[i].event.detail.responseType + "").toLowerCase()
    //                 if (rType === "blob") {
    //                     (function (index) {
    //                         let reader = new FileReader()
    //                         reader.onload = function () {
    //                             let responseText = reader.result //内容就在这里
    //                             this.handleHttpResult(index, responseText)
    //                         }
    //                         try {
    //                             reader.readAsText(this.timeRecordArray[i].event.detail.response, 'utf-8')
    //                         } catch (e) {
    //                             this.handleHttpResult(index, this.timeRecordArray[i].event.detail.response + "")
    //                         }
    //                     })(i)
    //                 } else {
    //                     let responseText = this.timeRecordArray[i].event.detail.responseText
    //                     this.handleHttpResult(i, responseText)
    //                 }
    //             }
    //         }
    //     })
    // }

    // /**
    //  * http 请求日志包装
    //  * @param {*} i 
    //  * @param {*} tempResponseText 
    //  */
    // handleHttpResult(i, tempResponseText) {
    //     let timeRecordArray = (util.isBlank(this.timeRecordArray) && util.isType().isArray(this.timeRecordArray)) ? this.timeRecordArray : []
    //     if (!timeRecordArray[i] || timeRecordArray[i].uploadFlag === true) {
    //         return
    //     }
    //     let responseText = ""
    //     try {
    //         responseText = tempResponseText ? JSON.stringify(util.encryptObj(JSON.parse(tempResponseText))) : ""
    //     } catch (e) {
    //         responseText = ""
    //     }
    //     let simpleUrl = timeRecordArray[i].simpleUrl,
    //         currentTime = new Date().getTime(),
    //         url = timeRecordArray[i].event.detail.responseURL,
    //         status = timeRecordArray[i].event.detail.status,
    //         statusText = timeRecordArray[i].event.detail.statusText,
    //         loadTime = currentTime - timeRecordArray[i].timeStamp;
    //     // if (!url || url.indexOf(HTTP_UPLOAD_LOG_API) != -1) return
    //     // let httpLogInfoStart = new HttpLogInfo(HTTP_LOG, simpleUrl, url, status, statusText, "发起请求", "", timeRecordArray[i].timeStamp, 0)
    //     // httpLogInfoStart.handleLogInfo(HTTP_LOG, httpLogInfoStart);
    //     // let httpLogInfoEnd = new HttpLogInfo(HTTP_LOG, simpleUrl, url, status, statusText, "请求返回", responseText, currentTime, loadTime)
    //     // httpLogInfoEnd.handleLogInfo(HTTP_LOG, httpLogInfoEnd);
    //     // 当前请求成功后就，就将该对象的uploadFlag设置为true, 代表已经上传了
    //     timeRecordArray[i].uploadFlag = true
    // }

}
