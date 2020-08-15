import '@babel/polyfill';

/**
 * 工具类
 */
class Util {
  /**
   * 基础配置
   * @param {*} options 
   */
  constructor(options) {
    let device = {},
        ua = navigator.userAgent;
    device.ios = device.android = device.iphone = device.ipad = device.androidChrome = false;
    device.isWeixin = /MicroMessenger/i.test(ua);
    device.os = "web";
    device.deviceName = "PC";
    this.device = device;
    this.ua = ua;
    this.o = ("");
    this.monitorIp = '';
    this.country = '';
    this.uuid = '';
    this.options = !this.isBlank(options) ? options : {};
  }
  /**
   * 单例
   * @param {*} options
   * @return {?}
   */


  static getInstance(options = {}) {
    if (!Util.instance) {
      Util.instance = new Util(options);
    }

    return Util.instance;
  }
  /**
   * 获取设备信息
   * @return {?}
   */


  getDevice() {
    let device = this.device,
        ua = this.ua;
    /** @type {(Array<string>|null)} */

    let android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
    /** @type {(Array<string>|null)} */

    let showEffects = ua.match(/(iPad).*OS\s([\d_]+)/);
    /** @type {(Array<string>|null)} */

    let showPackageConstants = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
    /** @type {(Array<string>|boolean|null)} */

    let showConstants = !showEffects && ua.match(/(iPhone\sOS)\s([\d_]+)/);
    /** @type {(Array<string>|null)} */

    let cache_message = ua.match(/Android\s[\S\s]+Build\//);

    if (android && (device.os = "android", device.osVersion = android[2], device.android = true, device.androidChrome = 0 <= ua.toLowerCase().indexOf("chrome")), (showEffects || showConstants || showPackageConstants) && (device.os = "ios", device.ios = true), showConstants && !showPackageConstants && (device.osVersion = showConstants[2].replace(/_/g, "."), device.iphone = true), showEffects && (device.osVersion = showEffects[2].replace(/_/g, "."), device.ipad = true), showPackageConstants && (device.osVersion = showPackageConstants[3] ? showPackageConstants[3].replace(/_/g, ".") : null, device.iphone = true), device.ios && device.osVersion && 0 <= ua.indexOf("Version/") && "10" === device.osVersion.split(".")[0] && (device.osVersion = ua.toLowerCase().split("version/")[1].split(" ")[0]), device.iphone) {
      /** @type {string} */
      device.deviceName = "iphone";
      var beginWidth = window.screen.width;
      var upperHeight = window.screen.height;

      if (320 === beginWidth && 480 === upperHeight) {
        /** @type {string} */
        device.deviceName = "iphone 4";
      } else {
        if (320 === beginWidth && 568 === upperHeight) {
          /** @type {string} */
          device.deviceName = "iphone 5/SE";
        } else {
          if (375 === beginWidth && 667 === upperHeight) {
            /** @type {string} */
            device.deviceName = "iphone 6/7/8";
          } else {
            if (414 === beginWidth && 736 === upperHeight) {
              /** @type {string} */
              device.deviceName = "iphone 6/7/8 Plus";
            } else {
              if (375 === beginWidth && 812 === upperHeight) {
                /** @type {string} */
                device.deviceName = "iphone X/S/Max";
              }
            }
          }
        }
      }
    } else {
      if (device.ipad) {
        /** @type {string} */
        device.deviceName = "ipad";
      } else {
        if (cache_message) {
          /** @type {string} */
          var d = cache_message[0].split(";")[1].replace(/Build\//g, "");
          /** @type {string} */

          device.deviceName = d.replace(/(^\s*)|(\s*$)/g, "");
        }
      }
    }

    if (-1 == ua.indexOf("Mobile")) {
      /** @type {string} */
      let ua = navigator.userAgent.toLowerCase();

      if (device.browserName = "\u672a\u77e5", 0 < ua.indexOf("msie")) {
        /** @type {string} */
        var assignmentUrl = ua.match(/msie [\d.]+;/gi)[0];
        /** @type {string} */

        device.browserName = assignmentUrl.split("/")[0];
        /** @type {string} */

        device.browserVersion = assignmentUrl.split("/")[1];
      }

      if (0 < ua.indexOf("firefox")) {
        /** @type {string} */
        assignmentUrl = ua.match(/firefox\/[\d.]+/gi)[0];
        /** @type {string} */

        device.browserName = assignmentUrl.split("/")[0];
        /** @type {string} */

        device.browserVersion = assignmentUrl.split("/")[1];
      }

      if (0 < ua.indexOf("safari") && ua.indexOf("chrome") < 0) {
        /** @type {string} */
        assignmentUrl = ua.match(/safari\/[\d.]+/gi)[0];
        /** @type {string} */

        device.browserName = assignmentUrl.split("/")[0];
        /** @type {string} */

        device.browserVersion = assignmentUrl.split("/")[1];
      }

      if (0 < ua.indexOf("chrome")) {
        /** @type {string} */
        assignmentUrl = ua.match(/chrome\/[\d.]+/gi)[0];
        /** @type {string} */

        device.browserName = assignmentUrl.split("/")[0];
        /** @type {string} */

        device.browserVersion = assignmentUrl.split("/")[1];
      }
    }

    device.webView = (showConstants || showEffects || showPackageConstants) && ua.match(/.*AppleWebKit(?!.*Safari)/i);
    this.device = Object(this.device, device);
    return this.device;
  }
  /**
   * 判断数据类型
   * util.isType().isArray(……)
   */


  isType() {
    let _obj = {
      isNumeric: 'Number',
      isBoolean: 'Boolean',
      isString: 'String',
      isNull: 'Null',
      isUndefined: 'Undefined',
      isSymbol: 'Symbol',
      isPlainObject: 'Object',
      isArray: 'Array',
      isRegExp: 'RegExp',
      isDate: 'Date',
      isfunction: 'Function',
      isWindow: 'Window'
    };
    let _type = {},
        _toString = _type.toString;

    for (var key in _obj) {
      if (!_obj.hasOwnProperty(key)) break;

      _type[key] = function () {
        var reg = new RegExp("^\\[object " + _obj[key] + "\\]$");
        return function anonymous(val) {
          return reg.test(_toString.call(val));
        };
      }();
    }

    return _type;
  }
  /**
   * 判断数据
   * @param {*} obj 
   */


  isBlank(obj) {
    return obj === null || obj === undefined || obj === "";
  }
  /**
   * 解析url中拼接的参数
   * @param url
   * @return {{参数名: string}}
   */


  parseUrlParams(url) {
    if (url.indexOf("?") !== -1) {
      url = url.substr(url.indexOf("?") + 1);
    }

    let paramsArr = url.match(/[^\?\=\&]*\=[^\?\=\&]*/g);
    let params = {};

    if (paramsArr != null) {
      paramsArr.forEach(item => {
        let kv = item.split("=");
        params[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1]);
      });
    }

    return params;
  }
  /**
   * 解析url
   * @param {*} url 
   */


  getQueryObject(url) {
    let search = url.substring(url.lastIndexOf("?") + 1),
        obj = {},
        reg = /([^?&=]+)=([^?&=]*)/g,
        base_url = url.split("?")[0];
    search.replace(reg, (rs, $1, $2) => {
      let name = decodeURIComponent($1),
          val = decodeURIComponent($2);
      val = String(val);
      obj[name] = val;
    });
    return {
      baseUrl: base_url,
      query: obj
    };
  }
  /**
  * 组装url 参数
  * @param {*} queryObject 
  */


  makeQuery(queryObject) {
    let query = Object.entries(queryObject).reduce((result, entry) => {
      result.push(entry.join('='));
      return result;
    }, []).join('&');
    return `?${query}`;
  }
  /**
   * 删除url 指定参数
   * @param {*} name 
   */


  funcUrlDel(name) {
    var loca = location;
    var baseUrl = loca.origin + loca.pathname + "?";
    var query = loca.search.substr(1);

    if (query.indexOf(name) > -1) {
      var obj = {};
      var arr = query.split("&");

      for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].split("=");
        obj[arr[i][0]] = arr[i][1];
      }

      delete obj[name];
      var url = baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g, "").replace(/\:/g, "=").replace(/\,/g, "&");
      return url;
    }
  }
  /**
   * 获取唯一uuid
   * @return {?}
   */


  getUuid() {
    /** @type {number} */
    var _transactionName = new Date().getTime();

    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      /** @type {number} */
      var r = 16 * Math.random() | 0;
      return ("x" == c ? r : 3 & r | 8).toString(16);
    }) + "-" + _transactionName;
  }
  /**
   * @return {?}
   */


  getCustomerKey() {
    var uuid = this.getUuid();
    var obj = this.getCookie("monitorAppKey");

    if (!obj) {
      /** @type {!Date} */
      var dateExpires = new Date();
      dateExpires.setTime(dateExpires.getTime() + 15552e7);
      /** @type {string} */

      document.cookie = "monitorAppKey=" + uuid + ";Path=/;domain=" + this.o + ";expires=" + dateExpires.toGMTString();
      obj = uuid;
    }

    this.uuid = obj;
    return obj;
  }
  /**
   * 获取cookie
   * @param {*} name 
   */


  getCookie(name) {
    let t;
    /** @type {!RegExp} */

    let re2 = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    return document.cookie.match(re2) ? (t = document.cookie.match(re2), unescape(t[2])) : "";
  }
  /**
   * 获取ip地址
   * @param {*} cb 
   */


  getIp(cb) {
    if (this.getCookie('monitor_web_ip')) {
      if (this.isType().isfunction(cb)) {
        cb();
      }
    } // 搜狐IP地址查询接口（可设置编码）


    this.loadJs('//pv.sohu.com/cityjson?ie=utf-8', _ => {
      var opt_by = this.monitorIp = returnCitySN ? returnCitySN.cip : "";
      /** @type {string} */

      var urlSafeNodeName = this.country = encodeURIComponent(returnCitySN ? returnCitySN.cname : "");
      /** @type {!Date} */

      var dateExpires = new Date();
      dateExpires.setTime(dateExpires.getTime() + 864e5);
      /** @type {string} */

      document.cookie = "monitor_web_ip=" + opt_by + ";Path=/;domain=;expires=" + dateExpires.toGMTString();
      /** @type {string} */

      document.cookie = "monitor_web_province=" + urlSafeNodeName + ";Path=/;domain=;expires=" + dateExpires.toGMTString();

      if (this.isType().isfunction(cb)) {
        cb();
      }
    }, _ => {
      if (this.isType().isfunction(cb)) {
        cb();
      }
    });
  }
  /**
   * 页面载入js文件
   * @param {*} js 
   * @param {*} callback 
   * @param {*} url 
   */


  loadJs(js, callback, url) {
    /** @type {!Element} */
    var script = document.createElement("script");
    /** @type {number} */

    script.async = 1;
    /** @type {string} */

    script.src = js;
    /** @type {!Function} */

    script.onload = callback;

    if ("function" == typeof url) {
      /** @type {!Function} */
      script.onerror = url;
    }
    /** @type {!Element} */


    var mContainer = document.getElementsByTagName("script")[0];
    return mContainer.parentNode.insertBefore(script, mContainer), mContainer;
  }
  /**
   * 创建一个base-64编码字符串
   * base-64 解码使用方法是 atob() 
   * @param {*} str 
   */


  b64EncodeUnicode(str) {
    try {
      return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (canCreateDiscussions, index) {
        return String.fromCharCode("0x" + index);
      }));
    } catch (e) {
      return str;
    }
  }
  /**
   * http 报错解析
   * @param {*} s 
   * @return {?}
   */


  encryptObj(s) {
    if (this.isType().isArray(s)) {
      /** @type {!Array} */
      var conf_shortcuts_icon = [];
      /** @type {number} */

      var i = 0;

      for (; i < s.length; ++i) {
        conf_shortcuts_icon[i] = this.encryptObj(s[i]);
      }

      return conf_shortcuts_icon;
    }

    if (this.isType().isPlainObject(s)) {
      conf_shortcuts_icon = {};

      for (i in s) {
        conf_shortcuts_icon[i] = this.encryptObj(s[i]);
      }

      return conf_shortcuts_icon;
    }

    return 50 < (s = s + "").length && (s = s.substring(0, 10) + "****" + s.substring(s.length - 9, s.length)), s;
  }
  /**
   * 日志通用属性
   */


  getCommonProperty() {
    let logObj = {},
        device = this.device,
        userInfo = this.options.hasOwnProperty('monitorUser') && util.isType().isPlainObject(this.options.monitorUser) ? this.options.monitorUser : {};
    logObj.happenTime = new Date().getTime(); // 日志发生时间

    logObj.webMonitorId = this.options.WEB_MONITOR_ID || ''; // 用于区分应用的唯一标识（一个项目对应一个）

    logObj.simpleUrl = window.location.href.split('?')[0].replace('#', ''); // 页面的url

    logObj.customerKey = this.uuid; // 用于区分用户，所对应唯一的标识，清理本地数据后失效

    logObj.pageKey = ''; // 用于区分页面，所对应唯一的标识，每个新页面对应一个值

    logObj.deviceName = device.deviceName || ''; // 设备名称

    logObj.os = device.os + (device.osVersion ? " " + device.osVersion : "");
    logObj.browserName = device.browserName;
    logObj.browserVersion = device.browserVersion;
    logObj.monitorIp = this.monitorIp; // 用户的IP地址

    logObj.country = this.country; // 用户所在国家
    // TODO 位置信息, 待处理

    logObj.province = ""; // 用户所在省份

    logObj.city = ""; // 用户所在城市
    // 用户自定义信息， 由开发者主动传入， 便于对线上进行准确定位

    logObj.userId = userInfo.userId || null;
    logObj.firstUserParam = userInfo.firstUserParam || null;
    logObj.secondUserParam = userInfo.secondUserParam || null;
    return logObj;
  }

}

const JS_ERROR = 'js_error';
const RESOURCE_LOAD = 'resource_load';
const HTTP_LOG = 'http_log';

const util$1 = Util.getInstance();
class jsLog {
  constructor() {}
  /**
   * 单例
   * @return {?}
   */


  static getInstance() {
    if (!jsLog.instance) {
      jsLog.instance = new jsLog();
    }

    return jsLog.instance;
  }
  /**
   * 监控js报错
   * onerror https://segmentfault.com/a/1190000011041164
   */


  recordJavaScriptError() {
    let siftAndMakeUpMessage = (origin_errorMsg, origin_url, origin_lineNumber, origin_columnNumber, origin_errorObj) => {
      let errorMsg = origin_errorMsg ? origin_errorMsg : '';
      let errorObj = origin_errorObj ? origin_errorObj : '';
      let errorType = "";

      if (errorMsg) {
        let errorStackStr = JSON.stringify(errorObj);
        errorType = errorStackStr.split(": ")[0].replace('"', "");
      }

      let javaScriptErrorInfo = this.javaScriptErrorInfo(JS_ERROR, errorType + ": " + errorMsg, errorObj);
      console.log(javaScriptErrorInfo);
    };

    let jsMonitorStarted; // 重写console.error, 可以捕获更全面的报错信息

    let oldError = console.error;

    console.error = () => {
      // arguments的长度为2时，才是error上报的时机
      // if (arguments.length < 2) return;
      let errorMsg = arguments[0] && arguments[0].message;
      let url = util$1.o;
      let lineNumber = 0;
      let columnNumber = 0;
      let errorObj = arguments[0] && arguments[0].stack;
      if (!errorObj) errorObj = arguments[0]; // 如果onerror重写成功，就无需在这里进行上报了

      !jsMonitorStarted && siftAndMakeUpMessage(errorMsg, url, lineNumber, columnNumber, errorObj);
      return oldError.apply(console, arguments);
    }; // 重写 onerror 进行jsError的监听


    window.onerror = (errorMsg, url, lineNumber, columnNumber, errorObj) => {
      // console.log(errorMsg)
      jsMonitorStarted = true;
      let errorStack = errorObj ? errorObj.stack : null;
      siftAndMakeUpMessage(errorMsg, url, lineNumber, columnNumber, errorStack);
    };

    window.onunhandledrejection = event => {
      /** @type {string} */
      let errorMessage = "";
      /** @type {string} */

      let th_field = "";
      th_field = "object" == typeof event.reason ? (errorMessage = event.reason.message, event.reason.stack) : (errorMessage = event.reason, "");
      let url = util$1.o;
      th_field ? siftAndMakeUpMessage(errorMessage, url, 0, 0, "UncaughtInPromiseError: " + th_field) : null;
    };
  }
  /**
   * js 错误（注意内存，使用深拷贝，以免基本信息被改动）
   * @param {*} uploadType 
   * @param {*} errorMsg 
   * @param {*} errorStack 
   */


  javaScriptErrorInfo(uploadType, errorMsg, errorStack) {
    // 避免原数据错乱
    let obj = JSON.parse(JSON.stringify(util$1.getCommonProperty()));
    obj.uploadType = uploadType;
    obj.errorMessage = encodeURIComponent(errorMsg);
    obj.errorStack = errorStack;
    obj.browserInfo = '';
    return obj;
  }

}

const util$2 = Util.getInstance();
class rescourceLog {
  constructor() {}
  /**
   * 单例
   * @return {?}
   */


  static getInstance() {
    if (!rescourceLog.instance) {
      rescourceLog.instance = new rescourceLog();
    }

    return rescourceLog.instance;
  }
  /**
   * 资源报错监控
   * 1）使用script标签的回调方法，在网络上搜索过，看到有人说可以用onerror方法监控报错的情况， 但是经过试验后，发现并没有监控到报错情况，至少在静态资源跨域加载的时候是无法获取的。
   * 2）利用 performance.getEntries()方法，获取到所有加载成功的资源列表，在onload事件中遍历出所有页面资源集合，利用排除法，到所有集合中过滤掉成功的资源列表，即为加载失败的资源。 此方法看似合理，也确实能够排查出加载失败的静态资源，但是检查的时机很难掌握，另外，如果遇到异步加载的js也就歇菜了。
   * 3）添加一个Listener（error）来捕获前端的异常，也是我正在使用的方法，比较靠谱。但是这个方法会监控到很多的error, 所以我们要从中筛选出静态资源加载报错的error, 代码如下：
   */


  recordResourceError() {
    window.addEventListener('error', e => {
      let typeName = e.target.localName;
      let sourceUrl = "";

      switch (typeName) {
        case 'link':
          sourceUrl = e.target.href || '';
          break;

        case 'script':
          sourceUrl = e.target.src || '';
          break;

        case 'img':
          sourceUrl = e.target.src || '';
          break;

        default:
          sourceUrl = e.target.src || '';
      }

      if (sourceUrl) sourceUrl = util$2.b64EncodeUnicode(encodeURIComponent(sourceUrl));
      let resoureErrorInfo = this.resourceErrorInfo(RESOURCE_LOAD, sourceUrl, typeName);
      console.log(resoureErrorInfo);
    }, true);
  }
  /**
   * 资源错误监控基础字段（注意内存，使用深拷贝，以免基本信息被改动）
   * @param {*} uploadType 
   * @param {*} sourceUrl 
   * @param {*} typeName 
   */


  resourceErrorInfo(uploadType, sourceUrl, typeName) {
    let obj = JSON.parse(JSON.stringify(util$2.getCommonProperty()));
    obj.uploadType = uploadType;
    obj.errorUrl = sourceUrl;
    obj.errorName = typeName;
    obj.browserInfo = '';
    return obj;
  }

}

const util$3 = Util.getInstance(),
      cache = [];
class httpLog {
  constructor() {
    this.timeRecordArray = [];
  }
  /**
   * 单例
   * @return {?}
   */


  static getInstance() {
    if (!httpLog.instance) {
      httpLog.instance = new httpLog();
    }

    return httpLog.instance;
  }
  /**
   * 监听jquery、zepto、自己封装ajax方法报错
   * 我们监听 XMLHttpRequest 对象的两个事件 loadstart， loadend
   * @return {?}
   */


  recordHttpError() {
    let XMLHttpRequest = window.XMLHttpRequest;
    /**
     * @param {string} name
     * @return {undefined}
     */

    function fire(name) {
      /** @type {!CustomEvent} */
      var event = new CustomEvent(name, {
        detail: this
      });
      window.dispatchEvent(event);
    }

    window.XMLHttpRequest = () => {
      var xhr = new XMLHttpRequest();
      return xhr.addEventListener("abort", function () {
        fire.call(this, "ajaxAbort");
      }, false), xhr.addEventListener("error", function () {
        fire.call(this, "ajaxError");
      }, false), xhr.addEventListener("load", function () {
        fire.call(this, "ajaxLoad");
      }, false), xhr.addEventListener("loadstart", function () {
        fire.call(this, "ajaxLoadStart");
      }, false), xhr.addEventListener("progress", function () {
        fire.call(this, "ajaxProgress");
      }, false), xhr.addEventListener("timeout", function () {
        fire.call(this, "ajaxTimeout");
      }, false), xhr.addEventListener("loadend", function () {
        fire.call(this, "ajaxLoadEnd");
      }, false), xhr.addEventListener("readystatechange", function () {
        fire.call(this, "ajaxReadyStateChange");
      }, false), xhr;
    };

    window.addEventListener('ajaxLoadStart', e => {
      let tempObj = {
        timeStamp: new Date().getTime(),
        event: e,
        simpleUrl: window.location.href.split('?')[0].replace('#', ''),
        uploadFlag: false
      };
      cache.push(tempObj);
    });
    let self = this;
    window.addEventListener('ajaxLoadEnd', e => {
      /** @type {number} */
      let i = 0;

      for (i; i < cache.length; i++) {
        if (true === cache[i].uploadFlag) continue;

        if (cache[i].event.detail.status > 0) {
          if ("blob" === (cache[i].event.detail.responseType + "").toLowerCase()) {
            // 闭包
            !function (t) {
              /** @type {!FileReader} */
              let reader = new FileReader();
              /**
               * @return {undefined}
               */

              reader.onload = function () {
                /** @type {(ArrayBuffer|Blob|null|string)} */
                var result = reader.result;
                self.handleHttpResult(t, result);
              };

              try {
                reader.readAsText(cache[i].event.detail.response, "utf-8");
              } catch (e) {
                self.handleHttpResult(t, cache[i].event.detail.response + "");
              }
            }(i);
          } else {
            try {
              let response = cache[i] && cache[i].event && cache[i].event.detail;

              if (!response) {
                return;
              }

              let id = response.responseType;
              /** @type {string} */

              let result = "";

              if (!("" !== id && "text" !== id)) {
                result = response.responseText;
              }

              if ("json" === id) {
                /** @type {string} */
                result = JSON.stringify(response.response);
              }

              self.handleHttpResult(i, result);
            } catch (e) {}
          }
        }
      }
    });
    this.fetch();
  }
  /**
   * http 请求日志包装
   * @param {*} i 
   * @param {*} tempResponseText 
   */


  handleHttpResult(i, tempResponseText) {
    if (!cache[i] || cache[i].uploadFlag === true) {
      return;
    }

    let responseText = "";

    try {
      responseText = tempResponseText ? JSON.stringify(util$3.encryptObj(JSON.parse(tempResponseText))) : "";
    } catch (e) {
      responseText = "";
    }

    let simpleUrl = cache[i].simpleUrl,
        currentTime = new Date().getTime(),
        url = cache[i].event.detail.responseURL,
        status = cache[i].event.detail.status,
        statusText = cache[i].event.detail.statusText,
        loadTime = currentTime - cache[i].timeStamp;
    if (!url) return;
    let httpLogInfoStart = this.httpLogInfo(HTTP_LOG, simpleUrl, status, statusText, "发起请求", responseText, cache[i].timeStamp, 0);
    console.log(httpLogInfoStart); // httpLogInfoStart.handleLogInfo(error.HTTP_LOG, httpLogInfoStart)

    let httpLogInfoEnd = this.httpLogInfo(HTTP_LOG, simpleUrl, status, statusText, "请求返回", responseText, currentTime, loadTime);
    console.log(httpLogInfoEnd); // httpLogInfoEnd.handleLogInfo(error.HTTP_LOG, httpLogInfoEnd)
    // 当前请求成功后就，就将该对象的uploadFlag设置为true, 代表已经上传了

    cache[i].uploadFlag = true;
  }
  /**
   * httpError log
   * @param {*} uploadType 上传类型
   * @param {*} url 请求地址
   * @param {*} status 接口状态
   * @param {*} statusText 
   * @param {*} statusResult 
   * @param {*} responseText
   * @param {*} currentTime 
   * @param {*} loadTime 
   */


  httpLogInfo(uploadType, url, status, statusText, statusResult, responseText, currentTime, loadTime) {
    let obj = JSON.parse(JSON.stringify(util$3.getCommonProperty()));
    obj.uploadType = uploadType; // 上传类型

    obj.httpUrl = util$3.b64EncodeUnicode(encodeURIComponent(url)); // 请求地址

    obj.status = status; // 接口状态

    obj.statusText = statusText; // 状态描述

    obj.statusResult = statusResult; // 区分发起和返回状态

    obj.happenTime = currentTime; // 客户端发送时间

    obj.loadTime = loadTime; // 接口请求耗时

    obj.responseText = responseText; // 接口返回数据

    return obj;
  }
  /**
   * 重写window.fetch方法，为了能检测到浏览器api报错
   * @return {?}
   */


  fetch() {
    /**
     * @param {*} name 
     * @return {?}
     */
    function normalizeName(name) {
      if ("string" != typeof name && (name = String(name)), /[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
        throw new TypeError("Invalid character in header field name");
      }

      return name.toLowerCase();
    }
    /**
     * @param {string} name
     * @return {?}
     */


    function normalizeValue(name) {
      return "string" != typeof name && (name = String(name)), name;
    }
    /**
     * @param {!Array} parent
     * @return {?}
     */


    function fn(parent) {
      var iterable = {
        next: function () {
          var _eof = parent.shift();

          return {
            done: void 0 === _eof,
            value: _eof
          };
        }
      };
      return n && (iterable[Symbol.iterator] = function () {
        return iterable;
      }), iterable;
    }
    /**
     * @param {!Object} headers
     * @return {undefined}
     */


    function Headers(headers) {
      this.map = {};

      if (headers instanceof Headers) {
        headers.forEach(function (value, s) {
          this.append(s, value);
        }, this);
      } else {
        if (Array.isArray(headers)) {
          headers.forEach(function (header) {
            this.append(header[0], header[1]);
          }, this);
        } else {
          if (headers) {
            Object.getOwnPropertyNames(headers).forEach(function (name) {
              this.append(name, headers[name]);
            }, this);
          }
        }
      }
    }
    /**
     * @param {?} body
     * @return {?}
     */


    function consumed(body) {
      if (body.bodyUsed) {
        return Promise.reject(new TypeError("Already read"));
      }
      /** @type {boolean} */


      body.bodyUsed = true;
    }
    /**
     * @param {!Object} x
     * @return {?}
     */


    function require(x) {
      return new Promise(function (fileCallback, callback) {
        /**
         * @return {undefined}
         */
        x.onload = function () {
          fileCallback(x.result);
        };
        /**
         * @return {undefined}
         */


        x.onerror = function () {
          callback(x.error);
        };
      });
    }
    /**
     * @param {?} value
     * @return {?}
     */


    function done(value) {
      /** @type {!FileReader} */
      var f = new FileReader();

      var result = require(f);

      return f.readAsArrayBuffer(value), result;
    }
    /**
     * @param {!Object} buffer
     * @return {?}
     */


    function bufferClone(buffer) {
      if (buffer.slice) {
        return buffer.slice(0);
      }
      /** @type {!Uint8Array} */


      var tmp = new Uint8Array(buffer.byteLength);
      return tmp.set(new Uint8Array(buffer)), tmp.buffer;
    }
    /**
     * @return {?}
     */


    function Body() {
      return this.bodyUsed = false, this._initBody = function (body) {
        if (this._bodyInit = body) {
          if ("string" == typeof body) {
            /** @type {string} */
            this._bodyText = body;
          } else {
            if (blobSupport && Blob.prototype.isPrototypeOf(body)) {
              /** @type {string} */
              this._bodyBlob = body;
            } else {
              if (parentElement && FormData.prototype.isPrototypeOf(body)) {
                /** @type {string} */
                this._bodyFormData = body;
              } else {
                if (isElement && URLSearchParams.prototype.isPrototypeOf(body)) {
                  this._bodyText = body.toString();
                } else {
                  if (range && blobSupport && isDataView(body)) {
                    this._bodyArrayBuffer = bufferClone(body.buffer);
                    /** @type {!Blob} */

                    this._bodyInit = new Blob([this._bodyArrayBuffer]);
                  } else {
                    if (!range || !ArrayBuffer.prototype.isPrototypeOf(body) && !isArrayBufferView(body)) {
                      throw new Error("unsupported BodyInit type");
                    }

                    this._bodyArrayBuffer = bufferClone(body);
                  }
                }
              }
            }
          }
        } else {
          /** @type {string} */
          this._bodyText = "";
        }

        if (!this.headers.get("content-type")) {
          if ("string" == typeof body) {
            this.headers.set("content-type", "text/plain;charset=UTF-8");
          } else {
            if (this._bodyBlob && this._bodyBlob.type) {
              this.headers.set("content-type", this._bodyBlob.type);
            } else {
              if (isElement && URLSearchParams.prototype.isPrototypeOf(body)) {
                this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8");
              }
            }
          }
        }
      }, blobSupport && (this.blob = function () {
        var rejected = consumed(this);

        if (rejected) {
          return rejected;
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob);
        }

        if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]));
        }

        if (this._bodyFormData) {
          throw new Error("could not read FormData body as blob");
        }

        return Promise.resolve(new Blob([this._bodyText]));
      }, this.arrayBuffer = function () {
        return this._bodyArrayBuffer ? consumed(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(done);
      }), this.text = function () {
        var rejected = consumed(this);

        if (rejected) {
          return rejected;
        }

        if (this._bodyBlob) {
          return function (f) {
            /** @type {!FileReader} */
            var r = new FileReader();

            var io = require(r);

            return r.readAsText(f), io;
          }(this._bodyBlob);
        }

        if (this._bodyArrayBuffer) {
          return Promise.resolve(function (signature) {
            /** @type {!Uint8Array} */
            var result = new Uint8Array(signature);
            /** @type {!Array} */

            var n = new Array(result.length);
            /** @type {number} */

            var i = 0;

            for (; i < result.length; i++) {
              /** @type {string} */
              n[i] = String.fromCharCode(result[i]);
            }

            return n.join("");
          }(this._bodyArrayBuffer));
        }

        if (this._bodyFormData) {
          throw new Error("could not read FormData body as text");
        }

        return Promise.resolve(this._bodyText);
      }, parentElement && (this.formData = function () {
        return this.text().then(text2formData);
      }), this.json = function () {
        return this.text().then(JSON.parse);
      }, this;
    }
    /**
     * @param {!Object} input
     * @param {!Object} options
     * @return {undefined}
     */


    function Request(input, options) {
      var body = (options = options || {}).body;

      if (input instanceof Request) {
        if (input.bodyUsed) {
          throw new TypeError("Already read");
        }

        this.url = input.url;
        this.credentials = input.credentials;

        if (!options.headers) {
          this.headers = new Headers(input.headers);
        }

        this.method = input.method;
        this.mode = input.mode;

        if (!(body || null == input._bodyInit)) {
          body = input._bodyInit;
          /** @type {boolean} */

          input.bodyUsed = true;
        }
      } else {
        /** @type {string} */
        this.url = String(input);
      }

      if (this.credentials = options.credentials || this.credentials || "omit", !options.headers && this.headers || (this.headers = new Headers(options.headers)), this.method = function (shortMonthName) {
        var looseWord = shortMonthName.toUpperCase();
        return -1 < methods.indexOf(looseWord) ? looseWord : shortMonthName;
      }(options.method || this.method || "GET"), this.mode = options.mode || this.mode || null, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && body) {
        throw new TypeError("Body not allowed for GET or HEAD requests");
      }

      this._initBody(body);
    }
    /**
     * @param {!Object} body
     * @return {?}
     */


    function text2formData(body) {
      /** @type {!FormData} */
      var form = new FormData();
      return body.trim().split("&").forEach(function (clusterShardData) {
        if (clusterShardData) {
          var headersAndBody = clusterShardData.split("=");
          var url = headersAndBody.shift().replace(/\+/g, " ");
          var filePath = headersAndBody.join("=").replace(/\+/g, " ");
          form.append(decodeURIComponent(url), decodeURIComponent(filePath));
        }
      }), form;
    }
    /**
     * @param {string} bodyInit
     * @param {!Object} options
     * @return {undefined}
     */


    function Response(bodyInit, options) {
      options = options || {};
      /** @type {string} */

      this.type = "default";
      this.status = "status" in options ? options.status : 200;
      /** @type {boolean} */

      this.ok = 200 <= this.status && this.status < 300;
      this.statusText = "statusText" in options ? options.statusText : "OK";
      this.headers = new Headers(options.headers);
      this.url = options.url || "";

      this._initBody(bodyInit);
    }
    /** @type {boolean} */


    var isElement = ("URLSearchParams" in self);
    /** @type {boolean} */

    var n = "Symbol" in self && "iterator" in Symbol;

    var blobSupport = "FileReader" in self && "Blob" in self && function () {
      try {
        return new Blob(), true;
      } catch (e) {
        return false;
      }
    }();
    /** @type {boolean} */


    var parentElement = ("FormData" in self);
    /** @type {boolean} */

    var range = ("ArrayBuffer" in self);

    if (range) {
      /** @type {!Array} */
      var orderedPaneIds = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"];
      /**
       * @param {string} obj
       * @return {?}
       */

      var isDataView = function (obj) {
        return obj && DataView.prototype.isPrototypeOf(obj);
      };
      /** @type {function(*): boolean} */


      var isArrayBufferView = ArrayBuffer.isView || function (id) {
        return id && -1 < orderedPaneIds.indexOf(Object.prototype.toString.call(id));
      };
    }
    /**
     * @param {string} name
     * @param {string} value
     * @return {undefined}
     */


    Headers.prototype.append = function (name, value) {
      name = normalizeName(name);
      value = normalizeValue(value);
      var oldValue = this.map[name];
      this.map[name] = oldValue ? oldValue + "," + value : value;
    };
    /**
     * @param {string} name
     * @return {undefined}
     */


    Headers.prototype.delete = function (name) {
      delete this.map[normalizeName(name)];
    };
    /**
     * @param {string} name
     * @return {?}
     */


    Headers.prototype.get = function (name) {
      return name = normalizeName(name), this.has(name) ? this.map[name] : null;
    };
    /**
     * @param {string} name
     * @return {?}
     */


    Headers.prototype.has = function (name) {
      return this.map.hasOwnProperty(normalizeName(name));
    };
    /**
     * @param {?} name
     * @param {string} value
     * @return {undefined}
     */


    Headers.prototype.set = function (name, value) {
      this.map[normalizeName(name)] = normalizeValue(value);
    };
    /**
     * @param {!Function} callback
     * @param {?} thisp
     * @return {undefined}
     */


    Headers.prototype.forEach = function (callback, thisp) {
      var i;

      for (i in this.map) {
        if (this.map.hasOwnProperty(i)) {
          callback.call(thisp, this.map[i], i, this);
        }
      }
    };
    /**
     * @return {?}
     */


    Headers.prototype.keys = function () {
      /** @type {!Array} */
      var params = [];
      return this.forEach(function (canCreateDiscussions, post_content_type) {
        params.push(post_content_type);
      }), fn(params);
    };
    /**
     * @return {?}
     */


    Headers.prototype.values = function () {
      /** @type {!Array} */
      var q = [];
      return this.forEach(function (innerSource) {
        q.push(innerSource);
      }), fn(q);
    };
    /**
     * @return {?}
     */


    Headers.prototype.entries = function () {
      /** @type {!Array} */
      var q = [];
      return this.forEach(function (y, tiles) {
        q.push([tiles, y]);
      }), fn(q);
    };

    if (n) {
      /** @type {function(): ?} */
      Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
    }
    /** @type {!Array} */


    var methods = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
    /**
     * @return {?}
     */

    Request.prototype.clone = function () {
      return new Request(this, {
        body: this._bodyInit
      });
    };

    Body.call(Request.prototype);
    Body.call(Response.prototype);
    /**
     * @return {?}
     */

    Response.prototype.clone = function () {
      return new Response(this._bodyInit, {
        status: this.status,
        statusText: this.statusText,
        headers: new Headers(this.headers),
        url: this.url
      });
    };
    /**
     * @return {?}
     */


    Response.error = function () {
      var response = new Response(null, {
        status: 0,
        statusText: ""
      });
      return response.type = "error", response;
    };
    /** @type {!Array} */


    var removeDataListeners = [301, 302, 303, 307, 308];
    /**
     * @param {string} state
     * @param {string} i
     * @return {?}
     */

    Response.redirect = function (state, i) {
      if (-1 === removeDataListeners.indexOf(i)) {
        throw new RangeError("Invalid status code");
      }

      return new Response(null, {
        status: i,
        headers: {
          location: state
        }
      });
    };
    /** @type {function(!Object): undefined} */


    window.Headers = Headers;
    /** @type {function(!Object, !Object): undefined} */

    window.Request = Request;
    /** @type {function(string, !Object): undefined} */

    window.Response = Response;
    /**
     * @param {?} method
     * @param {boolean} url
     * @return {?}
     */

    window.fetch = function (method, url) {
      return new Promise(function (resolve, reject) {
        var request = new Request(method, url);
        /** @type {!XMLHttpRequest} */

        var xhr = new XMLHttpRequest();
        /**
         * @return {undefined}
         */

        xhr.onload = function () {
          /** @type {string} */
          var type = xhr.responseType;
          /** @type {string} */

          var response = "";
          var options = {
            status: xhr.status,
            statusText: xhr.statusText,
            headers: function (clusterShardData) {
              var h2 = new Headers();
              return clusterShardData.split(/\r?\n/).forEach(function (clusterShardData) {
                /** @type {!Array<string>} */
                var headersAndBody = clusterShardData.split(":");
                /** @type {string} */

                var style = headersAndBody.shift().trim();

                if (style) {
                  /** @type {string} */
                  var foo = headersAndBody.join(":").trim();
                  h2.append(style, foo);
                }
              }), h2;
            }(xhr.getAllResponseHeaders() || "")
          };
          options.url = "responseURL" in xhr ? xhr.responseURL : options.headers.get("X-Request-URL");

          if (!("" !== type && "text" !== type)) {
            /** @type {string} */
            response = xhr.responseText;
          }

          if ("json" === type) {
            /** @type {(Object|null|string)} */
            response = xhr.response;
          }
          /** @type {(Object|null|string)} */


          var body = "response" in xhr ? xhr.response : response;
          resolve(new Response(body, options));
        };
        /**
         * @return {undefined}
         */


        xhr.onerror = function () {
          console.error("Network request failed");
          reject(new TypeError("Network request failed"));
        };
        /**
         * @return {undefined}
         */


        xhr.ontimeout = function () {
          reject(new TypeError("Network request failed"));
        };

        xhr.open(request.method, request.url, true);

        if ("include" === request.credentials) {
          /** @type {boolean} */
          xhr.withCredentials = true;
        }

        if ("responseType" in xhr && blobSupport) {
          /** @type {string} */
          xhr.responseType = "blob";
        }

        request.headers.forEach(function (type, i) {
          xhr.setRequestHeader(i, type);
        });
        xhr.send(void 0 === request._bodyInit ? null : request._bodyInit);
      });
    };
    /** @type {boolean} */


    window.fetch.polyfill = true;
  }

}

const util$4 = Util.getInstance();
/**
 * 统计页面性能
 */

class pageLog {
  constructor() {}
  /**
   * 单例
   * @return {?}
   */


  static getInstance() {
    if (!Page.instance) {
      Page.instance = new Page();
    }

    return Page.instance;
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
      let performance = window.performance;

      if (!performance) {
        // 当前浏览器不支持
        console.log('你的浏览器不支持 performance 接口');
        return;
      }

      let times = performance.timing.toJSON(); // 发送页面性能指标数据, 上报内容 => 

      let perf = this._objectSpread({}, times, {
        url: "".concat(window.location.host).concat(window.location.pathname)
      }); // 页面耗时
      // console.log(perf)
      // 资源耗时
      // console.log(performance.getEntries())
      // 浏览器内存情况 usedJSHeapSize表示所有被使用的js堆栈内存；totalJSHeapSize表示当前js堆栈内存总大小，这表示usedJSHeapSize不能大于totalJSHeapSize，如果大于，有可能出现了内存泄漏。
      // console.log(performance.memory)

    };
  }
  /**
   * @param {*} target 
   */


  _objectSpread(target) {
    for (let i = 1; i < arguments.length; i++) {
      let source = arguments[i] != null ? arguments[i] : {};
      let ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(sym => {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(key => {
        this._defineProperty(target, key, source[key]);
      });
    }

    return target;
  }
  /**
   * @param {*} obj 
   * @param {*} key 
   * @param {*} value 
   */


  _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

}

const util$5 = Util.getInstance();
/**
 * 定时任务，避免浏览器并发
 */

class Queue {
  /**
  * 初始化
  * @param {*} options 
  */
  constructor(options) {
    let config = {
      isOpen: true,
      synRequestNum: 4,
      ver: '1.0.0'
    }; // 进行参数合并

    config = !util$5.isBlank(options) && util$5.isType().isPlainObject(options) ? Object.assign(config, options) : config; // 是否开启队列

    this.isOpen = config.isOpen; // 队列

    this.requestQueue = [];
    this.requestTimmer = undefined; // 队列控制并发数（暂定定4，后续可以根据浏览器io来决定给浏览器不同的策略）
    // https://www.cnblogs.com/sunsky303/p/8862128.html

    this.synRequestNum = !util$5.isBlank(config.synRequestNum) ? config.synRequestNum : 4; // 版本号

    this.ver = config.ver;
    this.synNum = 0;
  }
  /**
   * 单例
   * @param {*} structure 构造
   * @param {*} option config配置
   * @return {?}
   */


  static getInstance(structure, option) {
    if (!Queue.instance || !Queue.instance[structure]) {
      if (!Queue.instance) {
        Queue.instance = {};
      }

      Queue.instance[structure] = new Queue(option);
    }

    return Queue.instance[structure];
  }
  /**
   * 同步队列
   * @param {*} log 队列日志 
   */


  pushToQueue(log) {
    {
      // var n = this.requestQueue && this.requestQueue.length
      // 简单先同步放入数组中
      this.requestQueue.push(log);
      return this.onReady(() => {
        this.requestTimmer = this.delay(() => {
          this.clear();
        }, this.requestQueue[0] && !!this.requestQueue[0].uploadType && this.requestQueue[0].uploadType == 'error' ? 3e3 : -1);
      });
    }
  }
  /**
   * 宏任务（检测是否有唯一对应值）
   * @param {*} fun 
   */


  onReady(fun) {
    // TOODO 检测是否有唯一项目id 没有则不上报
    if (util$5.isType().isfunction(fun)) {
      fun();
    }
  }
  /**
   * 执行队列
   * @param {*} fun 
   * @param {*} e 
   */


  delay(fun, e) {
    if (!util$5.isType().isfunction(fun)) return null;
    return e === -1 ? (fun(), null) : setTimeout(fun, e || 0);
  }
  /**
   * 并发限制
   * @return {?}
   */


  clear() {
    var e;

    if (this.synNum > this.synRequestNum) {
      return clearTimeout(this.requestTimmer), this.requestTimmer = setTimeout(() => {
        this.clear();
      }, 50);
    }

    for (clearTimeout(this.requestTimmer), this.requestTimmer = null; this.synNum < this.synRequestNum && (e = this.requestQueue.pop()); this.synNum++) {
      e.handleLog(this.reduceSynNumFun);
    } // 执行完如果还有数据则继续执行（放到宏任务）


    !!this.requestQueue.length && (this.requestTimmer = setTimeout(() => {
      this.clear();
    }, 50));
  }
  /**
   * 清空队列
   * @return {?}
   */


  clearAll() {
    this.requestQueue = [];
    this.requestTimmer = null;
    this.synNum = 0;
  }
  /**
   * 并发数减一
   * @return {?}
   */


  reduceSynNumFun() {
    Queue.instance.synNum--;
    return this;
  }

}

let util$6 = null;
class Monitor {
  /**
   * 初始化
   * @param {*} options { monitorUser: {userId: 用户ID, firstUserParam: 用户自定义配置，secondUserParam: 第二个参数}, WEB_MONITOR_ID: 项目id, synRequestNum: 定时任务 }
   */
  constructor(options) {
    // 初始化框架基础参数
    this.options = options === null || options === undefined || options === "" ? options : {};
    let utilConfig = {
      monitorUser: this.options.monitorUser || {},
      WEB_MONITOR_ID: this.options.WEB_MONITOR_ID || ""
    };
    let queueConfig = {
      synRequestNum: this.options.synRequestNum || null
    };
    util$6 = Util.getInstance(utilConfig);
    Queue.getInstance('web', queueConfig);
    this.init(); // this.content()

    this.run();
  }
  /**
   * 初始化
   */


  init() {
    // 获取设备信息
    util$6.getDevice(); // 存储唯一uuid

    util$6.getCustomerKey(); // 存储ip地址

    util$6.getIp();
  }
  /**
   * 运行监听
   */


  run() {
    // 监控js
    jsLog.getInstance().recordJavaScriptError(); // 资源监控

    rescourceLog.getInstance().recordResourceError(); // http 请求监控

    httpLog.getInstance().recordHttpError(); // 页面监控

    pageLog.getInstance().pagePerformance(); // pv uv监控
    // mv 半自动化埋点（支持热区埋点）
  }
  /**
   * 启动发送 pv
   * @return {?}
   */


  content() {}

}

export default Monitor;
//# sourceMappingURL=index.js.map
