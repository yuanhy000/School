(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!********************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-qq/dist/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance");}function _iterableToArrayLimit(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance");}function _iterableToArray(iter) {if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;}}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

var CALLBACK_API_RE = /^on/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name);
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name);
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name);
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
      /* eslint-disable no-extend-native */
      if (!Promise.prototype.finally) {
        Promise.prototype.finally = function (callback) {
          var promise = this.constructor;
          return this.then(
          function (value) {return promise.resolve(callback()).then(function () {return value;});},
          function (reason) {return promise.resolve(callback()).then(function () {
              throw reason;
            });});

        };
      }
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };




var baseApi = /*#__PURE__*/Object.freeze({
  upx2px: upx2px,
  interceptors: interceptors,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var protocols = {
  previewImage: previewImage };

var todos = [
'createLivePlayerContext',
'createLivePusherContext',
'loadFontFace',
'onMemoryWarning',
'onNetworkStatusChange',
'startBeaconDiscovery',
'stopBeaconDiscovery',
'getBeacons',
'onBeaconUpdate',
'onBeaconServiceChange',
'addPhoneContact',
'getHCEState',
'startHCE',
'stopHCE',
'onHCEMessage',
'sendHCEMessage',
'startWifi',
'stopWifi',
'connectWifi',
'getWifiList',
'onGetWifiList',
'setWifiList',
'onWifiConnected',
'getConnectedWifi',
'setNavigationBarColor',
'setTopBarText',
'getExtConfig',
'getExtConfigSync',
'getPhoneNumber',
'chooseAddress',
'addCard',
'openCard',
'getWeRunData',
'launchApp',
'chooseInvoiceTitle',
'checkIsSupportSoterAuthentication',
'startSoterAuthentication',
'checkIsSoterEnrolledInDevice',
'reportMonitor',
'getLogManager',
'reportAnalytics',
'vibrate'];

var canIUses = [
'scanCode',
'startAccelerometer',
'stopAccelerometer',
'onAccelerometerChange',
'startCompass',
'onCompassChange',
'setScreenBrightness',
'getScreenBrightness',
'setKeepScreenOn',
'onUserCaptureScreen',
'vibrateLong',
'vibrateShort',
'createWorker',
'connectSocket',
'onSocketOpen',
'onSocketError',
'sendSocketMessage',
'onSocketMessage',
'closeSocket',
'onSocketClose',
'openDocument',
'updateShareMenu',
'getShareInfo'];


var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("QQ\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("QQ\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['qq'],
  share: ['qq'],
  payment: ['qqpay'],
  push: ['qq'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });




var api = /*#__PURE__*/Object.freeze({});



var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-qq","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions['behaviors'];
  var vueExtends = vueOptions['extends'];
  var vueMixins = vueOptions['mixins'];

  var vueProps = vueOptions['props'];

  if (!vueProps) {
    vueOptions['props'] = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps['name'] = {
            type: String,
            default: '' };

          vueProps['value'] = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts['default'];
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-qq";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属
  var parentVm = $children.find(function (childVm) {return childVm.$scope._$vueId === vuePid;});
  if (parentVm) {
    return parentVm;
  }
  // 反向递归查找
  for (var i = $children.length - 1; i >= 0; i--) {
    parentVm = findVmByVueId($children[i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function parseApp$1(vm) {
  return parseApp(vm);
}

function createApp(vm) {
  App(parseApp$1(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var componentOptions = {
    options: {
      multipleSlots: true,
      addGlobalClass: true },

    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };



  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function parseComponent$1(vueComponentOptions) {
  return parseComponent(vueComponentOptions);
}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent$1(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function parsePage$1(vuePageOptions) {
  return parsePage(vuePageOptions);
}

function createPage(vuePageOptions) {
  {
    return Component(parsePage$1(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent$1(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-qq" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),
/* 2 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.10
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Techinically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a speical value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack becaues all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    vm.mpHost !== 'mp-toutiao' && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    vm.mpHost !== 'mp-toutiao' && initProvide(vm); // resolve provide after data/props
    vm.mpHost !== 'mp-toutiao' && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.10';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-qq","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-qq","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-qq","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-qq","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  vm.mpHost !== 'mp-toutiao' && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err) {
    console.error(err);
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope) {
        return this.$scope[method](args)
      }
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 3 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/*!*********************************************!*\
  !*** /Users/yuanhy/Desktop/Chat/pages.json ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),
/* 5 */
/*!*******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/dist/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {var _package = __webpack_require__(/*! ../package.json */ 6);function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}

var STAT_VERSION = _package.version;
var STAT_URL = 'https://tongji.dcloud.io/uni/stat';
var STAT_H5_URL = 'https://tongji.dcloud.io/uni/stat.gif';
var PAGE_PVER_TIME = 1800;
var APP_PVER_TIME = 300;
var OPERATING_TIME = 10;

var UUID_KEY = '__DC_STAT_UUID';
var UUID_VALUE = '__DC_UUID_VALUE';

function getUuid() {
  var uuid = '';
  if (getPlatformName() === 'n') {
    try {
      uuid = plus.runtime.getDCloudId();
    } catch (e) {
      uuid = '';
    }
    return uuid;
  }

  try {
    uuid = uni.getStorageSync(UUID_KEY);
  } catch (e) {
    uuid = UUID_VALUE;
  }

  if (!uuid) {
    uuid = Date.now() + '' + Math.floor(Math.random() * 1e7);
    try {
      uni.setStorageSync(UUID_KEY, uuid);
    } catch (e) {
      uni.setStorageSync(UUID_KEY, UUID_VALUE);
    }
  }
  return uuid;
}

var getSgin = function getSgin(statData) {
  var arr = Object.keys(statData);
  var sortArr = arr.sort();
  var sgin = {};
  var sginStr = '';
  for (var i in sortArr) {
    sgin[sortArr[i]] = statData[sortArr[i]];
    sginStr += sortArr[i] + '=' + statData[sortArr[i]] + '&';
  }
  // const options = sginStr.substr(0, sginStr.length - 1)
  // sginStr = sginStr.substr(0, sginStr.length - 1) + '&key=' + STAT_KEY;
  // const si = crypto.createHash('md5').update(sginStr).digest('hex');
  return {
    sign: '',
    options: sginStr.substr(0, sginStr.length - 1) };

};

var getSplicing = function getSplicing(data) {
  var str = '';
  for (var i in data) {
    str += i + '=' + data[i] + '&';
  }
  return str.substr(0, str.length - 1);
};

var getTime = function getTime() {
  return parseInt(new Date().getTime() / 1000);
};

var getPlatformName = function getPlatformName() {
  var platformList = {
    'app-plus': 'n',
    'h5': 'h5',
    'mp-weixin': 'wx',
    'mp-alipay': 'ali',
    'mp-baidu': 'bd',
    'mp-toutiao': 'tt',
    'mp-qq': 'qq' };

  return platformList["mp-qq"];
};

var getPackName = function getPackName() {
  var packName = '';
  if (getPlatformName() === 'wx' || getPlatformName() === 'qq') {
    // 兼容微信小程序低版本基础库
    if (uni.canIUse('getAccountInfoSync')) {
      packName = uni.getAccountInfoSync().miniProgram.appId || '';
    }
  }
  return packName;
};

var getVersion = function getVersion() {
  return getPlatformName() === 'n' ? plus.runtime.version : '';
};

var getChannel = function getChannel() {
  var platformName = getPlatformName();
  var channel = '';
  if (platformName === 'n') {
    channel = plus.runtime.channel;
  }
  return channel;
};

var getScene = function getScene(options) {
  var platformName = getPlatformName();
  var scene = '';
  if (options) {
    return options;
  }
  if (platformName === 'wx') {
    scene = uni.getLaunchOptionsSync().scene;
  }
  return scene;
};
var First__Visit__Time__KEY = 'First__Visit__Time';
var Last__Visit__Time__KEY = 'Last__Visit__Time';

var getFirstVisitTime = function getFirstVisitTime() {
  var timeStorge = uni.getStorageSync(First__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = getTime();
    uni.setStorageSync(First__Visit__Time__KEY, time);
    uni.removeStorageSync(Last__Visit__Time__KEY);
  }
  return time;
};

var getLastVisitTime = function getLastVisitTime() {
  var timeStorge = uni.getStorageSync(Last__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = '';
  }
  uni.setStorageSync(Last__Visit__Time__KEY, getTime());
  return time;
};


var PAGE_RESIDENCE_TIME = '__page__residence__time';
var First_Page_residence_time = 0;
var Last_Page_residence_time = 0;


var setPageResidenceTime = function setPageResidenceTime() {
  First_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    uni.setStorageSync(PAGE_RESIDENCE_TIME, getTime());
  }
  return First_Page_residence_time;
};

var getPageResidenceTime = function getPageResidenceTime() {
  Last_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    First_Page_residence_time = uni.getStorageSync(PAGE_RESIDENCE_TIME);
  }
  return Last_Page_residence_time - First_Page_residence_time;
};
var TOTAL__VISIT__COUNT = 'Total__Visit__Count';
var getTotalVisitCount = function getTotalVisitCount() {
  var timeStorge = uni.getStorageSync(TOTAL__VISIT__COUNT);
  var count = 1;
  if (timeStorge) {
    count = timeStorge;
    count++;
  }
  uni.setStorageSync(TOTAL__VISIT__COUNT, count);
  return count;
};

var GetEncodeURIComponentOptions = function GetEncodeURIComponentOptions(statData) {
  var data = {};
  for (var prop in statData) {
    data[prop] = encodeURIComponent(statData[prop]);
  }
  return data;
};

var Set__First__Time = 0;
var Set__Last__Time = 0;

var getFirstTime = function getFirstTime() {
  var time = new Date().getTime();
  Set__First__Time = time;
  Set__Last__Time = 0;
  return time;
};


var getLastTime = function getLastTime() {
  var time = new Date().getTime();
  Set__Last__Time = time;
  return time;
};


var getResidenceTime = function getResidenceTime(type) {
  var residenceTime = 0;
  if (Set__First__Time !== 0) {
    residenceTime = Set__Last__Time - Set__First__Time;
  }

  residenceTime = parseInt(residenceTime / 1000);
  residenceTime = residenceTime < 1 ? 1 : residenceTime;
  if (type === 'app') {
    var overtime = residenceTime > APP_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: overtime };

  }
  if (type === 'page') {
    var _overtime = residenceTime > PAGE_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: _overtime };

  }

  return {
    residenceTime: residenceTime };


};

var getRoute = function getRoute() {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;

  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is;
  } else {
    return _self.$scope && _self.$scope.route || _self.$mp && _self.$mp.page.route;
  }
};

var getPageRoute = function getPageRoute(self) {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;
  var query = self._query;
  var str = query && JSON.stringify(query) !== '{}' ? '?' + JSON.stringify(query) : '';
  // clear
  self._query = '';
  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is + str;
  } else {
    return _self.$scope && _self.$scope.route + str || _self.$mp && _self.$mp.page.route + str;
  }
};

var getPageTypes = function getPageTypes(self) {
  if (self.mpType === 'page' || self.$mp && self.$mp.mpType === 'page' || self.$options.mpType === 'page') {
    return true;
  }
  return false;
};

var calibration = function calibration(eventName, options) {
  //  login 、 share 、pay_success 、pay_fail 、register 、title
  if (!eventName) {
    console.error("uni.report \u7F3A\u5C11 [eventName] \u53C2\u6570");
    return true;
  }
  if (typeof eventName !== 'string') {
    console.error("uni.report [eventName] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u7C7B\u578B");
    return true;
  }
  if (eventName.length > 255) {
    console.error("uni.report [eventName] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (typeof options !== 'string' && typeof options !== 'object') {
    console.error("uni.report [options] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u6216 Object \u7C7B\u578B");
    return true;
  }

  if (typeof options === 'string' && options.length > 255) {
    console.error("uni.report [options] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (eventName === 'title' && typeof options !== 'string') {
    console.error('uni.report [eventName] 参数为 title 时，[options] 参数只能为 String 类型');
    return true;
  }
};

var PagesJson = __webpack_require__(/*! uni-pages?{"type":"style"} */ 7).default;
var statConfig = __webpack_require__(/*! uni-stat-config */ 8).default || __webpack_require__(/*! uni-stat-config */ 8);

var resultOptions = uni.getSystemInfoSync();var

Util = /*#__PURE__*/function () {
  function Util() {_classCallCheck(this, Util);
    this.self = '';
    this._retry = 0;
    this._platform = '';
    this._query = {};
    this._navigationBarTitle = {
      config: '',
      page: '',
      report: '',
      lt: '' };

    this._operatingTime = 0;
    this._reportingRequestData = {
      '1': [],
      '11': [] };

    this.__prevent_triggering = false;

    this.__licationHide = false;
    this.__licationShow = false;
    this._lastPageRoute = '';
    this.statData = {
      uuid: getUuid(),
      ut: getPlatformName(),
      mpn: getPackName(),
      ak: statConfig.appid,
      usv: STAT_VERSION,
      v: getVersion(),
      ch: getChannel(),
      cn: '',
      pn: '',
      ct: '',
      t: getTime(),
      tt: '',
      p: resultOptions.platform === 'android' ? 'a' : 'i',
      brand: resultOptions.brand || '',
      md: resultOptions.model,
      sv: resultOptions.system.replace(/(Android|iOS)\s/, ''),
      mpsdk: resultOptions.SDKVersion || '',
      mpv: resultOptions.version || '',
      lang: resultOptions.language,
      pr: resultOptions.pixelRatio,
      ww: resultOptions.windowWidth,
      wh: resultOptions.windowHeight,
      sw: resultOptions.screenWidth,
      sh: resultOptions.screenHeight };


  }_createClass(Util, [{ key: "_applicationShow", value: function _applicationShow()

    {
      if (this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('app');
        if (time.overtime) {
          var options = {
            path: this._lastPageRoute,
            scene: this.statData.sc };

          this._sendReportRequest(options);
        }
        this.__licationHide = false;
      }
    } }, { key: "_applicationHide", value: function _applicationHide(

    self, type) {

      this.__licationHide = true;
      getLastTime();
      var time = getResidenceTime();
      getFirstTime();
      var route = getPageRoute(this);
      this._sendHideRequest({
        urlref: route,
        urlref_ts: time.residenceTime },
      type);
    } }, { key: "_pageShow", value: function _pageShow()

    {
      var route = getPageRoute(this);
      var routepath = getRoute();
      this._navigationBarTitle.config = PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].titleNView &&
      PagesJson.pages[routepath].titleNView.titleText ||
      PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].navigationBarTitleText || '';

      if (this.__licationShow) {
        getFirstTime();
        this.__licationShow = false;
        // console.log('这是 onLauch 之后执行的第一次 pageShow ，为下次记录时间做准备');
        this._lastPageRoute = route;
        return;
      }

      getLastTime();
      this._lastPageRoute = route;
      var time = getResidenceTime('page');
      if (time.overtime) {
        var options = {
          path: this._lastPageRoute,
          scene: this.statData.sc };

        this._sendReportRequest(options);
      }
      getFirstTime();
    } }, { key: "_pageHide", value: function _pageHide()

    {
      if (!this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('page');
        this._sendPageRequest({
          url: this._lastPageRoute,
          urlref: this._lastPageRoute,
          urlref_ts: time.residenceTime });

        this._navigationBarTitle = {
          config: '',
          page: '',
          report: '',
          lt: '' };

        return;
      }
    } }, { key: "_login", value: function _login()

    {
      this._sendEventRequest({
        key: 'login' },
      0);
    } }, { key: "_share", value: function _share()

    {
      this._sendEventRequest({
        key: 'share' },
      0);
    } }, { key: "_payment", value: function _payment(
    key) {
      this._sendEventRequest({
        key: key },
      0);
    } }, { key: "_sendReportRequest", value: function _sendReportRequest(
    options) {

      this._navigationBarTitle.lt = '1';
      var query = options.query && JSON.stringify(options.query) !== '{}' ? '?' + JSON.stringify(options.query) : '';
      this.statData.lt = '1';
      this.statData.url = options.path + query || '';
      this.statData.t = getTime();
      this.statData.sc = getScene(options.scene);
      this.statData.fvts = getFirstVisitTime();
      this.statData.lvts = getLastVisitTime();
      this.statData.tvc = getTotalVisitCount();
      if (getPlatformName() === 'n') {
        this.getProperty();
      } else {
        this.getNetworkInfo();
      }
    } }, { key: "_sendPageRequest", value: function _sendPageRequest(

    opt) {var

      url =


      opt.url,urlref = opt.urlref,urlref_ts = opt.urlref_ts;
      this._navigationBarTitle.lt = '11';
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '11',
        ut: this.statData.ut,
        url: url,
        tt: this.statData.tt,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "_sendHideRequest", value: function _sendHideRequest(

    opt, type) {var

      urlref =

      opt.urlref,urlref_ts = opt.urlref_ts;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '3',
        ut: this.statData.ut,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options, type);
    } }, { key: "_sendEventRequest", value: function _sendEventRequest()



    {var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref$key = _ref.key,key = _ref$key === void 0 ? '' : _ref$key,_ref$value = _ref.value,value = _ref$value === void 0 ? "" : _ref$value;
      var route = this._lastPageRoute;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '21',
        ut: this.statData.ut,
        url: route,
        ch: this.statData.ch,
        e_n: key,
        e_v: typeof value === 'object' ? JSON.stringify(value) : value.toString(),
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "getNetworkInfo", value: function getNetworkInfo()

    {var _this = this;
      uni.getNetworkType({
        success: function success(result) {
          _this.statData.net = result.networkType;
          _this.getLocation();
        } });

    } }, { key: "getProperty", value: function getProperty()

    {var _this2 = this;
      plus.runtime.getProperty(plus.runtime.appid, function (wgtinfo) {
        _this2.statData.v = wgtinfo.version || '';
        _this2.getNetworkInfo();
      });
    } }, { key: "getLocation", value: function getLocation()

    {var _this3 = this;
      if (statConfig.getLocation) {
        uni.getLocation({
          type: 'wgs84',
          geocode: true,
          success: function success(result) {
            if (result.address) {
              _this3.statData.cn = result.address.country;
              _this3.statData.pn = result.address.province;
              _this3.statData.ct = result.address.city;
            }

            _this3.statData.lat = result.latitude;
            _this3.statData.lng = result.longitude;
            _this3.request(_this3.statData);
          } });

      } else {
        this.statData.lat = 0;
        this.statData.lng = 0;
        this.request(this.statData);
      }
    } }, { key: "request", value: function request(

    data, type) {var _this4 = this;
      var time = getTime();
      var title = this._navigationBarTitle;
      data.ttn = title.page;
      data.ttpj = title.config;
      data.ttc = title.report;

      var requestData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        requestData = uni.getStorageSync('__UNI__STAT__DATA') || {};
      }
      if (!requestData[data.lt]) {
        requestData[data.lt] = [];
      }
      requestData[data.lt].push(data);

      if (getPlatformName() === 'n') {
        uni.setStorageSync('__UNI__STAT__DATA', requestData);
      }
      if (getPageResidenceTime() < OPERATING_TIME && !type) {
        return;
      }
      var uniStatData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        uniStatData = uni.getStorageSync('__UNI__STAT__DATA');
      }
      // 时间超过，重新获取时间戳
      setPageResidenceTime();
      var firstArr = [];
      var contentArr = [];
      var lastArr = [];var _loop = function _loop(

      i) {
        var rd = uniStatData[i];
        rd.forEach(function (elm) {
          var newData = getSplicing(elm);
          if (i === 0) {
            firstArr.push(newData);
          } else if (i === 3) {
            lastArr.push(newData);
          } else {
            contentArr.push(newData);
          }
        });};for (var i in uniStatData) {_loop(i);
      }

      firstArr.push.apply(firstArr, contentArr.concat(lastArr));
      var optionsData = {
        usv: STAT_VERSION, //统计 SDK 版本号
        t: time, //发送请求时的时间戮
        requests: JSON.stringify(firstArr) };


      this._reportingRequestData = {};
      if (getPlatformName() === 'n') {
        uni.removeStorageSync('__UNI__STAT__DATA');
      }

      if (data.ut === 'h5') {
        this.imageRequest(optionsData);
        return;
      }

      if (getPlatformName() === 'n' && this.statData.p === 'a') {
        setTimeout(function () {
          _this4._sendRequest(optionsData);
        }, 200);
        return;
      }
      this._sendRequest(optionsData);
    } }, { key: "_sendRequest", value: function _sendRequest(
    optionsData) {var _this5 = this;
      uni.request({
        url: STAT_URL,
        method: 'POST',
        // header: {
        //   'content-type': 'application/json' // 默认值
        // },
        data: optionsData,
        success: function success() {
          // if (process.env.NODE_ENV === 'development') {
          //   console.log('stat request success');
          // }
        },
        fail: function fail(e) {
          if (++_this5._retry < 3) {
            setTimeout(function () {
              _this5._sendRequest(optionsData);
            }, 1000);
          }
        } });

    }
    /**
       * h5 请求
       */ }, { key: "imageRequest", value: function imageRequest(
    data) {
      var image = new Image();
      var options = getSgin(GetEncodeURIComponentOptions(data)).options;
      image.src = STAT_H5_URL + '?' + options;
    } }, { key: "sendEvent", value: function sendEvent(

    key, value) {
      // 校验 type 参数
      if (calibration(key, value)) return;

      if (key === 'title') {
        this._navigationBarTitle.report = value;
        return;
      }
      this._sendEventRequest({
        key: key,
        value: typeof value === 'object' ? JSON.stringify(value) : value },
      1);
    } }]);return Util;}();var



Stat = /*#__PURE__*/function (_Util) {_inherits(Stat, _Util);_createClass(Stat, null, [{ key: "getInstance", value: function getInstance()
    {
      if (!this.instance) {
        this.instance = new Stat();
      }
      return this.instance;
    } }]);
  function Stat() {var _this6;_classCallCheck(this, Stat);
    _this6 = _possibleConstructorReturn(this, _getPrototypeOf(Stat).call(this));
    _this6.instance = null;
    // 注册拦截器
    if (typeof uni.addInterceptor === 'function' && "development" !== 'development') {
      _this6.addInterceptorInit();
      _this6.interceptLogin();
      _this6.interceptShare(true);
      _this6.interceptRequestPayment();
    }return _this6;
  }_createClass(Stat, [{ key: "addInterceptorInit", value: function addInterceptorInit()

    {
      var self = this;
      uni.addInterceptor('setNavigationBarTitle', {
        invoke: function invoke(args) {
          self._navigationBarTitle.page = args.title;
        } });

    } }, { key: "interceptLogin", value: function interceptLogin()

    {
      var self = this;
      uni.addInterceptor('login', {
        complete: function complete() {
          self._login();
        } });

    } }, { key: "interceptShare", value: function interceptShare(

    type) {
      var self = this;
      if (!type) {
        self._share();
        return;
      }
      uni.addInterceptor('share', {
        success: function success() {
          self._share();
        },
        fail: function fail() {
          self._share();
        } });

    } }, { key: "interceptRequestPayment", value: function interceptRequestPayment()

    {
      var self = this;
      uni.addInterceptor('requestPayment', {
        success: function success() {
          self._payment('pay_success');
        },
        fail: function fail() {
          self._payment('pay_fail');
        } });

    } }, { key: "report", value: function report(

    options, self) {
      this.self = self;
      // if (process.env.NODE_ENV === 'development') {
      //   console.log('report init');
      // }
      setPageResidenceTime();
      this.__licationShow = true;
      this._sendReportRequest(options, true);
    } }, { key: "load", value: function load(

    options, self) {
      if (!self.$scope && !self.$mp) {
        var page = getCurrentPages();
        self.$scope = page[page.length - 1];
      }
      this.self = self;
      this._query = options;
    } }, { key: "show", value: function show(

    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageShow(self);
      } else {
        this._applicationShow(self);
      }
    } }, { key: "ready", value: function ready(

    self) {
      // this.self = self;
      // if (getPageTypes(self)) {
      //   this._pageShow(self);
      // }
    } }, { key: "hide", value: function hide(
    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageHide(self);
      } else {
        this._applicationHide(self, true);
      }
    } }, { key: "error", value: function error(
    em) {
      if (this._platform === 'devtools') {
        if (true) {
          console.info('当前运行环境为开发者工具，不上报数据。');
        }
        // return;
      }
      var emVal = '';
      if (!em.message) {
        emVal = JSON.stringify(em);
      } else {
        emVal = em.stack;
      }
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '31',
        ut: this.statData.ut,
        ch: this.statData.ch,
        mpsdk: this.statData.mpsdk,
        mpv: this.statData.mpv,
        v: this.statData.v,
        em: emVal,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }]);return Stat;}(Util);


var stat = Stat.getInstance();
var isHide = false;
var lifecycle = {
  onLaunch: function onLaunch(options) {
    stat.report(options, this);
  },
  onReady: function onReady() {
    stat.ready(this);
  },
  onLoad: function onLoad(options) {
    stat.load(options, this);
    // 重写分享，获取分享上报事件
    if (this.$scope && this.$scope.onShareAppMessage) {
      var oldShareAppMessage = this.$scope.onShareAppMessage;
      this.$scope.onShareAppMessage = function (options) {
        stat.interceptShare(false);
        return oldShareAppMessage.call(this, options);
      };
    }
  },
  onShow: function onShow() {
    isHide = false;
    stat.show(this);
  },
  onHide: function onHide() {
    isHide = true;
    stat.hide(this);
  },
  onUnload: function onUnload() {
    if (isHide) {
      isHide = false;
      return;
    }
    stat.hide(this);
  },
  onError: function onError(e) {
    stat.error(e);
  } };


function main() {
  if (true) {
    uni.report = function (type, options) {};
  } else { var Vue; }
}

main();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-qq/dist/index.js */ 1)["default"]))

/***/ }),
/* 6 */
/*!******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/package.json ***!
  \******************************************************/
/*! exports provided: _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _shasum, _spec, _where, author, bugs, bundleDependencies, deprecated, description, devDependencies, files, gitHead, homepage, license, main, name, repository, scripts, version, default */
/***/ (function(module) {

module.exports = {"_from":"@dcloudio/uni-stat@next","_id":"@dcloudio/uni-stat@2.0.0-23620191019001","_inBundle":false,"_integrity":"sha512-gBpkjEOQ/LhTnXBVi266PoTNT5VJtbYoEVy+gZ8/LN9/jKEWeWndd2Lu7vn7hmUySVM5K5UV/Bd5LEVkgXB8mA==","_location":"/@dcloudio/uni-stat","_phantomChildren":{},"_requested":{"type":"tag","registry":true,"raw":"@dcloudio/uni-stat@next","name":"@dcloudio/uni-stat","escapedName":"@dcloudio%2funi-stat","scope":"@dcloudio","rawSpec":"next","saveSpec":null,"fetchSpec":"next"},"_requiredBy":["#USER","/","/@dcloudio/vue-cli-plugin-uni"],"_resolved":"https://registry.npmjs.org/@dcloudio/uni-stat/-/uni-stat-2.0.0-23620191019001.tgz","_shasum":"5c006b903ae7bc407c8b1786de249ffbf72da996","_spec":"@dcloudio/uni-stat@next","_where":"/Users/fxy/Documents/DCloud/HbuilderX-plugins/release/uniapp-cli","author":"","bugs":{"url":"https://github.com/dcloudio/uni-app/issues"},"bundleDependencies":false,"deprecated":false,"description":"","devDependencies":{"@babel/core":"^7.5.5","@babel/preset-env":"^7.5.5","eslint":"^6.1.0","rollup":"^1.19.3","rollup-plugin-babel":"^4.3.3","rollup-plugin-clear":"^2.0.7","rollup-plugin-commonjs":"^10.0.2","rollup-plugin-copy":"^3.1.0","rollup-plugin-eslint":"^7.0.0","rollup-plugin-json":"^4.0.0","rollup-plugin-node-resolve":"^5.2.0","rollup-plugin-replace":"^2.2.0","rollup-plugin-uglify":"^6.0.2"},"files":["dist","package.json","LICENSE"],"gitHead":"bc995d4b43b68e7fe7914ae6b2112117d36e63a8","homepage":"https://github.com/dcloudio/uni-app#readme","license":"Apache-2.0","main":"dist/index.js","name":"@dcloudio/uni-stat","repository":{"type":"git","url":"git+https://github.com/dcloudio/uni-app.git","directory":"packages/uni-stat"},"scripts":{"build":"NODE_ENV=production rollup -c rollup.config.js","dev":"NODE_ENV=development rollup -w -c rollup.config.js"},"version":"2.0.0-23620191019001"};

/***/ }),
/* 7 */
/*!**************************************************************!*\
  !*** /Users/yuanhy/Desktop/Chat/pages.json?{"type":"style"} ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "pages": { "pages/index/index": { "navigationBarTitleText": "uni-app" }, "pages/information/information": { "navigationBarTitleText": "uni-app" }, "pages/store/store": { "navigationBarTitleText": "uni-app" }, "pages/discovery/discovery": { "navigationBarTitleText": "uni-app" }, "pages/location/location": { "navigationBarTitleText": "uni-app" }, "pages/addition/addition": { "navigationBarTitleText": "uni-app" }, "pages/addition-article/addition-article": { "navigationBarTitleText": "uni-app" }, "pages/addition-activity/addition-activity": { "navigationBarTitleText": "uni-app" }, "pages/addition-commodity/addition-commodity": { "navigationBarTitleText": "uni-app" }, "pages/search/search": { "navigationBarTitleText": "uni-app" }, "pages/search-commodity/search-commodity": { "navigationBarTitleText": "uni-app" }, "pages/commodity/commodity": { "navigationBarTitleText": "uni-app" }, "pages/choose-index/choose-index": { "navigationBarTitleText": "uni-app" }, "pages/apply-organization/apply-organization": { "navigationBarTitleText": "uni-app" }, "pages/article/article": { "navigationBarTitleText": "uni-app" }, "pages/activity/activity": { "navigationBarTitleText": "uni-app" }, "pages/activity-register/activity-register": { "navigationBarTitleText": "uni-app" }, "pages/addition-recruit/addition-recruit": { "navigationBarTitleText": "uni-app" } }, "globalStyle": { "navigationBarTextStyle": "white", "navigationBarTitleText": "uni-app", "navigationBarBackgroundColor": "#F8F8F8", "backgroundColor": "#F8F8F8", "navigationStyle": "custom" } };exports.default = _default;

/***/ }),
/* 8 */
/*!*************************************************************!*\
  !*** /Users/yuanhy/Desktop/Chat/pages.json?{"type":"stat"} ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "appid": "__UNI__3BC25EC" };exports.default = _default;

/***/ }),
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/*!***********************************************!*\
  !*** /Users/yuanhy/Desktop/Chat/utils/jwt.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  setToken: function setToken(token) {
    uni.setStorageSync('jwt_token', token);
  },

  getToken: function getToken() {
    return uni.getStorageSync('jwt_token');
  },

  setRefreshToken: function setRefreshToken(refresh_token) {
    uni.setStorageSync('refresh_token', refresh_token);
  },

  getRefreshToken: function getRefreshToken() {
    return uni.getStorageSync('refresh_token');
  },

  removeToken: function removeToken() {
    uni.removeStorageSync('jwt_token');
    uni.removeStorageSync('refresh_token');
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-qq/dist/index.js */ 1)["default"]))

/***/ }),
/* 13 */,
/* 14 */,
/* 15 */
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 16 */
/*!****************************************************************!*\
  !*** /Users/yuanhy/Desktop/Chat/js_sdk/pocky-request/index.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;










var _index = _interopRequireDefault(__webpack_require__(/*! ./core/index */ 17));
var _tools = _interopRequireDefault(__webpack_require__(/*! ./tools */ 20));
var _config = __webpack_require__(/*! ./config */ 22);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /*
                                                                                                                                 * @Description: uniapp request请求库 v2.0.3.4
                                                                                                                                 * @Author: pocky
                                                                                                                                 * @Email 2460392754@qq.com
                                                                                                                                 * @Date: 2019-05-31 19:18:48
                                                                                                                                 * @LastEditTime: 2019-10-17 16:07:57
                                                                                                                                 * @instruction: https://www.yuque.com/pocky/aaeyux/pdik23
                                                                                                                                 * @github: https://github.com/2460392754/uniapp-tools/tree/master/request
                                                                                                                                 * @dcloud: https://ext.dcloud.net.cn/plugin?id=468
                                                                                                                                 */function createInstance(defaultConfig) {var ctx = new _index.default(defaultConfig);var instance;instance = _index.default.prototype.request.bind(ctx);instance = _tools.default.extend(instance, _index.default.prototype, ctx);instance = _tools.default.extend(instance, ctx);
  return instance;
}

function create() {
  return createInstance(_config.config);
}var _default =

create;exports.default = _default;

/***/ }),
/* 17 */
/*!*********************************************************************!*\
  !*** /Users/yuanhy/Desktop/Chat/js_sdk/pocky-request/core/index.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _interceptor = _interopRequireDefault(__webpack_require__(/*! ./interceptor */ 18));
var _mergeConfig = _interopRequireDefault(__webpack_require__(/*! ./mergeConfig */ 19));
var _tools = _interopRequireDefault(__webpack_require__(/*! ../tools */ 20));
var Network = _interopRequireWildcard(__webpack_require__(/*! ./network */ 21));
var _config = __webpack_require__(/*! ../config */ 22);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};if (desc.get || desc.set) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance");}function _iterableToArrayLimit(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}

function MyRequest(defaultConfig) {
  this.defaultConfig = defaultConfig;
  this.interceptors = {
    scoped: {
      request: new _interceptor.default(),
      response: new _interceptor.default() },

    global: _config.globalInterceptor };

}

/**
   * 通用请求
   * 支持请求格式 `request('example/url'[, config])`
   * @param {Object} config [{}] 配置信息
   */
MyRequest.prototype.request = function () {var _this = this;var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  }

  // 设置默认 config.method
  if (!config.method && !this.defaultConfig.method) {
    config.method = 'get';
  }

  var newConfig = (0, _mergeConfig.default)(this.defaultConfig, config);
  var method = config.method.toLowerCase();
  var networkType = ['upload', 'download'].includes(method) ? method : 'xhr';

  var chain = [];
  var promise = Promise.resolve(newConfig);

  this.interceptors.global.request.forEach(function (interceptor) {
    chain.push({ then: interceptor.fulfilled }, { catch: interceptor.rejected });
  });

  this.interceptors.scoped.request.forEach(function (interceptor) {
    chain.push({ then: interceptor.fulfilled }, { catch: interceptor.rejected });
  });

  chain.push({ then: Network[networkType] });

  this.interceptors.global.response.forEach(function (interceptor) {
    chain.push({ then: interceptor.fulfilled }, { catch: interceptor.rejected });
  });

  this.interceptors.scoped.response.forEach(function (interceptor) {
    chain.push({ then: interceptor.fulfilled }, { catch: interceptor.rejected });
  });

  /**
       * 链式合并
       * 合并顺序格式
       * 
       * ``` javascript
       * Promise.resolve()
       * .then(global_Request)
       * .catch(global_Request)
       * .then(scoped_Request)
       * .catch(scoped_Request)
       * .then(发送请求)
       * .catch(请求错误、超时)
       * .then(global_Response)
       * .catch(global_Response)
       * .then(scoped_Response)
       * .catch(scoped_Response)
       * .then(获取请求的返回值)
       * .catch(拦截异常的返回值)
       * ```
       */
  chain.forEach(function (item) {var _Object$entries =
    Object.entries(item),_Object$entries2 = _slicedToArray(_Object$entries, 1),_Object$entries2$ = _slicedToArray(_Object$entries2[0], 2),type = _Object$entries2$[0],fn = _Object$entries2$[1];

    if (typeof fn !== 'function') {
      return true;
    }

    promise = promise[type](function (obj) {
      var interceptorConfig = (0, _mergeConfig.default)(_this.defaultConfig, config);

      var ret = fn(obj, interceptorConfig);

      // return false 就会跳出promise的链式函数
      if (ret === false) {
        return _tools.default.breakPromise();
      }

      // return config(Object类型) 或 return Promise.reject('xx') 才会继续发送请求或回传数据
      if (_tools.default.isType('Object', ret) || _tools.default.isType('Promise', ret)) {
        return ret;
      }
    });
  });

  return promise;
};

// 在 MyRequest 的原型上添加其他方法
var arr1 = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'upload', 'download'].forEach(function (method) {
  MyRequest.prototype[method] = function (url) {var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var newConfig = _tools.default.deepCopy(config, {
      url: url,
      method: method });


    return this.request(newConfig);
  };
});

// 中断 发送中的请求
MyRequest.prototype.abort = function (instance) {
  try {
    instance.example.abort();
  } catch (e) {}
};var _default =

MyRequest;exports.default = _default;

/***/ }),
/* 18 */
/*!***************************************************************************!*\
  !*** /Users/yuanhy/Desktop/Chat/js_sdk/pocky-request/core/interceptor.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} // 拦截器
var Interceptor = /*#__PURE__*/function () {
  function Interceptor() {_classCallCheck(this, Interceptor);
    this.handlers = [];
  }

  /**
     * 添加 拦截器
     * @param {Function} fulfilled Promise.resolve里运行的函数
     * @param {Function} rejected  Promise.reject里运行的函数
     * @return {Number} 拦截器队列中注册的下标id
     */_createClass(Interceptor, [{ key: "use", value: function use(
    fulfilled, rejected) {
      this.handlers.push({
        fulfilled: fulfilled,
        rejected: rejected });


      return this.handlers.length - 1;
    }

    /**
       * 注销 拦截器
       * @param {Number} id 在拦截器队列中的下标id
       */ }, { key: "eject", value: function eject(
    id) {
      this.handlers[id] && (this.handlers[id] = null);
    }

    /**
       * 遍历所有的拦截器
       * @param {Function} fn 
       */ }, { key: "forEach", value: function forEach(
    fn) {
      this.handlers.forEach(function (item) {
        item && fn(item);
      });
    } }]);return Interceptor;}();var _default =


Interceptor;exports.default = _default;

/***/ }),
/* 19 */
/*!***************************************************************************!*\
  !*** /Users/yuanhy/Desktop/Chat/js_sdk/pocky-request/core/mergeConfig.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _tools = _interopRequireDefault(__webpack_require__(/*! ../tools */ 20));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance");}function _iterableToArray(iter) {if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;}}

function mergeConfig(defaultConfig) {var instanceConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var CONFIG_KEY_LIST = ['url', 'method', 'data', 'dataType', 'responseType', 'params', 'isProxy'];
  var CONFIG_MERGE_DEEP_KEY_LIST = ['header'];
  var CONFIG_OPTIONAL_KEY_LIST = ['baseURL'];
  var CONFIG_ALL_KEY_LIST = [].concat(CONFIG_KEY_LIST, CONFIG_MERGE_DEEP_KEY_LIST, CONFIG_OPTIONAL_KEY_LIST);
  var ARGS_ALL_KEY_LIST = _toConsumableArray(new Set([].concat(_toConsumableArray(Object.keys(instanceConfig)), _toConsumableArray(Object.keys(defaultConfig)))));
  var REMAINDER_KEY_LIST = ARGS_ALL_KEY_LIST.filter(function (key) {return !CONFIG_ALL_KEY_LIST.includes(key);});
  var newConfig = {};

  // 必要参数
  CONFIG_KEY_LIST.forEach(function (prop) {
    var val = instanceConfig[prop] || defaultConfig[prop];

    !_tools.default.isType('Undefined', val) && (newConfig[prop] = val);
  });

  // 必要深拷贝参数
  CONFIG_MERGE_DEEP_KEY_LIST.forEach(function (prop) {
    var defaultVal = defaultConfig[prop];
    var instanceVal = instanceConfig[prop];

    if (_tools.default.isType('Object', instanceVal)) {
      newConfig[prop] = _tools.default.deepCopy(defaultVal, instanceVal);
    } else if (_tools.default.isType('Object', defaultVal)) {
      newConfig[prop] = _tools.default.deepCopy(defaultVal);
    }
  });

  // 配置文件中可选参数
  CONFIG_OPTIONAL_KEY_LIST.forEach(function (prop) {
    var val = defaultConfig[prop];

    if (!_tools.default.isType('Undefined', val)) {
      newConfig[prop] = defaultConfig[prop];
    }
  });

  // 合并未出现在上述列表中的参数
  REMAINDER_KEY_LIST.forEach(function (prop) {
    var defaultVal = defaultConfig[prop];
    var instanceVal = instanceConfig[prop];

    if (!_tools.default.isType('Undefined', instanceVal)) {
      newConfig[prop] = instanceVal;
    } else if (!_tools.default.isType('Undefined', defaultVal)) {
      newConfig[prop] = defaultVal;
    }
  });

  newConfig.instanceURL = instanceConfig.url;
  newConfig.url = _tools.default.getFullURL(newConfig.baseURL, newConfig.url);
  newConfig.url = _tools.default.paramsToURL(newConfig);
  newConfig.header = _tools.default.adapterContentType(defaultConfig.header, instanceConfig.header, newConfig.header);

  if (newConfig.method.toLowerCase() == 'upload') {
    delete newConfig.header['content-type'];
  }

  return newConfig;
}var _default =

mergeConfig;exports.default = _default;

/***/ }),
/* 20 */
/*!****************************************************************!*\
  !*** /Users/yuanhy/Desktop/Chat/js_sdk/pocky-request/tools.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance");}function _iterableToArrayLimit(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}var $ = {};

/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       * 类型判断
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       * @param {String} type 值的类型
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       * @param {Any} val 需要判断的值
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       * @return {Boolean} 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       */
$.isType = function (type, val) {
  return Object.prototype.toString.call(val) === "[object ".concat(type, "]");
};

/**
    * 简单对象的深拷贝
    * @param {Array<Any>} args 参数列表
    * @return {Object<Any>}
    */
$.deepCopy = function () {
  var res = {};for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}

  args.forEach(function (arg) {
    for (var key in arg) {
      res = assginValue(key, arg[key], res, $.deepCopy);
    }
  });

  return res;
};

var assginValue = function assginValue(key, val, container, callback) {
  var cTypeIsObj = $.isType('Object', container[key]);
  var vTypeIsObj = $.isType('Object', val);

  if (cTypeIsObj && vTypeIsObj) {
    container[key] = callback(container[key], val);
  } else if (vTypeIsObj) {
    container[key] = callback({}, val);
  } else {
    container[key] = val;
  }

  return container;
};

/**
    * 扩展对象的属性或方法
    * @param {Object} a 需要扩展的对象
    * @param {Object} b 被拷贝对象
    * @param {Object} args 扩展函数继承的对象
    * @return {Object}
    */
$.extend = function (a, b, args) {
  for (var key in b) {
    var val = b[key];

    if (args && $.isType('Function', val)) {
      a[key] = val.bind(args);
    } else {
      a[key] = val;
    }
  }

  return a;
};

/**
    * 获取完整的URL
    * @param {String|Undefined} baseURL 基地址
    * @param {String} requestURL 相对地址
    * @return {String}
    */
$.getFullURL = function (baseURL, requestURL) {
  if (baseURL && !isAbsoluteURL(requestURL)) {
    return composeURL(baseURL, requestURL);
  }

  return requestURL;
};

/**
    * 组合成绝对地址的 URL (基地址+相对地址)
    * @param {String} baseURL 基地址
    * @param {String} relativeURL 相对地址
    * @return {String}
    */
var composeURL = function composeURL(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
};

/**
    * 判断是否是绝对地址 (有 `://`或 `//` 就算是绝对地址)
    * @param {String} url
    * @return {Boolean}
    */
var isAbsoluteURL = function isAbsoluteURL(url) {
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

/**
    * url添加params参数
    * @param {Object} o config
    * @param {Object} o.url
    * @param {Object} o.method
    * @param {Object} o.data
    * @param {Object} o.params
    * @return {String}
    */
$.paramsToURL = function (_ref) {var url = _ref.url,method = _ref.method,data = _ref.data,params = _ref.params;
  var newParams = params;
  var newURL = url + (!~url.indexOf('?') ? '?' : '&');

  if (method.toLowerCase() === 'get') {
    newParams = data || params;
  }var _arr =

  Object.entries(newParams || {});for (var _i = 0; _i < _arr.length; _i++) {var _arr$_i = _slicedToArray(_arr[_i], 2),key = _arr$_i[0],val = _arr$_i[1];
    newURL += "".concat(key, "=").concat(val, "&");
  }

  return newURL.substring(0, newURL.length - 1);
};

/**
    * `content-type` 适配器
    * @param {Object} defaultHeader [{}]
    * @param {Object} instanceHeader [{}]
    * @param {Object} configHeader
    * @return {Object}
    */
$.adapterContentType = function () {var defaultHeader = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var instanceHeader = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var configHeader = arguments.length > 2 ? arguments[2] : undefined;
  var LIST = ['content-type', 'Content-type', 'Content-Type', 'contentType', 'ContentType'];
  var newConfigHeader = $.deepCopy(configHeader);
  var val;var _arr2 =

  Object.keys(defaultHeader);for (var _i2 = 0; _i2 < _arr2.length; _i2++) {var KEY = _arr2[_i2];
    if (LIST.includes(KEY)) {
      val = defaultHeader[KEY];
      delete newConfigHeader[KEY];
      break;
    }
  }var _arr3 =

  Object.keys(instanceHeader);for (var _i3 = 0; _i3 < _arr3.length; _i3++) {var _KEY = _arr3[_i3];
    if (LIST.includes(_KEY)) {
      val = instanceHeader[_KEY];
      delete newConfigHeader[_KEY];
      break;
    }
  }

  val && (newConfigHeader['content-type'] = val);

  return newConfigHeader;
};

// 停止promise的链式操作
$.breakPromise = function () {
  return new Promise(function () {});
};

// 转换为 JSON 格式
$.toJSON = function (anyVal) {
  try {
    return JSON.parse(anyVal);
  } catch (e) {
    return anyVal;
  }
};

// 删除 url 上的参数
// $.delURLQueryString = function (url) {
//     return url.replace(/\?[\S|\s]+/, '');
// }
var _default =
$;exports.default = _default;

/***/ }),
/* 21 */
/*!***********************************************************************!*\
  !*** /Users/yuanhy/Desktop/Chat/js_sdk/pocky-request/core/network.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.download = exports.upload = exports.xhr = void 0;var _tools = _interopRequireDefault(__webpack_require__(/*! ../tools */ 20));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};var ownKeys = Object.keys(source);if (typeof Object.getOwnPropertySymbols === 'function') {ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {return Object.getOwnPropertyDescriptor(source, sym).enumerable;}));}ownKeys.forEach(function (key) {_defineProperty(target, key, source[key]);});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

// 普通请求
var xhr = function xhr(config) {
  var promise, instance;

  promise = new Promise(function (resolve, reject) {
    instance = uni.request(_objectSpread({},
    config, {
      success: resolve,
      fail: reject }));

  });

  promise.__proto__.example = instance;

  return promise;
};

// 上传
exports.xhr = xhr;var upload = function upload(config) {
  var taskList = ['onProgressUpdate', 'onHeadersReceived', 'offProgressUpdate', 'offHeadersReceived'];
  var promise, instance;

  promise = new Promise(function (resolve, reject) {
    instance = uni.uploadFile(_objectSpread({},
    config, {
      success: function success(res) {
        res.data = _tools.default.toJSON(res.data);

        resolve(res);
      },
      fail: reject }));


    taskList.forEach(function (task) {
      var fn = config[task];

      typeof fn === 'function' && instance[task](fn);
    });
  });

  promise.__proto__.example = instance;

  return promise;
};

// 下载
exports.upload = upload;var download = function download(config) {
  var taskList = ['onProgressUpdate', 'onHeadersReceived', 'offProgressUpdate', 'offHeadersReceived'];
  var promise, instance;

  promise = new Promise(function (resolve, reject) {
    instance = uni.downloadFile(_objectSpread({},
    config, {
      success: resolve,
      fail: reject }));


    taskList.forEach(function (task) {
      var fn = config[task];

      typeof fn === 'function' && instance[task](fn);
    });
  });

  promise.__proto__.example = instance;

  return promise;
};exports.download = download;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-qq/dist/index.js */ 1)["default"]))

/***/ }),
/* 22 */
/*!*****************************************************************!*\
  !*** /Users/yuanhy/Desktop/Chat/js_sdk/pocky-request/config.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.config = exports.globalInterceptor = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 23));var _interceptor = _interopRequireDefault(__webpack_require__(/*! ./core/interceptor */ 18));
var _index = _interopRequireDefault(__webpack_require__(/*! ./index */ 16));
var _jwt = _interopRequireDefault(__webpack_require__(/*! ./../../utils/jwt.js */ 12));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}
// import TokenApi from '../.././../api/token';

var globalInterceptor = {
  request: new _interceptor.default(),
  response: new _interceptor.default() };


/**
                                           * 全局配置
                                           * 只能配置 静态数据
                                           * `content-type` 默认为 application/json
                                           * header 中`content-type`设置特殊参数 或 配置其他会导致触发 跨域 问题，出现跨域会直接进入响应拦截器的catch函数中
                                           */exports.globalInterceptor = globalInterceptor;
var config = {
  baseURL: 'http://school.test/api',
  // dataType: 'json',
  // responseType: 'text',
  header: {
    // uid: 'xxxx',
    contentType: 'application/x-www-form-urlencoded'
    // 'Content-Type': 'application/json'
  } };


/**
        * 全局 请求拦截器
        * 例如: 配置token
        *
        * `return config` 继续发送请求
        * `return false` 会停止发送请求，不会进入错误数据拦截，也不会进入请求对象中的catch函数中
        * `return Promise.reject('xxxxx')` 停止发送请求, 会错误数据拦截，也会进入catch函数中
        *
        * @param {Object} config 发送请求的配置数据
        */exports.config = config;
globalInterceptor.request.use(
function (config) {
  // console.log('is global request interceptor 1', config);
  if (_jwt.default.getToken()) {
    config.header.Authorization = 'Bearer ' + _jwt.default.getToken();
  }
  // getToken() && (config.header.token = getToken());

  return config;
  // return false;
  // return Promise.reject('is error')
},
function (err) {
  // console.error('is global fail request interceptor: ', err);
  return false;
});


// 支持添加多个请求、响应拦截器
// globalInterceptor.request.use(config => {
//     console.log('is global request interceptor 2');
//     return config;
// }, err => {
//     console.error('global request: ', err);
//     return false;
// });

/**
 * 全局 响应拦截器
 * 例如: 根据状态码选择性拦截、过滤转换数据
 *
 * `return res` 继续返回数据
 * `return false` 停止返回数据，不会进入错误数据拦截，也不会进入catch函数中
 * `return Promise.reject('xxxxx')` 返回错误信息, 会错误数据拦截，也会进入catch函数中
 *
 * @param {Object} res 请求返回的数据
 * @param {Object} config 发送请求的配置数据
 * @return {Object|Boolean|Promise<reject>}
 */
globalInterceptor.response.use(
function (res, config) {
  // console.log('is global response interceptor');

  // 回传数据中没有携带 code
  if (!(res.data && res.data.code)) {
    return res;
  }

  // 用code模拟http状态码
  var code = parseInt(res.data.code);

  // 20x ~ 30x
  if (200 <= code && code < 400) {
    return res;
  } else if (code == 401 && config.count === 0) {
    // token 验证失败, 并且这个实例是第一次重复请求
    config.count++;
    config.url = config.instanceURL;
    return getApiToken(2460392754).
    then(saveToken).
    then(function () {return (0, _index.default)().request(config);});
  } else {
    return Promise.reject(res, config);
  }

  // return false;
  // return Promise.reject('is error')
},
function (err, config) {
  // console.error('is global response fail interceptor');
  // console.error('err: ', err);
  // console.error('config: ', config);
  var
  errMsg =

  err.errMsg,data = err.data;

  return Promise.reject({
    errMsg: errMsg,
    data: data,
    config: config });

});


// 重新请求更新获取 token
function getApiToken(_x) {return _getApiToken.apply(this, arguments);}








// 获取 localStorage 中的 token
function _getApiToken() {_getApiToken = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(uid) {var res, token;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return TokenApi.getMockToken(uid);case 2:res = _context.sent;token = res.data.token;return _context.abrupt("return", token);case 5:case "end":return _context.stop();}}}, _callee, this);}));return _getApiToken.apply(this, arguments);}function getToken() {
  return uni.getStorageSync('token');
}

// 保存 token 到 localStorage
function saveToken(token) {
  uni.setStorageSync('token', token);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-qq/dist/index.js */ 1)["default"]))

/***/ }),
/* 23 */
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 24);


/***/ }),
/* 24 */
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 25);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),
/* 25 */
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),
/* 26 */
/*!*************************************************!*\
  !*** /Users/yuanhy/Desktop/Chat/store/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 27));



var _token = _interopRequireDefault(__webpack_require__(/*! ./modules/token.js */ 28));
var _authUser = _interopRequireDefault(__webpack_require__(/*! ./modules/auth-user.js */ 29));
var _userLocation = _interopRequireDefault(__webpack_require__(/*! ./modules/user-location.js */ 30));
var _mapPoi = _interopRequireDefault(__webpack_require__(/*! ./modules/map-poi.js */ 32));
var _notification = _interopRequireDefault(__webpack_require__(/*! ./modules/notification.js */ 35));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}_vue.default.use(_vuex.default);var _default =

new _vuex.default.Store({
  modules: {
    AuthUser: _authUser.default,
    Token: _token.default,
    UserLocation: _userLocation.default,
    MapPoi: _mapPoi.default,
    Notification: _notification.default
    // SearchStatus,
    // ChatINfo
  },
  strict: true });exports.default = _default;

/***/ }),
/* 27 */
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: Store, install, mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/**
 * vuex v3.0.1
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: { configurable: true } };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (true) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (true) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (true) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (true) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "Store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  var state = options.state; if ( state === void 0 ) state = {};
  if (typeof state === 'function') {
    state = state() || {};
  }

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  if (Vue.config.devtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors = { state: { configurable: true } };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  if (true) {
    assert(false, "Use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
     true &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  this._actionSubscribers.forEach(function (sub) { return sub(action, this$1.state); });

  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  return genericSubscribe(fn, this._subscribers)
};

Store.prototype.subscribeAction = function subscribeAction (fn) {
  return genericSubscribe(fn, this._actionSubscribers)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (true) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (true) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (true) {
      assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (true) {
    assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (true) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if ( true && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if ( true && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '3.0.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};


/* harmony default export */ __webpack_exports__["default"] = (index_esm);


/***/ }),
/* 28 */
/*!*********************************************************!*\
  !*** /Users/yuanhy/Desktop/Chat/store/modules/token.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _jwt = _interopRequireDefault(__webpack_require__(/*! ./../../utils/jwt.js */ 12));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =

{
  actions: {
    getNewToken: function getNewToken(_ref,

    code) {var dispatch = _ref.dispatch;
      qq.login({
        success: function success(res) {
          return _vue.default.prototype.$http.request({
            url: '/token/get',
            method: 'POST',
            params: {
              code: res.code } }).

          then(function (res) {
            dispatch('getTokenSuccess', res.data);
          }).catch(function (error) {});
        } });


    },

    getTokenSuccess: function getTokenSuccess(_ref2,

    tokenResponse) {var dispatch = _ref2.dispatch;
      _jwt.default.setToken(tokenResponse.access_token);
      _jwt.default.setRefreshToken(tokenResponse.refresh_token);
      dispatch('setAuthUser');
    },

    cleanToken: function cleanToken(_ref3)

    {var dispatch = _ref3.dispatch;
      return _vue.default.prototype.$http.request({
        url: '/token/clean',
        method: 'POST',
        params: {
          code: res.code } }).

      then(function (res) {
        _jwt.default.removeToken();
        dispatch('initAuthUser');
      });
    },

    refreshToken: function refreshToken(_ref4)


    {var commit = _ref4.commit,dispatch = _ref4.dispatch;
      return _vue.default.prototype.$http.request({
        method: 'POST',
        url: '/token/refresh',
        params: {
          refresh_token: _jwt.default.getRefreshToken() } }).

      then(function (res) {
        dispatch('getTokenSuccess', res.data);
      }).catch(function (error) {
        dispatch('cleanToken');
        dispatch('getNewToken');
      });
    } } };exports.default = _default;

/***/ }),
/* 29 */
/*!*************************************************************!*\
  !*** /Users/yuanhy/Desktop/Chat/store/modules/auth-user.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _jwt = _interopRequireDefault(__webpack_require__(/*! ./../../utils/jwt.js */ 12));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =

{
  state: {
    authentication: false,
    user_id: null,
    user_number: null,
    user_name: null,
    user_sex: null,
    user_created: null,
    user_avatar: null,
    user_school: null,
    user_organization: null },


  mutations: {
    SET_AUTH_USER: function SET_AUTH_USER(state, payload) {
      var authenticationTemp = state.authentication;
      for (var item in state) {
        state[item] = payload.user.data[item];
      }
      state.authentication = authenticationTemp;
    },

    INIT_AUTH_USER: function INIT_AUTH_USER(state) {
      state.authentication = false;
      state.user_id = null;
      user_number = null;
      state.user_name = null;
      state.user_sex = null;
      state.user_created = null;
      state.user_shcool = null;
    },

    AUTHORIZED: function AUTHORIZED(state) {
      state.authentication = true;
    },

    SET_SCHOOL: function SET_SCHOOL(state, payload) {
      state.user_shcool = payload.user_shcool;
      state.user_tip = true;
    } },


  actions: {
    setAuthUser: function setAuthUser(_ref)


    {var commit = _ref.commit,dispatch = _ref.dispatch;
      return _vue.default.prototype.$http.get('/user').then(function (res) {
        commit({
          type: 'SET_AUTH_USER',
          user: res.data });

      }).catch(function (error) {
        dispatch('refreshToken');
      });
    },

    setSchool: function setSchool(_ref2,


    school) {var commit = _ref2.commit,dispatch = _ref2.dispatch;
      return _vue.default.prototype.$http.request({
        url: '/users/school/set',
        method: 'POST',
        params: {
          school: school } }).

      then(function (res) {
        commit({
          type: 'SET_AUTH_USER',
          user: res.data });

      }).catch(function (error) {
        dispatch('refreshToken');
      });
    },

    updateUserInfo: function updateUserInfo(_ref3,


    userInfo) {var commit = _ref3.commit,dispatch = _ref3.dispatch;
      return _vue.default.prototype.$http.request({
        url: '/users/update',
        method: 'POST',
        params: {
          user_name: userInfo.nickName,
          user_avatar: userInfo.avatarUrl,
          user_sex: userInfo.gender } }).

      then(function (res) {
        console.log(res.data);
        commit({
          type: 'SET_AUTH_USER',
          user: res.data });

      });
    },
    authorized: function authorized(_ref4)

    {var commit = _ref4.commit;
      commit({
        type: 'AUTHORIZED' });

    },
    initAuthUser: function initAuthUser(_ref5)

    {var commit = _ref5.commit;
      commit({
        type: 'INIT_AUTH_USER' });

    } } };exports.default = _default;

/***/ }),
/* 30 */
/*!*****************************************************************!*\
  !*** /Users/yuanhy/Desktop/Chat/store/modules/user-location.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _qqmapWxJssdk = _interopRequireDefault(__webpack_require__(/*! ../../js_sdk/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js */ 31));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var qqmapsdk = new _qqmapWxJssdk.default({
  key: 'QL7BZ-ZCJKK-72IJS-A6NA6-HRJ3F-ZYB6J' });var _default =


{
  state: {
    user_address: null,
    user_address_component: {
      city: null,
      district: null,
      nation: null,
      province: null,
      street: null,
      street_number: null },

    user_location: {
      latitude: 0,
      longitude: 0 } },



  mutations: {

    SET_LOCATION: function SET_LOCATION(state, payload) {
      state.user_address = payload.location.address;
      for (var item in state.user_address_component) {
        state.user_address_component[item] = payload.location.address_component[item];
      }
      state.user_location.latitude = payload.location.location.lat;
      state.user_location.longitude = payload.location.location.lng;
    },

    INIT_AUTH_USER: function INIT_AUTH_USER(state) {
      state.user_adress = null;
      state.user_adress_component = {
        user_city: null,
        user_district: null,
        user_nation: null,
        user_province: null,
        user_street: null,
        user_street_number: null };

      state.user_location = {
        user_latitude: 0,
        user_longitude: 0 };

    } },


  actions: {
    requestUserLocation: function requestUserLocation(_ref)


    {var commit = _ref.commit,dispatch = _ref.dispatch;
      qq.getLocation({
        type: 'gcj02',
        success: function success(res) {
          qqmapsdk.reverseGeocoder({
            location: {
              latitude: res.latitude,
              longitude: res.longitude },

            success: function success(res) {
              dispatch('setUserLocation', res.result);
            } });

        } });

    },

    setUserLocation: function setUserLocation(_ref2,

    location) {var commit = _ref2.commit;
      commit({
        type: 'SET_LOCATION',
        location: location });

    },

    initAuthUser: function initAuthUser(_ref3)

    {var commit = _ref3.commit;
      commit({
        type: 'INIT_AUTH_USER' });

    } } };exports.default = _default;

/***/ }),
/* 31 */
/*!*****************************************************************************!*\
  !*** /Users/yuanhy/Desktop/Chat/js_sdk/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * 微信小程序JavaScriptSDK
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @version 1.2
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @date 2019-03-06
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @author v_ylyue@tencent.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */

var ERROR_CONF = {
  KEY_ERR: 311,
  KEY_ERR_MSG: 'key格式错误',
  PARAM_ERR: 310,
  PARAM_ERR_MSG: '请求参数信息有误',
  SYSTEM_ERR: 600,
  SYSTEM_ERR_MSG: '系统错误',
  WX_ERR_CODE: 1000,
  WX_OK_CODE: 200 };

var BASE_URL = 'https://apis.map.qq.com/ws/';
var URL_SEARCH = BASE_URL + 'place/v1/search';
var URL_SUGGESTION = BASE_URL + 'place/v1/suggestion';
var URL_GET_GEOCODER = BASE_URL + 'geocoder/v1/';
var URL_CITY_LIST = BASE_URL + 'district/v1/list';
var URL_AREA_LIST = BASE_URL + 'district/v1/getchildren';
var URL_DISTANCE = BASE_URL + 'distance/v1/';
var URL_DIRECTION = BASE_URL + 'direction/v1/';
var MODE = {
  driving: 'driving',
  transit: 'transit' };

var EARTH_RADIUS = 6378136.49;
var Utils = {
  /**
              * md5加密方法
              * 版权所有©2011 Sebastian Tschan，https：//blueimp.net
              */
  safeAdd: function safeAdd(x, y) {
    var lsw = (x & 0xffff) + (y & 0xffff);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return msw << 16 | lsw & 0xffff;
  },
  bitRotateLeft: function bitRotateLeft(num, cnt) {
    return num << cnt | num >>> 32 - cnt;
  },
  md5cmn: function md5cmn(q, a, b, x, s, t) {
    return this.safeAdd(this.bitRotateLeft(this.safeAdd(this.safeAdd(a, q), this.safeAdd(x, t)), s), b);
  },
  md5ff: function md5ff(a, b, c, d, x, s, t) {
    return this.md5cmn(b & c | ~b & d, a, b, x, s, t);
  },
  md5gg: function md5gg(a, b, c, d, x, s, t) {
    return this.md5cmn(b & d | c & ~d, a, b, x, s, t);
  },
  md5hh: function md5hh(a, b, c, d, x, s, t) {
    return this.md5cmn(b ^ c ^ d, a, b, x, s, t);
  },
  md5ii: function md5ii(a, b, c, d, x, s, t) {
    return this.md5cmn(c ^ (b | ~d), a, b, x, s, t);
  },
  binlMD5: function binlMD5(x, len) {
    /* append padding */
    x[len >> 5] |= 0x80 << len % 32;
    x[(len + 64 >>> 9 << 4) + 14] = len;

    var i;
    var olda;
    var oldb;
    var oldc;
    var oldd;
    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;

    for (i = 0; i < x.length; i += 16) {
      olda = a;
      oldb = b;
      oldc = c;
      oldd = d;

      a = this.md5ff(a, b, c, d, x[i], 7, -680876936);
      d = this.md5ff(d, a, b, c, x[i + 1], 12, -389564586);
      c = this.md5ff(c, d, a, b, x[i + 2], 17, 606105819);
      b = this.md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
      a = this.md5ff(a, b, c, d, x[i + 4], 7, -176418897);
      d = this.md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
      c = this.md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
      b = this.md5ff(b, c, d, a, x[i + 7], 22, -45705983);
      a = this.md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
      d = this.md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
      c = this.md5ff(c, d, a, b, x[i + 10], 17, -42063);
      b = this.md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
      a = this.md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
      d = this.md5ff(d, a, b, c, x[i + 13], 12, -40341101);
      c = this.md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
      b = this.md5ff(b, c, d, a, x[i + 15], 22, 1236535329);

      a = this.md5gg(a, b, c, d, x[i + 1], 5, -165796510);
      d = this.md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
      c = this.md5gg(c, d, a, b, x[i + 11], 14, 643717713);
      b = this.md5gg(b, c, d, a, x[i], 20, -373897302);
      a = this.md5gg(a, b, c, d, x[i + 5], 5, -701558691);
      d = this.md5gg(d, a, b, c, x[i + 10], 9, 38016083);
      c = this.md5gg(c, d, a, b, x[i + 15], 14, -660478335);
      b = this.md5gg(b, c, d, a, x[i + 4], 20, -405537848);
      a = this.md5gg(a, b, c, d, x[i + 9], 5, 568446438);
      d = this.md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
      c = this.md5gg(c, d, a, b, x[i + 3], 14, -187363961);
      b = this.md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
      a = this.md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
      d = this.md5gg(d, a, b, c, x[i + 2], 9, -51403784);
      c = this.md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
      b = this.md5gg(b, c, d, a, x[i + 12], 20, -1926607734);

      a = this.md5hh(a, b, c, d, x[i + 5], 4, -378558);
      d = this.md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
      c = this.md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
      b = this.md5hh(b, c, d, a, x[i + 14], 23, -35309556);
      a = this.md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
      d = this.md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
      c = this.md5hh(c, d, a, b, x[i + 7], 16, -155497632);
      b = this.md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
      a = this.md5hh(a, b, c, d, x[i + 13], 4, 681279174);
      d = this.md5hh(d, a, b, c, x[i], 11, -358537222);
      c = this.md5hh(c, d, a, b, x[i + 3], 16, -722521979);
      b = this.md5hh(b, c, d, a, x[i + 6], 23, 76029189);
      a = this.md5hh(a, b, c, d, x[i + 9], 4, -640364487);
      d = this.md5hh(d, a, b, c, x[i + 12], 11, -421815835);
      c = this.md5hh(c, d, a, b, x[i + 15], 16, 530742520);
      b = this.md5hh(b, c, d, a, x[i + 2], 23, -995338651);

      a = this.md5ii(a, b, c, d, x[i], 6, -198630844);
      d = this.md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
      c = this.md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
      b = this.md5ii(b, c, d, a, x[i + 5], 21, -57434055);
      a = this.md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
      d = this.md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
      c = this.md5ii(c, d, a, b, x[i + 10], 15, -1051523);
      b = this.md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
      a = this.md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
      d = this.md5ii(d, a, b, c, x[i + 15], 10, -30611744);
      c = this.md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
      b = this.md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
      a = this.md5ii(a, b, c, d, x[i + 4], 6, -145523070);
      d = this.md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
      c = this.md5ii(c, d, a, b, x[i + 2], 15, 718787259);
      b = this.md5ii(b, c, d, a, x[i + 9], 21, -343485551);

      a = this.safeAdd(a, olda);
      b = this.safeAdd(b, oldb);
      c = this.safeAdd(c, oldc);
      d = this.safeAdd(d, oldd);
    }
    return [a, b, c, d];
  },
  binl2rstr: function binl2rstr(input) {
    var i;
    var output = '';
    var length32 = input.length * 32;
    for (i = 0; i < length32; i += 8) {
      output += String.fromCharCode(input[i >> 5] >>> i % 32 & 0xff);
    }
    return output;
  },
  rstr2binl: function rstr2binl(input) {
    var i;
    var output = [];
    output[(input.length >> 2) - 1] = undefined;
    for (i = 0; i < output.length; i += 1) {
      output[i] = 0;
    }
    var length8 = input.length * 8;
    for (i = 0; i < length8; i += 8) {
      output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << i % 32;
    }
    return output;
  },
  rstrMD5: function rstrMD5(s) {
    return this.binl2rstr(this.binlMD5(this.rstr2binl(s), s.length * 8));
  },
  rstrHMACMD5: function rstrHMACMD5(key, data) {
    var i;
    var bkey = this.rstr2binl(key);
    var ipad = [];
    var opad = [];
    var hash;
    ipad[15] = opad[15] = undefined;
    if (bkey.length > 16) {
      bkey = this.binlMD5(bkey, key.length * 8);
    }
    for (i = 0; i < 16; i += 1) {
      ipad[i] = bkey[i] ^ 0x36363636;
      opad[i] = bkey[i] ^ 0x5c5c5c5c;
    }
    hash = this.binlMD5(ipad.concat(this.rstr2binl(data)), 512 + data.length * 8);
    return this.binl2rstr(this.binlMD5(opad.concat(hash), 512 + 128));
  },
  rstr2hex: function rstr2hex(input) {
    var hexTab = '0123456789abcdef';
    var output = '';
    var x;
    var i;
    for (i = 0; i < input.length; i += 1) {
      x = input.charCodeAt(i);
      output += hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f);
    }
    return output;
  },
  str2rstrUTF8: function str2rstrUTF8(input) {
    return unescape(encodeURIComponent(input));
  },
  rawMD5: function rawMD5(s) {
    return this.rstrMD5(this.str2rstrUTF8(s));
  },
  hexMD5: function hexMD5(s) {
    return this.rstr2hex(this.rawMD5(s));
  },
  rawHMACMD5: function rawHMACMD5(k, d) {
    return this.rstrHMACMD5(this.str2rstrUTF8(k), str2rstrUTF8(d));
  },
  hexHMACMD5: function hexHMACMD5(k, d) {
    return this.rstr2hex(this.rawHMACMD5(k, d));
  },

  md5: function md5(string, key, raw) {
    if (!key) {
      if (!raw) {
        return this.hexMD5(string);
      }
      return this.rawMD5(string);
    }
    if (!raw) {
      return this.hexHMACMD5(key, string);
    }
    return this.rawHMACMD5(key, string);
  },
  /**
      * 得到md5加密后的sig参数
      * @param {Object} requestParam 接口参数
      * @param {String} sk签名字符串
      * @param {String} featrue 方法名
      * @return 返回加密后的sig参数
      */
  getSig: function getSig(requestParam, sk, feature, mode) {
    var sig = null;
    var requestArr = [];
    Object.keys(requestParam).sort().forEach(function (key) {
      requestArr.push(key + '=' + requestParam[key]);
    });
    if (feature == 'search') {
      sig = '/ws/place/v1/search?' + requestArr.join('&') + sk;
    }
    if (feature == 'suggest') {
      sig = '/ws/place/v1/suggestion?' + requestArr.join('&') + sk;
    }
    if (feature == 'reverseGeocoder') {
      sig = '/ws/geocoder/v1/?' + requestArr.join('&') + sk;
    }
    if (feature == 'geocoder') {
      sig = '/ws/geocoder/v1/?' + requestArr.join('&') + sk;
    }
    if (feature == 'getCityList') {
      sig = '/ws/district/v1/list?' + requestArr.join('&') + sk;
    }
    if (feature == 'getDistrictByCityId') {
      sig = '/ws/district/v1/getchildren?' + requestArr.join('&') + sk;
    }
    if (feature == 'calculateDistance') {
      sig = '/ws/distance/v1/?' + requestArr.join('&') + sk;
    }
    if (feature == 'direction') {
      sig = '/ws/direction/v1/' + mode + '?' + requestArr.join('&') + sk;
    }
    sig = this.md5(sig);
    return sig;
  },
  /**
      * 得到终点query字符串
      * @param {Array|String} 检索数据
      */
  location2query: function location2query(data) {
    if (typeof data == 'string') {
      return data;
    }
    var query = '';
    for (var i = 0; i < data.length; i++) {
      var d = data[i];
      if (!!query) {
        query += ';';
      }
      if (d.location) {
        query = query + d.location.lat + ',' + d.location.lng;
      }
      if (d.latitude && d.longitude) {
        query = query + d.latitude + ',' + d.longitude;
      }
    }
    return query;
  },

  /**
      * 计算角度
      */
  rad: function rad(d) {
    return d * Math.PI / 180.0;
  },
  /**
      * 处理终点location数组
      * @return 返回终点数组
      */
  getEndLocation: function getEndLocation(location) {
    var to = location.split(';');
    var endLocation = [];
    for (var i = 0; i < to.length; i++) {
      endLocation.push({
        lat: parseFloat(to[i].split(',')[0]),
        lng: parseFloat(to[i].split(',')[1]) });

    }
    return endLocation;
  },

  /**
      * 计算两点间直线距离
      * @param a 表示纬度差
      * @param b 表示经度差
      * @return 返回的是距离，单位m
      */
  getDistance: function getDistance(latFrom, lngFrom, latTo, lngTo) {
    var radLatFrom = this.rad(latFrom);
    var radLatTo = this.rad(latTo);
    var a = radLatFrom - radLatTo;
    var b = this.rad(lngFrom) - this.rad(lngTo);
    var distance = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLatFrom) * Math.cos(radLatTo) * Math.pow(Math.sin(b / 2), 2)));
    distance = distance * EARTH_RADIUS;
    distance = Math.round(distance * 10000) / 10000;
    return parseFloat(distance.toFixed(0));
  },
  /**
      * 使用微信接口进行定位
      */
  getWXLocation: function getWXLocation(success, fail, complete) {
    wx.getLocation({
      type: 'gcj02',
      success: success,
      fail: fail,
      complete: complete });

  },

  /**
      * 获取location参数
      */
  getLocationParam: function getLocationParam(location) {
    if (typeof location == 'string') {
      var locationArr = location.split(',');
      if (locationArr.length === 2) {
        location = {
          latitude: location.split(',')[0],
          longitude: location.split(',')[1] };

      } else {
        location = {};
      }
    }
    return location;
  },

  /**
      * 回调函数默认处理
      */
  polyfillParam: function polyfillParam(param) {
    param.success = param.success || function () {};
    param.fail = param.fail || function () {};
    param.complete = param.complete || function () {};
  },

  /**
      * 验证param对应的key值是否为空
      * 
      * @param {Object} param 接口参数
      * @param {String} key 对应参数的key
      */
  checkParamKeyEmpty: function checkParamKeyEmpty(param, key) {
    if (!param[key]) {
      var errconf = this.buildErrorConfig(ERROR_CONF.PARAM_ERR, ERROR_CONF.PARAM_ERR_MSG + key + '参数格式有误');
      param.fail(errconf);
      param.complete(errconf);
      return true;
    }
    return false;
  },

  /**
      * 验证参数中是否存在检索词keyword
      * 
      * @param {Object} param 接口参数
      */
  checkKeyword: function checkKeyword(param) {
    return !this.checkParamKeyEmpty(param, 'keyword');
  },

  /**
      * 验证location值
      * 
      * @param {Object} param 接口参数
      */
  checkLocation: function checkLocation(param) {
    var location = this.getLocationParam(param.location);
    if (!location || !location.latitude || !location.longitude) {
      var errconf = this.buildErrorConfig(ERROR_CONF.PARAM_ERR, ERROR_CONF.PARAM_ERR_MSG + ' location参数格式有误');
      param.fail(errconf);
      param.complete(errconf);
      return false;
    }
    return true;
  },

  /**
      * 构造错误数据结构
      * @param {Number} errCode 错误码
      * @param {Number} errMsg 错误描述
      */
  buildErrorConfig: function buildErrorConfig(errCode, errMsg) {
    return {
      status: errCode,
      message: errMsg };

  },

  /**
      * 
      * 数据处理函数
      * 根据传入参数不同处理不同数据
      * @param {String} feature 功能名称
      * search 地点搜索
      * suggest关键词提示
      * reverseGeocoder逆地址解析
      * geocoder地址解析
      * getCityList获取城市列表：父集
      * getDistrictByCityId获取区县列表：子集
      * calculateDistance距离计算
      * @param {Object} param 接口参数
      * @param {Object} data 数据
      */
  handleData: function handleData(param, data, feature) {
    if (feature == 'search') {
      var searchResult = data.data;
      var searchSimplify = [];
      for (var i = 0; i < searchResult.length; i++) {
        searchSimplify.push({
          id: searchResult[i].id || null,
          title: searchResult[i].title || null,
          latitude: searchResult[i].location && searchResult[i].location.lat || null,
          longitude: searchResult[i].location && searchResult[i].location.lng || null,
          address: searchResult[i].address || null,
          category: searchResult[i].category || null,
          tel: searchResult[i].tel || null,
          adcode: searchResult[i].ad_info && searchResult[i].ad_info.adcode || null,
          city: searchResult[i].ad_info && searchResult[i].ad_info.city || null,
          district: searchResult[i].ad_info && searchResult[i].ad_info.district || null,
          province: searchResult[i].ad_info && searchResult[i].ad_info.province || null });

      }
      param.success(data, {
        searchResult: searchResult,
        searchSimplify: searchSimplify });

    } else if (feature == 'suggest') {
      var suggestResult = data.data;
      var suggestSimplify = [];
      for (var i = 0; i < suggestResult.length; i++) {
        suggestSimplify.push({
          adcode: suggestResult[i].adcode || null,
          address: suggestResult[i].address || null,
          category: suggestResult[i].category || null,
          city: suggestResult[i].city || null,
          district: suggestResult[i].district || null,
          id: suggestResult[i].id || null,
          latitude: suggestResult[i].location && suggestResult[i].location.lat || null,
          longitude: suggestResult[i].location && suggestResult[i].location.lng || null,
          province: suggestResult[i].province || null,
          title: suggestResult[i].title || null,
          type: suggestResult[i].type || null });

      }
      param.success(data, {
        suggestResult: suggestResult,
        suggestSimplify: suggestSimplify });

    } else if (feature == 'reverseGeocoder') {
      var reverseGeocoderResult = data.result;
      var reverseGeocoderSimplify = {
        address: reverseGeocoderResult.address || null,
        latitude: reverseGeocoderResult.location && reverseGeocoderResult.location.lat || null,
        longitude: reverseGeocoderResult.location && reverseGeocoderResult.location.lng || null,
        adcode: reverseGeocoderResult.ad_info && reverseGeocoderResult.ad_info.adcode || null,
        city: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.city || null,
        district: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.district || null,
        nation: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.nation || null,
        province: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.province || null,
        street: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.street || null,
        street_number: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.street_number || null,
        recommend: reverseGeocoderResult.formatted_addresses && reverseGeocoderResult.formatted_addresses.recommend || null,
        rough: reverseGeocoderResult.formatted_addresses && reverseGeocoderResult.formatted_addresses.rough || null };

      if (reverseGeocoderResult.pois) {//判断是否返回周边poi
        var pois = reverseGeocoderResult.pois;
        var poisSimplify = [];
        for (var i = 0; i < pois.length; i++) {
          poisSimplify.push({
            id: pois[i].id || null,
            title: pois[i].title || null,
            latitude: pois[i].location && pois[i].location.lat || null,
            longitude: pois[i].location && pois[i].location.lng || null,
            address: pois[i].address || null,
            category: pois[i].category || null,
            adcode: pois[i].ad_info && pois[i].ad_info.adcode || null,
            city: pois[i].ad_info && pois[i].ad_info.city || null,
            district: pois[i].ad_info && pois[i].ad_info.district || null,
            province: pois[i].ad_info && pois[i].ad_info.province || null });

        }
        param.success(data, {
          reverseGeocoderResult: reverseGeocoderResult,
          reverseGeocoderSimplify: reverseGeocoderSimplify,
          pois: pois,
          poisSimplify: poisSimplify });

      } else {
        param.success(data, {
          reverseGeocoderResult: reverseGeocoderResult,
          reverseGeocoderSimplify: reverseGeocoderSimplify });

      }
    } else if (feature == 'geocoder') {
      var geocoderResult = data.result;
      var geocoderSimplify = {
        title: geocoderResult.title || null,
        latitude: geocoderResult.location && geocoderResult.location.lat || null,
        longitude: geocoderResult.location && geocoderResult.location.lng || null,
        adcode: geocoderResult.ad_info && geocoderResult.ad_info.adcode || null,
        province: geocoderResult.address_components && geocoderResult.address_components.province || null,
        city: geocoderResult.address_components && geocoderResult.address_components.city || null,
        district: geocoderResult.address_components && geocoderResult.address_components.district || null,
        street: geocoderResult.address_components && geocoderResult.address_components.street || null,
        street_number: geocoderResult.address_components && geocoderResult.address_components.street_number || null,
        level: geocoderResult.level || null };

      param.success(data, {
        geocoderResult: geocoderResult,
        geocoderSimplify: geocoderSimplify });

    } else if (feature == 'getCityList') {
      var provinceResult = data.result[0];
      var cityResult = data.result[1];
      var districtResult = data.result[2];
      param.success(data, {
        provinceResult: provinceResult,
        cityResult: cityResult,
        districtResult: districtResult });

    } else if (feature == 'getDistrictByCityId') {
      var districtByCity = data.result[0];
      param.success(data, districtByCity);
    } else if (feature == 'calculateDistance') {
      var calculateDistanceResult = data.result.elements;
      var distance = [];
      for (var i = 0; i < calculateDistanceResult.length; i++) {
        distance.push(calculateDistanceResult[i].distance);
      }
      param.success(data, {
        calculateDistanceResult: calculateDistanceResult,
        distance: distance });

    } else if (feature == 'direction') {
      var direction = data.result.routes;
      param.success(data, direction);
    } else {
      param.success(data);
    }
  },

  /**
      * 构造微信请求参数，公共属性处理
      * 
      * @param {Object} param 接口参数
      * @param {Object} param 配置项
      * @param {String} feature 方法名
      */
  buildWxRequestConfig: function buildWxRequestConfig(param, options, feature) {
    var that = this;
    options.header = { "content-type": "application/json" };
    options.method = 'GET';
    options.success = function (res) {
      var data = res.data;
      if (data.status === 0) {
        that.handleData(param, data, feature);
      } else {
        param.fail(data);
      }
    };
    options.fail = function (res) {
      res.statusCode = ERROR_CONF.WX_ERR_CODE;
      param.fail(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));
    };
    options.complete = function (res) {
      var statusCode = +res.statusCode;
      switch (statusCode) {
        case ERROR_CONF.WX_ERR_CODE:{
            param.complete(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));
            break;
          }
        case ERROR_CONF.WX_OK_CODE:{
            var data = res.data;
            if (data.status === 0) {
              param.complete(data);
            } else {
              param.complete(that.buildErrorConfig(data.status, data.message));
            }
            break;
          }
        default:{
            param.complete(that.buildErrorConfig(ERROR_CONF.SYSTEM_ERR, ERROR_CONF.SYSTEM_ERR_MSG));
          }}


    };
    return options;
  },

  /**
      * 处理用户参数是否传入坐标进行不同的处理
      */
  locationProcess: function locationProcess(param, locationsuccess, locationfail, locationcomplete) {
    var that = this;
    locationfail = locationfail || function (res) {
      res.statusCode = ERROR_CONF.WX_ERR_CODE;
      param.fail(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));
    };
    locationcomplete = locationcomplete || function (res) {
      if (res.statusCode == ERROR_CONF.WX_ERR_CODE) {
        param.complete(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));
      }
    };
    if (!param.location) {
      that.getWXLocation(locationsuccess, locationfail, locationcomplete);
    } else if (that.checkLocation(param)) {
      var location = Utils.getLocationParam(param.location);
      locationsuccess(location);
    }
  } };var



QQMapWX = /*#__PURE__*/function () {

  /**
                                     * 构造函数
                                     * 
                                     * @param {Object} options 接口参数,key 为必选参数
                                     */
  function QQMapWX(options) {_classCallCheck(this, QQMapWX);
    if (!options.key) {
      throw Error('key值不能为空');
    }
    this.key = options.key;
  }_createClass(QQMapWX, [{ key: "search",

    /**
                                            * POI周边检索
                                            *
                                            * @param {Object} options 接口参数对象
                                            * 
                                            * 参数对象结构可以参考
                                            * @see http://lbs.qq.com/webservice_v1/guide-search.html
                                            */value: function search(
    options) {
      var that = this;
      options = options || {};

      Utils.polyfillParam(options);

      if (!Utils.checkKeyword(options)) {
        return;
      }

      var requestParam = {
        keyword: options.keyword,
        orderby: options.orderby || '_distance',
        page_size: options.page_size || 10,
        page_index: options.page_index || 1,
        output: 'json',
        key: that.key };


      if (options.address_format) {
        requestParam.address_format = options.address_format;
      }

      if (options.filter) {
        requestParam.filter = options.filter;
      }

      var distance = options.distance || "1000";
      var auto_extend = options.auto_extend || 1;
      var region = null;
      var rectangle = null;

      //判断城市限定参数
      if (options.region) {
        region = options.region;
      }

      //矩形限定坐标(暂时只支持字符串格式)
      if (options.rectangle) {
        rectangle = options.rectangle;
      }

      var locationsuccess = function locationsuccess(result) {
        if (region && !rectangle) {
          //城市限定参数拼接
          requestParam.boundary = "region(" + region + "," + auto_extend + "," + result.latitude + "," + result.longitude + ")";
          if (options.sig) {
            requestParam.sig = Utils.getSig(requestParam, options.sig, 'search');
          }
        } else if (rectangle && !region) {
          //矩形搜索
          requestParam.boundary = "rectangle(" + rectangle + ")";
          if (options.sig) {
            requestParam.sig = Utils.getSig(requestParam, options.sig, 'search');
          }
        } else {
          requestParam.boundary = "nearby(" + result.latitude + "," + result.longitude + "," + distance + "," + auto_extend + ")";
          if (options.sig) {
            requestParam.sig = Utils.getSig(requestParam, options.sig, 'search');
          }
        }
        wx.request(Utils.buildWxRequestConfig(options, {
          url: URL_SEARCH,
          data: requestParam },
        'search'));
      };
      Utils.locationProcess(options, locationsuccess);
    } }, { key: "getSuggestion",

    /**
                                  * sug模糊检索
                                  *
                                  * @param {Object} options 接口参数对象
                                  * 
                                  * 参数对象结构可以参考
                                  * http://lbs.qq.com/webservice_v1/guide-suggestion.html
                                  */value: function getSuggestion(
    options) {
      var that = this;
      options = options || {};
      Utils.polyfillParam(options);

      if (!Utils.checkKeyword(options)) {
        return;
      }

      var requestParam = {
        keyword: options.keyword,
        region: options.region || '全国',
        region_fix: options.region_fix || 0,
        policy: options.policy || 0,
        page_size: options.page_size || 10, //控制显示条数
        page_index: options.page_index || 1, //控制页数
        get_subpois: options.get_subpois || 0, //返回子地点
        output: 'json',
        key: that.key };

      //长地址
      if (options.address_format) {
        requestParam.address_format = options.address_format;
      }
      //过滤
      if (options.filter) {
        requestParam.filter = options.filter;
      }
      //排序
      if (options.location) {
        var locationsuccess = function locationsuccess(result) {
          requestParam.location = result.latitude + ',' + result.longitude;
          if (options.sig) {
            requestParam.sig = Utils.getSig(requestParam, options.sig, 'suggest');
          }
          wx.request(Utils.buildWxRequestConfig(options, {
            url: URL_SUGGESTION,
            data: requestParam },
          "suggest"));
        };
        Utils.locationProcess(options, locationsuccess);
      } else {
        if (options.sig) {
          requestParam.sig = Utils.getSig(requestParam, options.sig, 'suggest');
        }
        wx.request(Utils.buildWxRequestConfig(options, {
          url: URL_SUGGESTION,
          data: requestParam },
        "suggest"));
      }
    } }, { key: "reverseGeocoder",

    /**
                                    * 逆地址解析
                                    *
                                    * @param {Object} options 接口参数对象
                                    * 
                                    * 请求参数结构可以参考
                                    * http://lbs.qq.com/webservice_v1/guide-gcoder.html
                                    */value: function reverseGeocoder(
    options) {
      var that = this;
      options = options || {};
      Utils.polyfillParam(options);
      var requestParam = {
        coord_type: options.coord_type || 5,
        get_poi: options.get_poi || 0,
        output: 'json',
        key: that.key };

      if (options.poi_options) {
        requestParam.poi_options = options.poi_options;
      }

      var locationsuccess = function locationsuccess(result) {
        requestParam.location = result.latitude + ',' + result.longitude;
        if (options.sig) {
          requestParam.sig = Utils.getSig(requestParam, options.sig, 'reverseGeocoder');
        }
        wx.request(Utils.buildWxRequestConfig(options, {
          url: URL_GET_GEOCODER,
          data: requestParam },
        'reverseGeocoder'));
      };
      Utils.locationProcess(options, locationsuccess);
    } }, { key: "geocoder",

    /**
                             * 地址解析
                             *
                             * @param {Object} options 接口参数对象
                             * 
                             * 请求参数结构可以参考
                             * http://lbs.qq.com/webservice_v1/guide-geocoder.html
                             */value: function geocoder(
    options) {
      var that = this;
      options = options || {};
      Utils.polyfillParam(options);

      if (Utils.checkParamKeyEmpty(options, 'address')) {
        return;
      }

      var requestParam = {
        address: options.address,
        output: 'json',
        key: that.key };


      //城市限定
      if (options.region) {
        requestParam.region = options.region;
      }

      if (options.sig) {
        requestParam.sig = Utils.getSig(requestParam, options.sig, 'geocoder');
      }

      wx.request(Utils.buildWxRequestConfig(options, {
        url: URL_GET_GEOCODER,
        data: requestParam },
      'geocoder'));
    } }, { key: "getCityList",


    /**
                                * 获取城市列表
                                *
                                * @param {Object} options 接口参数对象
                                * 
                                * 请求参数结构可以参考
                                * http://lbs.qq.com/webservice_v1/guide-region.html
                                */value: function getCityList(
    options) {
      var that = this;
      options = options || {};
      Utils.polyfillParam(options);
      var requestParam = {
        output: 'json',
        key: that.key };


      if (options.sig) {
        requestParam.sig = Utils.getSig(requestParam, options.sig, 'getCityList');
      }

      wx.request(Utils.buildWxRequestConfig(options, {
        url: URL_CITY_LIST,
        data: requestParam },
      'getCityList'));
    } }, { key: "getDistrictByCityId",

    /**
                                        * 获取对应城市ID的区县列表
                                        *
                                        * @param {Object} options 接口参数对象
                                        * 
                                        * 请求参数结构可以参考
                                        * http://lbs.qq.com/webservice_v1/guide-region.html
                                        */value: function getDistrictByCityId(
    options) {
      var that = this;
      options = options || {};
      Utils.polyfillParam(options);

      if (Utils.checkParamKeyEmpty(options, 'id')) {
        return;
      }

      var requestParam = {
        id: options.id || '',
        output: 'json',
        key: that.key };


      if (options.sig) {
        requestParam.sig = Utils.getSig(requestParam, options.sig, 'getDistrictByCityId');
      }

      wx.request(Utils.buildWxRequestConfig(options, {
        url: URL_AREA_LIST,
        data: requestParam },
      'getDistrictByCityId'));
    } }, { key: "calculateDistance",

    /**
                                      * 用于单起点到多终点的路线距离(非直线距离)计算：
                                      * 支持两种距离计算方式：步行和驾车。
                                      * 起点到终点最大限制直线距离10公里。
                                      *
                                      * 新增直线距离计算。
                                      * 
                                      * @param {Object} options 接口参数对象
                                      * 
                                      * 请求参数结构可以参考
                                      * http://lbs.qq.com/webservice_v1/guide-distance.html
                                      */value: function calculateDistance(
    options) {
      var that = this;
      options = options || {};
      Utils.polyfillParam(options);

      if (Utils.checkParamKeyEmpty(options, 'to')) {
        return;
      }

      var requestParam = {
        mode: options.mode || 'walking',
        to: Utils.location2query(options.to),
        output: 'json',
        key: that.key };


      if (options.from) {
        options.location = options.from;
      }

      //计算直线距离
      if (requestParam.mode == 'straight') {
        var locationsuccess = function locationsuccess(result) {
          var locationTo = Utils.getEndLocation(requestParam.to); //处理终点坐标
          var data = {
            message: "query ok",
            result: {
              elements: [] },

            status: 0 };

          for (var i = 0; i < locationTo.length; i++) {
            data.result.elements.push({ //将坐标存入
              distance: Utils.getDistance(result.latitude, result.longitude, locationTo[i].lat, locationTo[i].lng),
              duration: 0,
              from: {
                lat: result.latitude,
                lng: result.longitude },

              to: {
                lat: locationTo[i].lat,
                lng: locationTo[i].lng } });


          }
          var calculateResult = data.result.elements;
          var distanceResult = [];
          for (var i = 0; i < calculateResult.length; i++) {
            distanceResult.push(calculateResult[i].distance);
          }
          return options.success(data, {
            calculateResult: calculateResult,
            distanceResult: distanceResult });

        };

        Utils.locationProcess(options, locationsuccess);
      } else {
        var locationsuccess = function locationsuccess(result) {
          requestParam.from = result.latitude + ',' + result.longitude;
          if (options.sig) {
            requestParam.sig = Utils.getSig(requestParam, options.sig, 'calculateDistance');
          }
          wx.request(Utils.buildWxRequestConfig(options, {
            url: URL_DISTANCE,
            data: requestParam },
          'calculateDistance'));
        };

        Utils.locationProcess(options, locationsuccess);
      }
    } }, { key: "direction",

    /**
                              * 路线规划：
                              * 
                              * @param {Object} options 接口参数对象
                              * 
                              * 请求参数结构可以参考
                              * https://lbs.qq.com/webservice_v1/guide-road.html
                              */value: function direction(
    options) {
      var that = this;
      options = options || {};
      Utils.polyfillParam(options);

      if (Utils.checkParamKeyEmpty(options, 'to')) {
        return;
      }

      var requestParam = {
        output: 'json',
        key: that.key };


      //to格式处理
      if (typeof options.to == 'string') {
        requestParam.to = options.to;
      } else {
        requestParam.to = options.to.latitude + ',' + options.to.longitude;
      }
      //初始化局部请求域名
      var SET_URL_DIRECTION = null;
      //设置默认mode属性
      options.mode = options.mode || MODE.driving;

      //设置请求域名
      SET_URL_DIRECTION = URL_DIRECTION + options.mode;

      if (options.from) {
        options.location = options.from;
      }

      if (options.mode == MODE.driving) {
        if (options.from_poi) {
          requestParam.from_poi = options.from_poi;
        }
        if (options.heading) {
          requestParam.heading = options.heading;
        }
        if (options.speed) {
          requestParam.speed = options.speed;
        }
        if (options.accuracy) {
          requestParam.accuracy = options.accuracy;
        }
        if (options.road_type) {
          requestParam.road_type = options.road_type;
        }
        if (options.to_poi) {
          requestParam.to_poi = options.to_poi;
        }
        if (options.from_track) {
          requestParam.from_track = options.from_track;
        }
        if (options.waypoints) {
          requestParam.waypoints = options.waypoints;
        }
        if (options.policy) {
          requestParam.policy = options.policy;
        }
        if (options.plate_number) {
          requestParam.plate_number = options.plate_number;
        }
      }

      if (options.mode == MODE.transit) {
        if (options.departure_time) {
          requestParam.departure_time = options.departure_time;
        }
        if (options.policy) {
          requestParam.policy = options.policy;
        }
      }

      var locationsuccess = function locationsuccess(result) {
        requestParam.from = result.latitude + ',' + result.longitude;
        if (options.sig) {
          requestParam.sig = Utils.getSig(requestParam, options.sig, 'direction', options.mode);
        }
        wx.request(Utils.buildWxRequestConfig(options, {
          url: SET_URL_DIRECTION,
          data: requestParam },
        'direction'));
      };

      Utils.locationProcess(options, locationsuccess);
    } }]);return QQMapWX;}();
;

module.exports = QQMapWX;

/***/ }),
/* 32 */
/*!***********************************************************!*\
  !*** /Users/yuanhy/Desktop/Chat/store/modules/map-poi.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _amapWx = _interopRequireDefault(__webpack_require__(/*! ../../js_sdk/amap-wx.js */ 33));
var _config = __webpack_require__(/*! ./../../utils/config.js */ 34);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


var key = _config.config.mapkey;var _default =

{
  state: {
    is_search: false,
    search_keyword: '',
    search_commodity: '' },

  mutations: {
    SET_SEARCH_KEYWORD: function SET_SEARCH_KEYWORD(state, payload) {
      state.is_search = true;
      state.search_keyword = payload.search_keyword;
    },
    INIT_SEARCH_KEYWORD: function INIT_SEARCH_KEYWORD(state, payload) {
      state.is_search = false;
      state.search_keyword = '';
      state.search_commodity = '';
    },
    SET_SEARCH_COMMODITY: function SET_SEARCH_COMMODITY(state, payload) {
      state.search_commodity = payload.search_commodity;
    },
    ClAEAR_SEARCH_COMMODITY: function ClAEAR_SEARCH_COMMODITY(state, payload) {
      state.search_commodity = '';
    } },


  actions: {
    setSearchCommodity: function setSearchCommodity(_ref,

    search_commodity) {var commit = _ref.commit;
      commit({
        type: 'SET_SEARCH_COMMODITY',
        search_commodity: search_commodity });

    },

    setSearchKeyword: function setSearchKeyword(_ref2,

    search_keyword) {var commit = _ref2.commit;
      commit({
        type: 'SET_SEARCH_KEYWORD',
        search_keyword: search_keyword });

    },

    initSearchKeyword: function initSearchKeyword(_ref3)

    {var commit = _ref3.commit;
      commit({
        type: 'INIT_SEARCH_KEYWORD' });

    },

    clearSearchCommodity: function clearSearchCommodity(_ref4)

    {var commit = _ref4.commit;
      commit({
        type: 'ClAEAR_SEARCH_COMMODITY' });

    },

    getAroundPoi: function getAroundPoi(_ref5,

    data) {var dispatch = _ref5.dispatch;
      return _vue.default.prototype.$http.get('https://restapi.amap.com/v3/place/around?key=' + key +
      '&location=' + data.latitude + ',' + data.longitude + '&keywords=' + data.keywords + '&page=' + data.page +
      '&extensions=' + data.extensions + '&sortrule=' + data.sortrule + '&radius=' + data.radius);
    },

    getInputTips: function getInputTips(_ref6,

    data) {var dispatch = _ref6.dispatch;
      return _vue.default.prototype.$http.get('https://restapi.amap.com/v3/assistant/inputtips?key=' + key + '&keywords=' + data.keywords +
      '&location=' + data.latitude + ',' + data.longitude + '&datatype=' + data.datatype);
    } } };exports.default = _default;

/***/ }),
/* 33 */
/*!****************************************************!*\
  !*** /Users/yuanhy/Desktop/Chat/js_sdk/amap-wx.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function AMapWX(a) {this.key = a.key, this.requestConfig = { key: a.key, s: "rsx", platform: "WXJS", appname: a.key, sdkversion: "1.2.0", logversion: "2.0" };}AMapWX.prototype.getWxLocation = function (a, b) {wx.getLocation({ type: "gcj02", success: function success(a) {var c = a.longitude + "," + a.latitude;wx.setStorage({ key: "userLocation", data: c }), b(c);}, fail: function fail(c) {wx.getStorage({ key: "userLocation", success: function success(a) {a.data && b(a.data);} }), a.fail({ errCode: "0", errMsg: c.errMsg || "" });} });}, AMapWX.prototype.getRegeo = function (a) {function c(c) {var d = b.requestConfig;wx.request({ url: "https://restapi.amap.com/v3/geocode/regeo", data: { key: b.key, location: c, extensions: "all", s: d.s, platform: d.platform, appname: b.key, sdkversion: d.sdkversion, logversion: d.logversion }, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {var d, e, f, g, h, i, j, k, l;b.data.status && "1" == b.data.status ? (d = b.data.regeocode, e = d.addressComponent, f = [], g = "", d && d.roads[0] && d.roads[0].name && (g = d.roads[0].name + "附近"), h = c.split(",")[0], i = c.split(",")[1], d.pois && d.pois[0] && (g = d.pois[0].name + "附近", j = d.pois[0].location, j && (h = parseFloat(j.split(",")[0]), i = parseFloat(j.split(",")[1]))), e.provice && f.push(e.provice), e.city && f.push(e.city), e.district && f.push(e.district), e.streetNumber && e.streetNumber.street && e.streetNumber.number ? (f.push(e.streetNumber.street), f.push(e.streetNumber.number)) : (k = "", d && d.roads[0] && d.roads[0].name && (k = d.roads[0].name), f.push(k)), f = f.join(""), l = [{ iconPath: a.iconPath, width: a.iconWidth, height: a.iconHeight, name: f, desc: g, longitude: h, latitude: i, id: 0, regeocodeData: d }], a.success(l)) : a.fail({ errCode: b.data.infocode, errMsg: b.data.info });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}var b = this;a.location ? c(a.location) : b.getWxLocation(a, function (a) {c(a);});}, AMapWX.prototype.getWeather = function (a) {function d(d) {var e = "base";a.type && "forecast" == a.type && (e = "all"), wx.request({ url: "https://restapi.amap.com/v3/weather/weatherInfo", data: { key: b.key, city: d, extensions: e, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion }, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {function c(a) {var b = { city: { text: "城市", data: a.city }, weather: { text: "天气", data: a.weather }, temperature: { text: "温度", data: a.temperature }, winddirection: { text: "风向", data: a.winddirection + "风" }, windpower: { text: "风力", data: a.windpower + "级" }, humidity: { text: "湿度", data: a.humidity + "%" } };return b;}var d, e;b.data.status && "1" == b.data.status ? b.data.lives ? (d = b.data.lives, d && d.length > 0 && (d = d[0], e = c(d), e["liveData"] = d, a.success(e))) : b.data.forecasts && b.data.forecasts[0] && a.success({ forecast: b.data.forecasts[0] }) : a.fail({ errCode: b.data.infocode, errMsg: b.data.info });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}function e(e) {wx.request({ url: "https://restapi.amap.com/v3/geocode/regeo", data: { key: b.key, location: e, extensions: "all", s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion }, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {var c, e;b.data.status && "1" == b.data.status ? (e = b.data.regeocode, e.addressComponent ? c = e.addressComponent.adcode : e.aois && e.aois.length > 0 && (c = e.aois[0].adcode), d(c)) : a.fail({ errCode: b.data.infocode, errMsg: b.data.info });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}var b = this,c = b.requestConfig;a.city ? d(a.city) : b.getWxLocation(a, function (a) {e(a);});}, AMapWX.prototype.getPoiAround = function (a) {function d(d) {var e = { key: b.key, location: d, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.querytypes && (e["types"] = a.querytypes), a.querykeywords && (e["keywords"] = a.querykeywords), wx.request({ url: "https://restapi.amap.com/v3/place/around", data: e, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {var c, d, e, f;if (b.data.status && "1" == b.data.status) {if (b = b.data, b && b.pois) {for (c = [], d = 0; d < b.pois.length; d++) {e = 0 == d ? a.iconPathSelected : a.iconPath, c.push({ latitude: parseFloat(b.pois[d].location.split(",")[1]), longitude: parseFloat(b.pois[d].location.split(",")[0]), iconPath: e, width: 22, height: 32, id: d, name: b.pois[d].name, address: b.pois[d].address });}f = { markers: c, poisData: b.pois }, a.success(f);}} else a.fail({ errCode: b.data.infocode, errMsg: b.data.info });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}var b = this,c = b.requestConfig;a.location ? d(a.location) : b.getWxLocation(a, function (a) {d(a);});}, AMapWX.prototype.getStaticmap = function (a) {function f(b) {c.push("location=" + b), a.zoom && c.push("zoom=" + a.zoom), a.size && c.push("size=" + a.size), a.scale && c.push("scale=" + a.scale), a.markers && c.push("markers=" + a.markers), a.labels && c.push("labels=" + a.labels), a.paths && c.push("paths=" + a.paths), a.traffic && c.push("traffic=" + a.traffic);var e = d + c.join("&");a.success({ url: e });}var e,b = this,c = [],d = "https://restapi.amap.com/v3/staticmap?";c.push("key=" + b.key), e = b.requestConfig, c.push("s=" + e.s), c.push("platform=" + e.platform), c.push("appname=" + e.appname), c.push("sdkversion=" + e.sdkversion), c.push("logversion=" + e.logversion), a.location ? f(a.location) : b.getWxLocation(a, function (a) {f(a);});}, AMapWX.prototype.getInputtips = function (a) {var b = this,c = b.requestConfig,d = { key: b.key, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.location && (d["location"] = a.location), a.keywords && (d["keywords"] = a.keywords), a.type && (d["type"] = a.type), a.city && (d["city"] = a.city), a.citylimit && (d["citylimit"] = a.citylimit), wx.request({ url: "https://restapi.amap.com/v3/assistant/inputtips", data: d, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {b && b.data && b.data.tips && a.success({ tips: b.data.tips });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}, AMapWX.prototype.getDrivingRoute = function (a) {var b = this,c = b.requestConfig,d = { key: b.key, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.origin && (d["origin"] = a.origin), a.destination && (d["destination"] = a.destination), a.strategy && (d["strategy"] = a.strategy), a.waypoints && (d["waypoints"] = a.waypoints), a.avoidpolygons && (d["avoidpolygons"] = a.avoidpolygons), a.avoidroad && (d["avoidroad"] = a.avoidroad), wx.request({ url: "https://restapi.amap.com/v3/direction/driving", data: d, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {b && b.data && b.data.route && a.success({ paths: b.data.route.paths, taxi_cost: b.data.route.taxi_cost || "" });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}, AMapWX.prototype.getWalkingRoute = function (a) {var b = this,c = b.requestConfig,d = { key: b.key, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.origin && (d["origin"] = a.origin), a.destination && (d["destination"] = a.destination), wx.request({ url: "https://restapi.amap.com/v3/direction/walking", data: d, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {b && b.data && b.data.route && a.success({ paths: b.data.route.paths });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}, AMapWX.prototype.getTransitRoute = function (a) {var b = this,c = b.requestConfig,d = { key: b.key, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.origin && (d["origin"] = a.origin), a.destination && (d["destination"] = a.destination), a.strategy && (d["strategy"] = a.strategy), a.city && (d["city"] = a.city), a.cityd && (d["cityd"] = a.cityd), wx.request({ url: "https://restapi.amap.com/v3/direction/transit/integrated", data: d, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {if (b && b.data && b.data.route) {var c = b.data.route;a.success({ distance: c.distance || "", taxi_cost: c.taxi_cost || "", transits: c.transits });}}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}, AMapWX.prototype.getRidingRoute = function (a) {var b = this,c = b.requestConfig,d = { key: b.key, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.origin && (d["origin"] = a.origin), a.destination && (d["destination"] = a.destination), wx.request({ url: "https://restapi.amap.com/v4/direction/bicycling", data: d, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {b && b.data && b.data.data && a.success({ paths: b.data.data.paths });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}, module.exports.AMapWX = AMapWX;

/***/ }),
/* 34 */
/*!**************************************************!*\
  !*** /Users/yuanhy/Desktop/Chat/utils/config.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.config = void 0;var config = {
  api_base_url: 'http://school.test/api/',
  uploadImageUrl: 'https://community-storage.oss-cn-hangzhou.aliyuncs.com/',
  AccessKeySecret: 'wiRIdhRvXwC2ZEasZQOLgM88S3X7sn',
  OSSAccessKeyId: 'LTAIC5QjlnsVbLA4',
  timeout: 80000, //这个是上传文件时Policy的失效时间
  mapkey: 'e6385f2595bf744cc4b92374eb502d49' };exports.config = config;

/***/ }),
/* 35 */
/*!****************************************************************!*\
  !*** /Users/yuanhy/Desktop/Chat/store/modules/notification.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =

{
  state: {
    notification_display: false,
    notification_content: '',
    notification_type: '' },


  mutations: {

    SET_NOTIFICATION: function SET_NOTIFICATION(state, payload) {
      state.notification_display = true;
      state.notification_content = payload.notification_content;
      state.notification_type = payload.notification_type;
    },

    INIT_NOTIFICATION: function INIT_NOTIFICATION(state) {
      state.notification_display = false;
      state.notification_content = '';
      state.notification_type = '';
      console.log(state);
    } },


  actions: {
    setNotification: function setNotification(_ref,


    data) {var commit = _ref.commit,dispatch = _ref.dispatch;
      commit({
        type: 'SET_NOTIFICATION',
        notification_content: data.notification_content,
        notification_type: data.notification_type });

    },

    initNotification: function initNotification(_ref2)

    {var commit = _ref2.commit;
      commit({
        type: 'INIT_NOTIFICATION' });

    } } };exports.default = _default;

/***/ }),
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */
/*!***********************************************************************************************!*\
  !*** /Users/yuanhy/Desktop/Chat/pages/addition/addition.css?vue&type=style&index=0&lang=css& ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_addition_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/css-loader??ref--6-oneOf-1-2!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!./addition.css?vue&type=style&index=0&lang=css& */ 42);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_addition_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_addition_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_addition_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_addition_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_addition_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 42 */
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!/Users/yuanhy/Desktop/Chat/pages/addition/addition.css?vue&type=style&index=0&lang=css& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */
/*!*****************************************************************************************************************************!*\
  !*** /Users/yuanhy/Desktop/Chat/pages/information/information.css?vue&type=style&index=0&id=34b500aa&scoped=true&lang=css& ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_information_css_vue_type_style_index_0_id_34b500aa_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/css-loader??ref--6-oneOf-1-2!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!./information.css?vue&type=style&index=0&id=34b500aa&scoped=true&lang=css& */ 49);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_information_css_vue_type_style_index_0_id_34b500aa_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_information_css_vue_type_style_index_0_id_34b500aa_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_information_css_vue_type_style_index_0_id_34b500aa_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_information_css_vue_type_style_index_0_id_34b500aa_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_information_css_vue_type_style_index_0_id_34b500aa_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 49 */
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!/Users/yuanhy/Desktop/Chat/pages/information/information.css?vue&type=style&index=0&id=34b500aa&scoped=true&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */
/*!*****************************************************************************************!*\
  !*** /Users/yuanhy/Desktop/Chat/pages/store/store.css?vue&type=style&index=0&lang=css& ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_store_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/css-loader??ref--6-oneOf-1-2!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!./store.css?vue&type=style&index=0&lang=css& */ 56);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_store_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_store_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_store_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_store_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_store_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 56 */
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!/Users/yuanhy/Desktop/Chat/pages/store/store.css?vue&type=style&index=0&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */
/*!*************************************************************************************************!*\
  !*** /Users/yuanhy/Desktop/Chat/pages/discovery/discovery.css?vue&type=style&index=0&lang=css& ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_discovery_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/css-loader??ref--6-oneOf-1-2!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!./discovery.css?vue&type=style&index=0&lang=css& */ 63);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_discovery_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_discovery_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_discovery_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_discovery_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_discovery_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 63 */
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!/Users/yuanhy/Desktop/Chat/pages/discovery/discovery.css?vue&type=style&index=0&lang=css& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */
/*!******************************************************!*\
  !*** /Users/yuanhy/Desktop/Chat/utils/high-light.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.highLightMsg = highLightMsg;function highLightMsg(msg, highLightStr) {
  if (msg == null) {
    msg = '';
  }
  if (highLightStr == null) {
    highLightStr = '';
  }
  if (msg instanceof Object) {
    msg = JSON.stringify(msg);
  }
  if (highLightStr instanceof Object) {
    highLightStr = JSON.stringify(highLightStr);
  }
  if (!(msg instanceof String)) {
    msg = msg.toString();
  }
  if (!(highLightStr instanceof String)) {
    highLightStr = highLightStr.toString();
  }
  var htmlStr = '';
  if (highLightStr.length > 0) {
    if (msg.indexOf(highLightStr) !== -1) {
      assemblyStr(msg, highLightStr);
    } else {
      htmlStr = '<span>' + msg + '</span>';
    }
  } else {
    htmlStr = '<span>' + msg + '</span>';
  }

  function assemblyStr(msgAssembly, highLightAssembly) {
    if (msgAssembly.indexOf(highLightAssembly) !== -1) {
      var length = highLightAssembly.length;
      var start = msgAssembly.indexOf(highLightAssembly);
      htmlStr = htmlStr + '<span>' + msgAssembly.substring(0, start) + '</span>' + '<span class="high-light">' +
      highLightAssembly + '</span>';
      msgAssembly = msgAssembly.substring(start + length, msgAssembly.length);
      assemblyStr(msgAssembly, highLightAssembly);
    } else {
      htmlStr = htmlStr + '<span>' + msgAssembly + '</span>';
    }
  }
  return htmlStr;
}

/***/ }),
/* 70 */
/*!*******************************************************************************************!*\
  !*** /Users/yuanhy/Desktop/Chat/pages/search/search.css?vue&type=style&index=0&lang=css& ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_search_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/css-loader??ref--6-oneOf-1-2!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!./search.css?vue&type=style&index=0&lang=css& */ 71);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_search_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_search_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_search_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_search_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_search_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 71 */
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!/Users/yuanhy/Desktop/Chat/pages/search/search.css?vue&type=style&index=0&lang=css& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */
/*!*****************************************************************************************!*\
  !*** /Users/yuanhy/Desktop/Chat/pages/index/index.css?vue&type=style&index=0&lang=css& ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_index_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/css-loader??ref--6-oneOf-1-2!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!./index.css?vue&type=style&index=0&lang=css& */ 79);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_index_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_index_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_index_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_index_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_index_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 79 */
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!/Users/yuanhy/Desktop/Chat/pages/index/index.css?vue&type=style&index=0&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */
/*!***********************************************************************************************!*\
  !*** /Users/yuanhy/Desktop/Chat/pages/location/location.css?vue&type=style&index=0&lang=css& ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_location_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/css-loader??ref--6-oneOf-1-2!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!./location.css?vue&type=style&index=0&lang=css& */ 90);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_location_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_location_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_location_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_location_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_location_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 90 */
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!/Users/yuanhy/Desktop/Chat/pages/location/location.css?vue&type=style&index=0&lang=css& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */
/*!******************************************************!*\
  !*** /Users/yuanhy/Desktop/Chat/utils/uploadFile.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.uploadVideo = exports.uploadFile = void 0;var _config = __webpack_require__(/*! ./config.js */ 34);



var base64 = __webpack_require__(/*! ./base64.js */ 99); //Base64,hmac,sha1,crypto相关算法
__webpack_require__(/*! ./hmac.js */ 100);
__webpack_require__(/*! ./sha1.js */ 102);

var Crypto = __webpack_require__(/*! ./crypto.js */ 101);

/*
                                      *上传文件到阿里云oss
                                      *@param - filePath :图片的本地资源路径
                                      *@param - dir:表示要传到哪个目录下
                                      */

var uploadFile = function uploadFile(filePath, dir) {
  if (!filePath || filePath.length < 9) {
    wx.showModal({
      title: '图片错误',
      content: '请重试',
      showCancel: false });

    return;
  }
  //图片名字 可以自行定义，     这里是采用当前的时间戳 + 150内的随机数来给图片命名的
  var aliyunFileKey = dir + new Date().getTime() + Math.floor(Math.random() * 150) + '.png';

  var aliyunServerURL = _config.config.uploadImageUrl; //OSS地址，需要https
  var accessid = _config.config.OSSAccessKeyId;
  var policyBase64 = getPolicyBase64();
  var signature = getSignature(policyBase64); //获取签名

  return new Promise(function (resolve, reject) {
    // for (let index = 0; index < filePath.length; index++) {
    qq.uploadFile({
      url: aliyunServerURL, //开发者服务器 url
      filePath: filePath, //要上传文件资源的路径
      name: 'file', //必须填file
      formData: {
        'key': aliyunFileKey,
        'policy': policyBase64,
        'OSSAccessKeyId': accessid,
        'signature': signature,
        'success_action_status': '200' },

      success: function success(res) {
        if (res.statusCode != 200) {
          reject(new Error('上传错误:' + JSON.stringify(res)));
        }
        resolve(aliyunServerURL + aliyunFileKey);
      },
      fail: function fail(err) {
        err.wxaddinfo = aliyunServerURL;
        reject(err);
      } });

    // }
  });
};exports.uploadFile = uploadFile;


var uploadVideo = function uploadVideo(filePath, dir) {
  if (!filePath) {
    wx.showModal({
      title: '上传失败',
      content: '请重试',
      showCancel: false });

    return;
  }
  //图片名字 可以自行定义，     这里是采用当前的时间戳 + 150内的随机数来给图片命名的
  var aliyunFileKey = dir + new Date().getTime() + Math.floor(Math.random() * 150) + '.mp4';

  var aliyunServerURL = _config.config.uploadImageUrl; //OSS地址，需要https
  var accessid = _config.config.OSSAccessKeyId;
  var policyBase64 = getPolicyBase64();
  var signature = getSignature(policyBase64); //获取签名

  return new Promise(function (resolve, reject) {
    wx.uploadFile({
      url: aliyunServerURL, //开发者服务器 url
      filePath: filePath, //要上传文件资源的路径
      name: 'file', //必须填file
      formData: {
        'key': aliyunFileKey,
        'policy': policyBase64,
        'OSSAccessKeyId': accessid,
        'signature': signature,
        'success_action_status': '200' },

      success: function success(res) {
        if (res.statusCode != 200) {
          reject(new Error('上传错误:' + JSON.stringify(res)));
        }
        resolve(aliyunServerURL + aliyunFileKey);
      },
      fail: function fail(err) {
        err.wxaddinfo = aliyunServerURL;
        reject(err);
      } });

  });
};exports.uploadVideo = uploadVideo;

var getPolicyBase64 = function getPolicyBase64() {
  var date = new Date();
  date.setHours(date.getHours() + _config.config.timeout);
  var srcT = date.toISOString();
  var policyText = {
    "expiration": srcT, //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了 
    "conditions": [
    ["content-length-range", 0, 50 * 1024 * 1024] // 设置上传文件的大小限制,5mb
    ] };


  var policyBase64 = base64.encode(JSON.stringify(policyText));
  return policyBase64;
};

var getSignature = function getSignature(policyBase64) {
  var accesskey = _config.config.AccessKeySecret;

  var bytes = Crypto.HMAC(Crypto.SHA1, policyBase64, accesskey, {
    asBytes: true });

  var signature = Crypto.util.bytesToBase64(bytes);

  return signature;
};

/***/ }),
/* 99 */
/*!**************************************************!*\
  !*** /Users/yuanhy/Desktop/Chat/utils/base64.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array(
-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
-1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
function encode(str) {
  var out, i, len;
  var c1, c2, c3;
  len = str.length;
  i = 0;
  out = "";
  while (i < len) {
    c1 = str.charCodeAt(i++) & 0xff;
    if (i == len) {
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt((c1 & 0x3) << 4);
      out += "==";
      break;
    }
    c2 = str.charCodeAt(i++);
    if (i == len) {
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt((c1 & 0x3) << 4 | (c2 & 0xF0) >> 4);
      out += base64EncodeChars.charAt((c2 & 0xF) << 2);
      out += "=";
      break;
    }
    c3 = str.charCodeAt(i++);
    out += base64EncodeChars.charAt(c1 >> 2);
    out += base64EncodeChars.charAt((c1 & 0x3) << 4 | (c2 & 0xF0) >> 4);
    out += base64EncodeChars.charAt((c2 & 0xF) << 2 | (c3 & 0xC0) >> 6);
    out += base64EncodeChars.charAt(c3 & 0x3F);
  }
  return out;
}
function decode(str) {
  var c1, c2, c3, c4;
  var i, len, out;
  len = str.length;
  i = 0;
  out = "";
  while (i < len) {
    /* c1 */
    do {
      c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
    } while (i < len && c1 == -1);
    if (c1 == -1)
    break;
    /* c2 */
    do {
      c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
    } while (i < len && c2 == -1);
    if (c2 == -1)
    break;
    out += String.fromCharCode(c1 << 2 | (c2 & 0x30) >> 4);
    /* c3 */
    do {
      c3 = str.charCodeAt(i++) & 0xff;
      if (c3 == 61)
      return out;
      c3 = base64DecodeChars[c3];
    } while (i < len && c3 == -1);
    if (c3 == -1)
    break;
    out += String.fromCharCode((c2 & 0XF) << 4 | (c3 & 0x3C) >> 2);
    /* c4 */
    do {
      c4 = str.charCodeAt(i++) & 0xff;
      if (c4 == 61)
      return out;
      c4 = base64DecodeChars[c4];
    } while (i < len && c4 == -1);
    if (c4 == -1)
    break;
    out += String.fromCharCode((c3 & 0x03) << 6 | c4);
  }
  return out;
}


function utf16to8(str) {
  var out, i, len, c;
  out = "";
  len = str.length;
  for (i = 0; i < len; i++) {
    c = str.charCodeAt(i);
    if (c >= 0x0001 && c <= 0x007F) {
      out += str.charAt(i);
    } else if (c > 0x07FF) {
      out += String.fromCharCode(0xE0 | c >> 12 & 0x0F);
      out += String.fromCharCode(0x80 | c >> 6 & 0x3F);
      out += String.fromCharCode(0x80 | c >> 0 & 0x3F);
    } else {
      out += String.fromCharCode(0xC0 | c >> 6 & 0x1F);
      out += String.fromCharCode(0x80 | c >> 0 & 0x3F);
    }
  }
  return out;
}
function utf8to16(str) {
  var out, i, len, c;
  var char2, char3;
  out = "";
  len = str.length;
  i = 0;
  while (i < len) {
    c = str.charCodeAt(i++);
    switch (c >> 4) {
      case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:
        // 0xxxxxxx
        out += str.charAt(i - 1);
        break;
      case 12:case 13:
        // 110x xxxx 10xx xxxx
        char2 = str.charCodeAt(i++);
        out += String.fromCharCode((c & 0x1F) << 6 | char2 & 0x3F);
        break;
      case 14:
        // 1110 xxxx 10xx xxxx 10xx xxxx
        char2 = str.charCodeAt(i++);
        char3 = str.charCodeAt(i++);
        out += String.fromCharCode((c & 0x0F) << 12 |
        (char2 & 0x3F) << 6 |
        (char3 & 0x3F) << 0);
        break;}

  }
  return out;
}


module.exports = {
  encode: encode,
  decode: decode,
  utf16to8: utf16to8,
  utf8to16: utf8to16 };

/***/ }),
/* 100 */
/*!************************************************!*\
  !*** /Users/yuanhy/Desktop/Chat/utils/hmac.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var Crypto = __webpack_require__(/*! ./crypto.js */ 101);

(function () {

  // Shortcut
  var util = Crypto.util;

  Crypto.HMAC = function (hasher, message, key, options) {

    // Allow arbitrary length keys
    key = key.length > hasher._blocksize * 4 ?
    hasher(key, {
      asBytes: true }) :

    util.stringToBytes(key);

    // XOR keys with pad constants
    var okey = key,
    ikey = key.slice(0);
    for (var i = 0; i < hasher._blocksize * 4; i++) {
      okey[i] ^= 0x5C;
      ikey[i] ^= 0x36;
    }

    var hmacbytes = hasher(util.bytesToString(okey) +
    hasher(util.bytesToString(ikey) + message, {
      asString: true }),
    {
      asBytes: true });

    return options && options.asBytes ? hmacbytes :
    options && options.asString ? util.bytesToString(hmacbytes) :
    util.bytesToHex(hmacbytes);

  };

})();

module.exports = Crypto;

/***/ }),
/* 101 */
/*!**************************************************!*\
  !*** /Users/yuanhy/Desktop/Chat/utils/crypto.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var Crypto = {};

(function () {

  var base64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";


  // Crypto utilities
  var util = Crypto.util = {

    // Bit-wise rotate left
    rotl: function rotl(n, b) {
      return n << b | n >>> 32 - b;
    },

    // Bit-wise rotate right
    rotr: function rotr(n, b) {
      return n << 32 - b | n >>> b;
    },

    // Swap big-endian to little-endian and vice versa
    endian: function endian(n) {

      // If number given, swap endian
      if (n.constructor == Number) {
        return util.rotl(n, 8) & 0x00FF00FF |
        util.rotl(n, 24) & 0xFF00FF00;
      }

      // Else, assume array and swap all items
      for (var i = 0; i < n.length; i++) {
        n[i] = util.endian(n[i]);}
      return n;

    },

    // Generate an array of any length of random bytes
    randomBytes: function randomBytes(n) {
      for (var bytes = []; n > 0; n--) {
        bytes.push(Math.floor(Math.random() * 256));}
      return bytes;
    },

    // Convert a string to a byte array
    stringToBytes: function stringToBytes(str) {
      var bytes = [];
      for (var i = 0; i < str.length; i++) {
        bytes.push(str.charCodeAt(i));}
      return bytes;
    },

    // Convert a byte array to a string
    bytesToString: function bytesToString(bytes) {
      var str = [];
      for (var i = 0; i < bytes.length; i++) {
        str.push(String.fromCharCode(bytes[i]));}
      return str.join("");
    },

    // Convert a string to big-endian 32-bit words
    stringToWords: function stringToWords(str) {
      var words = [];
      for (var c = 0, b = 0; c < str.length; c++, b += 8) {
        words[b >>> 5] |= str.charCodeAt(c) << 24 - b % 32;}
      return words;
    },

    // Convert a byte array to big-endian 32-bits words
    bytesToWords: function bytesToWords(bytes) {
      var words = [];
      for (var i = 0, b = 0; i < bytes.length; i++, b += 8) {
        words[b >>> 5] |= bytes[i] << 24 - b % 32;}
      return words;
    },

    // Convert big-endian 32-bit words to a byte array
    wordsToBytes: function wordsToBytes(words) {
      var bytes = [];
      for (var b = 0; b < words.length * 32; b += 8) {
        bytes.push(words[b >>> 5] >>> 24 - b % 32 & 0xFF);}
      return bytes;
    },

    // Convert a byte array to a hex string
    bytesToHex: function bytesToHex(bytes) {
      var hex = [];
      for (var i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
      }
      return hex.join("");
    },

    // Convert a hex string to a byte array
    hexToBytes: function hexToBytes(hex) {
      var bytes = [];
      for (var c = 0; c < hex.length; c += 2) {
        bytes.push(parseInt(hex.substr(c, 2), 16));}
      return bytes;
    },

    // Convert a byte array to a base-64 string
    bytesToBase64: function bytesToBase64(bytes) {

      // Use browser-native function if it exists
      if (typeof btoa == "function") return btoa(util.bytesToString(bytes));

      var base64 = [],
      overflow;

      for (var i = 0; i < bytes.length; i++) {
        switch (i % 3) {
          case 0:
            base64.push(base64map.charAt(bytes[i] >>> 2));
            overflow = (bytes[i] & 0x3) << 4;
            break;
          case 1:
            base64.push(base64map.charAt(overflow | bytes[i] >>> 4));
            overflow = (bytes[i] & 0xF) << 2;
            break;
          case 2:
            base64.push(base64map.charAt(overflow | bytes[i] >>> 6));
            base64.push(base64map.charAt(bytes[i] & 0x3F));
            overflow = -1;}

      }

      // Encode overflow bits, if there are any
      if (overflow != undefined && overflow != -1)
      base64.push(base64map.charAt(overflow));

      // Add padding
      while (base64.length % 4 != 0) {base64.push("=");}

      return base64.join("");

    },

    // Convert a base-64 string to a byte array
    base64ToBytes: function base64ToBytes(base64) {

      // Use browser-native function if it exists
      if (typeof atob == "function") return util.stringToBytes(atob(base64));

      // Remove non-base-64 characters
      base64 = base64.replace(/[^A-Z0-9+\/]/ig, "");

      var bytes = [];

      for (var i = 0; i < base64.length; i++) {
        switch (i % 4) {
          case 1:
            bytes.push(base64map.indexOf(base64.charAt(i - 1)) << 2 |
            base64map.indexOf(base64.charAt(i)) >>> 4);
            break;
          case 2:
            bytes.push((base64map.indexOf(base64.charAt(i - 1)) & 0xF) << 4 |
            base64map.indexOf(base64.charAt(i)) >>> 2);
            break;
          case 3:
            bytes.push((base64map.indexOf(base64.charAt(i - 1)) & 0x3) << 6 |
            base64map.indexOf(base64.charAt(i)));
            break;}

      }

      return bytes;

    } };



  // Crypto mode namespace
  Crypto.mode = {};

})();

module.exports = Crypto;

/***/ }),
/* 102 */
/*!************************************************!*\
  !*** /Users/yuanhy/Desktop/Chat/utils/sha1.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var Crypto = __webpack_require__(/*! ./crypto.js */ 101);

(function () {

  // Shortcut
  var util = Crypto.util;

  // Public API
  var SHA1 = Crypto.SHA1 = function (message, options) {
    var digestbytes = util.wordsToBytes(SHA1._sha1(message));
    return options && options.asBytes ? digestbytes :
    options && options.asString ? util.bytesToString(digestbytes) :
    util.bytesToHex(digestbytes);
  };

  // The core
  SHA1._sha1 = function (message) {

    var m = util.stringToWords(message),
    l = message.length * 8,
    w = [],
    H0 = 1732584193,
    H1 = -271733879,
    H2 = -1732584194,
    H3 = 271733878,
    H4 = -1009589776;

    // Padding
    m[l >> 5] |= 0x80 << 24 - l % 32;
    m[(l + 64 >>> 9 << 4) + 15] = l;

    for (var i = 0; i < m.length; i += 16) {

      var a = H0,
      b = H1,
      c = H2,
      d = H3,
      e = H4;

      for (var j = 0; j < 80; j++) {

        if (j < 16) w[j] = m[i + j];else
        {
          var n = w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16];
          w[j] = n << 1 | n >>> 31;
        }

        var t = (H0 << 5 | H0 >>> 27) + H4 + (w[j] >>> 0) + (
        j < 20 ? (H1 & H2 | ~H1 & H3) + 1518500249 :
        j < 40 ? (H1 ^ H2 ^ H3) + 1859775393 :
        j < 60 ? (H1 & H2 | H1 & H3 | H2 & H3) - 1894007588 :
        (H1 ^ H2 ^ H3) - 899497514);

        H4 = H3;
        H3 = H2;
        H2 = H1 << 30 | H1 >>> 2;
        H1 = H0;
        H0 = t;

      }

      H0 += a;
      H1 += b;
      H2 += c;
      H3 += d;
      H4 += e;

    }

    return [H0, H1, H2, H3, H4];

  };

  // Package private blocksize
  SHA1._blocksize = 16;

})();

module.exports = Crypto;

/***/ }),
/* 103 */
/*!************************************************!*\
  !*** /Users/yuanhy/Desktop/Chat/utils/util.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var formatTime = function formatTime(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();

  return [year, month, day].map(formatNumber).join('/') + '/' + [hour, minute, second].map(formatNumber).join(':');
};

var formatNumber = function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
};

module.exports = {
  formatTime: formatTime };

/***/ }),
/* 104 */
/*!***************************************************************************************************************!*\
  !*** /Users/yuanhy/Desktop/Chat/pages/addition-article/addition-article.css?vue&type=style&index=0&lang=css& ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_addition_article_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/css-loader??ref--6-oneOf-1-2!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!./addition-article.css?vue&type=style&index=0&lang=css& */ 105);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_addition_article_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_addition_article_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_addition_article_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_addition_article_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_addition_article_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 105 */
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!/Users/yuanhy/Desktop/Chat/pages/addition-article/addition-article.css?vue&type=style&index=0&lang=css& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */
/*!*****************************************************************************************************************!*\
  !*** /Users/yuanhy/Desktop/Chat/pages/addition-activity/addition-acticity.css?vue&type=style&index=0&lang=css& ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_addition_acticity_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/css-loader??ref--6-oneOf-1-2!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!./addition-acticity.css?vue&type=style&index=0&lang=css& */ 113);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_addition_acticity_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_addition_acticity_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_addition_acticity_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_addition_acticity_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_addition_acticity_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 113 */
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!/Users/yuanhy/Desktop/Chat/pages/addition-activity/addition-acticity.css?vue&type=style&index=0&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */
/*!*******************************************************************************************************************!*\
  !*** /Users/yuanhy/Desktop/Chat/pages/addition-commodity/addition-commodity.css?vue&type=style&index=0&lang=css& ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_addition_commodity_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/css-loader??ref--6-oneOf-1-2!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!./addition-commodity.css?vue&type=style&index=0&lang=css& */ 121);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_addition_commodity_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_addition_commodity_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_addition_commodity_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_addition_commodity_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_addition_commodity_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 121 */
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!/Users/yuanhy/Desktop/Chat/pages/addition-commodity/addition-commodity.css?vue&type=style&index=0&lang=css& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */
/*!***************************************************************************************************************!*\
  !*** /Users/yuanhy/Desktop/Chat/pages/search-commodity/search-commodity.css?vue&type=style&index=0&lang=css& ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_search_commodity_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/css-loader??ref--6-oneOf-1-2!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!./search-commodity.css?vue&type=style&index=0&lang=css& */ 130);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_search_commodity_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_search_commodity_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_search_commodity_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_search_commodity_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_search_commodity_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 130 */
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!/Users/yuanhy/Desktop/Chat/pages/search-commodity/search-commodity.css?vue&type=style&index=0&lang=css& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */
/*!*************************************************************************************************!*\
  !*** /Users/yuanhy/Desktop/Chat/pages/commodity/commodity.css?vue&type=style&index=0&lang=css& ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_commodity_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/css-loader??ref--6-oneOf-1-2!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!./commodity.css?vue&type=style&index=0&lang=css& */ 138);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_commodity_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_commodity_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_commodity_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_commodity_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_commodity_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 138 */
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!/Users/yuanhy/Desktop/Chat/pages/commodity/commodity.css?vue&type=style&index=0&lang=css& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */
/*!*****************************************************************!*\
  !*** /Users/yuanhy/Desktop/Chat/pages/choose-index/school.json ***!
  \*****************************************************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 356, 357, 358, 359, 360, 361, 362, 363, 364, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479, 480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 495, 496, 497, 498, 499, 500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511, 512, 513, 514, 515, 516, 517, 518, 519, 520, 521, 522, 523, 524, 525, 526, 527, 528, 529, 530, 531, 532, 533, 534, 535, 536, 537, 538, 539, 540, 541, 542, 543, 544, 545, 546, 547, 548, 549, 550, 551, 552, 553, 554, 555, 556, 557, 558, 559, 560, 561, 562, 563, 564, 565, 566, 567, 568, 569, 570, 571, 572, 573, 574, 575, 576, 577, 578, 579, 580, 581, 582, 583, 584, 585, 586, 587, 588, 589, 590, 591, 592, 593, 594, 595, 596, 597, 598, 599, 600, 601, 602, 603, 604, 605, 606, 607, 608, 609, 610, 611, 612, 613, 614, 615, 616, 617, 618, 619, 620, 621, 622, 623, 624, 625, 626, 627, 628, 629, 630, 631, 632, 633, 634, 635, 636, 637, 638, 639, 640, 641, 642, 643, 644, 645, 646, 647, 648, 649, 650, 651, 652, 653, 654, 655, 656, 657, 658, 659, 660, 661, 662, 663, 664, 665, 666, 667, 668, 669, 670, 671, 672, 673, 674, 675, 676, 677, 678, 679, 680, 681, 682, 683, 684, 685, 686, 687, 688, 689, 690, 691, 692, 693, 694, 695, 696, 697, 698, 699, 700, 701, 702, 703, 704, 705, 706, 707, 708, 709, 710, 711, 712, 713, 714, 715, 716, 717, 718, 719, 720, 721, 722, 723, 724, 725, 726, 727, 728, 729, 730, 731, 732, 733, 734, 735, 736, 737, 738, 739, 740, 741, 742, 743, 744, 745, 746, 747, 748, 749, 750, 751, 752, 753, 754, 755, 756, 757, 758, 759, 760, 761, 762, 763, 764, 765, 766, 767, 768, 769, 770, 771, 772, 773, 774, 775, 776, 777, 778, 779, 780, 781, 782, 783, 784, 785, 786, 787, 788, 789, 790, 791, 792, 793, 794, 795, 796, 797, 798, 799, 800, 801, 802, 803, 804, 805, 806, 807, 808, 809, 810, 811, 812, 813, 814, 815, 816, 817, 818, 819, 820, 821, 822, 823, 824, 825, 826, 827, 828, 829, 830, 831, 832, 833, 834, 835, 836, 837, 838, 839, 840, 841, 842, 843, 844, 845, 846, 847, 848, 849, 850, 851, 852, 853, 854, 855, 856, 857, 858, 859, 860, 861, 862, 863, 864, 865, 866, 867, 868, 869, 870, 871, 872, 873, 874, 875, 876, 877, 878, 879, 880, 881, 882, 883, 884, 885, 886, 887, 888, 889, 890, 891, 892, 893, 894, 895, 896, 897, 898, 899, 900, 901, 902, 903, 904, 905, 906, 907, 908, 909, 910, 911, 912, 913, 914, 915, 916, 917, 918, 919, 920, 921, 922, 923, 924, 925, 926, 927, 928, 929, 930, 931, 932, 933, 934, 935, 936, 937, 938, 939, 940, 941, 942, 943, 944, 945, 946, 947, 948, 949, 950, 951, 952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 962, 963, 964, 965, 966, 967, 968, 969, 970, 971, 972, 973, 974, 975, 976, 977, 978, 979, 980, 981, 982, 983, 984, 985, 986, 987, 988, 989, 990, 991, 992, 993, 994, 995, 996, 997, 998, 999, 1000, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012, 1013, 1014, 1015, 1016, 1017, 1018, 1019, 1020, 1021, 1022, 1023, 1024, 1025, 1026, 1027, 1028, 1029, 1030, 1031, 1032, 1033, 1034, 1035, 1036, 1037, 1038, 1039, 1040, 1041, 1042, 1043, 1044, 1045, 1046, 1047, 1048, 1049, 1050, 1051, 1052, 1053, 1054, 1055, 1056, 1057, 1058, 1059, 1060, 1061, 1062, 1063, 1064, 1065, 1066, 1067, 1068, 1069, 1070, 1071, 1072, 1073, 1074, 1075, 1076, 1077, 1078, 1079, 1080, 1081, 1082, 1083, 1084, 1085, 1086, 1087, 1088, 1089, 1090, 1091, 1092, 1093, 1094, 1095, 1096, 1097, 1098, 1099, 1100, 1101, 1102, 1103, 1104, 1105, 1106, 1107, 1108, 1109, 1110, 1111, 1112, 1113, 1114, 1115, 1116, 1117, 1118, 1119, 1120, 1121, 1122, 1123, 1124, 1125, 1126, 1127, 1128, 1129, 1130, 1131, 1132, 1133, 1134, 1135, 1136, 1137, 1138, 1139, 1140, 1141, 1142, 1143, 1144, 1145, 1146, 1147, 1148, 1149, 1150, 1151, 1152, 1153, 1154, 1155, 1156, 1157, 1158, 1159, 1160, 1161, 1162, 1163, 1164, 1165, 1166, 1167, 1168, 1169, 1170, 1171, 1172, 1173, 1174, 1175, 1176, 1177, 1178, 1179, 1180, 1181, 1182, 1183, 1184, 1185, 1186, 1187, 1188, 1189, 1190, 1191, 1192, 1193, 1194, 1195, 1196, 1197, 1198, 1199, 1200, 1201, 1202, 1203, 1204, 1205, 1206, 1207, 1208, 1209, 1210, 1211, 1212, 1213, 1214, 1215, 1216, 1217, 1218, 1219, 1220, 1221, 1222, 1223, 1224, 1225, 1226, 1227, 1228, 1229, 1230, 1231, 1232, 1233, 1234, 1235, 1236, 1237, 1238, 1239, 1240, 1241, 1242, 1243, 1244, 1245, 1246, 1247, 1248, 1249, 1250, 1251, 1252, 1253, 1254, 1255, 1256, 1257, 1258, 1259, 1260, 1261, 1262, 1263, 1264, 1265, 1266, 1267, 1268, 1269, 1270, 1271, 1272, 1273, 1274, 1275, 1276, 1277, 1278, 1279, 1280, 1281, 1282, 1283, 1284, 1285, 1286, 1287, 1288, 1289, 1290, 1291, 1292, 1293, 1294, 1295, 1296, 1297, 1298, 1299, 1300, 1301, 1302, 1303, 1304, 1305, 1306, 1307, 1308, 1309, 1310, 1311, 1312, 1313, 1314, 1315, 1316, 1317, 1318, 1319, 1320, 1321, 1322, 1323, 1324, 1325, 1326, 1327, 1328, 1329, 1330, 1331, 1332, 1333, 1334, 1335, 1336, 1337, 1338, 1339, 1340, 1341, 1342, 1343, 1344, 1345, 1346, 1347, 1348, 1349, 1350, 1351, 1352, 1353, 1354, 1355, 1356, 1357, 1358, 1359, 1360, 1361, 1362, 1363, 1364, 1365, 1366, 1367, 1368, 1369, 1370, 1371, 1372, 1373, 1374, 1375, 1376, 1377, 1378, 1379, 1380, 1381, 1382, 1383, 1384, 1385, 1386, 1387, 1388, 1389, 1390, 1391, 1392, 1393, 1394, 1395, 1396, 1397, 1398, 1399, 1400, 1401, 1402, 1403, 1404, 1405, 1406, 1407, 1408, 1409, 1410, 1411, 1412, 1413, 1414, 1415, 1416, 1417, 1418, 1419, 1420, 1421, 1422, 1423, 1424, 1425, 1426, 1427, 1428, 1429, 1430, 1431, 1432, 1433, 1434, 1435, 1436, 1437, 1438, 1439, 1440, 1441, 1442, 1443, 1444, 1445, 1446, 1447, 1448, 1449, 1450, 1451, 1452, 1453, 1454, 1455, 1456, 1457, 1458, 1459, 1460, 1461, 1462, 1463, 1464, 1465, 1466, 1467, 1468, 1469, 1470, 1471, 1472, 1473, 1474, 1475, 1476, 1477, 1478, 1479, 1480, 1481, 1482, 1483, 1484, 1485, 1486, 1487, 1488, 1489, 1490, 1491, 1492, 1493, 1494, 1495, 1496, 1497, 1498, 1499, 1500, 1501, 1502, 1503, 1504, 1505, 1506, 1507, 1508, 1509, 1510, 1511, 1512, 1513, 1514, 1515, 1516, 1517, 1518, 1519, 1520, 1521, 1522, 1523, 1524, 1525, 1526, 1527, 1528, 1529, 1530, 1531, 1532, 1533, 1534, 1535, 1536, 1537, 1538, 1539, 1540, 1541, 1542, 1543, 1544, 1545, 1546, 1547, 1548, 1549, 1550, 1551, 1552, 1553, 1554, 1555, 1556, 1557, 1558, 1559, 1560, 1561, 1562, 1563, 1564, 1565, 1566, 1567, 1568, 1569, 1570, 1571, 1572, 1573, 1574, 1575, 1576, 1577, 1578, 1579, 1580, 1581, 1582, 1583, 1584, 1585, 1586, 1587, 1588, 1589, 1590, 1591, 1592, 1593, 1594, 1595, 1596, 1597, 1598, 1599, 1600, 1601, 1602, 1603, 1604, 1605, 1606, 1607, 1608, 1609, 1610, 1611, 1612, 1613, 1614, 1615, 1616, 1617, 1618, 1619, 1620, 1621, 1622, 1623, 1624, 1625, 1626, 1627, 1628, 1629, 1630, 1631, 1632, 1633, 1634, 1635, 1636, 1637, 1638, 1639, 1640, 1641, 1642, 1643, 1644, 1645, 1646, 1647, 1648, 1649, 1650, 1651, 1652, 1653, 1654, 1655, 1656, 1657, 1658, 1659, 1660, 1661, 1662, 1663, 1664, 1665, 1666, 1667, 1668, 1669, 1670, 1671, 1672, 1673, 1674, 1675, 1676, 1677, 1678, 1679, 1680, 1681, 1682, 1683, 1684, 1685, 1686, 1687, 1688, 1689, 1690, 1691, 1692, 1693, 1694, 1695, 1696, 1697, 1698, 1699, 1700, 1701, 1702, 1703, 1704, 1705, 1706, 1707, 1708, 1709, 1710, 1711, 1712, 1713, 1714, 1715, 1716, 1717, 1718, 1719, 1720, 1721, 1722, 1723, 1724, 1725, 1726, 1727, 1728, 1729, 1730, 1731, 1732, 1733, 1734, 1735, 1736, 1737, 1738, 1739, 1740, 1741, 1742, 1743, 1744, 1745, 1746, 1747, 1748, 1749, 1750, 1751, 1752, 1753, 1754, 1755, 1756, 1757, 1758, 1759, 1760, 1761, 1762, 1763, 1764, 1765, 1766, 1767, 1768, 1769, 1770, 1771, 1772, 1773, 1774, 1775, 1776, 1777, 1778, 1779, 1780, 1781, 1782, 1783, 1784, 1785, 1786, 1787, 1788, 1789, 1790, 1791, 1792, 1793, 1794, 1795, 1796, 1797, 1798, 1799, 1800, 1801, 1802, 1803, 1804, 1805, 1806, 1807, 1808, 1809, 1810, 1811, 1812, 1813, 1814, 1815, 1816, 1817, 1818, 1819, 1820, 1821, 1822, 1823, 1824, 1825, 1826, 1827, 1828, 1829, 1830, 1831, 1832, 1833, 1834, 1835, 1836, 1837, 1838, 1839, 1840, 1841, 1842, 1843, 1844, 1845, 1846, 1847, 1848, 1849, 1850, 1851, 1852, 1853, 1854, 1855, 1856, 1857, 1858, 1859, 1860, 1861, 1862, 1863, 1864, 1865, 1866, 1867, 1868, 1869, 1870, 1871, 1872, 1873, 1874, 1875, 1876, 1877, 1878, 1879, 1880, 1881, 1882, 1883, 1884, 1885, 1886, 1887, 1888, 1889, 1890, 1891, 1892, 1893, 1894, 1895, 1896, 1897, 1898, 1899, 1900, 1901, 1902, 1903, 1904, 1905, 1906, 1907, 1908, 1909, 1910, 1911, 1912, 1913, 1914, 1915, 1916, 1917, 1918, 1919, 1920, 1921, 1922, 1923, 1924, 1925, 1926, 1927, 1928, 1929, 1930, 1931, 1932, 1933, 1934, 1935, 1936, 1937, 1938, 1939, 1940, 1941, 1942, 1943, 1944, 1945, 1946, 1947, 1948, 1949, 1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959, 1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039, 2040, 2041, 2042, 2043, 2044, 2045, 2046, 2047, 2048, 2049, 2050, 2051, 2052, 2053, 2054, 2055, 2056, 2057, 2058, 2059, 2060, 2061, 2062, 2063, 2064, 2065, 2066, 2067, 2068, 2069, 2070, 2071, 2072, 2073, 2074, 2075, 2076, 2077, 2078, 2079, 2080, 2081, 2082, 2083, 2084, 2085, 2086, 2087, 2088, 2089, 2090, 2091, 2092, 2093, 2094, 2095, 2096, 2097, 2098, 2099, 2100, 2101, 2102, 2103, 2104, 2105, 2106, 2107, 2108, 2109, 2110, 2111, 2112, 2113, 2114, 2115, 2116, 2117, 2118, 2119, 2120, 2121, 2122, 2123, 2124, 2125, 2126, 2127, 2128, 2129, 2130, 2131, 2132, 2133, 2134, 2135, 2136, 2137, 2138, 2139, 2140, 2141, 2142, 2143, 2144, 2145, 2146, 2147, 2148, 2149, 2150, 2151, 2152, 2153, 2154, 2155, 2156, 2157, 2158, 2159, 2160, 2161, 2162, 2163, 2164, 2165, 2166, 2167, 2168, 2169, 2170, 2171, 2172, 2173, 2174, 2175, 2176, 2177, 2178, 2179, 2180, 2181, 2182, 2183, 2184, 2185, 2186, 2187, 2188, 2189, 2190, 2191, 2192, 2193, 2194, 2195, 2196, 2197, 2198, 2199, 2200, 2201, 2202, 2203, 2204, 2205, 2206, 2207, 2208, 2209, 2210, 2211, 2212, 2213, 2214, 2215, 2216, 2217, 2218, 2219, 2220, 2221, 2222, 2223, 2224, 2225, 2226, 2227, 2228, 2229, 2230, 2231, 2232, 2233, 2234, 2235, 2236, 2237, 2238, 2239, 2240, 2241, 2242, 2243, 2244, 2245, 2246, 2247, 2248, 2249, 2250, 2251, 2252, 2253, 2254, 2255, 2256, 2257, 2258, 2259, 2260, 2261, 2262, 2263, 2264, 2265, 2266, 2267, 2268, 2269, 2270, 2271, 2272, 2273, 2274, 2275, 2276, 2277, 2278, 2279, 2280, 2281, 2282, 2283, 2284, 2285, 2286, 2287, 2288, 2289, 2290, 2291, 2292, 2293, 2294, 2295, 2296, 2297, 2298, 2299, 2300, 2301, 2302, 2303, 2304, 2305, 2306, 2307, 2308, 2309, 2310, 2311, 2312, 2313, 2314, 2315, 2316, 2317, 2318, 2319, 2320, 2321, 2322, 2323, 2324, 2325, 2326, 2327, 2328, 2329, 2330, 2331, 2332, 2333, 2334, 2335, 2336, 2337, 2338, 2339, 2340, 2341, 2342, 2343, 2344, 2345, 2346, 2347, 2348, 2349, 2350, 2351, 2352, 2353, 2354, 2355, 2356, 2357, 2358, 2359, 2360, 2361, 2362, 2363, 2364, 2365, 2366, 2367, 2368, 2369, 2370, 2371, 2372, 2373, 2374, 2375, 2376, 2377, 2378, 2379, 2380, 2381, 2382, 2383, 2384, 2385, 2386, 2387, 2388, 2389, 2390, 2391, 2392, 2393, 2394, 2395, 2396, 2397, 2398, 2399, 2400, 2401, 2402, 2403, 2404, 2405, 2406, 2407, 2408, 2409, 2410, 2411, 2412, 2413, 2414, 2415, 2416, 2417, 2418, 2419, 2420, 2421, 2422, 2423, 2424, 2425, 2426, 2427, 2428, 2429, 2430, 2431, 2432, 2433, 2434, 2435, 2436, 2437, 2438, 2439, 2440, 2441, 2442, 2443, 2444, 2445, 2446, 2447, 2448, 2449, 2450, 2451, 2452, 2453, 2454, 2455, 2456, 2457, 2458, 2459, 2460, 2461, 2462, 2463, 2464, 2465, 2466, 2467, 2468, 2469, 2470, 2471, 2472, 2473, 2474, 2475, 2476, 2477, 2478, 2479, 2480, 2481, 2482, 2483, 2484, 2485, 2486, 2487, 2488, 2489, 2490, 2491, 2492, 2493, 2494, 2495, 2496, 2497, 2498, 2499, 2500, 2501, 2502, 2503, 2504, 2505, 2506, 2507, 2508, 2509, 2510, 2511, 2512, 2513, 2514, 2515, 2516, 2517, 2518, 2519, 2520, 2521, 2522, 2523, 2524, 2525, 2526, 2527, 2528, 2529, 2530, 2531, 2532, 2533, 2534, 2535, 2536, 2537, 2538, 2539, 2540, 2541, 2542, 2543, 2544, 2545, 2546, 2547, 2548, 2549, 2550, 2551, 2552, 2553, 2554, 2555, 2556, 2557, 2558, 2559, 2560, 2561, 2562, 2563, 2564, 2565, 2566, 2567, 2568, 2569, 2570, 2571, 2572, 2573, 2574, 2575, 2576, 2577, 2578, 2579, 2580, 2581, 2582, 2583, 2584, 2585, 2586, 2587, 2588, 2589, 2590, 2591, 2592, 2593, 2594, 2595, 2596, 2597, 2598, 2599, 2600, 2601, 2602, 2603, 2604, 2605, 2606, 2607, 2608, 2609, 2610, 2611, 2612, 2613, 2614, 2615, 2616, 2617, 2618, 2619, 2620, 2621, 2622, 2623, 2624, 2625, 2626, 2627, 2628, 2629, 2630, 2631, 2632, 2633, 2634, 2635, 2636, 2637, 2638, 2639, 2640, 2641, 2642, 2643, 2644, 2645, 2646, 2647, 2648, 2649, 2650, 2651, 2652, 2653, 2654, 2655, 2656, 2657, 2658, 2659, 2660, 2661, 2662, 2663, 2664, 2665, 2666, 2667, 2668, 2669, 2670, 2671, 2672, 2673, 2674, 2675, 2676, 2677, 2678, 2679, 2680, 2681, 2682, 2683, 2684, 2685, 2686, 2687, 2688, 2689, 2690, 2691, 2692, 2693, 2694, 2695, 2696, 2697, 2698, 2699, 2700, 2701, 2702, 2703, 2704, 2705, 2706, 2707, 2708, 2709, 2710, 2711, 2712, 2713, 2714, 2715, 2716, 2717, 2718, 2719, 2720, 2721, 2722, 2723, 2724, 2725, 2726, 2727, 2728, 2729, 2730, 2731, 2732, 2733, 2734, 2735, 2736, 2737, 2738, 2739, 2740, 2741, 2742, 2743, 2744, 2745, 2746, 2747, 2748, 2749, 2750, 2751, 2752, 2753, 2754, 2755, 2756, 2757, 2758, 2759, 2760, 2761, 2762, 2763, 2764, 2765, 2766, 2767, 2768, 2769, 2770, 2771, 2772, 2773, 2774, 2775, 2776, 2777, 2778, 2779, 2780, 2781, 2782, 2783, 2784, 2785, 2786, 2787, 2788, 2789, 2790, 2791, 2792, 2793, 2794, 2795, 2796, 2797, 2798, 2799, 2800, 2801, 2802, 2803, 2804, 2805, 2806, 2807, 2808, 2809, 2810, 2811, 2812, 2813, 2814, 2815, 2816, 2817, 2818, 2819, 2820, 2821, 2822, 2823, 2824, 2825, 2826, 2827, 2828, 2829, 2830, 2831, 2832, 2833, 2834, 2835, 2836, 2837, 2838, 2839, 2840, 2841, 2842, 2843, 2844, 2845, 2846, 2847, 2848, 2849, 2850, 2851, 2852, 2853, 2854, 2855, 2856, 2857, 2858, 2859, 2860, 2861, 2862, 2863, 2864, 2865, 2866, 2867, 2868, 2869, 2870, 2871, 2872, 2873, 2874, 2875, 2876, 2877, 2878, 2879, 2880, 2881, 2882, 2883, 2884, 2885, 2886, 2887, 2888, 2889, 2890, 2891, 2892, 2893, 2894, 2895, 2896, 2897, 2898, 2899, 2900, default */
/***/ (function(module) {

module.exports = [{"province":"北京市","city":"北京市","name":"北京大学"},{"province":"北京市","city":"北京市","name":"中国人民大学"},{"province":"北京市","city":"北京市","name":"清华大学"},{"province":"北京市","city":"北京市","name":"北京交通大学"},{"province":"北京市","city":"北京市","name":"北京工业大学"},{"province":"北京市","city":"北京市","name":"北京航空航天大学"},{"province":"北京市","city":"北京市","name":"北京理工大学"},{"province":"北京市","city":"北京市","name":"北京科技大学"},{"province":"北京市","city":"北京市","name":"北方工业大学"},{"province":"北京市","city":"北京市","name":"北京化工大学"},{"province":"北京市","city":"北京市","name":"北京工商大学"},{"province":"北京市","city":"北京市","name":"北京服装学院"},{"province":"北京市","city":"北京市","name":"北京邮电大学"},{"province":"北京市","city":"北京市","name":"北京印刷学院"},{"province":"北京市","city":"北京市","name":"北京建筑大学"},{"province":"北京市","city":"北京市","name":"北京石油化工学院"},{"province":"北京市","city":"北京市","name":"北京电子科技学院"},{"province":"北京市","city":"北京市","name":"中国农业大学"},{"province":"北京市","city":"北京市","name":"北京农学院"},{"province":"北京市","city":"北京市","name":"北京林业大学"},{"province":"北京市","city":"北京市","name":"北京协和医学院"},{"province":"北京市","city":"北京市","name":"首都医科大学"},{"province":"北京市","city":"北京市","name":"北京中医药大学"},{"province":"北京市","city":"北京市","name":"北京师范大学"},{"province":"北京市","city":"北京市","name":"首都师范大学"},{"province":"北京市","city":"北京市","name":"首都体育学院"},{"province":"北京市","city":"北京市","name":"北京外国语大学"},{"province":"北京市","city":"北京市","name":"北京第二外国语学院"},{"province":"北京市","city":"北京市","name":"北京语言大学"},{"province":"北京市","city":"北京市","name":"中国传媒大学"},{"province":"北京市","city":"北京市","name":"中央财经大学"},{"province":"北京市","city":"北京市","name":"对外经济贸易大学"},{"province":"北京市","city":"北京市","name":"北京物资学院"},{"province":"北京市","city":"北京市","name":"首都经济贸易大学"},{"province":"北京市","city":"北京市","name":"外交学院"},{"province":"北京市","city":"北京市","name":"中国人民公安大学"},{"province":"北京市","city":"北京市","name":"国际关系学院"},{"province":"北京市","city":"北京市","name":"北京体育大学"},{"province":"北京市","city":"北京市","name":"中央音乐学院"},{"province":"北京市","city":"北京市","name":"中国音乐学院"},{"province":"北京市","city":"北京市","name":"中央美术学院"},{"province":"北京市","city":"北京市","name":"中央戏剧学院"},{"province":"北京市","city":"北京市","name":"中国戏曲学院"},{"province":"北京市","city":"北京市","name":"北京电影学院"},{"province":"北京市","city":"北京市","name":"北京舞蹈学院"},{"province":"北京市","city":"北京市","name":"中央民族大学"},{"province":"北京市","city":"北京市","name":"中国政法大学"},{"province":"北京市","city":"北京市","name":"华北电力大学"},{"province":"北京市","city":"北京市","name":"中华女子学院"},{"province":"北京市","city":"北京市","name":"北京信息科技大学"},{"province":"北京市","city":"北京市","name":"中国矿业大学（北京）"},{"province":"北京市","city":"北京市","name":"中国石油大学（北京）"},{"province":"北京市","city":"北京市","name":"中国地质大学（北京）"},{"province":"北京市","city":"北京市","name":"北京联合大学"},{"province":"北京市","city":"北京市","name":"北京城市学院"},{"province":"北京市","city":"北京市","name":"中国青年政治学院"},{"province":"北京市","city":"北京市","name":"首钢工学院"},{"province":"北京市","city":"北京市","name":"中国劳动关系学院"},{"province":"北京市","city":"北京市","name":"北京吉利学院"},{"province":"北京市","city":"北京市","name":"首都师范大学科德学院"},{"province":"北京市","city":"北京市","name":"北京工商大学嘉华学院"},{"province":"北京市","city":"北京市","name":"北京邮电大学世纪学院"},{"province":"北京市","city":"北京市","name":"北京工业大学耿丹学院"},{"province":"北京市","city":"北京市","name":"北京警察学院"},{"province":"北京市","city":"北京市","name":"北京第二外国语学院中瑞酒店管理学院"},{"province":"北京市","city":"北京市","name":"中国科学院大学"},{"province":"北京市","city":"北京市","name":"北京工业职业技术学院"},{"province":"北京市","city":"北京市","name":"北京信息职业技术学院"},{"province":"北京市","city":"北京市","name":"北京电子科技职业学院"},{"province":"北京市","city":"北京市","name":"北京京北职业技术学院"},{"province":"北京市","city":"北京市","name":"北京交通职业技术学院"},{"province":"北京市","city":"北京市","name":"北京青年政治学院"},{"province":"北京市","city":"北京市","name":"北京农业职业学院"},{"province":"北京市","city":"北京市","name":"北京政法职业学院"},{"province":"北京市","city":"北京市","name":"北京财贸职业学院"},{"province":"北京市","city":"北京市","name":"北京北大方正软件职业技术学院"},{"province":"北京市","city":"北京市","name":"北京经贸职业学院"},{"province":"北京市","city":"北京市","name":"北京经济技术职业学院"},{"province":"北京市","city":"北京市","name":"北京戏曲艺术职业学院"},{"province":"北京市","city":"北京市","name":"北京汇佳职业学院"},{"province":"北京市","city":"北京市","name":"北京科技经营管理学院"},{"province":"北京市","city":"北京市","name":"北京科技职业学院"},{"province":"北京市","city":"北京市","name":"北京培黎职业学院"},{"province":"北京市","city":"北京市","name":"北京经济管理职业学院"},{"province":"北京市","city":"北京市","name":"北京劳动保障职业学院"},{"province":"北京市","city":"北京市","name":"北京社会管理职业学院"},{"province":"北京市","city":"北京市","name":"北京艺术传媒职业学院"},{"province":"北京市","city":"北京市","name":"北京体育职业学院"},{"province":"北京市","city":"北京市","name":"北京交通运输职业学院"},{"province":"北京市","city":"北京市","name":"北京卫生职业学院"},{"province":"北京市","city":"北京市","name":"北京网络职业学院"},{"province":"北京市","city":"北京市","name":"中国社会科学院大学"},{"province":"北京市","city":"北京市","name":"中国人民解放军国防大学"},{"province":"北京市","city":"北京市","name":"中国人民解放军陆军装甲兵学院"},{"province":"北京市","city":"北京市","name":"中国人民解放军陆军航空兵学院"},{"province":"北京市","city":"北京市","name":"中国人民解放军陆军防化学院"},{"province":"北京市","city":"北京市","name":"中国人民解放军空军指挥学院"},{"province":"北京市","city":"北京市","name":"中国人民解放军战略支援部队航天工程大学"},{"province":"北京市","city":"北京市","name":"中国人民武装警察部队特种警察学院"},{"province":"天津市","city":"天津市","name":"南开大学"},{"province":"天津市","city":"天津市","name":"天津大学"},{"province":"天津市","city":"天津市","name":"天津科技大学"},{"province":"天津市","city":"天津市","name":"天津工业大学"},{"province":"天津市","city":"天津市","name":"中国民航大学"},{"province":"天津市","city":"天津市","name":"天津理工大学"},{"province":"天津市","city":"天津市","name":"天津农学院"},{"province":"天津市","city":"天津市","name":"天津医科大学"},{"province":"天津市","city":"天津市","name":"天津中医药大学"},{"province":"天津市","city":"天津市","name":"天津师范大学"},{"province":"天津市","city":"天津市","name":"天津职业技术师范大学"},{"province":"天津市","city":"天津市","name":"天津外国语大学"},{"province":"天津市","city":"天津市","name":"天津商业大学"},{"province":"天津市","city":"天津市","name":"天津财经大学"},{"province":"天津市","city":"天津市","name":"天津体育学院"},{"province":"天津市","city":"天津市","name":"天津音乐学院"},{"province":"天津市","city":"天津市","name":"天津美术学院"},{"province":"天津市","city":"天津市","name":"天津城建大学"},{"province":"天津市","city":"天津市","name":"天津天狮学院"},{"province":"天津市","city":"天津市","name":"天津外国语大学滨海外事学院"},{"province":"天津市","city":"天津市","name":"天津体育学院运动与文化艺术学院"},{"province":"天津市","city":"天津市","name":"天津商业大学宝德学院"},{"province":"天津市","city":"天津市","name":"天津医科大学临床医学院"},{"province":"天津市","city":"天津市","name":"南开大学滨海学院"},{"province":"天津市","city":"天津市","name":"天津师范大学津沽学院"},{"province":"天津市","city":"天津市","name":"天津理工大学中环信息学院"},{"province":"天津市","city":"天津市","name":"北京科技大学天津学院"},{"province":"天津市","city":"天津市","name":"天津大学仁爱学院"},{"province":"天津市","city":"天津市","name":"天津财经大学珠江学院"},{"province":"天津市","city":"天津市","name":"天津市职业大学"},{"province":"天津市","city":"天津市","name":"天津中德应用技术大学"},{"province":"天津市","city":"天津市","name":"天津滨海职业学院"},{"province":"天津市","city":"天津市","name":"天津工程职业技术学院"},{"province":"天津市","city":"天津市","name":"天津青年职业学院"},{"province":"天津市","city":"天津市","name":"天津渤海职业技术学院"},{"province":"天津市","city":"天津市","name":"天津电子信息职业技术学院"},{"province":"天津市","city":"天津市","name":"天津机电职业技术学院"},{"province":"天津市","city":"天津市","name":"天津现代职业技术学院"},{"province":"天津市","city":"天津市","name":"天津公安警官职业学院"},{"province":"天津市","city":"天津市","name":"天津轻工职业技术学院"},{"province":"天津市","city":"天津市","name":"天津商务职业学院"},{"province":"天津市","city":"天津市","name":"天津国土资源和房屋职业学院"},{"province":"天津市","city":"天津市","name":"天津医学高等专科学校"},{"province":"天津市","city":"天津市","name":"天津开发区职业技术学院"},{"province":"天津市","city":"天津市","name":"天津艺术职业学院"},{"province":"天津市","city":"天津市","name":"天津交通职业学院"},{"province":"天津市","city":"天津市","name":"天津冶金职业技术学院"},{"province":"天津市","city":"天津市","name":"天津石油职业技术学院"},{"province":"天津市","city":"天津市","name":"天津城市职业学院"},{"province":"天津市","city":"天津市","name":"天津铁道职业技术学院"},{"province":"天津市","city":"天津市","name":"天津工艺美术职业学院"},{"province":"天津市","city":"天津市","name":"天津城市建设管理职业技术学院"},{"province":"天津市","city":"天津市","name":"天津生物工程职业技术学院"},{"province":"天津市","city":"天津市","name":"天津海运职业学院"},{"province":"天津市","city":"天津市","name":"天津广播影视职业学院"},{"province":"天津市","city":"天津市","name":"天津体育职业学院"},{"province":"天津市","city":"天津市","name":"天津滨海汽车工程职业学院"},{"province":"天津市","city":"天津市","name":"中国人民解放军陆军军事交通学院"},{"province":"天津市","city":"天津市","name":"中国人民解放军海军勤务学院"},{"province":"天津市","city":"天津市","name":"中国人民武装警察部队指挥学院"},{"province":"天津市","city":"天津市","name":"中国人民武装警察部队后勤学院"},{"province":"河北省","city":"保定市","name":"河北大学"},{"province":"河北省","city":"邯郸市","name":"河北工程大学"},{"province":"河北省","city":"石家庄市","name":"河北地质大学"},{"province":"河北省","city":"天津市","name":"河北工业大学"},{"province":"河北省","city":"唐山市","name":"华北理工大学"},{"province":"河北省","city":"石家庄市","name":"河北科技大学"},{"province":"河北省","city":"张家口市","name":"河北建筑工程学院"},{"province":"河北省","city":"保定市","name":"河北农业大学"},{"province":"河北省","city":"石家庄市","name":"河北医科大学"},{"province":"河北省","city":"张家口市","name":"河北北方学院"},{"province":"河北省","city":"承德市","name":"承德医学院"},{"province":"河北省","city":"石家庄市","name":"河北师范大学"},{"province":"河北省","city":"保定市","name":"保定学院"},{"province":"河北省","city":"承德市","name":"河北民族师范学院"},{"province":"河北省","city":"唐山市","name":"唐山师范学院"},{"province":"河北省","city":"廊坊市","name":"廊坊师范学院"},{"province":"河北省","city":"衡水市","name":"衡水学院"},{"province":"河北省","city":"石家庄市","name":"石家庄学院"},{"province":"河北省","city":"邯郸市","name":"邯郸学院"},{"province":"河北省","city":"邢台市","name":"邢台学院"},{"province":"河北省","city":"沧州市","name":"沧州师范学院"},{"province":"河北省","city":"石家庄市","name":"石家庄铁道大学"},{"province":"河北省","city":"秦皇岛市","name":"燕山大学"},{"province":"河北省","city":"秦皇岛市","name":"河北科技师范学院"},{"province":"河北省","city":"唐山市","name":"唐山学院"},{"province":"河北省","city":"廊坊市","name":"华北科技学院"},{"province":"河北省","city":"廊坊市","name":"中国人民武装警察部队学院"},{"province":"河北省","city":"石家庄市","name":"河北体育学院"},{"province":"河北省","city":"保定市","name":"河北金融学院"},{"province":"河北省","city":"廊坊市","name":"北华航天工业学院"},{"province":"河北省","city":"廊坊市","name":"防灾科技学院"},{"province":"河北省","city":"石家庄市","name":"河北经贸大学"},{"province":"河北省","city":"保定市","name":"中央司法警官学院"},{"province":"河北省","city":"石家庄市","name":"河北传媒学院"},{"province":"河北省","city":"石家庄市","name":"河北工程技术学院"},{"province":"河北省","city":"石家庄市","name":"河北美术学院"},{"province":"河北省","city":"保定市","name":"河北科技学院"},{"province":"河北省","city":"石家庄市","name":"河北外国语学院"},{"province":"河北省","city":"保定市","name":"河北大学工商学院"},{"province":"河北省","city":"唐山市","name":"华北理工大学轻工学院"},{"province":"河北省","city":"石家庄市","name":"河北科技大学理工学院"},{"province":"河北省","city":"石家庄市","name":"河北师范大学汇华学院"},{"province":"河北省","city":"石家庄市","name":"河北经贸大学经济管理学院"},{"province":"河北省","city":"石家庄市","name":"河北医科大学临床学院"},{"province":"河北省","city":"保定市","name":"华北电力大学科技学院"},{"province":"河北省","city":"邯郸市","name":"河北工程大学科信学院"},{"province":"河北省","city":"廊坊市","name":"河北工业大学城市学院"},{"province":"河北省","city":"秦皇岛市","name":"燕山大学里仁学院"},{"province":"河北省","city":"石家庄市","name":"石家庄铁道大学四方学院"},{"province":"河北省","city":"石家庄市","name":"河北地质大学华信学院"},{"province":"河北省","city":"保定市","name":"河北农业大学现代科技学院"},{"province":"河北省","city":"唐山市","name":"华北理工大学冀唐学院"},{"province":"河北省","city":"保定市","name":"中国地质大学长城学院"},{"province":"河北省","city":"廊坊市","name":"燕京理工学院"},{"province":"河北省","city":"廊坊市","name":"北京中医药大学东方学院"},{"province":"河北省","city":"沧州市","name":"北京交通大学海滨学院"},{"province":"河北省","city":"石家庄市","name":"河北中医学院"},{"province":"河北省","city":"张家口市","name":"张家口学院"},{"province":"河北省","city":"沧州市","name":"河北水利电力学院"},{"province":"河北省","city":"石家庄市","name":"河北工业职业技术学院"},{"province":"河北省","city":"邯郸市","name":"邯郸职业技术学院"},{"province":"河北省","city":"石家庄市","name":"石家庄职业技术学院"},{"province":"河北省","city":"张家口市","name":"张家口职业技术学院"},{"province":"河北省","city":"承德市","name":"承德石油高等专科学校"},{"province":"河北省","city":"邢台市","name":"邢台职业技术学院"},{"province":"河北省","city":"保定市","name":"河北软件职业技术学院"},{"province":"河北省","city":"廊坊市","name":"河北石油职业技术学院"},{"province":"河北省","city":"秦皇岛市","name":"河北建材职业技术学院"},{"province":"河北省","city":"石家庄市","name":"河北政法职业学院"},{"province":"河北省","city":"沧州市","name":"沧州职业技术学院"},{"province":"河北省","city":"唐山市","name":"河北能源职业技术学院"},{"province":"河北省","city":"石家庄市","name":"石家庄铁路职业技术学院"},{"province":"河北省","city":"保定市","name":"保定职业技术学院"},{"province":"河北省","city":"秦皇岛市","name":"秦皇岛职业技术学院"},{"province":"河北省","city":"石家庄市","name":"石家庄工程职业学院"},{"province":"河北省","city":"石家庄市","name":"石家庄城市经济职业学院"},{"province":"河北省","city":"唐山市","name":"唐山职业技术学院"},{"province":"河北省","city":"衡水市","name":"衡水职业技术学院"},{"province":"河北省","city":"唐山市","name":"唐山工业职业技术学院"},{"province":"河北省","city":"邢台市","name":"邢台医学高等专科学校"},{"province":"河北省","city":"石家庄市","name":"河北省艺术职业学院"},{"province":"河北省","city":"承德市","name":"河北旅游职业学院"},{"province":"河北省","city":"石家庄市","name":"石家庄财经职业学院"},{"province":"河北省","city":"石家庄市","name":"河北交通职业技术学院"},{"province":"河北省","city":"石家庄市","name":"河北化工医药职业技术学院"},{"province":"河北省","city":"石家庄市","name":"石家庄信息工程职业学院"},{"province":"河北省","city":"秦皇岛市","name":"河北对外经贸职业学院"},{"province":"河北省","city":"保定市","name":"保定电力职业技术学院"},{"province":"河北省","city":"邢台市","name":"河北机电职业技术学院"},{"province":"河北省","city":"沧州市","name":"渤海石油职业学院"},{"province":"河北省","city":"廊坊市","name":"廊坊职业技术学院"},{"province":"河北省","city":"唐山市","name":"唐山科技职业技术学院"},{"province":"河北省","city":"石家庄市","name":"石家庄邮电职业技术学院"},{"province":"河北省","city":"石家庄市","name":"河北公安警察职业学院"},{"province":"河北省","city":"石家庄市","name":"石家庄工商职业学院"},{"province":"河北省","city":"石家庄市","name":"石家庄理工职业学院"},{"province":"河北省","city":"石家庄市","name":"石家庄科技信息职业学院"},{"province":"河北省","city":"邯郸市","name":"河北司法警官职业学院"},{"province":"河北省","city":"沧州市","name":"沧州医学高等专科学校"},{"province":"河北省","city":"石家庄市","name":"河北女子职业技术学院"},{"province":"河北省","city":"石家庄市","name":"石家庄医学高等专科学校"},{"province":"河北省","city":"保定市","name":"冀中职业学院"},{"province":"河北省","city":"石家庄市","name":"石家庄人民医学高等专科学校"},{"province":"河北省","city":"石家庄市","name":"石家庄科技工程职业学院"},{"province":"河北省","city":"石家庄市","name":"河北劳动关系职业学院"},{"province":"河北省","city":"石家庄市","name":"石家庄科技职业学院"},{"province":"河北省","city":"廊坊市","name":"河北东方学院"},{"province":"河北省","city":"沧州市","name":"泊头职业学院"},{"province":"河北省","city":"张家口市","name":"宣化科技职业学院"},{"province":"河北省","city":"廊坊市","name":"廊坊燕京职业技术学院"},{"province":"河北省","city":"承德市","name":"承德护理职业学院"},{"province":"河北省","city":"石家庄市","name":"石家庄幼儿师范高等专科学校"},{"province":"河北省","city":"廊坊市","name":"廊坊卫生职业学院"},{"province":"河北省","city":"石家庄市","name":"河北轨道运输职业技术学院"},{"province":"河北省","city":"保定市","name":"保定幼儿师范高等专科学校"},{"province":"河北省","city":"保定市","name":"河北工艺美术职业学院"},{"province":"河北省","city":"沧州市","name":"渤海理工职业学院"},{"province":"河北省","city":"秦皇岛市","name":"河北环境工程学院"},{"province":"河北省","city":"唐山市","name":"唐山幼儿师范高等专科学校"},{"province":"河北省","city":"石家庄市","name":"石家庄经济职业学院"},{"province":"河北省","city":"唐山市","name":"曹妃甸职业技术学院"},{"province":"河北省","city":"石家庄市","name":"中国人民解放军陆军指挥学院"},{"province":"河北省","city":"石家庄市","name":"中国人民解放军空军石家庄飞行学院"},{"province":"河北省","city":"石家庄市","name":"中国人民武装警察部队士官学校"},{"province":"山西省","city":"太原市","name":"山西大学"},{"province":"山西省","city":"太原市","name":"太原科技大学"},{"province":"山西省","city":"太原市","name":"中北大学"},{"province":"山西省","city":"太原市","name":"太原理工大学"},{"province":"山西省","city":"晋中市","name":"山西农业大学"},{"province":"山西省","city":"太原市","name":"山西医科大学"},{"province":"山西省","city":"长治市","name":"长治医学院"},{"province":"山西省","city":"临汾市","name":"山西师范大学"},{"province":"山西省","city":"太原市","name":"太原师范学院"},{"province":"山西省","city":"大同市","name":"山西大同大学"},{"province":"山西省","city":"晋中市","name":"晋中学院"},{"province":"山西省","city":"长治市","name":"长治学院"},{"province":"山西省","city":"运城市","name":"运城学院"},{"province":"山西省","city":"忻州市","name":"忻州师范学院"},{"province":"山西省","city":"太原市","name":"山西财经大学"},{"province":"山西省","city":"太原市","name":"山西中医药大学"},{"province":"山西省","city":"吕梁市","name":"吕梁学院"},{"province":"山西省","city":"太原市","name":"太原学院"},{"province":"山西省","city":"太原市","name":"山西应用科技学院"},{"province":"山西省","city":"太原市","name":"山西大学商务学院"},{"province":"山西省","city":"太原市","name":"太原理工大学现代科技学院"},{"province":"山西省","city":"晋中市","name":"山西农业大学信息学院"},{"province":"山西省","city":"临汾市","name":"山西师范大学现代文理学院"},{"province":"山西省","city":"太原市","name":"中北大学信息商务学院"},{"province":"山西省","city":"太原市","name":"太原科技大学华科学院"},{"province":"山西省","city":"太原市","name":"山西医科大学晋祠学院"},{"province":"山西省","city":"太原市","name":"山西财经大学华商学院"},{"province":"山西省","city":"太原市","name":"山西工商学院"},{"province":"山西省","city":"太原市","name":"太原工业学院"},{"province":"山西省","city":"太原市","name":"山西传媒学院"},{"province":"山西省","city":"阳泉市","name":"山西工程技术学院"},{"province":"山西省","city":"太原市","name":"山西省财政税务专科学校"},{"province":"山西省","city":"太原市","name":"山西警察学院"},{"province":"山西省","city":"长治市","name":"长治职业技术学院"},{"province":"山西省","city":"太原市","name":"山西艺术职业学院"},{"province":"山西省","city":"晋城市","name":"晋城职业技术学院"},{"province":"山西省","city":"太原市","name":"山西建筑职业技术学院"},{"province":"山西省","city":"太原市","name":"山西药科职业学院"},{"province":"山西省","city":"太原市","name":"山西工程职业技术学院"},{"province":"山西省","city":"太原市","name":"山西交通职业技术学院"},{"province":"山西省","city":"大同市","name":"大同煤炭职业技术学院"},{"province":"山西省","city":"长治市","name":"山西机电职业技术学院"},{"province":"山西省","city":"太原市","name":"山西戏剧职业学院"},{"province":"山西省","city":"太原市","name":"山西财贸职业技术学院"},{"province":"山西省","city":"太原市","name":"山西林业职业技术学院"},{"province":"山西省","city":"运城市","name":"山西水利职业技术学院"},{"province":"山西省","city":"阳泉市","name":"阳泉职业技术学院"},{"province":"山西省","city":"临汾市","name":"临汾职业技术学院"},{"province":"山西省","city":"太原市","name":"山西职业技术学院"},{"province":"山西省","city":"太原市","name":"山西煤炭职业技术学院"},{"province":"山西省","city":"太原市","name":"山西金融职业学院"},{"province":"山西省","city":"太原市","name":"太原城市职业技术学院"},{"province":"山西省","city":"临汾市","name":"山西信息职业技术学院"},{"province":"山西省","city":"太原市","name":"山西体育职业学院"},{"province":"山西省","city":"太原市","name":"山西警官职业学院"},{"province":"山西省","city":"太原市","name":"山西国际商务职业学院"},{"province":"山西省","city":"长治市","name":"潞安职业技术学院"},{"province":"山西省","city":"太原市","name":"太原旅游职业学院"},{"province":"山西省","city":"太原市","name":"山西旅游职业学院"},{"province":"山西省","city":"临汾市","name":"山西管理职业学院"},{"province":"山西省","city":"太原市","name":"山西电力职业技术学院"},{"province":"山西省","city":"忻州市","name":"忻州职业技术学院"},{"province":"山西省","city":"晋中市","name":"山西同文职业技术学院"},{"province":"山西省","city":"晋中市","name":"晋中职业技术学院"},{"province":"山西省","city":"晋中市","name":"山西华澳商贸职业学院"},{"province":"山西省","city":"运城市","name":"山西运城农业职业技术学院"},{"province":"山西省","city":"运城市","name":"运城幼儿师范高等专科学校"},{"province":"山西省","city":"太原市","name":"山西老区职业技术学院"},{"province":"山西省","city":"太原市","name":"山西经贸职业学院"},{"province":"山西省","city":"朔州市","name":"朔州职业技术学院"},{"province":"山西省","city":"运城市","name":"运城职业技术学院"},{"province":"山西省","city":"太原市","name":"山西轻工职业技术学院"},{"province":"山西省","city":"晋中市","name":"晋中师范高等专科学校"},{"province":"山西省","city":"阳泉市","name":"阳泉师范高等专科学校"},{"province":"山西省","city":"太原市","name":"山西青年职业学院"},{"province":"山西省","city":"运城市","name":"运城护理职业学院"},{"province":"山西省","city":"运城市","name":"运城师范高等专科学校"},{"province":"山西省","city":"朔州市","name":"朔州师范高等专科学校"},{"province":"山西省","city":"吕梁市","name":"吕梁职业技术学院"},{"province":"山西省","city":"晋中市","name":"山西能源学院"},{"province":"山西省","city":"太原市","name":"中国人民解放军空军勤务学院"},{"province":"内蒙古自治区","city":"呼和浩特市","name":"内蒙古大学"},{"province":"内蒙古自治区","city":"包头市","name":"内蒙古科技大学"},{"province":"内蒙古自治区","city":"呼和浩特市","name":"内蒙古工业大学"},{"province":"内蒙古自治区","city":"呼和浩特市","name":"内蒙古农业大学"},{"province":"内蒙古自治区","city":"呼和浩特市","name":"内蒙古医科大学"},{"province":"内蒙古自治区","city":"呼和浩特市","name":"内蒙古师范大学"},{"province":"内蒙古自治区","city":"通辽市","name":"内蒙古民族大学"},{"province":"内蒙古自治区","city":"赤峰市","name":"赤峰学院"},{"province":"内蒙古自治区","city":"呼和浩特市","name":"内蒙古财经大学"},{"province":"内蒙古自治区","city":"呼伦贝尔市","name":"呼伦贝尔学院"},{"province":"内蒙古自治区","city":"乌兰察布市","name":"集宁师范学院"},{"province":"内蒙古自治区","city":"巴彦淖尔市","name":"河套学院"},{"province":"内蒙古自治区","city":"呼和浩特市","name":"呼和浩特民族学院"},{"province":"内蒙古自治区","city":"呼和浩特市","name":"内蒙古大学创业学院"},{"province":"内蒙古自治区","city":"呼和浩特市","name":"内蒙古师范大学鸿德学院"},{"province":"内蒙古自治区","city":"呼和浩特市","name":"内蒙古艺术学院"},{"province":"内蒙古自治区","city":"鄂尔多斯市","name":"鄂尔多斯应用技术学院"},{"province":"内蒙古自治区","city":"呼和浩特市","name":"内蒙古建筑职业技术学院"},{"province":"内蒙古自治区","city":"呼和浩特市","name":"内蒙古丰州职业学院"},{"province":"内蒙古自治区","city":"包头市","name":"包头职业技术学院"},{"province":"内蒙古自治区","city":"兴安盟","name":"兴安职业技术学院"},{"province":"内蒙古自治区","city":"呼和浩特市","name":"呼和浩特职业学院"},{"province":"内蒙古自治区","city":"包头市","name":"包头轻工职业技术学院"},{"province":"内蒙古自治区","city":"呼和浩特市","name":"内蒙古电子信息职业技术学院"},{"province":"内蒙古自治区","city":"呼和浩特市","name":"内蒙古机电职业技术学院"},{"province":"内蒙古自治区","city":"呼和浩特市","name":"内蒙古化工职业学院"},{"province":"内蒙古自治区","city":"呼和浩特市","name":"内蒙古商贸职业学院"},{"province":"内蒙古自治区","city":"锡林郭勒盟","name":"锡林郭勒职业学院"},{"province":"内蒙古自治区","city":"呼和浩特市","name":"内蒙古警察职业学院"},{"province":"内蒙古自治区","city":"呼和浩特市","name":"内蒙古体育职业学院"},{"province":"内蒙古自治区","city":"乌兰察布市","name":"乌兰察布职业学院"},{"province":"内蒙古自治区","city":"通辽市","name":"通辽职业学院"},{"province":"内蒙古自治区","city":"通辽市","name":"科尔沁艺术职业学院"},{"province":"内蒙古自治区","city":"赤峰市","name":"内蒙古交通职业技术学院"},{"province":"内蒙古自治区","city":"包头市","name":"包头钢铁职业技术学院"},{"province":"内蒙古自治区","city":"乌海市","name":"乌海职业技术学院"},{"province":"内蒙古自治区","city":"呼和浩特市","name":"内蒙古科技职业学院"},{"province":"内蒙古自治区","city":"呼和浩特市","name":"内蒙古北方职业技术学院"},{"province":"内蒙古自治区","city":"赤峰市","name":"赤峰职业技术学院"},{"province":"内蒙古自治区","city":"呼和浩特市","name":"内蒙古经贸外语职业学院"},{"province":"内蒙古自治区","city":"包头市","name":"包头铁道职业技术学院"},{"province":"内蒙古自治区","city":"乌兰察布市","name":"乌兰察布医学高等专科学校"},{"province":"内蒙古自治区","city":"鄂尔多斯市","name":"鄂尔多斯职业学院"},{"province":"内蒙古自治区","city":"呼和浩特市","name":"内蒙古工业职业学院"},{"province":"内蒙古自治区","city":"呼伦贝尔市","name":"呼伦贝尔职业技术学院"},{"province":"内蒙古自治区","city":"呼伦贝尔市","name":"满洲里俄语职业学院"},{"province":"内蒙古自治区","city":"呼和浩特市","name":"内蒙古能源职业学院"},{"province":"内蒙古自治区","city":"赤峰市","name":"赤峰工业职业技术学院"},{"province":"内蒙古自治区","city":"阿拉善盟","name":"阿拉善职业技术学院"},{"province":"内蒙古自治区","city":"巴彦淖尔市","name":"内蒙古美术职业学院"},{"province":"内蒙古自治区","city":"鄂尔多斯市","name":"内蒙古民族幼儿师范高等专科学校"},{"province":"内蒙古自治区","city":"鄂尔多斯市","name":"鄂尔多斯生态环境职业学院"},{"province":"内蒙古自治区","city":"呼伦贝尔市","name":"扎兰屯职业学院"},{"province":"辽宁省","city":"沈阳市","name":"辽宁大学"},{"province":"辽宁省","city":"大连市","name":"大连理工大学"},{"province":"辽宁省","city":"沈阳市","name":"沈阳工业大学"},{"province":"辽宁省","city":"沈阳市","name":"沈阳航空航天大学"},{"province":"辽宁省","city":"沈阳市","name":"沈阳理工大学"},{"province":"辽宁省","city":"沈阳市","name":"东北大学"},{"province":"辽宁省","city":"鞍山市","name":"辽宁科技大学"},{"province":"辽宁省","city":"阜新市","name":"辽宁工程技术大学"},{"province":"辽宁省","city":"抚顺市","name":"辽宁石油化工大学"},{"province":"辽宁省","city":"沈阳市","name":"沈阳化工大学"},{"province":"辽宁省","city":"大连市","name":"大连交通大学"},{"province":"辽宁省","city":"大连市","name":"大连海事大学"},{"province":"辽宁省","city":"大连市","name":"大连工业大学"},{"province":"辽宁省","city":"沈阳市","name":"沈阳建筑大学"},{"province":"辽宁省","city":"锦州市","name":"辽宁工业大学"},{"province":"辽宁省","city":"沈阳市","name":"沈阳农业大学"},{"province":"辽宁省","city":"大连市","name":"大连海洋大学"},{"province":"辽宁省","city":"沈阳市","name":"中国医科大学"},{"province":"辽宁省","city":"锦州市","name":"锦州医科大学"},{"province":"辽宁省","city":"大连市","name":"大连医科大学"},{"province":"辽宁省","city":"沈阳市","name":"辽宁中医药大学"},{"province":"辽宁省","city":"沈阳市","name":"沈阳药科大学"},{"province":"辽宁省","city":"沈阳市","name":"沈阳医学院"},{"province":"辽宁省","city":"大连市","name":"辽宁师范大学"},{"province":"辽宁省","city":"沈阳市","name":"沈阳师范大学"},{"province":"辽宁省","city":"锦州市","name":"渤海大学"},{"province":"辽宁省","city":"鞍山市","name":"鞍山师范学院"},{"province":"辽宁省","city":"大连市","name":"大连外国语大学"},{"province":"辽宁省","city":"大连市","name":"东北财经大学"},{"province":"辽宁省","city":"沈阳市","name":"中国刑事警察学院"},{"province":"辽宁省","city":"沈阳市","name":"沈阳体育学院"},{"province":"辽宁省","city":"沈阳市","name":"沈阳音乐学院"},{"province":"辽宁省","city":"沈阳市","name":"鲁迅美术学院"},{"province":"辽宁省","city":"大连市","name":"辽宁对外经贸学院"},{"province":"辽宁省","city":"沈阳市","name":"沈阳大学"},{"province":"辽宁省","city":"大连市","name":"大连大学"},{"province":"辽宁省","city":"本溪市","name":"辽宁科技学院"},{"province":"辽宁省","city":"大连市","name":"辽宁警察学院"},{"province":"辽宁省","city":"沈阳市","name":"沈阳工程学院"},{"province":"辽宁省","city":"丹东市","name":"辽东学院"},{"province":"辽宁省","city":"大连市","name":"大连民族大学"},{"province":"辽宁省","city":"大连市","name":"大连理工大学城市学院"},{"province":"辽宁省","city":"辽阳市","name":"沈阳工业大学工程学院"},{"province":"辽宁省","city":"沈阳市","name":"沈阳航空航天大学北方科技学院"},{"province":"辽宁省","city":"沈阳市","name":"沈阳工学院"},{"province":"辽宁省","city":"大连市","name":"大连工业大学艺术与信息工程学院"},{"province":"辽宁省","city":"大连市","name":"大连科技学院"},{"province":"辽宁省","city":"沈阳市","name":"沈阳城市建设学院"},{"province":"辽宁省","city":"沈阳市","name":"中国医科大学临床医药学院"},{"province":"辽宁省","city":"大连市","name":"大连医科大学中山学院"},{"province":"辽宁省","city":"锦州市","name":"锦州医科大学医疗学院"},{"province":"辽宁省","city":"沈阳市","name":"辽宁师范大学海华学院"},{"province":"辽宁省","city":"锦州市","name":"辽宁理工学院"},{"province":"辽宁省","city":"大连市","name":"大连财经学院"},{"province":"辽宁省","city":"沈阳市","name":"沈阳城市学院"},{"province":"辽宁省","city":"抚顺市","name":"辽宁石油化工大学顺华能源学院"},{"province":"辽宁省","city":"大连市","name":"大连艺术学院"},{"province":"辽宁省","city":"沈阳市","name":"辽宁中医药大学杏林学院"},{"province":"辽宁省","city":"沈阳市","name":"辽宁何氏医学院"},{"province":"辽宁省","city":"沈阳市","name":"沈阳科技学院"},{"province":"辽宁省","city":"大连市","name":"大连东软信息学院"},{"province":"辽宁省","city":"葫芦岛市","name":"辽宁财贸学院"},{"province":"辽宁省","city":"沈阳市","name":"辽宁传媒学院"},{"province":"辽宁省","city":"营口市","name":"营口理工学院"},{"province":"辽宁省","city":"朝阳市","name":"朝阳师范高等专科学校"},{"province":"辽宁省","city":"抚顺市","name":"抚顺师范高等专科学校"},{"province":"辽宁省","city":"锦州市","name":"锦州师范高等专科学校"},{"province":"辽宁省","city":"营口市","name":"营口职业技术学院"},{"province":"辽宁省","city":"铁岭市","name":"铁岭师范高等专科学校"},{"province":"辽宁省","city":"大连市","name":"大连职业技术学院"},{"province":"辽宁省","city":"营口市","name":"辽宁农业职业技术学院"},{"province":"辽宁省","city":"抚顺市","name":"抚顺职业技术学院"},{"province":"辽宁省","city":"辽阳市","name":"辽阳职业技术学院"},{"province":"辽宁省","city":"阜新市","name":"阜新高等专科学校"},{"province":"辽宁省","city":"沈阳市","name":"辽宁省交通高等专科学校"},{"province":"辽宁省","city":"大连市","name":"辽宁税务高等专科学校"},{"province":"辽宁省","city":"盘锦市","name":"盘锦职业技术学院"},{"province":"辽宁省","city":"沈阳市","name":"沈阳航空职业技术学院"},{"province":"辽宁省","city":"沈阳市","name":"辽宁体育运动职业技术学院"},{"province":"辽宁省","city":"铁岭市","name":"辽宁职业学院"},{"province":"辽宁省","city":"沈阳市","name":"辽宁林业职业技术学院"},{"province":"辽宁省","city":"沈阳市","name":"沈阳职业技术学院"},{"province":"辽宁省","city":"锦州市","name":"辽宁理工职业学院"},{"province":"辽宁省","city":"大连市","name":"大连商务职业学院"},{"province":"辽宁省","city":"沈阳市","name":"辽宁金融职业学院"},{"province":"辽宁省","city":"沈阳市","name":"辽宁轨道交通职业学院"},{"province":"辽宁省","city":"沈阳市","name":"辽宁广告职业学院"},{"province":"辽宁省","city":"丹东市","name":"辽宁机电职业技术学院"},{"province":"辽宁省","city":"沈阳市","name":"辽宁经济职业技术学院"},{"province":"辽宁省","city":"锦州市","name":"辽宁石化职业技术学院"},{"province":"辽宁省","city":"葫芦岛市","name":"渤海船舶职业学院"},{"province":"辽宁省","city":"大连市","name":"大连软件职业学院"},{"province":"辽宁省","city":"大连市","name":"大连翻译职业学院"},{"province":"辽宁省","city":"沈阳市","name":"辽宁商贸职业学院"},{"province":"辽宁省","city":"大连市","name":"大连枫叶职业技术学院"},{"province":"辽宁省","city":"沈阳市","name":"辽宁装备制造职业技术学院"},{"province":"辽宁省","city":"盘锦市","name":"辽河石油职业技术学院"},{"province":"辽宁省","city":"丹东市","name":"辽宁地质工程职业学院"},{"province":"辽宁省","city":"锦州市","name":"辽宁铁道职业技术学院"},{"province":"辽宁省","city":"辽阳市","name":"辽宁建筑职业学院"},{"province":"辽宁省","city":"大连市","name":"大连航运职业技术学院"},{"province":"辽宁省","city":"大连市","name":"大连装备制造职业技术学院"},{"province":"辽宁省","city":"大连市","name":"大连汽车职业技术学院"},{"province":"辽宁省","city":"沈阳市","name":"辽宁现代服务职业技术学院"},{"province":"辽宁省","city":"本溪市","name":"辽宁冶金职业技术学院"},{"province":"辽宁省","city":"铁岭市","name":"辽宁工程职业学院"},{"province":"辽宁省","city":"沈阳市","name":"辽宁城市建设职业技术学院"},{"province":"辽宁省","city":"沈阳市","name":"辽宁医药职业学院"},{"province":"辽宁省","city":"铁岭市","name":"铁岭卫生职业学院"},{"province":"辽宁省","city":"沈阳市","name":"沈阳北软信息职业技术学院"},{"province":"辽宁省","city":"沈阳市","name":"辽宁政法职业学院"},{"province":"辽宁省","city":"沈阳市","name":"辽宁民族师范高等专科学校"},{"province":"辽宁省","city":"大连市","name":"辽宁轻工职业学院"},{"province":"辽宁省","city":"沈阳市","name":"辽宁水利职业学院"},{"province":"辽宁省","city":"沈阳市","name":"辽宁特殊教育师范高等专科学校"},{"province":"辽宁省","city":"大连市","name":"中国人民解放军海军大连舰艇学院"},{"province":"辽宁省","city":"大连市","name":"中国人民解放军空军通信士官学校"},{"province":"吉林省","city":"长春市","name":"吉林大学"},{"province":"吉林省","city":"延边朝鲜族自治州","name":"延边大学"},{"province":"吉林省","city":"长春市","name":"长春理工大学"},{"province":"吉林省","city":"吉林市","name":"东北电力大学"},{"province":"吉林省","city":"长春市","name":"长春工业大学"},{"province":"吉林省","city":"长春市","name":"吉林建筑大学"},{"province":"吉林省","city":"吉林市","name":"吉林化工学院"},{"province":"吉林省","city":"长春市","name":"吉林农业大学"},{"province":"吉林省","city":"长春市","name":"长春中医药大学"},{"province":"吉林省","city":"长春市","name":"东北师范大学"},{"province":"吉林省","city":"吉林市","name":"北华大学"},{"province":"吉林省","city":"通化市","name":"通化师范学院"},{"province":"吉林省","city":"四平市","name":"吉林师范大学"},{"province":"吉林省","city":"长春市","name":"吉林工程技术师范学院"},{"province":"吉林省","city":"长春市","name":"长春师范大学"},{"province":"吉林省","city":"白城市","name":"白城师范学院"},{"province":"吉林省","city":"长春市","name":"吉林财经大学"},{"province":"吉林省","city":"长春市","name":"吉林体育学院"},{"province":"吉林省","city":"长春市","name":"吉林艺术学院"},{"province":"吉林省","city":"长春市","name":"吉林华桥外国语学院"},{"province":"吉林省","city":"长春市","name":"吉林工商学院"},{"province":"吉林省","city":"长春市","name":"长春工程学院"},{"province":"吉林省","city":"吉林市","name":"吉林农业科技学院"},{"province":"吉林省","city":"长春市","name":"吉林警察学院"},{"province":"吉林省","city":"长春市","name":"长春大学"},{"province":"吉林省","city":"长春市","name":"长春光华学院"},{"province":"吉林省","city":"长春市","name":"长春工业大学人文信息学院"},{"province":"吉林省","city":"长春市","name":"长春理工大学光电信息学院"},{"province":"吉林省","city":"长春市","name":"长春财经学院"},{"province":"吉林省","city":"长春市","name":"吉林建筑大学城建学院"},{"province":"吉林省","city":"长春市","name":"长春建筑学院"},{"province":"吉林省","city":"长春市","name":"长春科技学院"},{"province":"吉林省","city":"长春市","name":"吉林动画学院"},{"province":"吉林省","city":"四平市","name":"吉林师范大学博达学院"},{"province":"吉林省","city":"长春市","name":"长春大学旅游学院"},{"province":"吉林省","city":"长春市","name":"东北师范大学人文学院"},{"province":"吉林省","city":"吉林市","name":"吉林医药学院"},{"province":"吉林省","city":"辽源市","name":"辽源职业技术学院"},{"province":"吉林省","city":"四平市","name":"四平职业大学"},{"province":"吉林省","city":"长春市","name":"长春汽车工业高等专科学校"},{"province":"吉林省","city":"长春市","name":"长春金融高等专科学校"},{"province":"吉林省","city":"长春市","name":"长春医学高等专科学校"},{"province":"吉林省","city":"长春市","name":"吉林交通职业技术学院"},{"province":"吉林省","city":"长春市","name":"长春东方职业学院"},{"province":"吉林省","city":"长春市","name":"吉林司法警官职业学院"},{"province":"吉林省","city":"吉林市","name":"吉林电子信息职业技术学院"},{"province":"吉林省","city":"吉林市","name":"吉林工业职业技术学院"},{"province":"吉林省","city":"四平市","name":"吉林工程职业学院"},{"province":"吉林省","city":"长春市","name":"长春职业技术学院"},{"province":"吉林省","city":"白城市","name":"白城医学高等专科学校"},{"province":"吉林省","city":"长春市","name":"长春信息技术职业学院"},{"province":"吉林省","city":"松原市","name":"松原职业技术学院"},{"province":"吉林省","city":"吉林市","name":"吉林铁道职业技术学院"},{"province":"吉林省","city":"白城市","name":"白城职业技术学院"},{"province":"吉林省","city":"白山市","name":"长白山职业技术学院"},{"province":"吉林省","city":"长春市","name":"吉林科技职业技术学院"},{"province":"吉林省","city":"延边朝鲜族自治州","name":"延边职业技术学院"},{"province":"吉林省","city":"长春市","name":"吉林城市职业技术学院"},{"province":"吉林省","city":"长春市","name":"长春师范高等专科学校"},{"province":"吉林省","city":"延边朝鲜族自治州","name":"吉林职业技术学院"},{"province":"吉林省","city":"长春市","name":"吉林水利电力职业学院"},{"province":"吉林省","city":"长春市","name":"长春健康职业学院"},{"province":"吉林省","city":"长春市","name":"中国人民解放军空军航空大学"},{"province":"黑龙江省","city":"哈尔滨市","name":"黑龙江大学"},{"province":"黑龙江省","city":"哈尔滨市","name":"哈尔滨工业大学"},{"province":"黑龙江省","city":"哈尔滨市","name":"哈尔滨理工大学"},{"province":"黑龙江省","city":"哈尔滨市","name":"哈尔滨工程大学"},{"province":"黑龙江省","city":"哈尔滨市","name":"黑龙江科技大学"},{"province":"黑龙江省","city":"大庆市","name":"东北石油大学"},{"province":"黑龙江省","city":"佳木斯市","name":"佳木斯大学"},{"province":"黑龙江省","city":"大庆市","name":"黑龙江八一农垦大学"},{"province":"黑龙江省","city":"哈尔滨市","name":"东北农业大学"},{"province":"黑龙江省","city":"哈尔滨市","name":"东北林业大学"},{"province":"黑龙江省","city":"哈尔滨市","name":"哈尔滨医科大学"},{"province":"黑龙江省","city":"哈尔滨市","name":"黑龙江中医药大学"},{"province":"黑龙江省","city":"牡丹江市","name":"牡丹江医学院"},{"province":"黑龙江省","city":"哈尔滨市","name":"哈尔滨师范大学"},{"province":"黑龙江省","city":"齐齐哈尔市","name":"齐齐哈尔大学"},{"province":"黑龙江省","city":"牡丹江市","name":"牡丹江师范学院"},{"province":"黑龙江省","city":"哈尔滨市","name":"哈尔滨学院"},{"province":"黑龙江省","city":"大庆市","name":"大庆师范学院"},{"province":"黑龙江省","city":"绥化市","name":"绥化学院"},{"province":"黑龙江省","city":"哈尔滨市","name":"哈尔滨商业大学"},{"province":"黑龙江省","city":"哈尔滨市","name":"哈尔滨体育学院"},{"province":"黑龙江省","city":"哈尔滨市","name":"哈尔滨金融学院"},{"province":"黑龙江省","city":"齐齐哈尔市","name":"齐齐哈尔医学院"},{"province":"黑龙江省","city":"鸡西市","name":"黑龙江工业学院"},{"province":"黑龙江省","city":"哈尔滨市","name":"黑龙江东方学院"},{"province":"黑龙江省","city":"哈尔滨市","name":"哈尔滨信息工程学院"},{"province":"黑龙江省","city":"哈尔滨市","name":"黑龙江工程学院"},{"province":"黑龙江省","city":"齐齐哈尔市","name":"齐齐哈尔工程学院"},{"province":"黑龙江省","city":"哈尔滨市","name":"黑龙江外国语学院"},{"province":"黑龙江省","city":"哈尔滨市","name":"黑龙江财经学院"},{"province":"黑龙江省","city":"哈尔滨市","name":"哈尔滨石油学院"},{"province":"黑龙江省","city":"哈尔滨市","name":"黑龙江工商学院"},{"province":"黑龙江省","city":"哈尔滨市","name":"哈尔滨远东理工学院"},{"province":"黑龙江省","city":"哈尔滨市","name":"哈尔滨剑桥学院"},{"province":"黑龙江省","city":"哈尔滨市","name":"黑龙江工程学院昆仑旅游学院"},{"province":"黑龙江省","city":"哈尔滨市","name":"哈尔滨广厦学院"},{"province":"黑龙江省","city":"哈尔滨市","name":"哈尔滨华德学院"},{"province":"黑龙江省","city":"黑河市","name":"黑河学院"},{"province":"黑龙江省","city":"齐齐哈尔市","name":"齐齐哈尔高等师范专科学校"},{"province":"黑龙江省","city":"伊春市","name":"伊春职业学院"},{"province":"黑龙江省","city":"牡丹江市","name":"牡丹江大学"},{"province":"黑龙江省","city":"哈尔滨市","name":"黑龙江职业学院"},{"province":"黑龙江省","city":"哈尔滨市","name":"黑龙江建筑职业技术学院"},{"province":"黑龙江省","city":"哈尔滨市","name":"黑龙江艺术职业学院"},{"province":"黑龙江省","city":"大庆市","name":"大庆职业学院"},{"province":"黑龙江省","city":"牡丹江市","name":"黑龙江林业职业技术学院"},{"province":"黑龙江省","city":"佳木斯市","name":"黑龙江农业职业技术学院"},{"province":"黑龙江省","city":"哈尔滨市","name":"黑龙江农业工程职业学院"},{"province":"黑龙江省","city":"哈尔滨市","name":"黑龙江农垦职业学院"},{"province":"黑龙江省","city":"哈尔滨市","name":"黑龙江司法警官职业学院"},{"province":"黑龙江省","city":"鹤岗市","name":"鹤岗师范高等专科学校"},{"province":"黑龙江省","city":"哈尔滨市","name":"哈尔滨电力职业技术学院"},{"province":"黑龙江省","city":"哈尔滨市","name":"哈尔滨铁道职业技术学院"},{"province":"黑龙江省","city":"大兴安岭地区","name":"大兴安岭职业学院"},{"province":"黑龙江省","city":"牡丹江市","name":"黑龙江农业经济职业学院"},{"province":"黑龙江省","city":"哈尔滨市","name":"哈尔滨职业技术学院"},{"province":"黑龙江省","city":"哈尔滨市","name":"哈尔滨传媒职业学院"},{"province":"黑龙江省","city":"哈尔滨市","name":"黑龙江生物科技职业学院"},{"province":"黑龙江省","city":"牡丹江市","name":"黑龙江商业职业学院"},{"province":"黑龙江省","city":"哈尔滨市","name":"黑龙江公安警官职业学院"},{"province":"黑龙江省","city":"哈尔滨市","name":"黑龙江信息技术职业学院"},{"province":"黑龙江省","city":"哈尔滨市","name":"哈尔滨城市职业学院"},{"province":"黑龙江省","city":"哈尔滨市","name":"黑龙江农垦科技职业学院"},{"province":"黑龙江省","city":"哈尔滨市","name":"黑龙江旅游职业技术学院"},{"province":"黑龙江省","city":"佳木斯市","name":"黑龙江三江美术职业学院"},{"province":"黑龙江省","city":"哈尔滨市","name":"黑龙江生态工程职业学院"},{"province":"黑龙江省","city":"双鸭山市","name":"黑龙江能源职业学院"},{"province":"黑龙江省","city":"七台河市","name":"七台河职业学院"},{"province":"黑龙江省","city":"哈尔滨市","name":"黑龙江民族职业学院"},{"province":"黑龙江省","city":"大庆市","name":"大庆医学高等专科学校"},{"province":"黑龙江省","city":"齐齐哈尔市","name":"黑龙江交通职业技术学院"},{"province":"黑龙江省","city":"哈尔滨市","name":"哈尔滨应用职业技术学院"},{"province":"黑龙江省","city":"牡丹江市","name":"黑龙江幼儿师范高等专科学校"},{"province":"黑龙江省","city":"哈尔滨市","name":"哈尔滨科学技术职业学院"},{"province":"黑龙江省","city":"哈尔滨市","name":"黑龙江粮食职业学院"},{"province":"黑龙江省","city":"佳木斯市","name":"佳木斯职业学院"},{"province":"黑龙江省","city":"哈尔滨市","name":"黑龙江护理高等专科学校"},{"province":"黑龙江省","city":"齐齐哈尔市","name":"齐齐哈尔理工职业学院"},{"province":"黑龙江省","city":"哈尔滨市","name":"哈尔滨幼儿师范高等专科学校"},{"province":"黑龙江省","city":"哈尔滨市","name":"黑龙江冰雪体育职业学院"},{"province":"黑龙江省","city":"哈尔滨市","name":"哈尔滨音乐学院"},{"province":"黑龙江省","city":"哈尔滨市","name":"中国人民解放军空军哈尔滨飞行学院"},{"province":"上海市","city":"上海市","name":"复旦大学"},{"province":"上海市","city":"上海市","name":"同济大���"},{"province":"上海市","city":"上海市","name":"上海交通大学"},{"province":"上海市","city":"上海市","name":"华东理工大学"},{"province":"上海市","city":"上海市","name":"上海理工大学"},{"province":"上海市","city":"上海市","name":"上海海事大学"},{"province":"上海市","city":"上海市","name":"东华大学"},{"province":"上海市","city":"上海市","name":"上海电力学院"},{"province":"上海市","city":"上海市","name":"上海应用技术大学"},{"province":"上海市","city":"上海市","name":"上海健康医学院"},{"province":"上海市","city":"上海市","name":"上海海洋大学"},{"province":"上海市","city":"上海市","name":"上海中医药大学"},{"province":"上海市","city":"上海市","name":"华东师范大学"},{"province":"上海市","city":"上海市","name":"上海师范大学"},{"province":"上海市","city":"上海市","name":"上海外国语大学"},{"province":"上海市","city":"上海市","name":"上海财经大学"},{"province":"上海市","city":"上海市","name":"上海对外经贸大学"},{"province":"上海市","city":"上海市","name":"上海海关学院"},{"province":"上海市","city":"上海市","name":"华东政法大学"},{"province":"上海市","city":"上海市","name":"上海体育学院"},{"province":"上海市","city":"上海市","name":"上海音乐学院"},{"province":"上海市","city":"上海市","name":"上海戏剧学院"},{"province":"上海市","city":"上海市","name":"上海大学"},{"province":"上海市","city":"上海市","name":"上海工程技术大学"},{"province":"上海市","city":"上海市","name":"上海立信会计金融学院"},{"province":"上海市","city":"上海市","name":"上海电机学院"},{"province":"上海市","city":"上海市","name":"上海杉达学院"},{"province":"上海市","city":"上海市","name":"上海政法学院"},{"province":"上海市","city":"上海市","name":"上海第二工业大学"},{"province":"上海市","city":"上海市","name":"上海商学院"},{"province":"上海市","city":"上海市","name":"上海建桥学院"},{"province":"上海市","city":"上海市","name":"上海兴伟学院"},{"province":"上海市","city":"上海市","name":"上海视觉艺术学院"},{"province":"上海市","city":"上海市","name":"上海外国语大学贤达经济人文学院"},{"province":"上海市","city":"上海市","name":"上海师范大学天华学院"},{"province":"上海市","city":"上海市","name":"上海科技大学"},{"province":"上海市","city":"上海市","name":"上海纽约大学"},{"province":"上海市","city":"上海市","name":"上海旅游高等专科学校"},{"province":"上海市","city":"上海市","name":"上海公安学院"},{"province":"上海市","city":"上海市","name":"上海东海职业技术学院"},{"province":"上海市","city":"上海市","name":"上海工商职业技术学院"},{"province":"上海市","city":"上海市","name":"上海出版印刷高等专科学校"},{"province":"上海市","city":"上海市","name":"上海行健职业学院"},{"province":"上海市","city":"上海市","name":"上海城建职业学院"},{"province":"上海市","city":"上海市","name":"上海交通职业技术学院"},{"province":"上海市","city":"上海市","name":"上海海事职业技术学院"},{"province":"上海市","city":"上海市","name":"上海电子信息职业技术学院"},{"province":"上海市","city":"上海市","name":"上海震旦职业学院"},{"province":"上海市","city":"上海市","name":"上海民远职业技术学院"},{"province":"上海市","city":"上海市","name":"上海欧华职业技术学院"},{"province":"上海市","city":"上海市","name":"上海思博职业技术学院"},{"province":"上海市","city":"上海市","name":"上海立达职业技术学院"},{"province":"上海市","city":"上海市","name":"上海工艺美术职业学院"},{"province":"上海市","city":"上海市","name":"上海济光职业技术学院"},{"province":"上海市","city":"上海市","name":"上海工商外国语职业学院"},{"province":"上海市","city":"上海市","name":"上海科学技术职业学院"},{"province":"上海市","city":"上海市","name":"上海农林职业技术学院"},{"province":"上海市","city":"上海市","name":"上海邦德职业技术学院"},{"province":"上海市","city":"上海市","name":"上海中侨职业技术学院"},{"province":"上海市","city":"上海市","name":"上海电影艺术职业学院"},{"province":"上海市","city":"上海市","name":"上海中华职业技术学院"},{"province":"上海市","city":"上海市","name":"上海工会管理职业学院"},{"province":"上海市","city":"上海市","name":"上海体育职业学院"},{"province":"上海市","city":"上海市","name":"上海民航职业技术学院"},{"province":"上海市","city":"上海市","name":"中国人民解放军海军军医大学（第二军医大学）"},{"province":"江苏省","city":"南京市","name":"南京大学"},{"province":"江苏省","city":"苏州市","name":"苏州大学"},{"province":"江苏省","city":"南京市","name":"东南大学"},{"province":"江苏省","city":"南京市","name":"南京航空航天大学"},{"province":"江苏省","city":"南京市","name":"南京理工大学"},{"province":"江苏省","city":"镇江市","name":"江苏科技大学"},{"province":"江苏省","city":"徐州市","name":"中国矿业大学"},{"province":"江苏省","city":"南京市","name":"南京工业大学"},{"province":"江苏省","city":"常州市","name":"常州大学"},{"province":"江苏省","city":"南京市","name":"南京邮电大学"},{"province":"江苏省","city":"南京市","name":"河海大学"},{"province":"江苏省","city":"无锡市","name":"江南大学"},{"province":"江苏省","city":"南京市","name":"南京林业大学"},{"province":"江苏省","city":"镇江市","name":"江苏大学"},{"province":"江苏省","city":"南京市","name":"南京信息工程大学"},{"province":"江苏省","city":"南通市","name":"南通大学"},{"province":"江苏省","city":"盐城市","name":"盐城工学院"},{"province":"江苏省","city":"南京市","name":"南京农业大学"},{"province":"江苏省","city":"南京市","name":"南京医科大学"},{"province":"江苏省","city":"徐州市","name":"徐州医科大学"},{"province":"江苏省","city":"南京市","name":"南京中医药大学"},{"province":"江苏省","city":"南京市","name":"中国药科大学"},{"province":"江苏省","city":"南京市","name":"南京师范大学"},{"province":"江苏省","city":"徐州市","name":"江苏师范大学"},{"province":"江苏省","city":"淮安市","name":"淮阴师范学院"},{"province":"江苏省","city":"盐城市","name":"盐城师范学院"},{"province":"江苏省","city":"南京市","name":"南京财经大学"},{"province":"江苏省","city":"南京市","name":"江苏警官学院"},{"province":"江苏省","city":"南京市","name":"南京体育学院"},{"province":"江苏省","city":"南京市","name":"南京艺术学院"},{"province":"江苏省","city":"苏州市","name":"苏州科技大学"},{"province":"江苏省","city":"苏州市","name":"常熟理工学院"},{"province":"江苏省","city":"淮安市","name":"淮阴工学院"},{"province":"江苏省","city":"常州市","name":"常州工学院"},{"province":"江苏省","city":"扬州市","name":"扬州大学"},{"province":"江苏省","city":"南京市","name":"三江学院"},{"province":"江苏省","city":"南京市","name":"南京工程学院"},{"province":"江苏省","city":"南京市","name":"南京审计大学"},{"province":"江苏省","city":"南京市","name":"南京晓庄学院"},{"province":"江苏省","city":"常州市","name":"江苏理工学院"},{"province":"江苏省","city":"连云港市","name":"淮海工学院"},{"province":"江苏省","city":"徐州市","name":"徐州工程学院"},{"province":"江苏省","city":"南京市","name":"南京特殊教育师范学院"},{"province":"江苏省","city":"南通市","name":"南通理工学院"},{"province":"江苏省","city":"南京市","name":"南京森林警察学院"},{"province":"江苏省","city":"南京市","name":"东南大学成贤学院"},{"province":"江苏省","city":"泰州市","name":"泰州学院"},{"province":"江苏省","city":"无锡市","name":"无锡太湖学院"},{"province":"江苏省","city":"南京市","name":"金陵科技学院"},{"province":"江苏省","city":"徐州市","name":"中国矿业大学徐海学院"},{"province":"江苏省","city":"南京市","name":"南京大学金陵学院"},{"province":"江苏省","city":"南京市","name":"南京理工大学紫金学院"},{"province":"江苏省","city":"南京市","name":"南京航空航天大学金城学院"},{"province":"江苏省","city":"南京市","name":"中国传媒大学南广学院"},{"province":"江苏省","city":"泰州市","name":"南京理工大学泰州科技学院"},{"province":"江苏省","city":"泰州市","name":"南京师范大学泰州学院"},{"province":"江苏省","city":"南京市","name":"南京工业大学浦江学院"},{"province":"江苏省","city":"南京市","name":"南京师范大学中北学院"},{"province":"江苏省","city":"连云港市","name":"南京医科大学康达学院"},{"province":"江苏省","city":"泰州市","name":"南京中医药大学翰林学院"},{"province":"江苏省","city":"南京市","name":"南京信息工程大学滨江学院"},{"province":"江苏省","city":"苏州市","name":"苏州大学文正学院"},{"province":"江苏省","city":"苏州市","name":"苏州大学应用技术学院"},{"province":"江苏省","city":"苏州市","name":"苏州科技大学天平学院"},{"province":"江苏省","city":"镇江市","name":"江苏大学京江学院"},{"province":"江苏省","city":"扬州市","name":"扬州大学广陵学院"},{"province":"江苏省","city":"徐州市","name":"江苏师范大学科文学院"},{"province":"江苏省","city":"扬州市","name":"南京邮电大学通达学院"},{"province":"江苏省","city":"镇江市","name":"南京财经大学红山学院"},{"province":"江苏省","city":"张家港市","name":"江苏科技大学苏州理工学院"},{"province":"江苏省","city":"泰州市","name":"常州大学怀德学院"},{"province":"江苏省","city":"南通市","name":"南通大学杏林学院"},{"province":"江苏省","city":"南京市","name":"南京审计大学金审学院"},{"province":"江苏省","city":"宿迁市","name":"宿迁学院"},{"province":"江苏省","city":"南京市","name":"江苏第二师范学院"},{"province":"江苏省","city":"苏州市","name":"西交利物浦大学"},{"province":"江苏省","city":"昆山市","name":"昆山杜克大学"},{"province":"江苏省","city":"盐城市","name":"明达职业技术学院"},{"province":"江苏省","city":"无锡市","name":"无锡职业技术学院"},{"province":"江苏省","city":"徐州市","name":"江苏建筑职业技术学院"},{"province":"江苏省","city":"南京市","name":"南京工业职业技术学院"},{"province":"江苏省","city":"南通市","name":"江苏工程职业技术学院"},{"province":"江苏省","city":"苏州市","name":"苏州工艺美术职业技术学院"},{"province":"江苏省","city":"连云港市","name":"连云港职业技术学院"},{"province":"江苏省","city":"镇江市","name":"镇江市高等专科学校"},{"province":"江苏省","city":"南通市","name":"南通职业大学"},{"province":"江苏省","city":"苏州市","name":"苏州职业大学"},{"province":"江苏省","city":"苏州市","name":"沙洲职业工学院"},{"province":"江苏省","city":"扬州市","name":"扬州市职业大学"},{"province":"江苏省","city":"连云港市","name":"连云港师范高等专科学校"},{"province":"江苏省","city":"南京市","name":"江苏经贸职业技术学院"},{"province":"江苏省","city":"徐州市","name":"九州职业技术学院"},{"province":"江苏省","city":"苏州市","name":"硅湖职业技术学院"},{"province":"江苏省","city":"泰州市","name":"泰州职业技术学院"},{"province":"江苏省","city":"常州市","name":"常州信息职业技术学院"},{"province":"江苏省","city":"南京市","name":"江苏联合职业技术学院"},{"province":"江苏省","city":"南京市","name":"江苏海事职业技术学院"},{"province":"江苏省","city":"南京市","name":"应天职业技术学院"},{"province":"江苏省","city":"无锡市","name":"无锡科技职业学院"},{"province":"江苏省","city":"盐城市","name":"江苏医药职业学院"},{"province":"江苏省","city":"扬州市","name":"扬州环境资源职业技术学院"},{"province":"江苏省","city":"南通市","name":"南通科技职业学院"},{"province":"江苏省","city":"苏州市","name":"苏州经贸职业技术学院"},{"province":"江苏省","city":"苏州市","name":"苏州工业职业技术学院"},{"province":"江苏省","city":"苏州市","name":"苏州托普信息职业技术学院"},{"province":"江苏省","city":"苏州市","name":"苏州卫生职业技术学院"},{"province":"江苏省","city":"无锡市","name":"无锡商业职业技术学院"},{"province":"江苏省","city":"南通市","name":"南通航运职业技术学院"},{"province":"江苏省","city":"南京市","name":"南京交通职业技术学院"},{"province":"江苏省","city":"淮安市","name":"淮安信息职业技术学院"},{"province":"江苏省","city":"泰州市","name":"江苏农牧科技职业学院"},{"province":"江苏省","city":"常州市","name":"常州纺织服装职业技术学院"},{"province":"江苏省","city":"苏州市","name":"苏州农业职业技术学院"},{"province":"江苏省","city":"苏州市","name":"苏州工业园区职业技术学院"},{"province":"江苏省","city":"无锡市","name":"太湖创意职业技术学院"},{"province":"江苏省","city":"淮安市","name":"炎黄职业技术学院"},{"province":"江苏省","city":"南京市","name":"南京科技职业学院"},{"province":"江苏省","city":"南京市","name":"正德职业技术学院"},{"province":"江苏省","city":"南京市","name":"钟山职业技术学院"},{"province":"江苏省","city":"无锡市","name":"无锡南洋职业技术学院"},{"province":"江苏省","city":"无锡市","name":"江南影视艺术职业学院"},{"province":"江苏省","city":"南京市","name":"金肯职业技术学院"},{"province":"江苏省","city":"常州市","name":"常州轻工职业技术学院"},{"province":"江苏省","city":"常州市","name":"常州工程职业技术学院"},{"province":"江苏省","city":"镇江市","name":"江苏农林职业技术学院"},{"province":"江苏省","city":"淮安市","name":"江苏食品药品职业技术学院"},{"province":"江苏省","city":"常州市","name":"建东职业技术学院"},{"province":"江苏省","city":"南京市","name":"南京铁道职业技术学院"},{"province":"江苏省","city":"徐州市","name":"徐州工业职业技术学院"},{"province":"江苏省","city":"无锡市","name":"江苏信息职业技术学院"},{"province":"江苏省","city":"宿迁市","name":"宿迁职业技术学院"},{"province":"江苏省","city":"南京市","name":"南京信息职业技术学院"},{"province":"江苏省","city":"扬州市","name":"江海职业技术学院"},{"province":"江苏省","city":"常州市","name":"常州机电职业技术学院"},{"province":"江苏省","city":"无锡市","name":"江阴职业技术学院"},{"province":"江苏省","city":"无锡市","name":"无锡城市职业技术学院"},{"province":"江苏省","city":"无锡市","name":"无锡工艺职业技术学院"},{"province":"江苏省","city":"镇江市","name":"金山职业技术学院"},{"province":"江苏省","city":"苏州市","name":"苏州健雄职业技术学院"},{"province":"江苏省","city":"盐城市","name":"盐城工业职业技术学院"},{"province":"江苏省","city":"淮安市","name":"江苏财经职业技术学院"},{"province":"江苏省","city":"扬州市","name":"扬州工业职业技术学院"},{"province":"江苏省","city":"苏州市","name":"苏州百年职业学院"},{"province":"江苏省","city":"苏州市","name":"昆山登云科技职业学院"},{"province":"江苏省","city":"南京市","name":"南京视觉艺术职业学院"},{"province":"江苏省","city":"南京市","name":"江苏城市职业学院"},{"province":"江苏省","city":"南京市","name":"南京城市职业学院"},{"province":"江苏省","city":"南京市","name":"南京机电职业技术学院"},{"province":"江苏省","city":"苏州市","name":"苏州高博软件技术职业学院"},{"province":"江苏省","city":"南京市","name":"南京旅游职业学院"},{"province":"江苏省","city":"南京市","name":"江苏卫生健康职业学院"},{"province":"江苏省","city":"苏州市","name":"苏州信息职业技术学院"},{"province":"江苏省","city":"宿迁市","name":"宿迁泽达职业技术学院"},{"province":"江苏省","city":"苏州市","name":"苏州工业园区服务外包职业学院"},{"province":"江苏省","city":"徐州市","name":"徐州幼儿师范高等专科学校"},{"province":"江苏省","city":"徐州市","name":"徐州生物工程职业技术学院"},{"province":"江苏省","city":"南通市","name":"江苏商贸职业学院"},{"province":"江苏省","city":"南通市","name":"南通师范高等专科学校"},{"province":"江苏省","city":"扬州市","name":"扬州中瑞酒店职业学院"},{"province":"江苏省","city":"淮安市","name":"江苏护理职业学院"},{"province":"江苏省","city":"连云港市","name":"江苏财会职业学院"},{"province":"江苏省","city":"常州市","name":"江苏城乡建设职业学院"},{"province":"江苏省","city":"盐城市","name":"盐城幼儿师范高等专科学校"},{"province":"江苏省","city":"苏州市","name":"苏州幼儿师范高等专科学校"},{"province":"江苏省","city":"镇江市","name":"江苏航空职业技术学院"},{"province":"江苏省","city":"徐州市","name":"江苏安全技术职业学院"},{"province":"江苏省","city":"扬州市","name":"江苏旅游职业学院"},{"province":"江苏省","city":"南京市","name":"中国人民解放军陆军工程大学"},{"province":"江苏省","city":"南京市","name":"中国人民解放军海军指挥学院"},{"province":"浙江省","city":"杭州市","name":"浙江大学"},{"province":"浙江省","city":"杭州市","name":"杭州电子科技大学"},{"province":"浙江省","city":"杭州市","name":"浙江工业大学"},{"province":"浙江省","city":"杭州市","name":"浙江理工大学"},{"province":"浙江省","city":"舟山市","name":"浙江海洋大学"},{"province":"浙江省","city":"杭州市","name":"浙江农林大学"},{"province":"浙江省","city":"温州市","name":"温州医科大学"},{"province":"浙江省","city":"杭州市","name":"浙江中医药大学"},{"province":"浙江省","city":"金华市","name":"浙江师范大学"},{"province":"浙江省","city":"杭州市","name":"杭州师范大学"},{"province":"浙江省","city":"湖州市","name":"湖州师范学院"},{"province":"浙江省","city":"绍兴市","name":"绍兴文理学院"},{"province":"浙江省","city":"台州市","name":"台州学院"},{"province":"浙江省","city":"温州市","name":"温州大学"},{"province":"浙江省","city":"丽水市","name":"丽水学院"},{"province":"浙江省","city":"杭州市","name":"浙江工商大学"},{"province":"浙江省","city":"嘉兴市","name":"嘉兴学院"},{"province":"浙江省","city":"杭州市","name":"中国美术学院"},{"province":"浙江省","city":"杭州市","name":"中国计量大学"},{"province":"浙江省","city":"宁波市","name":"公安海警学院"},{"province":"浙江省","city":"宁波市","name":"浙江万里学院"},{"province":"浙江省","city":"杭州市","name":"浙江科技学院"},{"province":"浙江省","city":"宁波市","name":"宁波工程学院"},{"province":"浙江省","city":"杭州市","name":"浙江水利水电学院"},{"province":"浙江省","city":"杭州市","name":"浙江财经大学"},{"province":"浙江省","city":"杭州市","name":"浙江警察学院"},{"province":"浙江省","city":"衢州市","name":"衢州学院"},{"province":"浙江省","city":"宁波市","name":"宁波大学"},{"province":"浙江省","city":"杭州市","name":"浙江传媒学院"},{"province":"浙江省","city":"杭州市","name":"浙江树人学院"},{"province":"浙江省","city":"绍兴市","name":"浙江越秀外国语学院"},{"province":"浙江省","city":"宁波市","name":"宁波大红鹰学院"},{"province":"浙江省","city":"杭州市","name":"浙江大学城市学院"},{"province":"浙江省","city":"宁波市","name":"浙江大学宁波理工学院"},{"province":"浙江省","city":"杭州市","name":"浙江工业大学之江学院"},{"province":"浙江省","city":"金华市","name":"浙江师范大学行知学院"},{"province":"浙江省","city":"宁波市","name":"宁波大学科学技术学院"},{"province":"浙江省","city":"杭州市","name":"杭州电子科技大学信息工程学院"},{"province":"浙江省","city":"杭州市","name":"浙江理工大学科技与艺术学院"},{"province":"浙江省","city":"舟山市","name":"浙江海洋大学东海科学技术学院"},{"province":"浙江省","city":"绍兴市","name":"浙江农林大学暨阳学院"},{"province":"浙江省","city":"温州市","name":"温州医科大学仁济学院"},{"province":"浙江省","city":"杭州市","name":"浙江中医药大学滨江学院"},{"province":"浙江省","city":"杭州市","name":"杭州师范大学钱江学院"},{"province":"浙江省","city":"湖州市","name":"湖州师范学院求真学院"},{"province":"浙江省","city":"绍兴市","name":"绍兴文理学院元培学院"},{"province":"浙江省","city":"温州市","name":"温州大学瓯江学院"},{"province":"浙江省","city":"杭州市","name":"浙江工商大学杭州商学院"},{"province":"浙江省","city":"嘉兴市","name":"嘉兴学院南湖学院"},{"province":"浙江省","city":"杭州市","name":"中国计量大学现代科技学院"},{"province":"浙江省","city":"嘉兴市","name":"浙江财经大学东方学院"},{"province":"浙江省","city":"温州市","name":"温州商学院"},{"province":"浙江省","city":"嘉兴市","name":"同济大学浙江学院"},{"province":"浙江省","city":"金华市","name":"上海财经大学浙江学院"},{"province":"浙江省","city":"杭州市","name":"浙江外国语学院"},{"province":"浙江省","city":"宁波市","name":"宁波诺丁汉大学"},{"province":"浙江省","city":"温州市","name":"温州肯恩大学"},{"province":"浙江省","city":"宁波市","name":"宁波职业技术学院"},{"province":"浙江省","city":"温州市","name":"温州职业技术学院"},{"province":"浙江省","city":"杭州市","name":"浙江交通职业技术学院"},{"province":"浙江省","city":"金华市","name":"金华职业技术学院"},{"province":"浙江省","city":"宁波市","name":"宁波城市职业技术学院"},{"province":"浙江省","city":"杭州市","name":"浙江电力职业技术学院"},{"province":"浙江省","city":"杭州市","name":"浙江同济科技职业学院"},{"province":"浙江省","city":"宁波市","name":"浙江工商职业技术学院"},{"province":"浙江省","city":"台州市","name":"台州职业技术学院"},{"province":"浙江省","city":"温州市","name":"浙江工贸职业技术学院"},{"province":"浙江省","city":"宁波市","name":"浙江医药高等专科学校"},{"province":"浙江省","city":"杭州市","name":"浙江机电职业技术学院"},{"province":"浙江省","city":"杭州市","name":"浙江建设职业技术学院"},{"province":"浙江省","city":"杭州市","name":"浙江艺术职业学院"},{"province":"浙江省","city":"杭州市","name":"浙江经贸职业技术学院"},{"province":"浙江省","city":"杭州市","name":"浙江商业职业技术学院"},{"province":"浙江省","city":"杭州市","name":"浙江经济职业技术学院"},{"province":"浙江省","city":"杭州市","name":"浙江旅游职业学院"},{"province":"浙江省","city":"杭州市","name":"浙江育英职业技术学院"},{"province":"浙江省","city":"杭州市","name":"浙江警官职业学院"},{"province":"浙江省","city":"杭州市","name":"浙江金融职业学院"},{"province":"浙江省","city":"绍兴市","name":"浙江工业职业技术学院"},{"province":"浙江省","city":"杭州市","name":"杭州职业技术学院"},{"province":"浙江省","city":"嘉兴市","name":"嘉兴职业技术学院"},{"province":"浙江省","city":"湖州市","name":"湖州职业技术学院"},{"province":"浙江省","city":"绍兴市","name":"绍兴职业技术学院"},{"province":"浙江省","city":"衢州市","name":"衢州职业技术学院"},{"province":"浙江省","city":"丽水市","name":"丽水职业技术学院"},{"province":"浙江省","city":"温州市","name":"浙江东方职业技术学院"},{"province":"浙江省","city":"金华市","name":"义乌工商职业技术学院"},{"province":"浙江省","city":"杭州市","name":"杭州医学院"},{"province":"浙江省","city":"宁波市","name":"浙江纺织服装职业技术学院"},{"province":"浙江省","city":"杭州市","name":"杭州科技职业技术学院"},{"province":"浙江省","city":"杭州市","name":"浙江长征职业技术学院"},{"province":"浙江省","city":"嘉兴市","name":"嘉兴南洋职业技术学院"},{"province":"浙江省","city":"金华市","name":"浙江广厦建设职业技术学院"},{"province":"浙江省","city":"杭州市","name":"杭州万向职业技术学院"},{"province":"浙江省","city":"绍兴市","name":"浙江邮电职业技术学院"},{"province":"浙江省","city":"宁波市","name":"宁波卫生职业技术学院"},{"province":"浙江省","city":"台州市","name":"台州科技职业学院"},{"province":"浙江省","city":"舟山市","name":"浙江国际海运职业技术学院"},{"province":"浙江省","city":"杭州市","name":"浙江体育职业技术学院"},{"province":"浙江省","city":"温州市","name":"温州科技职业学院"},{"province":"浙江省","city":"台州市","name":"浙江汽车职业技术学院"},{"province":"浙江省","city":"金华市","name":"浙江横店影视职业学院"},{"province":"浙江省","city":"绍兴市","name":"浙江农业商贸职业学院"},{"province":"浙江省","city":"杭州市","name":"浙江特殊教育职业学院"},{"province":"浙江省","city":"舟山市","name":"浙江舟山群岛新区旅游与健康职业学院"},{"province":"浙江省","city":"杭州市","name":"浙江音乐学院"},{"province":"浙江省","city":"温州市","name":"浙江安防职业技术学院"},{"province":"安徽省","city":"合肥市","name":"安徽大学"},{"province":"安徽省","city":"合肥市","name":"中国科学技术大学"},{"province":"安徽省","city":"合肥市","name":"合肥工业大学"},{"province":"安徽省","city":"马鞍山市","name":"安徽工业大学"},{"province":"安徽省","city":"淮南市","name":"安徽理工大学"},{"province":"安徽省","city":"芜湖市","name":"安徽工程大学"},{"province":"安徽省","city":"合肥市","name":"安徽农业大学"},{"province":"安徽省","city":"合肥市","name":"安徽医科大学"},{"province":"安徽省","city":"蚌埠市","name":"蚌埠医学院"},{"province":"安徽省","city":"芜湖市","name":"皖南医学院"},{"province":"安徽省","city":"合肥市","name":"安徽中医药大学"},{"province":"安徽省","city":"芜湖市","name":"安徽师范大学"},{"province":"安徽省","city":"阜阳市","name":"阜阳师范学院"},{"province":"安徽省","city":"安庆市","name":"安庆师范大学"},{"province":"安徽省","city":"淮北市","name":"淮北师范大学"},{"province":"安徽省","city":"黄山市","name":"黄山学院"},{"province":"安徽省","city":"六安市","name":"皖西学院"},{"province":"安徽省","city":"滁州市","name":"滁州学院"},{"province":"安徽省","city":"蚌埠市","name":"安徽财经大学"},{"province":"安徽省","city":"宿州市","name":"宿州学院"},{"province":"安徽省","city":"合肥市","name":"巢湖学院"},{"province":"安徽省","city":"淮南市","name":"淮南师范学院"},{"province":"安徽省","city":"铜陵市","name":"铜陵学院"},{"province":"安徽省","city":"合肥市","name":"安徽建筑大学"},{"province":"安徽省","city":"滁州市","name":"安徽科技学院"},{"province":"安徽省","city":"合肥市","name":"安徽三联学院"},{"province":"安徽省","city":"合肥市","name":"合肥学院"},{"province":"安徽省","city":"蚌埠市","name":"蚌埠学院"},{"province":"安徽省","city":"池州市","name":"池州学院"},{"province":"安徽省","city":"合肥市","name":"安徽新华学院"},{"province":"安徽省","city":"合肥市","name":"安徽文达信息工程学院"},{"province":"安徽省","city":"合肥市","name":"安徽外国语学院"},{"province":"安徽省","city":"蚌埠市","name":"安徽财经大学商学院"},{"province":"安徽省","city":"合肥市","name":"安徽大学江淮学院"},{"province":"安徽省","city":"芜湖市","name":"安徽信息工程学院"},{"province":"安徽省","city":"马鞍山市","name":"安徽工业大学工商学院"},{"province":"安徽省","city":"合肥市","name":"安徽建筑大学城市建设学院"},{"province":"安徽省","city":"合肥市","name":"安徽农业大学经济技术学院"},{"province":"安徽省","city":"芜湖市","name":"安徽师范大学皖江学院"},{"province":"安徽省","city":"合肥市","name":"安徽医科大学临床医学院"},{"province":"安徽省","city":"阜阳市","name":"阜阳师范学院信息工程学院"},{"province":"安徽省","city":"淮北市","name":"淮北师范大学信息学院"},{"province":"安徽省","city":"合肥市","name":"合肥师范学院"},{"province":"安徽省","city":"马鞍山市","name":"河海大学文天学院"},{"province":"安徽省","city":"合肥市","name":"安徽职业技术学院"},{"province":"安徽省","city":"淮北市","name":"淮北职业技术学院"},{"province":"安徽省","city":"芜湖市","name":"芜湖职业技术学院"},{"province":"安徽省","city":"淮南市","name":"淮南联合大学"},{"province":"安徽省","city":"芜湖市","name":"安徽商贸职业技术学院"},{"province":"安徽省","city":"合肥市","name":"安徽水利水电职业技术学院"},{"province":"安徽省","city":"阜阳市","name":"阜阳职业技术学院"},{"province":"安徽省","city":"铜陵市","name":"铜陵职业技术学院"},{"province":"安徽省","city":"合肥市","name":"民办万博科技职业学院"},{"province":"安徽省","city":"合肥市","name":"安徽警官职业学院"},{"province":"安徽省","city":"淮南市","name":"淮南职业技术学院"},{"province":"安徽省","city":"合肥市","name":"安徽工业经济职业技术学院"},{"province":"安徽省","city":"合肥市","name":"合肥通用职业技术学院"},{"province":"安徽省","city":"淮南市","name":"安徽工贸职业技术学院"},{"province":"安徽省","city":"宿州市","name":"宿州职业技术学院"},{"province":"安徽省","city":"六安市","name":"六安职业技术学院"},{"province":"安徽省","city":"蚌埠市","name":"安徽电子信息职业技术学院"},{"province":"安徽省","city":"合肥市","name":"民办合肥经济技术职业学院"},{"province":"安徽省","city":"合肥市","name":"安徽交通职业技术学院"},{"province":"安徽省","city":"合肥市","name":"安徽体育运动职业技术学院"},{"province":"安徽省","city":"芜湖市","name":"安徽中医药高等专科学校"},{"province":"安徽省","city":"合肥市","name":"安徽医学高等专科学校"},{"province":"安徽省","city":"亳州市","name":"亳州学院"},{"province":"安徽省","city":"合肥市","name":"合肥职业技术学院"},{"province":"安徽省","city":"滁州市","name":"滁州职业技术学院"},{"province":"安徽省","city":"池州市","name":"池州职业技术学院"},{"province":"安徽省","city":"宣城市","name":"宣城职业技术学院"},{"province":"安徽省","city":"合肥市","name":"安徽广播影视职业技术学院"},{"province":"安徽省","city":"合肥市","name":"民办合肥滨湖职业技术学院"},{"province":"安徽省","city":"合肥市","name":"安徽电气工程职业技术学院"},{"province":"安徽省","city":"马鞍山市","name":"安徽冶金科技职业学院"},{"province":"安徽省","city":"合肥市","name":"安徽城市管理职业学院"},{"province":"安徽省","city":"芜湖市","name":"安徽机电职业技术学院"},{"province":"安徽省","city":"合肥市","name":"安徽工商职业学院"},{"province":"安徽省","city":"合肥市","name":"安徽中澳科技职业学院"},{"province":"安徽省","city":"阜阳市","name":"阜阳科技职业学院"},{"province":"安徽省","city":"亳州市","name":"亳州职业技术学院"},{"province":"安徽省","city":"六安市","name":"安徽国防科技职业学院"},{"province":"安徽省","city":"安庆市","name":"安庆职业技术学院"},{"province":"安徽省","city":"合肥市","name":"安徽艺术职业学院"},{"province":"安徽省","city":"马鞍山市","name":"马鞍山师范高等专科学校"},{"province":"安徽省","city":"合肥市","name":"安徽财贸职业学院"},{"province":"安徽省","city":"合肥市","name":"安徽国际商务职业学院"},{"province":"安徽省","city":"合肥市","name":"安徽公安职业学院"},{"province":"安徽省","city":"合肥市","name":"安徽林业职业技术学院"},{"province":"安徽省","city":"合肥市","name":"安徽审计职业学院"},{"province":"安徽省","city":"合肥市","name":"安徽新闻出版职业技术学院"},{"province":"安徽省","city":"合肥市","name":"安徽邮电职业技术学院"},{"province":"安徽省","city":"铜陵市","name":"安徽工业职业技术学院"},{"province":"安徽省","city":"合肥市","name":"民办合肥财经职业学院"},{"province":"安徽省","city":"安庆市","name":"安庆医药高等专科学校"},{"province":"安徽省","city":"合肥市","name":"安徽涉外经济职业学院"},{"province":"安徽省","city":"合肥市","name":"安徽绿海商务职业学院"},{"province":"安徽省","city":"合肥市","name":"合肥共达职业技术学院"},{"province":"安徽省","city":"蚌埠市","name":"蚌埠经济技术职业学院"},{"province":"安徽省","city":"阜阳市","name":"民办安徽旅游职业学院"},{"province":"安徽省","city":"合肥市","name":"徽商职业学院"},{"province":"安徽省","city":"马鞍山市","name":"马鞍山职业技术学院"},{"province":"安徽省","city":"六安市","name":"安徽现代信息工程职业学院"},{"province":"安徽省","city":"淮北市","name":"安徽矿业职业技术学院"},{"province":"安徽省","city":"合肥市","name":"合肥信息技术职业学院"},{"province":"安徽省","city":"安庆市","name":"桐城师范高等专科学校"},{"province":"安徽省","city":"黄山市","name":"黄山职业技术学院"},{"province":"安徽省","city":"滁州市","name":"滁州城市职业学院"},{"province":"安徽省","city":"合肥市","name":"安徽汽车职业技术学院"},{"province":"安徽省","city":"六安市","name":"皖西卫生职业学院"},{"province":"安徽省","city":"合肥市","name":"合肥幼儿师范高等专科学校"},{"province":"安徽省","city":"合肥市","name":"安徽长江职业学院"},{"province":"安徽省","city":"芜湖市","name":"安徽扬子职业技术学院"},{"province":"安徽省","city":"安庆市","name":"安徽黄梅戏艺术职业学院"},{"province":"安徽省","city":"合肥市","name":"安徽粮食工程职业学院"},{"province":"安徽省","city":"池州市","name":"安徽卫生健康职业学院"},{"province":"安徽省","city":"合肥市","name":"合肥科技职业学院"},{"province":"安徽省","city":"宿州市","name":"皖北卫生职业学院"},{"province":"安徽省","city":"阜阳市","name":"阜阳幼儿师范高等专科学校"},{"province":"安徽省","city":"合肥市","name":"中国人民解放军陆军炮兵防空兵学院"},{"province":"安徽省","city":"蚌埠市","name":"中国人民解放军海军士官学校"},{"province":"福建省","city":"厦门市","name":"厦门大学"},{"province":"福建省","city":"泉州市","name":"华侨大学"},{"province":"福建省","city":"福州市","name":"福州大学"},{"province":"福建省","city":"福州市","name":"福建工程学院"},{"province":"福建省","city":"福州市","name":"福建农林大学"},{"province":"福建省","city":"厦门市","name":"集美大学"},{"province":"福建省","city":"福州市","name":"福建医科大学"},{"province":"福建省","city":"福州市","name":"福建中医药大学"},{"province":"福建省","city":"福州市","name":"福建师范大学"},{"province":"福建省","city":"福州市","name":"闽江学院"},{"province":"福建省","city":"南平市","name":"武夷学院"},{"province":"福建省","city":"宁德市","name":"宁德师范学院"},{"province":"福建省","city":"泉州市","name":"泉州师范学院"},{"province":"福建省","city":"漳州市","name":"闽南师范大学"},{"province":"福建省","city":"厦门市","name":"厦门理工学院"},{"province":"福建省","city":"三明市","name":"三明学院"},{"province":"福建省","city":"龙岩市","name":"龙岩学院"},{"province":"福建省","city":"福州市","name":"福建警察学院"},{"province":"福建省","city":"莆田市","name":"莆田学院"},{"province":"福建省","city":"泉州市","name":"仰恩大学"},{"province":"福建省","city":"厦门市","name":"厦门华厦学院"},{"province":"福建省","city":"泉州市","name":"闽南理工学院"},{"province":"福建省","city":"泉州市","name":"福建师范大学闽南科技学院"},{"province":"福建省","city":"福州市","name":"福建农林大学东方学院"},{"province":"福建省","city":"厦门市","name":"厦门工学院"},{"province":"福建省","city":"福州市","name":"阳光学院"},{"province":"福建省","city":"漳州市","name":"厦门大学嘉庚学院"},{"province":"福建省","city":"福州市","name":"福州大学至诚学院"},{"province":"福建省","city":"厦门市","name":"集美大学诚毅学院"},{"province":"福建省","city":"福州市","name":"福建师范大学协和学院"},{"province":"福建省","city":"福州市","name":"福州外语外贸学院"},{"province":"福建省","city":"福州市","name":"福建江夏学院"},{"province":"福建省","city":"泉州市","name":"泉州信息工程学院"},{"province":"福建省","city":"福州市","name":"福州理工学院"},{"province":"福建省","city":"福州市","name":"福建农林大学金山学院"},{"province":"福建省","city":"福州市","name":"福建船政交通职业学院"},{"province":"福建省","city":"福州市","name":"福建商学院"},{"province":"福建省","city":"漳州市","name":"漳州职业技术学院"},{"province":"福建省","city":"龙岩市","name":"闽西职业技术学院"},{"province":"福建省","city":"泉州市","name":"黎明职业大学"},{"province":"福建省","city":"福州市","name":"福建华南女子职业学院"},{"province":"福建省","city":"福州市","name":"福州职业技术学院"},{"province":"福建省","city":"南平市","name":"福建林业职业技术学院"},{"province":"福建省","city":"福州市","name":"福建信息职业技术学院"},{"province":"福建省","city":"三明市","name":"福建水利电力职业技术学院"},{"province":"福建省","city":"泉州市","name":"福建电力职业技术学院"},{"province":"福建省","city":"厦门市","name":"厦门海洋职业技术学院"},{"province":"福建省","city":"福州市","name":"福建农业职业技术学院"},{"province":"福建省","city":"厦门市","name":"厦门医学院"},{"province":"福建省","city":"福州市","name":"福建卫生职业技术学院"},{"province":"福建省","city":"泉州市","name":"泉州医学高等专科学校"},{"province":"福建省","city":"福州市","name":"福州英华职业学院"},{"province":"福建省","city":"泉州市","name":"泉州纺织服装职业学院"},{"province":"福建省","city":"泉州市","name":"泉州华光职业学院"},{"province":"福建省","city":"泉州市","name":"泉州理工职业学院"},{"province":"福建省","city":"福州市","name":"福建警官职业学院"},{"province":"福建省","city":"南平市","name":"闽北职业技术学院"},{"province":"福建省","city":"福州市","name":"福州黎明职业技术学院"},{"province":"福建省","city":"厦门市","name":"厦门演艺职业学院"},{"province":"福建省","city":"厦门市","name":"厦门华天涉外职业技术学院"},{"province":"福建省","city":"福州市","name":"福州科技职业技术学院"},{"province":"福建省","city":"泉州市","name":"泉州经贸职业技术学院"},{"province":"福建省","city":"福州市","name":"福建对外经济贸易职业技术学院"},{"province":"福建省","city":"莆田市","name":"湄洲湾职业技术学院"},{"province":"福建省","city":"福州市","name":"福建生物工程职业技术学院"},{"province":"福建省","city":"福州市","name":"福建艺术职业学院"},{"province":"福建省","city":"福州市","name":"福建幼儿师范高等专科学校"},{"province":"福建省","city":"厦门市","name":"厦门城市职业学院"},{"province":"福建省","city":"泉州市","name":"泉州工艺美术职业学院"},{"province":"福建省","city":"三明市","name":"三明医学科技职业学院"},{"province":"福建省","city":"宁德市","name":"宁德职业技术学院"},{"province":"福建省","city":"福州市","name":"福州软件职业技术学院"},{"province":"福建省","city":"厦门市","name":"厦门兴才职业技术学院"},{"province":"福建省","city":"厦门市","name":"厦门软件职业技术学院"},{"province":"福建省","city":"福州市","name":"福建体育职业技术学院"},{"province":"福建省","city":"漳州市","name":"漳州城市职业学院"},{"province":"福建省","city":"厦门市","name":"厦门南洋职业学院"},{"province":"福建省","city":"厦门市","name":"厦门东海职业技术学院"},{"province":"福建省","city":"漳州市","name":"漳州科技职业学院"},{"province":"福建省","city":"漳州市","name":"漳州理工职业学院"},{"province":"福建省","city":"南平市","name":"武夷山职业学院"},{"province":"福建省","city":"漳州市","name":"漳州卫生职业学院"},{"province":"福建省","city":"泉州市","name":"泉州海洋职业学院"},{"province":"福建省","city":"泉州市","name":"泉州轻工职业学院"},{"province":"福建省","city":"厦门市","name":"厦门安防科技职业学院"},{"province":"福建省","city":"泉州市","name":"泉州幼儿师范高等专科学校"},{"province":"福建省","city":"福州市","name":"闽江师范高等专科学校"},{"province":"福建省","city":"泉州市","name":"泉州工程职业技术学院"},{"province":"福建省","city":"福州市","name":"福州墨尔本理工职业学院"},{"province":"江西省","city":"南昌市","name":"南昌大学"},{"province":"江西省","city":"南昌市","name":"华东交通大学"},{"province":"江西省","city":"抚州市","name":"东华理工大学"},{"province":"江西省","city":"南昌市","name":"南昌航空大学"},{"province":"江西省","city":"赣州市","name":"江西理工大学"},{"province":"江西省","city":"景德镇市","name":"景德镇陶瓷大学"},{"province":"江西省","city":"南昌市","name":"江西农业大学"},{"province":"江西省","city":"南昌市","name":"江西中医药大学"},{"province":"江西省","city":"赣州市","name":"赣南医学院"},{"province":"江西省","city":"南昌市","name":"江西师范大学"},{"province":"江西省","city":"上饶市","name":"上饶师范学院"},{"province":"江西省","city":"宜春市","name":"宜春学院"},{"province":"江西省","city":"赣州市","name":"赣南师范大学"},{"province":"江西省","city":"吉安市","name":"井冈山大学"},{"province":"江西省","city":"南昌市","name":"江西财经大学"},{"province":"江西省","city":"南昌市","name":"江西科技学院"},{"province":"江西省","city":"景德镇市","name":"景德镇学院"},{"province":"江西省","city":"萍乡市","name":"萍乡学院"},{"province":"江西省","city":"南昌市","name":"江西科技师范大学"},{"province":"江西省","city":"南昌市","name":"南昌工程学院"},{"province":"江西省","city":"南昌市","name":"江西警察学院"},{"province":"江西省","city":"新余市","name":"新余学院"},{"province":"江西省","city":"九江市","name":"九江学院"},{"province":"江西省","city":"新余市","name":"江西工程学院"},{"province":"江西省","city":"南昌市","name":"南昌理工学院"},{"province":"江西省","city":"南昌市","name":"江西应用科技学院"},{"province":"江西省","city":"南昌市","name":"江西服装学院"},{"province":"江西省","city":"南昌市","name":"南昌工学院"},{"province":"江西省","city":"南昌市","name":"南昌大学科学技术学院"},{"province":"江西省","city":"九江市","name":"南昌大学共青学院"},{"province":"江西省","city":"南昌市","name":"华东交通大学理工学院"},{"province":"江西省","city":"抚州市","name":"东华理工大学长江学院"},{"province":"江西省","city":"南昌市","name":"南昌航空大学科技学院"},{"province":"江西省","city":"赣州市","name":"江西理工大学应用科学学院"},{"province":"江西省","city":"景德镇市","name":"景德镇陶瓷大学科技艺术学院"},{"province":"江西省","city":"南昌市","name":"江西农业大学南昌商学院"},{"province":"江西省","city":"南昌市","name":"江西中医药大学科技学院"},{"province":"江西省","city":"南昌市","name":"江西师范大学科学技术学院"},{"province":"江西省","city":"赣州市","name":"赣南师范大学科技学院"},{"province":"江西省","city":"南昌市","name":"江西科技师范大学理工学院"},{"province":"江西省","city":"南昌市","name":"江西财经大学现代经济管理学院"},{"province":"江西省","city":"南昌市","name":"南昌师范学院"},{"province":"江西省","city":"南昌市","name":"江西工业职业技术学院"},{"province":"江西省","city":"上饶市","name":"江西医学高等专科学校"},{"province":"江西省","city":"九江市","name":"九江职业大学"},{"province":"江西省","city":"九江市","name":"九江职业技术学院"},{"province":"江西省","city":"南昌市","name":"江西司法警官职业学院"},{"province":"江西省","city":"景德镇市","name":"江西陶瓷工艺美术职业技术学院"},{"province":"江西省","city":"南昌市","name":"江西旅游商贸职业学院"},{"province":"江西省","city":"南昌市","name":"江西电力职业技术学院"},{"province":"江西省","city":"赣州市","name":"江西环境工程职业学院"},{"province":"江西省","city":"南昌市","name":"江西艺术职业学院"},{"province":"江西省","city":"鹰潭市","name":"鹰潭职业技术学院"},{"province":"江西省","city":"南昌市","name":"江西信息应用职业技术学院"},{"province":"江西省","city":"南昌市","name":"江西交通职业技术学院"},{"province":"江西省","city":"九江市","name":"江西财经职业学院"},{"province":"江西省","city":"赣州市","name":"江西应用技术职业学院"},{"province":"江西省","city":"南昌市","name":"江西现代职业技术学院"},{"province":"江西省","city":"萍乡市","name":"江西工业工程职业技术学院"},{"province":"江西省","city":"南昌市","name":"江西机电职业技术学院"},{"province":"江西省","city":"南昌市","name":"江西科技职业学院"},{"province":"江西省","city":"南昌市","name":"南昌职业学院"},{"province":"江西省","city":"南昌市","name":"江西外语外贸职业学院"},{"province":"江西省","city":"南昌市","name":"江西工业贸易职业技术学院"},{"province":"江西省","city":"宜春市","name":"宜春职业技术学院"},{"province":"江西省","city":"萍乡市","name":"江西应用工程职业学院"},{"province":"江西省","city":"南昌市","name":"江西生物科技职业学院"},{"province":"江西省","city":"南昌市","name":"江西建设职业技术学院"},{"province":"江西省","city":"抚州市","name":"抚州职业技术学院"},{"province":"江西省","city":"南昌市","name":"豫章师范学院"},{"province":"江西省","city":"抚州市","name":"江西中医药高等专科学校"},{"province":"江西省","city":"南昌市","name":"江西先锋软件职业技术学院"},{"province":"江西省","city":"南昌市","name":"江西经济管理职业学院"},{"province":"江西省","city":"南昌市","name":"江西制造职业技术学院"},{"province":"江西省","city":"南昌市","name":"江西工程职业学院"},{"province":"江西省","city":"南昌市","name":"江西青年职业学院"},{"province":"江西省","city":"上饶市","name":"上饶职业技术学院"},{"province":"江西省","city":"南昌市","name":"江西航空职业技术学院"},{"province":"江西省","city":"宜春市","name":"江西农业工程职业学院"},{"province":"江西省","city":"新余市","name":"赣西科技职业学院"},{"province":"江西省","city":"南昌市","name":"江西卫生职业学院"},{"province":"江西省","city":"新余市","name":"江西新能源科技职业学院"},{"province":"江西省","city":"九江市","name":"江西枫林涉外经贸职业学院"},{"province":"江西省","city":"南昌市","name":"江西泰豪动漫职业学院"},{"province":"江西省","city":"新余市","name":"江西冶金职业技术学院"},{"province":"江西省","city":"南昌市","name":"江西管理职业学院"},{"province":"江西省","city":"南昌市","name":"江西传媒职业学院"},{"province":"江西省","city":"南昌市","name":"江西工商职业技术学院"},{"province":"江西省","city":"景德镇市","name":"景德镇陶瓷职业技术学院"},{"province":"江西省","city":"九江市","name":"共青科技职业学院"},{"province":"江西省","city":"赣州市","name":"赣州师范高等专科学校"},{"province":"江西省","city":"南昌市","name":"江西水利职业学院"},{"province":"江西省","city":"宜春市","name":"宜春幼儿师范高等专科学校"},{"province":"江西省","city":"吉安市","name":"吉安职业技术学院"},{"province":"江西省","city":"宜春市","name":"江西洪州职业学院"},{"province":"江西省","city":"鹰潭市","name":"江西师范高等专科学校"},{"province":"江西省","city":"南昌市","name":"南昌影视传播职业学院"},{"province":"江西省","city":"上饶市","name":"上饶幼儿师范高等专科学校"},{"province":"江西省","city":"抚州市","name":"抚州幼儿师范高等专科学校"},{"province":"江西省","city":"赣州市","name":"赣南卫生健康职业学院"},{"province":"江西省","city":"南昌市","name":"中国人民解放军陆军步兵学院"},{"province":"山东省","city":"济南市","name":"山东大学"},{"province":"山东省","city":"青岛市","name":"中国海洋大学"},{"province":"山东省","city":"青岛市","name":"中国石油大学（华东）"},{"province":"山东省","city":"青岛市","name":"山东科技大学"},{"province":"山东省","city":"青岛市","name":"青岛科技大学"},{"province":"山东省","city":"济南市","name":"济南大学"},{"province":"山东省","city":"烟台市","name":"烟台大学文经学院"},{"province":"山东省","city":"聊城市","name":"聊城大学东昌学院"},{"province":"山东省","city":"青岛市","name":"青岛理工大学琴岛学院"},{"province":"山东省","city":"济南市","name":"山东师范大学历山学院"},{"province":"山东省","city":"济南市","name":"山东财经大学燕山学院"},{"province":"山东省","city":"东营市","name":"中国石油大学胜利学院"},{"province":"山东省","city":"泰安市","name":"山东科技大学泰山科技学院"},{"province":"山东省","city":"烟台市","name":"青岛农业大学海都学院"},{"province":"山东省","city":"泰安市","name":"山东财经大学东方学院"},{"province":"山东省","city":"济南市","name":"济南大学泉城学院"},{"province":"山东省","city":"青岛市","name":"北京电影学院现代创意媒体学院"},{"province":"山东省","city":"青岛市","name":"青岛理工大学"},{"province":"山东省","city":"济南市","name":"山东建筑大学"},{"province":"山东省","city":"济南市","name":"齐鲁工业大学"},{"province":"山东省","city":"淄博市","name":"山东理工大学"},{"province":"山东省","city":"泰安市","name":"山东农业大学"},{"province":"山东省","city":"青岛市","name":"青岛农业大学"},{"province":"山东省","city":"潍坊市","name":"潍坊医学院"},{"province":"山东省","city":"泰安市","name":"泰山医学院"},{"province":"山东省","city":"滨州市","name":"滨州医学院"},{"province":"山东省","city":"济南市","name":"山东中医药大学"},{"province":"山东省","city":"济宁市","name":"济宁医学院"},{"province":"山东省","city":"济南市","name":"山东师范大学"},{"province":"山东省","city":"济宁市","name":"曲阜师范大学"},{"province":"山东省","city":"聊城市","name":"聊城大学"},{"province":"山东省","city":"德州市","name":"德州学院"},{"province":"山东省","city":"滨州市","name":"滨州学院"},{"province":"山东省","city":"烟台市","name":"鲁东大学"},{"province":"山东省","city":"临沂市","name":"临沂大学"},{"province":"山东省","city":"泰安市","name":"泰山学院"},{"province":"山东省","city":"济宁市","name":"济宁学院"},{"province":"山东省","city":"菏泽市","name":"菏泽学院"},{"province":"山东省","city":"济南市","name":"山东财经大学"},{"province":"山东省","city":"济南市","name":"山东体育学院"},{"province":"山东省","city":"济南市","name":"山东艺术学院"},{"province":"山东省","city":"淄博市","name":"齐鲁医药学院"},{"province":"山东省","city":"青岛市","name":"青岛滨海学院"},{"province":"山东省","city":"枣庄市","name":"枣庄学院"},{"province":"山东省","city":"济南市","name":"山东工艺美术学院"},{"province":"山东省","city":"青岛市","name":"青岛大学"},{"province":"山东省","city":"烟台市","name":"烟台大学"},{"province":"山东省","city":"潍坊市","name":"潍���学院"},{"province":"山东省","city":"济南市","name":"山东警察学院"},{"province":"山东省","city":"济南市","name":"山东交通学院"},{"province":"山东省","city":"烟台市","name":"山东工商学院"},{"province":"山东省","city":"济南市","name":"山东女子学院"},{"province":"山东省","city":"烟台市","name":"烟台南山学院"},{"province":"山东省","city":"潍坊市","name":"潍坊科技学院"},{"province":"山东省","city":"济南市","name":"山东英才学院"},{"province":"山东省","city":"青岛市","name":"青岛恒星科技学院"},{"province":"山东省","city":"青岛市","name":"青岛黄海学院"},{"province":"山东省","city":"济南市","name":"山东现代学院"},{"province":"山东省","city":"济南市","name":"山东协和学院"},{"province":"山东省","city":"德州市","name":"山东华宇工学院"},{"province":"山东省","city":"青岛市","name":"青岛工学院"},{"province":"山东省","city":"济南市","name":"齐鲁理工学院"},{"province":"山东省","city":"济南市","name":"山东政法学院"},{"province":"山东省","city":"济南市","name":"齐鲁师范学院"},{"province":"山东省","city":"济南市","name":"山东青年政治学院"},{"province":"山东省","city":"济南市","name":"山东管理学院"},{"province":"山东省","city":"济南市","name":"山东农业工程学院"},{"province":"山东省","city":"临沂市","name":"山东医学高等专科学校"},{"province":"山东省","city":"菏泽市","name":"菏泽医学专科学校"},{"province":"山东省","city":"济南市","name":"山东商业职业技术学院"},{"province":"山东省","city":"济南市","name":"山东电力高等专科学校"},{"province":"山东省","city":"日照市","name":"日照职业技术学院"},{"province":"山东省","city":"济宁市","name":"曲阜远东职业技术学院"},{"province":"山东省","city":"青岛市","name":"青岛职业技术学院"},{"province":"山东省","city":"威海市","name":"威海职业学院"},{"province":"山东省","city":"济南市","name":"山东职业学院"},{"province":"山东省","city":"济南市","name":"山东劳动职业技术学院"},{"province":"山东省","city":"莱芜市","name":"莱芜职业技术学院"},{"province":"山东省","city":"济宁市","name":"济宁职业技术学院"},{"province":"山东省","city":"潍坊市","name":"潍坊职业学院"},{"province":"山东省","city":"烟台市","name":"烟台职业学院"},{"province":"山东省","city":"东营市","name":"东营职业学院"},{"province":"山东省","city":"聊城市","name":"聊城职业技术学院"},{"province":"山东省","city":"滨州市","name":"滨州职业学院"},{"province":"山东省","city":"潍坊市","name":"山东科技职业学院"},{"province":"山东省","city":"泰安市","name":"山东服装职业学院"},{"province":"山东省","city":"德州市","name":"德州科技职业学院"},{"province":"山东省","city":"泰安市","name":"山东力明科技职业学院"},{"province":"山东省","city":"济南市","name":"山东圣翰财贸职业学院"},{"province":"山东省","city":"日照市","name":"山东水利职业学院"},{"province":"山东省","city":"潍坊市","name":"山东畜牧兽医职业学院"},{"province":"山东省","city":"青岛市","name":"青岛飞洋职业技术学院"},{"province":"山东省","city":"东营市","name":"东营科技职业学院"},{"province":"山东省","city":"潍坊市","name":"山东交通职业学院"},{"province":"山东省","city":"淄博市","name":"淄博职业学院"},{"province":"山东省","city":"青岛市","name":"山东外贸职业学院"},{"province":"山东省","city":"青岛市","name":"青岛酒店管理职业技术学院"},{"province":"山东省","city":"潍坊市","name":"山东信息职业技术学院"},{"province":"山东省","city":"青岛市","name":"青岛港湾职业技术学院"},{"province":"山东省","city":"东营市","name":"山东胜利职业学院"},{"province":"山东省","city":"潍坊市","name":"山东经贸职业学院"},{"province":"山东省","city":"淄博市","name":"山东工业职业学院"},{"province":"山东省","city":"淄博市","name":"山东化工职业学院"},{"province":"山东省","city":"青岛市","name":"青岛求实职业技术学院"},{"province":"山东省","city":"济南市","name":"济南职业学院"},{"province":"山东省","city":"烟台市","name":"烟台工程职业技术学院"},{"province":"山东省","city":"济南市","name":"山东凯文科技职业学院"},{"province":"山东省","city":"日照市","name":"山东外国语职业学院"},{"province":"山东省","city":"潍坊市","name":"潍坊工商职业学院"},{"province":"山东省","city":"德州市","name":"德州职业技术学院"},{"province":"山东省","city":"枣庄市","name":"枣庄科技职业学院"},{"province":"山东省","city":"淄博市","name":"淄博师范高等专科学校"},{"province":"山东省","city":"烟台市","name":"山东中医药高等专科学校"},{"province":"山东省","city":"济南市","name":"济南工程职业技术学院"},{"province":"山东省","city":"济南市","name":"山东电子职业技术学院"},{"province":"山东省","city":"济南市","name":"山东旅游职业学院"},{"province":"山东省","city":"淄博市","name":"山东铝业职业学院"},{"province":"山东省","city":"济南市","name":"山东杏林科技职业学院"},{"province":"山东省","city":"泰安市","name":"泰山职业技术学院"},{"province":"山东省","city":"威海市","name":"山东外事翻译职业学院"},{"province":"山东省","city":"威海市","name":"山东药品食品职业学院"},{"province":"山东省","city":"烟台市","name":"山东商务职业学院"},{"province":"山东省","city":"淄博市","name":"山东轻工职业学院"},{"province":"山东省","city":"济南市","name":"山东城市建设职业学院"},{"province":"山东省","city":"烟台市","name":"烟台汽车工程职业学院"},{"province":"山东省","city":"济南市","name":"山东司法警官职业学院"},{"province":"山东省","city":"菏泽市","name":"菏泽家政职业学院"},{"province":"山东省","city":"济南市","name":"山东传媒职业学院"},{"province":"山东省","city":"临沂市","name":"临沂职业学院"},{"province":"山东省","city":"枣庄市","name":"枣庄职业学院"},{"province":"山东省","city":"济宁市","name":"山东理工职业学院"},{"province":"山东省","city":"烟台市","name":"山东文化产业职业学院"},{"province":"山东省","city":"青岛市","name":"青岛远洋船员职业学院"},{"province":"山东省","city":"济南市","name":"济南幼儿师范高等专科学校"},{"province":"山东省","city":"济南市","name":"济南护理职业学院"},{"province":"山东省","city":"泰安市","name":"泰山护理职业学院"},{"province":"山东省","city":"潍坊市","name":"山东海事职业学院"},{"province":"山东省","city":"潍坊市","name":"潍坊护理职业学院"},{"province":"山东省","city":"潍坊市","name":"潍坊工程职业学院"},{"province":"山东省","city":"菏泽市","name":"菏泽职业学院"},{"province":"山东省","city":"济南市","name":"山东艺术设计职业学院"},{"province":"山东省","city":"威海市","name":"威海海洋职业学院"},{"province":"山东省","city":"济南市","name":"山东特殊教育职业学院"},{"province":"山东省","city":"烟台市","name":"烟台黄金职业学院"},{"province":"山东省","city":"日照市","name":"日照航海工程职业学院"},{"province":"山东省","city":"青岛市","name":"中国人民解放军海军潜艇学院"},{"province":"山东省","city":"烟台市","name":"中国人民解放军海军航空大学"},{"province":"山东省","city":"潍坊市","name":"中国人民解放军火箭军士官学校"},{"province":"河南省","city":"郑州市","name":"华北水利水电大学"},{"province":"河南省","city":"郑州市","name":"郑州大学"},{"province":"河南省","city":"焦作市","name":"河南理工大学"},{"province":"河南省","city":"郑州市","name":"郑州轻工业学院"},{"province":"河南省","city":"郑州市","name":"河南工业大学"},{"province":"河南省","city":"洛阳市","name":"河南科技大学"},{"province":"河南省","city":"郑州市","name":"中原工学院"},{"province":"河南省","city":"郑州市","name":"河南农业大学"},{"province":"河南省","city":"新乡市","name":"河南科技学院"},{"province":"河南省","city":"郑州市","name":"河南牧业经济学院"},{"province":"河南省","city":"郑州市","name":"河南中医药大学"},{"province":"河南省","city":"新乡市","name":"新乡医学院"},{"province":"河南省","city":"开封市","name":"河南大学"},{"province":"河南省","city":"新乡市","name":"河南师范大学"},{"province":"河南省","city":"信阳市","name":"信阳师范学院"},{"province":"河南省","city":"周口市","name":"周口师范学院"},{"province":"河南省","city":"安阳市","name":"安阳师范学院"},{"province":"河南省","city":"许昌市","name":"许昌学院"},{"province":"河南省","city":"南阳市","name":"南阳师范学院"},{"province":"河南省","city":"洛阳市","name":"洛阳师范学院"},{"province":"河南省","city":"商丘市","name":"商丘师范学院"},{"province":"河南省","city":"郑州市","name":"河南财经政法大学"},{"province":"河南省","city":"郑州市","name":"郑州航空工业管理学院"},{"province":"河南省","city":"驻马店市","name":"黄淮学院"},{"province":"河南省","city":"平顶山市","name":"平顶山学院"},{"province":"河南省","city":"洛阳市","name":"洛阳理工学院"},{"province":"河南省","city":"新乡市","name":"新乡学院"},{"province":"河南省","city":"信阳市","name":"信阳农林学院"},{"province":"河南省","city":"安阳市","name":"安阳工学院"},{"province":"河南省","city":"郑州市","name":"河南工程学院"},{"province":"河南省","city":"南阳市","name":"南阳理工学院"},{"province":"河南省","city":"平顶山市","name":"河南城建学院"},{"province":"河南省","city":"郑州市","name":"河南警察学院"},{"province":"河南省","city":"郑州市","name":"黄河科技学院"},{"province":"河南省","city":"郑州市","name":"铁道警察学院"},{"province":"河南省","city":"郑州市","name":"郑州科技学院"},{"province":"河南省","city":"郑州市","name":"郑州工业应用技术学院"},{"province":"河南省","city":"郑州市","name":"郑州师范学院"},{"province":"河南省","city":"郑州市","name":"郑州财经学院"},{"province":"河南省","city":"焦作市","name":"黄河交通学院"},{"province":"河南省","city":"商丘市","name":"商丘工学院"},{"province":"河南省","city":"开封市","name":"河南大学民生学院"},{"province":"河南省","city":"郑州市","name":"河南师范大学新联学院"},{"province":"河南省","city":"信阳市","name":"信阳学院"},{"province":"河南省","city":"安阳市","name":"安阳学院"},{"province":"河南省","city":"新乡市","name":"新乡医学院三全学院"},{"province":"河南省","city":"新乡市","name":"河南科技学院新科学院"},{"province":"河南省","city":"郑州市","name":"郑州工商学院"},{"province":"河南省","city":"郑州市","name":"中原工学院信息商务学院"},{"province":"河南省","city":"商丘市","name":"商丘学院"},{"province":"河南省","city":"郑州市","name":"郑州成功财经学院"},{"province":"河南省","city":"郑州市","name":"郑州升达经贸管理学院"},{"province":"河南省","city":"郑州市","name":"河南职业技术学院"},{"province":"河南省","city":"漯河市","name":"漯河职业技术学院"},{"province":"河南省","city":"三门峡市","name":"三门峡职业技术学院"},{"province":"河南省","city":"郑州市","name":"郑州铁路职业技术学院"},{"province":"河南省","city":"郑州市","name":"郑州工程技术学院"},{"province":"河南省","city":"开封市","name":"开封大学"},{"province":"河南省","city":"新乡市","name":"河南工学院"},{"province":"河南省","city":"焦作市","name":"焦作大学"},{"province":"河南省","city":"郑州市","name":"河南财政金融学院"},{"province":"河南省","city":"濮阳市","name":"濮阳职业技术学院"},{"province":"河南省","city":"郑州市","name":"郑州电力高等专科学校"},{"province":"河南省","city":"开封市","name":"黄河水利职业技术学院"},{"province":"河南省","city":"许昌市","name":"许昌职业技术学院"},{"province":"河南省","city":"焦作市","name":"河南工业和信息化职业学院"},{"province":"河南省","city":"郑州市","name":"河南水利与环境职业学院"},{"province":"河南省","city":"商丘市","name":"商丘职业技术学院"},{"province":"河南省","city":"平顶山市","name":"平顶山工业职业技术学院"},{"province":"河南省","city":"周口市","name":"周口职业技术学院"},{"province":"河南省","city":"济源市","name":"济源职业技术学院"},{"province":"河南省","city":"郑州市","name":"河南司法警官职业学院"},{"province":"河南省","city":"鹤壁市","name":"鹤壁职业技术学院"},{"province":"河南省","city":"南阳市","name":"河南工业职业技术学院"},{"province":"河南省","city":"郑州市","name":"郑州澍青医学高等专科学校"},{"province":"河南省","city":"焦作市","name":"焦作师范高等专科学校"},{"province":"河南省","city":"郑州市","name":"河南检察职业学院"},{"province":"河南省","city":"平顶山市","name":"河南质量工程职业学院"},{"province":"河南省","city":"郑州市","name":"郑州信息科技职业学院"},{"province":"河南省","city":"漯河市","name":"漯河医学高等专科学校"},{"province":"河南省","city":"南阳市","name":"南阳医学高等专科学校"},{"province":"河南省","city":"商丘市","name":"商丘医学高等专科学校"},{"province":"河南省","city":"郑州市","name":"郑州电子信息职业技术学院"},{"province":"河南省","city":"信阳市","name":"信阳职业技术学院"},{"province":"河南省","city":"郑州市","name":"嵩山少林武术职业学院"},{"province":"河南省","city":"郑州市","name":"郑州工业安全职业学院"},{"province":"河南省","city":"商丘市","name":"永城职业学院"},{"province":"河南省","city":"郑州市","name":"河南经贸职业学院"},{"province":"河南省","city":"郑州市","name":"河南交通职业技术学院"},{"province":"河南省","city":"郑州市","name":"河南农业职业学院"},{"province":"河南省","city":"郑州市","name":"郑州旅游职业学院"},{"province":"河南省","city":"郑州市","name":"郑州职业技术学院"},{"province":"河南省","city":"郑州市","name":"河南信息统计职业学院"},{"province":"河南省","city":"洛阳市","name":"河南林业职业学院"},{"province":"河南省","city":"郑州市","name":"河南工业贸易职业学院"},{"province":"河南省","city":"郑州市","name":"郑州电力职业技术学院"},{"province":"河南省","city":"周口市","name":"周口科技职业学院"},{"province":"河南省","city":"郑州市","name":"河南建筑职业技术学院"},{"province":"河南省","city":"漯河市","name":"漯河食品职业学院"},{"province":"河南省","city":"郑州市","name":"郑州城市职业学院"},{"province":"河南省","city":"安阳市","name":"安阳职业技术学院"},{"province":"河南省","city":"新乡市","name":"新乡职业技术学院"},{"province":"河南省","city":"驻马店市","name":"驻马店职业技术学院"},{"province":"河南省","city":"焦作市","name":"焦作工贸职业学院"},{"province":"河南省","city":"许昌市","name":"许昌陶瓷职业学院"},{"province":"河南省","city":"郑州市","name":"郑州理工职业学院"},{"province":"河南省","city":"郑州市","name":"郑州信息工程职业学院"},{"province":"河南省","city":"新乡市","name":"长垣烹饪职业技术学院"},{"province":"河南省","city":"开封市","name":"开封文化艺术职业学院"},{"province":"河南省","city":"郑州市","name":"河南应用技术职业学院"},{"province":"河南省","city":"郑州市","name":"河南艺术职业学院"},{"province":"河南省","city":"郑州市","name":"河南机电职业学院"},{"province":"河南省","city":"安阳市","name":"河南护理职业学院"},{"province":"河南省","city":"许昌市","name":"许昌电气职业学院"},{"province":"河南省","city":"信阳市","name":"信阳涉外职业技术学院"},{"province":"河南省","city":"鹤壁市","name":"鹤壁汽车工程职业学院"},{"province":"河南省","city":"南阳市","name":"南阳职业学院"},{"province":"河南省","city":"郑州市","name":"郑州商贸旅游职业学院"},{"province":"河南省","city":"洛阳市","name":"河南推拿职业学院"},{"province":"河南省","city":"洛阳市","name":"洛阳职业技术学院"},{"province":"河南省","city":"郑州市","name":"郑州幼儿师范高等专科学校"},{"province":"河南省","city":"安阳市","name":"安阳幼儿师范高等专科学校"},{"province":"河南省","city":"郑州市","name":"郑州黄河护理职业学院"},{"province":"河南省","city":"郑州市","name":"河南医学高等专科学校"},{"province":"河南省","city":"郑州市","name":"郑州财税金融职业学院"},{"province":"河南省","city":"南阳市","name":"南阳农业职业学院"},{"province":"河南省","city":"洛阳市","name":"洛阳科技职业学院"},{"province":"河南省","city":"鹤壁市","name":"鹤壁能源化工职业学院"},{"province":"河南省","city":"平顶山市","name":"平顶山文化艺术职业学院"},{"province":"河南省","city":"濮阳市","name":"濮阳医学高等专科学校"},{"province":"河南省","city":"驻马店市","name":"驻马店幼儿师范高等专科学校"},{"province":"河南省","city":"三门峡市","name":"三门峡社会管理职业学院"},{"province":"河南省","city":"郑州市","name":"河南轻工职业学院"},{"province":"河南省","city":"郑州市","name":"河南测绘职业学院"},{"province":"河南省","city":"郑州市","name":"中国人民解放军战略支援部队信息工程大学"},{"province":"湖北省","city":"武汉市","name":"武汉大学"},{"province":"湖北省","city":"武汉市","name":"华中科技大学"},{"province":"湖北省","city":"武汉市","name":"武汉科技大学"},{"province":"湖北省","city":"荆州市","name":"长江大学"},{"province":"湖北省","city":"武汉市","name":"武汉工程大学"},{"province":"湖北省","city":"武汉市","name":"中国地质大学（武汉）"},{"province":"湖北省","city":"武汉市","name":"武汉纺织大学"},{"province":"湖北省","city":"武汉市","name":"武汉轻工大学"},{"province":"湖北省","city":"武汉市","name":"武汉理工大学"},{"province":"湖北省","city":"武汉市","name":"湖北工业大学"},{"province":"湖北省","city":"武汉市","name":"华中农业大学"},{"province":"湖北省","city":"武汉市","name":"湖北中医药大学"},{"province":"湖北省","city":"武汉市","name":"华中师范大学"},{"province":"湖北省","city":"武汉市","name":"湖北大学"},{"province":"湖北省","city":"黄石市","name":"湖北师范大学"},{"province":"湖北省","city":"黄冈市","name":"黄冈师范学院"},{"province":"湖北省","city":"恩施土家族苗族自治州","name":"湖北民族学院"},{"province":"湖北省","city":"襄阳市","name":"湖北文理学院"},{"province":"湖北省","city":"武汉市","name":"中南财经政法大学"},{"province":"湖北省","city":"武汉市","name":"武汉体育学院"},{"province":"湖北省","city":"武汉市","name":"湖北美术学院"},{"province":"湖北省","city":"武汉市","name":"中南民族大学"},{"province":"湖北省","city":"十堰市","name":"湖北汽车工业学院"},{"province":"湖北省","city":"孝感市","name":"湖北工程学院"},{"province":"湖北省","city":"黄石市","name":"湖北理工学院"},{"province":"湖北省","city":"咸宁市","name":"湖北科技学院"},{"province":"湖北省","city":"十堰市","name":"湖北医药学院"},{"province":"湖北省","city":"武汉市","name":"江汉大学"},{"province":"湖北省","city":"宜昌市","name":"三峡大学"},{"province":"湖北省","city":"武汉市","name":"湖北警官学院"},{"province":"湖北省","city":"荆门市","name":"荆楚理工学院"},{"province":"湖北省","city":"武汉市","name":"武汉音乐学院"},{"province":"湖北省","city":"武汉市","name":"湖北经济学院"},{"province":"湖北省","city":"武汉市","name":"武汉商学院"},{"province":"湖北省","city":"武汉市","name":"武汉东湖学院"},{"province":"湖北省","city":"武汉市","name":"汉口学院"},{"province":"湖北省","city":"武汉市","name":"武昌首义学院"},{"province":"湖北省","city":"武汉市","name":"武昌理工学院"},{"province":"湖北省","city":"武汉市","name":"武汉生物工程学院"},{"province":"湖北省","city":"武汉市","name":"武汉晴川学院"},{"province":"湖北省","city":"武汉市","name":"湖北大学知行学院"},{"province":"湖北省","city":"武汉市","name":"武汉科技大学城市学院"},{"province":"湖北省","city":"宜昌市","name":"三峡大学科技学院"},{"province":"湖北省","city":"武汉市","name":"江汉大学文理学院"},{"province":"湖北省","city":"武汉市","name":"湖北工业大学工程技术学院"},{"province":"湖北省","city":"武汉市","name":"武汉工程大学邮电与信息工程学院"},{"province":"湖北省","city":"武汉市","name":"武汉纺织大学外经贸学院"},{"province":"湖北省","city":"武汉市","name":"武昌工学院"},{"province":"湖北省","city":"武汉市","name":"武汉工商学院"},{"province":"湖北省","city":"荆州市","name":"长江大学工程技术学院"},{"province":"湖北省","city":"荆州市","name":"长江大学文理学院"},{"province":"湖北省","city":"武汉市","name":"湖北商贸学院"},{"province":"湖北省","city":"十堰市","name":"湖北汽车工业学院科技学院"},{"province":"湖北省","city":"十堰市","name":"湖北医药学院药护学院"},{"province":"湖北省","city":"恩施土家族苗族自治州","name":"湖北民族学院科技学院"},{"province":"湖北省","city":"武汉市","name":"湖北经济学院法商学院"},{"province":"湖北省","city":"武汉市","name":"武汉体育学院体育科技学院"},{"province":"湖北省","city":"黄石市","name":"湖北师范大学文理学院"},{"province":"湖北省","city":"襄阳市","name":"湖北文理学院理工学院"},{"province":"湖北省","city":"孝感市","name":"湖北工程学院新技术学院"},{"province":"湖北省","city":"武汉市","name":"文华学院"},{"province":"湖北省","city":"武汉市","name":"武汉学院"},{"province":"湖北省","city":"武汉市","name":"武汉工程科技学院"},{"province":"湖北省","city":"武汉市","name":"武汉华夏理工学院"},{"province":"湖北省","city":"武汉市","name":"武汉传媒学院"},{"province":"湖北省","city":"武汉市","name":"武汉设计工程学院"},{"province":"湖北省","city":"武汉市","name":"湖北第二师范学院"},{"province":"湖北省","city":"十堰市","name":"汉江师范学院"},{"province":"湖北省","city":"武汉市","name":"武汉职业技术学院"},{"province":"湖北省","city":"黄冈市","name":"黄冈职业技术学院"},{"province":"湖北省","city":"武汉市","name":"长江职业学院"},{"province":"湖北省","city":"荆州市","name":"荆州理工职业学院"},{"province":"湖北省","city":"十堰市","name":"湖北工业职业技术学院"},{"province":"湖北省","city":"鄂州市","name":"鄂州职业大学"},{"province":"湖北省","city":"武汉市","name":"武汉城市职业学院"},{"province":"湖北省","city":"孝感市","name":"湖北职业技术学院"},{"province":"湖北省","city":"武汉市","name":"武汉船舶职业技术学院"},{"province":"湖北省","city":"恩施土家族苗族自治州","name":"恩施职业技术学院"},{"province":"湖北省","city":"襄阳市","name":"襄阳职业技术学院"},{"province":"湖北省","city":"武汉市","name":"武汉工贸职业学院"},{"province":"湖北省","city":"荆州市","name":"荆州职业技术学院"},{"province":"湖北省","city":"武汉市","name":"武汉工程职业技术学院"},{"province":"湖北省","city":"仙桃市","name":"仙桃职业学院"},{"province":"湖北省","city":"武汉市","name":"湖北轻工职业技术学院"},{"province":"湖北省","city":"武汉市","name":"湖北交通职业技术学院"},{"province":"湖北省","city":"荆州市","name":"湖北中医药高等专科学校"},{"province":"湖北省","city":"武汉市","name":"武汉航海职业技术学院"},{"province":"湖北省","city":"武汉市","name":"武汉铁路职业技术学院"},{"province":"湖北省","city":"武汉市","name":"武汉软件工程职业学院"},{"province":"湖北省","city":"宜昌市","name":"湖北三峡职业技术学院"},{"province":"湖北省","city":"随州市","name":"随州职业技术学院"},{"province":"湖北省","city":"武汉市","name":"武汉电力职业技术学院"},{"province":"湖北省","city":"武汉市","name":"湖北水利水电职业技术学院"},{"province":"湖北省","city":"武汉市","name":"湖北城市建设职业技术学院"},{"province":"湖北省","city":"武汉市","name":"武汉警官职业学院"},{"province":"湖北省","city":"武汉市","name":"湖北生物科技职业学院"},{"province":"湖北省","city":"武汉市","name":"湖北开放职业学院"},{"province":"湖北省","city":"武汉市","name":"武汉科技职业学院"},{"province":"湖北省","city":"武汉市","name":"武汉外语外事职业学院"},{"province":"湖北省","city":"武汉市","name":"武汉信息传播职业技术学院"},{"province":"湖北省","city":"武汉市","name":"武昌职业学院"},{"province":"湖北省","city":"武汉市","name":"武汉商贸职业学院"},{"province":"湖北省","city":"武汉市","name":"湖北艺术职业学院"},{"province":"湖北省","city":"武汉市","name":"武汉交通职业学院"},{"province":"湖北省","city":"咸宁市","name":"咸宁职业技术学院"},{"province":"湖北省","city":"武汉市","name":"长江工程职业技术学院"},{"province":"湖北省","city":"潜江市","name":"江汉艺术职业学院"},{"province":"湖北省","city":"武汉市","name":"武汉工业职业技术学院"},{"province":"湖北省","city":"武汉市","name":"武汉民政职业学院"},{"province":"湖北省","city":"黄冈市","name":"鄂东职业技术学院"},{"province":"湖北省","city":"武汉市","name":"湖北财税职业学院"},{"province":"湖北省","city":"黄冈市","name":"黄冈科技职业学院"},{"province":"湖北省","city":"武汉市","name":"湖北国土资源职业学院"},{"province":"湖北省","city":"武汉市","name":"湖北生态工程职业技术学院"},{"province":"湖北省","city":"宜昌市","name":"三峡电力职业学院"},{"province":"湖北省","city":"武汉市","name":"湖北科技职业学院"},{"province":"湖北省","city":"武汉市","name":"湖北青年职业学院"},{"province":"湖北省","city":"黄石市","name":"湖北工程职业学院"},{"province":"湖北省","city":"宜昌市","name":"三峡旅游职业技术学院"},{"province":"湖北省","city":"天门市","name":"天门职业学院"},{"province":"湖北省","city":"武汉市","name":"湖北体育职业学院"},{"province":"湖北省","city":"襄阳市","name":"襄阳汽车职业技术学院"},{"province":"湖北省","city":"武汉市","name":"湖北幼儿师范高等专科学校"},{"province":"湖北省","city":"武汉市","name":"湖北铁道运输职业学院"},{"province":"湖北省","city":"武汉市","name":"武汉海事职业学院"},{"province":"湖北省","city":"荆州市","name":"长江艺术工程职业学院"},{"province":"湖北省","city":"荆门市","name":"荆门职业学院"},{"province":"湖北省","city":"武汉市","name":"武汉铁路桥梁职业学院"},{"province":"湖北省","city":"武汉市","name":"武汉光谷职业学院"},{"province":"湖北省","city":"武汉市","name":"中国人民解放军海军工程大学"},{"province":"湖北省","city":"武汉市","name":"中国人民解放军空军预警学院"},{"province":"湖北省","city":"武汉市","name":"中国人民解放军火箭军指挥学院"},{"province":"湖南省","city":"湘潭市","name":"湘潭大学"},{"province":"湖南省","city":"湘西土家族苗族自治州","name":"吉首大学"},{"province":"湖南省","city":"长沙市","name":"湖南大学"},{"province":"湖南省","city":"长沙市","name":"中南大学"},{"province":"湖南省","city":"湘潭市","name":"湖南科技大学"},{"province":"湖南省","city":"长沙市","name":"长沙理工大学"},{"province":"湖南省","city":"长沙市","name":"湖南农业大学"},{"province":"湖南省","city":"长沙市","name":"中南林业科技大学"},{"province":"湖南省","city":"长沙市","name":"湖南中医药大学"},{"province":"湖南省","city":"长沙市","name":"湖南师范大学"},{"province":"湖南省","city":"岳阳市","name":"湖南理工学院"},{"province":"湖南省","city":"郴州市","name":"湘南学院"},{"province":"湖南省","city":"衡阳市","name":"衡阳师范学院"},{"province":"湖南省","city":"邵阳市","name":"邵阳学院"},{"province":"湖南省","city":"怀化市","name":"怀化学院"},{"province":"湖南省","city":"常德市","name":"湖南文理学院"},{"province":"湖南省","city":"永州市","name":"湖南科技学院"},{"province":"湖南省","city":"娄底市","name":"湖南人文科技学院"},{"province":"湖南省","city":"长沙市","name":"湖南商学院"},{"province":"湖南省","city":"衡阳市","name":"南华大学"},{"province":"湖南省","city":"长沙市","name":"长沙医学院"},{"province":"湖南省","city":"长沙市","name":"长沙学院"},{"province":"湖南省","city":"湘潭市","name":"湖南工程学院"},{"province":"湖南省","city":"益阳市","name":"湖南城市学院"},{"province":"湖南省","city":"衡阳市","name":"湖南工学院"},{"province":"湖南省","city":"长沙市","name":"湖南财政经济学院"},{"province":"湖南省","city":"长沙市","name":"湖南警察学院"},{"province":"湖南省","city":"株洲市","name":"湖南工业大学"},{"province":"湖南省","city":"长沙市","name":"湖南女子学院"},{"province":"湖南省","city":"长沙市","name":"湖南第一师范学院"},{"province":"湖南省","city":"怀化市","name":"湖南医药学院"},{"province":"湖南省","city":"长沙市","name":"湖南涉外经济学院"},{"province":"湖南省","city":"湘潭市","name":"湘潭大学兴湘学院"},{"province":"湖南省","city":"株洲市","name":"湖南工业大学科技学院"},{"province":"湖南省","city":"湘潭市","name":"湖南科技大学潇湘学院"},{"province":"湖南省","city":"衡阳市","name":"南华大学船山学院"},{"province":"湖南省","city":"长沙市","name":"湖南商学院北津学院"},{"province":"湖南省","city":"长沙市","name":"湖南师范大学树达学院"},{"province":"湖南省","city":"长沙市","name":"湖南农业大学东方科技学院"},{"province":"湖南省","city":"长沙市","name":"中南林业科技大学涉外学院"},{"province":"湖南省","city":"常德市","name":"湖南文理学院芙蓉学院"},{"province":"湖南省","city":"岳阳市","name":"湖南理工学院南湖学院"},{"province":"湖南省","city":"衡阳市","name":"衡阳师范学院南岳学院"},{"province":"湖南省","city":"湘潭市","name":"湖南工程学院应用技术学院"},{"province":"湖南省","city":"长沙市","name":"湖南中医药大学湘杏学院"},{"province":"湖南省","city":"张家界市","name":"吉首大学张家界学院"},{"province":"湖南省","city":"长沙市","name":"长沙理工大学城南学院"},{"province":"湖南省","city":"长沙市","name":"长沙师范学院"},{"province":"湖南省","city":"常德市","name":"湖南应用技术学院"},{"province":"湖南省","city":"长沙市","name":"湖南信息学院"},{"province":"湖南省","city":"衡阳市","name":"湖南交通工程学院"},{"province":"湖南省","city":"长沙市","name":"长沙民政职业技术学院"},{"province":"湖南省","city":"长沙市","name":"湖南工业职业技术学院"},{"province":"湖南省","city":"株洲市","name":"株洲师范高等专科学校"},{"province":"湖南省","city":"长沙市","name":"湖南信息职业技术学院"},{"province":"湖南省","city":"长沙市","name":"湖南税务高等专科学校"},{"province":"湖南省","city":"株洲市","name":"湖南冶金职业技术学院"},{"province":"湖南省","city":"长沙市","name":"长沙航空职业技术学院"},{"province":"湖南省","city":"长沙市","name":"湖南大众传媒职业技术学院"},{"province":"湖南省","city":"永州市","name":"永州职业技术学院"},{"province":"湖南省","city":"株洲市","name":"湖南铁道职业技术学院"},{"province":"湖南省","city":"长沙市","name":"湖南科技职业学院"},{"province":"湖南省","city":"长沙市","name":"湖南生物机电职业技术学院"},{"province":"湖南省","city":"长沙市","name":"湖南交通职业技术学院"},{"province":"湖南省","city":"长沙市","name":"湖南商务职业技术学院"},{"province":"湖南省","city":"长沙市","name":"湖南体育职业学院"},{"province":"湖南省","city":"长沙市","name":"湖南工程职业技术学院"},{"province":"湖南省","city":"长沙市","name":"保险职业学院"},{"province":"湖南省","city":"长沙市","name":"湖南外贸职业学院"},{"province":"湖南省","city":"长沙市","name":"湖南网络工程职业学院"},{"province":"湖南省","city":"邵阳市","name":"邵阳职业技术学院"},{"province":"湖南省","city":"长沙市","name":"湖南司法警官职业学院"},{"province":"湖南省","city":"长沙市","name":"长沙商贸旅游职业技术学院"},{"province":"湖南省","city":"衡阳市","name":"湖南环境生物职业技术学院"},{"province":"湖南省","city":"长沙市","name":"湖南邮电职业技术学院"},{"province":"湖南省","city":"湘潭市","name":"湘潭医卫职业技术学院"},{"province":"湖南省","city":"郴州市","name":"郴州职业技术学院"},{"province":"湖南省","city":"娄底市","name":"娄底职业技术学院"},{"province":"湖南省","city":"张家界市","name":"张家界航空工业职业技术学院"},{"province":"湖南省","city":"长沙市","name":"长沙环境保护职业技术学院"},{"province":"湖南省","city":"长沙市","name":"湖南艺术职业学院"},{"province":"湖南省","city":"长沙市","name":"湖南机电职业技术学院"},{"province":"湖南省","city":"长沙市","name":"长沙职业技术学院"},{"province":"湖南省","city":"怀化市","name":"怀化职业技术学院"},{"province":"湖南省","city":"岳阳市","name":"岳阳职业技术学院"},{"province":"湖南省","city":"常德市","name":"常德职业技术学院"},{"province":"湖南省","city":"长沙市","name":"长沙南方职业学院"},{"province":"湖南省","city":"娄底市","name":"潇湘职业学院"},{"province":"湖南省","city":"株洲市","name":"湖南化工职业技术学院"},{"province":"湖南省","city":"湘潭市","name":"湖南城建职业技术学院"},{"province":"湖南省","city":"岳阳市","name":"湖南石油化工职业技术学院"},{"province":"湖南省","city":"株洲市","name":"湖南中医药高等专科学校"},{"province":"湖南省","city":"岳阳市","name":"湖南民族职业学院"},{"province":"湖南省","city":"湘西土家族苗族自治州","name":"湘西民族职业技术学院"},{"province":"湖南省","city":"衡阳市","name":"湖南财经工业职业技术学院"},{"province":"湖南省","city":"益阳市","name":"益阳职业技术学院"},{"province":"湖南省","city":"益阳市","name":"湖南工艺美术职业学院"},{"province":"湖南省","city":"永州市","name":"湖南九嶷职业技术学院"},{"province":"湖南省","city":"湘潭市","name":"湖南理工职业技术学院"},{"province":"湖南省","city":"湘潭市","name":"湖南软件职业学院"},{"province":"湖南省","city":"株洲市","name":"湖南汽车工程职业学院"},{"province":"湖南省","city":"长沙市","name":"长沙电力职业技术学院"},{"province":"湖南省","city":"长沙市","name":"湖南水利水电职业技术学院"},{"province":"湖南省","city":"长沙市","name":"湖南现代物流职业技术学院"},{"province":"湖南省","city":"衡阳市","name":"湖南高速铁路职业技术学院"},{"province":"湖南省","city":"株洲市","name":"湖南铁路科技职业技术学院"},{"province":"湖南省","city":"长沙市","name":"湖南安全技术职业学院"},{"province":"湖南省","city":"湘潭市","name":"湖南电气职业技术学院"},{"province":"湖南省","city":"长沙市","name":"湖南外国语职业学院"},{"province":"湖南省","city":"益阳市","name":"益阳医学高等专科学校"},{"province":"湖南省","city":"长沙市","name":"湖南都市职业学院"},{"province":"湖南省","city":"长沙市","name":"湖南电子科技职业学院"},{"province":"湖南省","city":"湘潭市","name":"湖南国防工业职业技术学院"},{"province":"湖南省","city":"常德市","name":"湖南高尔夫旅游职业学院"},{"province":"湖南省","city":"衡阳市","name":"湖南工商职业学院"},{"province":"湖南省","city":"长沙市","name":"湖南三一工业职业技术学院"},{"province":"湖南省","city":"长沙市","name":"长沙卫生职业学院"},{"province":"湖南省","city":"长沙市","name":"湖南食品药品职业学院"},{"province":"湖南省","city":"株洲市","name":"湖南有色金属职业技术学院"},{"province":"湖南省","city":"湘潭市","name":"湖南吉利汽车职业技术学院"},{"province":"湖南省","city":"常德市","name":"湖南幼儿师范高等专科学校"},{"province":"湖南省","city":"郴州市","name":"湘南幼儿师范高等专科学校"},{"province":"湖南省","city":"长沙市","name":"湖南劳动人事职业学院"},{"province":"湖南省","city":"邵阳市","name":"湘中幼儿师范高等专科学校"},{"province":"湖南省","city":"长沙市","name":"中国人民解放军国防科技大学"},{"province":"广东省","city":"广州市","name":"中山大学"},{"province":"广东省","city":"广州市","name":"暨南大学"},{"province":"广东省","city":"汕头市","name":"汕头大学"},{"province":"广东省","city":"广州市","name":"华南理工大学"},{"province":"广东省","city":"广州市","name":"华南农业大学"},{"province":"广东省","city":"湛江市","name":"广东海洋大学"},{"province":"广东省","city":"广州市","name":"广州医科大学"},{"province":"广东省","city":"湛江市","name":"广东医科大学"},{"province":"广东省","city":"广州市","name":"广州中医药大学"},{"province":"广东省","city":"广州市","name":"广东药科大学"},{"province":"广东省","city":"广州市","name":"华南师范大学"},{"province":"广东省","city":"韶关市","name":"韶关学院"},{"province":"广东省","city":"惠州市","name":"惠州学院"},{"province":"广东省","city":"潮州市","name":"韩山师范学院"},{"province":"广东省","city":"湛江市","name":"岭南师范学院"},{"province":"广东省","city":"肇庆市","name":"肇庆学院"},{"province":"广东省","city":"梅州市","name":"嘉应学院"},{"province":"广东省","city":"广州市","name":"广州体育学院"},{"province":"广东省","city":"广州市","name":"广州美术学院"},{"province":"广东省","city":"广州市","name":"星海音乐学院"},{"province":"广东省","city":"广州市","name":"广东技术师范学院"},{"province":"广东省","city":"深圳市","name":"深圳大学"},{"province":"广东省","city":"广州市","name":"广东财经大学"},{"province":"广东省","city":"广州市","name":"广东白云学院"},{"province":"广东省","city":"广州市","name":"广州大学"},{"province":"广东省","city":"广州市","name":"广州航海学院"},{"province":"广东省","city":"广州市","name":"广东警官学院"},{"province":"广东省","city":"广州市","name":"仲恺农业工程学院"},{"province":"广东省","city":"江门市","name":"五邑大学"},{"province":"广东省","city":"广州市","name":"广东金融学院"},{"province":"广东省","city":"中山市","name":"电子科技大学中山学院"},{"province":"广东省","city":"茂名市","name":"广东石油化工学院"},{"province":"广东省","city":"东莞市","name":"东莞理工学院"},{"province":"广东省","city":"广州市","name":"广东工业大学"},{"province":"广东省","city":"广州市","name":"广东外语外贸大学"},{"province":"广东省","city":"佛山市","name":"佛山科学技术学院"},{"province":"广东省","city":"广州市","name":"广东培正学院"},{"province":"广东省","city":"广州市","name":"南方医科大学"},{"province":"广东省","city":"佛山市","name":"广东东软学院"},{"province":"广东省","city":"广州市","name":"华南理工大学广州学院"},{"province":"广东省","city":"广州市","name":"广州大学华软软件学院"},{"province":"广东省","city":"广州市","name":"中山大学南方学院"},{"province":"广东省","city":"广州市","name":"广东外语外贸大学南国商学院"},{"province":"广东省","city":"广州市","name":"广东财经大学华商学院"},{"province":"广东省","city":"湛江市","name":"广东海洋大学寸金学院"},{"province":"广东省","city":"广州市","name":"华南农业大学珠江学院"},{"province":"广东省","city":"广州市","name":"广东技术师范学院天河学院"},{"province":"广东省","city":"珠海市","name":"北京师范大学珠海分校"},{"province":"广东省","city":"广州市","name":"广东工业大学华立学院"},{"province":"广东省","city":"广州市","name":"广州大学松田学院"},{"province":"广东省","city":"广州市","name":"广州商学院"},{"province":"广东省","city":"珠海市","name":"北京理工大学珠海学院"},{"province":"广东省","city":"珠海市","name":"吉林大学珠海学院"},{"province":"广东省","city":"广州市","name":"广州工商学院"},{"province":"广东省","city":"东莞市","name":"广东科技学院"},{"province":"广东省","city":"肇庆市","name":"广东理工学院"},{"province":"广东省","city":"东莞市","name":"东莞理工学院城市学院"},{"province":"广东省","city":"广州市","name":"中山大学新华学院"},{"province":"广东省","city":"广州市","name":"广东第二师范学院"},{"province":"广东省","city":"深圳市","name":"南方科技大学"},{"province":"广东省","city":"珠海市","name":"北京师范大学-香港浸会大学联合国际学院"},{"province":"广东省","city":"深圳市","name":"香港中文大学（深圳）"},{"province":"广东省","city":"佛山市","name":"顺德职业技术学院"},{"province":"广东省","city":"广州市","name":"广东轻工职业技术学院"},{"province":"广东省","city":"广州市","name":"广东交通职业技术学院"},{"province":"广东省","city":"广州市","name":"广东水利电力职业技术学院"},{"province":"广东省","city":"揭阳市","name":"潮汕职业技术学院"},{"province":"广东省","city":"深圳市","name":"深圳职业技术学院"},{"province":"广东省","city":"广州市","name":"广东南华工商职业学院"},{"province":"广东省","city":"广州市","name":"私立华联学院"},{"province":"广东省","city":"广州市","name":"广州民航职业技术学院"},{"province":"广东省","city":"广州市","name":"广州番禺职业技术学院"},{"province":"广东省","city":"韶关市","name":"广东松山职业技术学院"},{"province":"广东省","city":"广州市","name":"广东农工商职业技术学院"},{"province":"广东省","city":"深圳市","name":"广东新安职业技术学院"},{"province":"广东省","city":"佛山市","name":"佛山职业技术学院"},{"province":"广东省","city":"广州市","name":"广东科学技术职业学院"},{"province":"广东省","city":"广州市","name":"广东食品药品职业学院"},{"province":"广东省","city":"广州市","name":"广州康大职业技术学院"},{"province":"广东省","city":"珠海市","name":"珠海艺术职业学院"},{"province":"广东省","city":"广州市","name":"广东行政职业学院"},{"province":"广东省","city":"广州市","name":"广东体育职业技术学院"},{"province":"广东省","city":"佛山市","name":"广东职业技术学院"},{"province":"广东省","city":"广州市","name":"广东建设职业技术学院"},{"province":"广东省","city":"广州市","name":"广东女子职业技术学院"},{"province":"广东省","city":"广州市","name":"广东机电职业技术学院"},{"province":"广东省","city":"广州市","name":"广东岭南职业技术学院"},{"province":"广东省","city":"汕尾市","name":"汕尾职业技术学院"},{"province":"广东省","city":"云浮市","name":"罗定职业技术学院"},{"province":"广东省","city":"阳江市","name":"阳江职业技术学院"},{"province":"广东省","city":"河源市","name":"河源职业技术学院"},{"province":"广东省","city":"广州市","name":"广东邮电职业技术学院"},{"province":"广东省","city":"汕头市","name":"汕头职业技术学院"},{"province":"广东省","city":"揭阳市","name":"揭阳职业技术学院"},{"province":"广东省","city":"深圳市","name":"深圳信息职业技术学院"},{"province":"广东省","city":"清远市","name":"清远职业技术学院"},{"province":"广东省","city":"广州市","name":"广东工贸职业技术学院"},{"province":"广东省","city":"广州市","name":"广东司法警官职业学院"},{"province":"广东省","city":"东莞市","name":"广东亚视演艺职业学院"},{"province":"广东省","city":"广州市","name":"广东省外语艺术职业学院"},{"province":"广东省","city":"广州市","name":"广东文艺职业学院"},{"province":"广东省","city":"广州市","name":"广州体育职业技术学院"},{"province":"广东省","city":"广州市","name":"广州工程技术职业学院"},{"province":"广东省","city":"中山市","name":"中山火炬职业技术学院"},{"province":"广东省","city":"江门市","name":"江门职业技术学院"},{"province":"广东省","city":"茂名市","name":"茂名职业技术学院"},{"province":"广东省","city":"珠海市","name":"珠海城市职业技术学院"},{"province":"广东省","city":"广州市","name":"广州涉外经济职业技术学院"},{"province":"广东省","city":"广州市","name":"广州南洋理工职业学院"},{"province":"广东省","city":"广州市","name":"广州科技职业技术学院"},{"province":"广东省","city":"惠州市","name":"惠州经济职业技术学院"},{"province":"广东省","city":"肇庆市","name":"广东工商职业学院"},{"province":"广东省","city":"肇庆市","name":"肇庆医学高等专科学校"},{"province":"广东省","city":"广州市","name":"广州现代信息工程职业技术学院"},{"province":"广东省","city":"广州市","name":"广东理工职业学院"},{"province":"广东省","city":"广州市","name":"广州华南商贸职业学院"},{"province":"广东省","city":"广州市","name":"广州华立科技职业学院"},{"province":"广东省","city":"广州市","name":"广州城市职业学院"},{"province":"广东省","city":"广州市","name":"广东工程职业技术学院"},{"province":"广东省","city":"广州市","name":"广州铁路职业技术学院"},{"province":"广东省","city":"广州市","name":"广东科贸职业学院"},{"province":"广东省","city":"广州市","name":"广州科技贸易职业学院"},{"province":"广东省","city":"中山市","name":"中山职业技术学院"},{"province":"广东省","city":"广州市","name":"广州珠江职业技术学院"},{"province":"广东省","city":"广州市","name":"广州松田职业学院"},{"province":"广东省","city":"湛江市","name":"广东文理职业学院"},{"province":"广东省","city":"广州市","name":"广州城建职业学院"},{"province":"广东省","city":"东莞市","name":"东莞职业技术学院"},{"province":"广东省","city":"江门市","name":"广东南方职业学院"},{"province":"广东省","city":"广州市","name":"广州华商职业学院"},{"province":"广东省","city":"广州市","name":"广州华夏职业学院"},{"province":"广东省","city":"佛山市","name":"广东环境保护工程职业学院"},{"province":"广东省","city":"广州市","name":"广东青年职业学院"},{"province":"广东省","city":"广州市","name":"广州东华职业学院"},{"province":"广东省","city":"东莞市","name":"广东创新科技职业学院"},{"province":"广东省","city":"广州市","name":"广东舞蹈戏剧职业学院"},{"province":"广东省","city":"惠州市","name":"惠州卫生职业技术学院"},{"province":"广东省","city":"肇庆市","name":"广东信息工程职业学院"},{"province":"广东省","city":"广州市","name":"广东生态工程职业学院"},{"province":"广东省","city":"惠州市","name":"惠州城市职业学院"},{"province":"广东省","city":"清远市","name":"广东碧桂园职业学院"},{"province":"广东省","city":"广州市","name":"公安边防部队高等专科学校"},{"province":"广东省","city":"茂名市","name":"广东茂名健康职业学院"},{"province":"广东省","city":"东莞市","name":"广东酒店管理职业技术学院"},{"province":"广东省","city":"茂名市","name":"广东茂名幼儿师范专科学校"},{"province":"广东省","city":"广州市","name":"广州卫生职业技术学院"},{"province":"广东省","city":"湛江市","name":"湛江幼儿师范专科学校"},{"province":"广东省","city":"深圳市","name":"深圳北理莫斯科大学"},{"province":"广东省","city":"汕头市","name":"广东以色列理工学院"},{"province":"广东省","city":"惠州市","name":"惠州工程职业学院"},{"province":"广东省","city":"江门市","name":"广东江门中医药职业学院"},{"province":"广西壮族自治区","city":"南宁市","name":"广西大学"},{"province":"广西壮族自治区","city":"柳州市","name":"广西科技大学"},{"province":"广西壮族自治区","city":"桂林市","name":"桂林电子科技大学"},{"province":"广西壮族自治区","city":"桂林市","name":"桂林理工大学"},{"province":"广西壮族自治区","city":"南宁市","name":"广西医科大学"},{"province":"广西壮族自治区","city":"百色市","name":"右江民族医学院"},{"province":"广西壮族自治区","city":"南宁市","name":"广西中医药大学"},{"province":"广西壮族自治区","city":"桂林市","name":"桂林医学院"},{"province":"广西壮族自治区","city":"桂林市","name":"广西师范大学"},{"province":"广西壮族自治区","city":"南宁市","name":"广西师范学院"},{"province":"广西壮族自治区","city":"崇左市","name":"广西民族师范学院"},{"province":"广西壮族自治区","city":"河池市","name":"河池学院"},{"province":"广西壮族自治区","city":"玉林市","name":"玉林师范学院"},{"province":"广西壮族自治区","city":"南宁市","name":"广西艺术学院"},{"province":"广西壮族自治区","city":"南宁市","name":"广西民族大学"},{"province":"广西壮族自治区","city":"百色市","name":"百色学院"},{"province":"广西壮族自治区","city":"梧州市","name":"梧州学院"},{"province":"广西壮族自治区","city":"来宾市","name":"广西科技师范学院"},{"province":"广西壮族自治区","city":"南宁市","name":"广西财经学院"},{"province":"广西壮族自治区","city":"南宁市","name":"南宁学院"},{"province":"广西壮族自治区","city":"钦州市","name":"钦州学院"},{"province":"广西壮族自治区","city":"桂林市","name":"桂林航天工业学院"},{"province":"广西壮族自治区","city":"桂林市","name":"桂林旅游学院"},{"province":"广西壮族自治区","city":"贺州市","name":"贺州学院"},{"province":"广西壮族自治区","city":"南宁市","name":"广西警察学院"},{"province":"广西壮族自治区","city":"北海市","name":"北海艺术设计学院"},{"province":"广西壮族自治区","city":"南宁市","name":"广西大学行健文理学院"},{"province":"广西壮族自治区","city":"柳州市","name":"广西科技大学鹿山学院"},{"province":"广西壮族自治区","city":"南宁市","name":"广西民族大学相思湖学院"},{"province":"广西壮族自治区","city":"桂林市","name":"广西师范大学漓江学院"},{"province":"广西壮族自治区","city":"南宁市","name":"广西师范学院师园学院"},{"province":"广西壮族自治区","city":"南宁市","name":"广西中医药大学赛恩斯新医药学院"},{"province":"广西壮族自治区","city":"桂林市","name":"桂林电子科技大学信息科技学院"},{"province":"广西壮族自治区","city":"桂林市","name":"桂林理工大学博文管理学院"},{"province":"广西壮族自治区","city":"南宁市","name":"广西外国语学院"},{"province":"广西壮族自治区","city":"北海市","name":"北京航空航天大学北海学院"},{"province":"广西壮族自治区","city":"南宁市","name":"广西机电职业技术学院"},{"province":"广西壮族自治区","city":"南宁市","name":"广西体育高等专科学校"},{"province":"广西壮族自治区","city":"南宁市","name":"南宁职业技术学院"},{"province":"广西壮族自治区","city":"南宁市","name":"广西水利电力职业技术学院"},{"province":"广西壮族自治区","city":"桂林市","name":"桂林师范高等专科学校"},{"province":"广西壮族自治区","city":"南宁市","name":"广西职业技术学院"},{"province":"广西壮族自治区","city":"柳州市","name":"柳州职业技术学院"},{"province":"广西壮族自治区","city":"柳州市","name":"广西生态工程职业技术学院"},{"province":"广西壮族自治区","city":"南宁市","name":"广西交通职业技术学院"},{"province":"广西壮族自治区","city":"南宁市","name":"广西工业职业技术学院"},{"province":"广西壮族自治区","city":"南宁市","name":"广西国际商务职业技术学院"},{"province":"广西壮族自治区","city":"南宁市","name":"广西农业职业技术学院"},{"province":"广西壮族自治区","city":"柳州市","name":"柳州铁道职业技术学院"},{"province":"广西壮族自治区","city":"南宁市","name":"广西建设职业技术学院"},{"province":"广西壮族自治区","city":"河池市","name":"广西现代职业技术学院"},{"province":"广西壮族自治区","city":"北海市","name":"北海职业学院"},{"province":"广西壮族自治区","city":"桂林市","name":"桂林山水职业学院"},{"province":"广西壮族自治区","city":"南宁市","name":"广西经贸职业技术学院"},{"province":"广西壮族自治区","city":"南宁市","name":"广西工商职业技术学院"},{"province":"广西壮族自治区","city":"南宁市","name":"广西演艺职业学院"},{"province":"广西壮族自治区","city":"南宁市","name":"广西电力职业技术学院"},{"province":"广西壮族自治区","city":"崇左市","name":"广西城市职业学院"},{"province":"广西壮族自治区","city":"钦州市","name":"广西英华国际职业学院"},{"province":"广西壮族自治区","city":"柳州市","name":"柳州城市职业学院"},{"province":"广西壮族自治区","city":"百色市","name":"百色职业学院"},{"province":"广西壮族自治区","city":"百色市","name":"广西工程职业学院"},{"province":"广西壮族自治区","city":"崇左市","name":"广西理工职业技术学院"},{"province":"广西壮族自治区","city":"梧州市","name":"梧州职业学院"},{"province":"广西壮族自治区","city":"南宁市","name":"广西经济职业学院"},{"province":"广西壮族自治区","city":"南宁市","name":"广西幼儿师范高等专科学校"},{"province":"广西壮族自治区","city":"崇左市","name":"广西科技职业学院"},{"province":"广西壮族自治区","city":"南宁市","name":"广西卫生职业技术学院"},{"province":"广西壮族自治区","city":"百色市","name":"广西培贤国际职业学院"},{"province":"广西壮族自治区","city":"南宁市","name":"广西金融职业技术学院"},{"province":"广西壮族自治区","city":"崇左市","name":"广西中远职业学院"},{"province":"广西壮族自治区","city":"玉林市","name":"玉柴职业技术学院"},{"province":"广西壮族自治区","city":"来宾市","name":"广西蓝天航空职业学院"},{"province":"广西壮族自治区","city":"南宁市","name":"广西安全工程职业技术学院"},{"province":"广西壮族自治区","city":"桂林市","name":"中国人民解放军陆军特种作战学院"},{"province":"海南省","city":"海口市","name":"海南大学"},{"province":"海南省","city":"三亚市","name":"海南热带海洋学院"},{"province":"海南省","city":"海口市","name":"海南师范大学"},{"province":"海南省","city":"海口市","name":"海南医学院"},{"province":"海南省","city":"海口市","name":"海口经济学院"},{"province":"海南省","city":"三亚市","name":"三亚学院"},{"province":"海南省","city":"海口市","name":"海南职业技术学院"},{"province":"海南省","city":"三亚市","name":"三亚城市职业学院"},{"province":"海南省","city":"琼海市","name":"海南软件职业技术学院"},{"province":"海南省","city":"海口市","name":"海南政法职业学院"},{"province":"海南省","city":"文昌市","name":"海南外国语职业学院"},{"province":"海南省","city":"海口市","name":"琼台师范学院"},{"province":"海南省","city":"海口市","name":"海南经贸职业技术学院"},{"province":"海南省","city":"海口市","name":"海南工商职业学院"},{"province":"海南省","city":"三亚市","name":"三亚航空旅游职业学院"},{"province":"海南省","city":"海口市","name":"海南科技职业学院"},{"province":"海南省","city":"三亚市","name":"三亚理工职业学院"},{"province":"海南省","city":"海口市","name":"海南体育职业技术学院"},{"province":"海南省","city":"三亚市","name":"三亚中瑞酒店管理职业学院"},{"province":"重庆市","city":"重庆市","name":"重庆大学"},{"province":"重庆市","city":"重庆市","name":"重庆邮电大学"},{"province":"重庆市","city":"重庆市","name":"重庆交通大学"},{"province":"重庆市","city":"重庆市","name":"重庆医科大学"},{"province":"重庆市","city":"重庆市","name":"西南大学"},{"province":"重庆市","city":"重庆市","name":"重庆师范大学"},{"province":"重庆市","city":"重庆市","name":"重庆文理学院"},{"province":"重庆市","city":"重庆市","name":"重庆三峡学院"},{"province":"重庆市","city":"重庆市","name":"长江师范学院"},{"province":"重庆市","city":"重庆市","name":"四川外国语大学"},{"province":"重庆市","city":"重庆市","name":"西南政法大学"},{"province":"重庆市","city":"重庆市","name":"四川美术学院"},{"province":"重庆市","city":"重庆市","name":"重庆科技学院"},{"province":"重庆市","city":"重庆市","name":"重庆理工大学"},{"province":"重庆市","city":"重庆市","name":"重庆工商大学"},{"province":"重庆市","city":"重庆市","name":"重庆工程学院"},{"province":"重庆市","city":"重庆市","name":"重庆大学城市科技学院"},{"province":"重庆市","city":"重庆市","name":"重庆警察学院"},{"province":"重庆市","city":"重庆市","name":"重庆人文科技学院"},{"province":"重庆市","city":"重庆市","name":"四川外国语大学重庆南方翻译学院"},{"province":"重庆市","city":"重庆市","name":"重庆师范大学涉外商贸学院"},{"province":"重庆市","city":"重庆市","name":"重庆工商大学融智学院"},{"province":"重庆市","city":"重庆市","name":"重庆工商大学派斯学院"},{"province":"重庆市","city":"重庆市","name":"重庆邮电大学移通学院"},{"province":"重庆市","city":"重庆市","name":"重庆第二师范学院"},{"province":"重庆市","city":"重庆市","name":"重庆航天职业技术学院"},{"province":"重庆市","city":"重庆市","name":"重庆电力高等专科学校"},{"province":"重庆市","city":"重庆市","name":"重庆工业职业技术学院"},{"province":"重庆市","city":"重庆市","name":"重庆三峡职业学院"},{"province":"重庆市","city":"重庆市","name":"重庆工贸职业技术学院"},{"province":"重庆市","city":"重庆市","name":"重庆机电职业技术学院"},{"province":"重庆市","city":"重庆市","name":"重庆电子工程职业学院"},{"province":"重庆市","city":"重庆市","name":"重庆海联职业技术学院"},{"province":"重庆市","city":"重庆市","name":"重庆信息技术职业学院"},{"province":"重庆市","city":"重庆市","name":"重庆传媒职业学院"},{"province":"重庆市","city":"重庆市","name":"重庆城市管理职业学院"},{"province":"重庆市","city":"重庆市","name":"重庆工程职业技术学院"},{"province":"重庆市","city":"重庆市","name":"重庆房地产职业学院"},{"province":"重庆市","city":"重庆市","name":"重庆城市职业学院"},{"province":"重庆市","city":"重庆市","name":"重庆水利电力职业技术学院"},{"province":"重庆市","city":"重庆市","name":"重庆工商职业学院"},{"province":"重庆市","city":"重庆市","name":"重庆应用技术职业学院"},{"province":"重庆市","city":"重庆市","name":"重庆三峡医药高等专科学校"},{"province":"重庆市","city":"重庆市","name":"重庆医药高等专科学校"},{"province":"重庆市","city":"重庆市","name":"重庆青年职业技术学院"},{"province":"重庆市","city":"重庆市","name":"重庆财经职业学院"},{"province":"重庆市","city":"重庆市","name":"重庆科创职业学院"},{"province":"重庆市","city":"重庆市","name":"重庆建筑工程职业学院"},{"province":"重庆市","city":"重庆市","name":"重庆电讯职业学院"},{"province":"重庆市","city":"重庆市","name":"重庆能源职业学院"},{"province":"重庆市","city":"重庆市","name":"重庆商务职业学院"},{"province":"重庆市","city":"重庆市","name":"重庆交通职业学院"},{"province":"重庆市","city":"重庆市","name":"重庆化工职业学院"},{"province":"重庆市","city":"重庆市","name":"重庆旅游职业学院"},{"province":"重庆市","city":"重庆市","name":"重庆安全技术职业学院"},{"province":"重庆市","city":"重庆市","name":"重庆公共运输职业学院"},{"province":"重庆市","city":"重庆市","name":"重庆艺术工程职业学院"},{"province":"重庆市","city":"重庆市","name":"重庆轻工职业学院"},{"province":"重庆市","city":"重庆市","name":"重庆电信职业学院"},{"province":"重庆市","city":"重庆市","name":"重庆经贸职业学院"},{"province":"重庆市","city":"重庆市","name":"重庆幼儿师范高等专科学校"},{"province":"重庆市","city":"重庆市","name":"重庆文化艺术职业学院"},{"province":"重庆市","city":"重庆市","name":"重庆科技职业学院"},{"province":"重庆市","city":"重庆市","name":"重庆资源与环境保护职业学院"},{"province":"重庆市","city":"重庆市","name":"重庆护理职业学院"},{"province":"重庆市","city":"重庆市","name":"中国人民解放军陆军军医大学（第三军医大学）"},{"province":"重庆市","city":"重庆市","name":"中国人民解放军陆军勤务学院"},{"province":"四川省","city":"成都市","name":"四川大学"},{"province":"四川省","city":"成都市","name":"西南交通大学"},{"province":"四川省","city":"成都市","name":"电子科技大学"},{"province":"四川省","city":"成都市","name":"西南石油大学"},{"province":"四川省","city":"成都市","name":"成都理工大学"},{"province":"四川省","city":"绵阳市","name":"西南科技大学"},{"province":"四川省","city":"成都市","name":"成都信息工程大学"},{"province":"四川省","city":"自贡市","name":"四川理工学院"},{"province":"四川省","city":"成都市","name":"西华大学"},{"province":"四川省","city":"德阳市","name":"中国民用航空飞行学院"},{"province":"四川省","city":"雅安市","name":"四川农业大学"},{"province":"四川省","city":"凉山彝族自治州","name":"西昌学院"},{"province":"四川省","city":"泸州市","name":"西南医科大学"},{"province":"四川省","city":"成都市","name":"成都中医药大学"},{"province":"四川省","city":"南充市","name":"川北医学院"},{"province":"四川省","city":"成都市","name":"四川师范大学"},{"province":"四川省","city":"南充市","name":"西华师范大学"},{"province":"四川省","city":"绵阳市","name":"绵阳师范学院"},{"province":"四川省","city":"内江市","name":"内江师范学院"},{"province":"四川省","city":"宜宾市","name":"宜宾学院"},{"province":"四川省","city":"达州市","name":"四川文理学院"},{"province":"四川省","city":"阿坝藏族羌族自治州","name":"阿坝师范学院"},{"province":"四川省","city":"乐山市","name":"乐山师范学院"},{"province":"四川省","city":"成都市","name":"西南财经大学"},{"province":"四川省","city":"成都市","name":"成都体育学院"},{"province":"四川省","city":"成都市","name":"四川音乐学院"},{"province":"四川省","city":"成都市","name":"西南民族大学"},{"province":"四川省","city":"成都市","name":"成都学院"},{"province":"四川省","city":"成都市","name":"成都工业学院"},{"province":"四川省","city":"攀枝花市","name":"攀枝花学院"},{"province":"四川省","city":"成都市","name":"四川旅游学院"},{"province":"四川省","city":"甘孜藏族自治州","name":"四川民族学院"},{"province":"四川省","city":"泸州市","name":"四川警察学院"},{"province":"四川省","city":"成都市","name":"成都东软学院"},{"province":"四川省","city":"成都市","name":"电子科技大学成都学院"},{"province":"四川省","city":"乐山市","name":"成都理工大学工程技术学院"},{"province":"四川省","city":"成都市","name":"四川传媒学院"},{"province":"四川省","city":"成都市","name":"成都信息工程大学银杏酒店管理学院"},{"province":"四川省","city":"成都市","name":"成都文理学院"},{"province":"四川省","city":"成都市","name":"四川工商学院"},{"province":"四川省","city":"成都市","name":"四川外国语大学成都学院"},{"province":"四川省","city":"成都市","name":"成都医学院"},{"province":"四川省","city":"德阳市","name":"四川工业科技学院"},{"province":"四川省","city":"成都市","name":"四川大学锦城学院"},{"province":"四川省","city":"绵阳市","name":"西南财经大学天府学院"},{"province":"四川省","city":"眉山市","name":"四川大学锦江学院"},{"province":"四川省","city":"绵阳市","name":"四川文化艺术学院"},{"province":"四川省","city":"绵阳市","name":"西南科技大学城市学院"},{"province":"四川省","city":"南充市","name":"西南交通大学希望学院"},{"province":"四川省","city":"成都市","name":"成都师范学院"},{"province":"四川省","city":"成都市","name":"四川电影电视学院"},{"province":"四川省","city":"成都市","name":"成都纺织高等专科学校"},{"province":"四川省","city":"成都市","name":"民办四川天一学院"},{"province":"四川省","city":"成都市","name":"成都航空职业技术学院"},{"province":"四川省","city":"成都市","name":"四川电力职业技术学院"},{"province":"四川省","city":"成都市","name":"成都职业技术学院"},{"province":"四川省","city":"泸州市","name":"四川化工职业技术学院"},{"province":"四川省","city":"成都市","name":"四川水利职业技术学院"},{"province":"四川省","city":"南充市","name":"南充职业技术学院"},{"province":"四川省","city":"内江市","name":"内江职业技术学院"},{"province":"四川省","city":"成都市","name":"四川航天职业技术学院"},{"province":"四川省","city":"成都市","name":"四川邮电职业技术学院"},{"province":"四川省","city":"攀枝花市","name":"四川机电职业技术学院"},{"province":"四川省","city":"绵阳市","name":"绵阳职业技术学院"},{"province":"四川省","city":"成都市","name":"四川交通职业技术学院"},{"province":"四川省","city":"成都市","name":"四川工商职业技术学院"},{"province":"四川省","city":"德阳市","name":"四川工程职业技术学院"},{"province":"四川省","city":"德阳市","name":"四川建筑职业技术学院"},{"province":"四川省","city":"达州市","name":"达州职业技术学院"},{"province":"四川省","city":"成都市","name":"四川托普信息技术职业学院"},{"province":"四川省","city":"成都市","name":"四川国际标榜职业学院"},{"province":"四川省","city":"成都市","name":"成都农业科技职业学院"},{"province":"四川省","city":"宜宾市","name":"宜宾职业技术学院"},{"province":"四川省","city":"泸州市","name":"泸州职业技术学院"},{"province":"四川省","city":"眉山市","name":"眉山职业技术学院"},{"province":"四川省","city":"成都市","name":"成都艺术职业学院"},{"province":"四川省","city":"遂宁市","name":"四川职业技术学院"},{"province":"四川省","city":"乐山市","name":"乐山职业技术学院"},{"province":"四川省","city":"雅安市","name":"雅安职业技术学院"},{"province":"四川省","city":"成都市","name":"四川商务职业学院"},{"province":"四川省","city":"德阳市","name":"四川司法警官职业学院"},{"province":"四川省","city":"广安市","name":"广安职业技术学院"},{"province":"四川省","city":"广元市","name":"四川信息职业技术学院"},{"province":"四川省","city":"成都市","name":"四川文化传媒职业学院"},{"province":"四川省","city":"成都市","name":"四川华新现代职业学院"},{"province":"四川省","city":"成都市","name":"四川管理职业学院"},{"province":"四川省","city":"成都市","name":"四川艺术职业学院"},{"province":"四川省","city":"绵阳市","name":"四川中医药高等专科学校"},{"province":"四川省","city":"成都市","name":"四川科技职业学院"},{"province":"四川省","city":"成都市","name":"四川文化产业职业学院"},{"province":"四川省","city":"成都市","name":"四川财经职业学院"},{"province":"四川省","city":"成都市","name":"四川城市职业学院"},{"province":"四川省","city":"成都市","name":"四川现代职业学院"},{"province":"四川省","city":"绵阳市","name":"四川幼儿师范高等专科学校"},{"province":"四川省","city":"成都市","name":"四川长江职业学院"},{"province":"四川省","city":"泸州市","name":"四川三河职业学院"},{"province":"四川省","city":"广元市","name":"川北幼儿师范高等专科学校"},{"province":"四川省","city":"自贡市","name":"四川卫生康复职业学院"},{"province":"四川省","city":"绵阳市","name":"四川汽车职业技术学院"},{"province":"四川省","city":"巴中市","name":"巴中职业技术学院"},{"province":"四川省","city":"资阳市","name":"四川希望汽车职业学院"},{"province":"四川省","city":"绵阳市","name":"四川电子机械职业技术学院"},{"province":"四川省","city":"成都市","name":"四川文轩职业学院"},{"province":"四川省","city":"内江市","name":"川南幼儿师范高等专科学校"},{"province":"四川省","city":"德阳市","name":"四川护理职业学院"},{"province":"四川省","city":"成都市","name":"成都工业职业技术学院"},{"province":"四川省","city":"成都市","name":"四川西南航空职业学院"},{"province":"四川省","city":"成都市","name":"成都工贸职业技术学院"},{"province":"四川省","city":"凉山州","name":"四川应用技术职业学院"},{"province":"四川省","city":"成都市","name":"中国人民武装警察部队警官学院"},{"province":"贵州省","city":"贵阳市","name":"贵州大学"},{"province":"贵州省","city":"贵阳市","name":"贵州医科大学"},{"province":"贵州省","city":"遵义市","name":"遵义医学院"},{"province":"贵州省","city":"贵阳市","name":"贵阳中医学院"},{"province":"贵州省","city":"贵阳市","name":"贵州师范大学"},{"province":"贵州省","city":"遵义市","name":"遵义师范学院"},{"province":"贵州省","city":"铜仁市","name":"铜仁学院"},{"province":"贵州省","city":"黔西南布依族苗族自治州","name":"兴义民族师范学院"},{"province":"贵州省","city":"安顺市","name":"安顺学院"},{"province":"贵州省","city":"毕节市","name":"贵州工程应用技术学院"},{"province":"贵州省","city":"黔东南苗族侗族自治州","name":"凯里学院"},{"province":"贵州省","city":"黔南布依族苗族自治州","name":"黔南民族师范学院"},{"province":"贵州省","city":"贵阳市","name":"贵州财经大学"},{"province":"贵州省","city":"贵阳市","name":"贵州民族大学"},{"province":"贵州省","city":"贵阳市","name":"贵阳学院"},{"province":"贵州省","city":"六盘水市","name":"六盘水师范学院"},{"province":"贵州省","city":"贵阳市","name":"贵州商学院"},{"province":"贵州省","city":"贵阳市","name":"贵阳中医学院时珍学院"},{"province":"贵州省","city":"贵阳市","name":"贵州财经大学商务学院"},{"province":"贵州省","city":"贵阳市","name":"贵州大学科技学院"},{"province":"贵州省","city":"贵阳市","name":"贵州大学明德学院"},{"province":"贵州省","city":"贵阳市","name":"贵州民族大学人文科技学院"},{"province":"贵州省","city":"贵阳市","name":"贵州师范大学求是学院"},{"province":"贵州省","city":"遵义市","name":"遵义医学院医学与科技学院"},{"province":"贵州省","city":"贵阳市","name":"贵州医科大学神奇民族医药学院"},{"province":"贵州省","city":"贵阳市","name":"贵州师范学院"},{"province":"贵州省","city":"贵阳市","name":"贵州理工学院"},{"province":"贵州省","city":"黔南布依族苗族自治州","name":"黔南民族医学高等专科学校"},{"province":"贵州省","city":"贵阳市","name":"贵州警察学院"},{"province":"贵州省","city":"贵阳市","name":"贵州交通职业技术学院"},{"province":"贵州省","city":"遵义市","name":"贵州航天职业技术学院"},{"province":"贵州省","city":"黔东南苗族侗族自治州","name":"贵州电子信息职业技术学院"},{"province":"贵州省","city":"安顺市","name":"安顺职业技术学院"},{"province":"贵州省","city":"黔东南苗族侗族自治州","name":"黔东南民族职业技术学院"},{"province":"贵州省","city":"黔南布依族苗族自治州","name":"黔南民族职业技术学院"},{"province":"贵州省","city":"遵义市","name":"遵义职业技术学院"},{"province":"贵州省","city":"贵阳市","name":"贵州城市职业学院"},{"province":"贵州省","city":"贵阳市","name":"贵州工业职业技术学院"},{"province":"贵州省","city":"贵阳市","name":"贵州电力职业技术学院"},{"province":"贵州省","city":"六盘水市","name":"六盘水职业技术学院"},{"province":"贵州省","city":"铜仁市","name":"铜仁职业技术学院"},{"province":"贵州省","city":"黔西南布依族苗族自治州","name":"黔西南民族职业技术学院"},{"province":"贵州省","city":"贵阳市","name":"贵州轻工职业技术学院"},{"province":"贵州省","city":"遵义市","name":"遵义医药高等专科学校"},{"province":"贵州省","city":"贵阳市","name":"贵阳护理职业学院"},{"province":"贵州省","city":"贵阳市","name":"贵阳职业技术学院"},{"province":"贵州省","city":"毕节市","name":"毕节职业技术学院"},{"province":"贵州省","city":"贵阳市","name":"贵州职业技术学院"},{"province":"贵州省","city":"黔南布依族苗族自治州","name":"贵州盛华职业学院"},{"province":"贵州省","city":"贵阳市","name":"贵州工商职业学院"},{"province":"贵州省","city":"贵阳市","name":"贵阳幼儿师范高等专科学校"},{"province":"贵州省","city":"铜仁市","name":"铜仁幼儿师范高等专科学校"},{"province":"贵州省","city":"黔南布依族苗族自治州","name":"黔南民族幼儿师范高等专科学校"},{"province":"贵州省","city":"毕节市","name":"毕节医学高等专科学校"},{"province":"贵州省","city":"贵阳市","name":"贵州建设职业技术学院"},{"province":"贵州省","city":"毕节市","name":"毕节幼儿师范高等专科学校"},{"province":"贵州省","city":"贵阳市","name":"贵州农业职业学院"},{"province":"贵州省","city":"铜仁市","name":"贵州工程职业学院"},{"province":"贵州省","city":"毕节市","name":"贵州工贸职业学院"},{"province":"贵州省","city":"贵阳市","name":"贵州水利水电职业技术学院"},{"province":"贵州省","city":"贵阳市","name":"贵州电子商务职业技术学院"},{"province":"贵州省","city":"黔南布依族苗族自治州","name":"贵州应用技术职业学院"},{"province":"贵州省","city":"贵阳市","name":"贵州电子科技职业学院"},{"province":"贵州省","city":"贵阳市","name":"贵州航空职业技术学院"},{"province":"贵州省","city":"遵义市","name":"茅台学院"},{"province":"贵州省","city":"贵阳市","name":"贵州装备制造职业学院"},{"province":"贵州省","city":"铜仁市","name":"贵州健康职业学院"},{"province":"贵州省","city":"贵阳市","name":"贵州食品工程职业学院"},{"province":"贵州省","city":"黔南布依族苗族自治州","name":"贵州经贸职业技术学院"},{"province":"贵州省","city":"黔南布依族苗族自治州","name":"贵州护理职业技术学院"},{"province":"云南省","city":"昆明市","name":"云南大学"},{"province":"云南省","city":"昆明市","name":"昆明理工大学"},{"province":"云南省","city":"昆明市","name":"云南农业大学"},{"province":"云南省","city":"昆明市","name":"西南林业大学"},{"province":"云南省","city":"昆明市","name":"昆明医科大学"},{"province":"云南省","city":"大理白族自治州","name":"大理大学"},{"province":"云南省","city":"昆明市","name":"云南中医学院"},{"province":"云南省","city":"昆明市","name":"云南师范大学"},{"province":"云南省","city":"昭通市","name":"昭通学院"},{"province":"云南省","city":"曲靖市","name":"曲靖师范学院"},{"province":"云南省","city":"普洱市","name":"普洱学院"},{"province":"云南省","city":"保山市","name":"保山学院"},{"province":"云南省","city":"红河哈尼族彝族自治州","name":"红河学院"},{"province":"云南省","city":"昆明市","name":"云南财经大学"},{"province":"云南省","city":"昆明市","name":"云南艺术学院"},{"province":"云南省","city":"昆明市","name":"云南民族大学"},{"province":"云南省","city":"玉溪市","name":"玉溪师范学院"},{"province":"云南省","city":"楚雄彝族自治州","name":"楚雄师范学院"},{"province":"云南省","city":"昆明市","name":"云南警官学院"},{"province":"云南省","city":"昆明市","name":"昆明学院"},{"province":"云南省","city":"文山壮族苗族自治州","name":"文山学院"},{"province":"云南省","city":"昆明市","name":"云南经济管理学院"},{"province":"云南省","city":"昆明市","name":"云南大学滇池学院"},{"province":"云南省","city":"丽江市","name":"云南大学旅游文化学院"},{"province":"云南省","city":"昆明市","name":"昆明理工大学津桥学院"},{"province":"云南省","city":"昆明市","name":"云南师范大学商学院"},{"province":"云南省","city":"昆明市","name":"云南师范大学文理学院"},{"province":"云南省","city":"昆明市","name":"昆明医科大学海源学院"},{"province":"云南省","city":"昆明市","name":"云南艺术学院文华学院"},{"province":"云南省","city":"昆明市","name":"云南工商学院"},{"province":"云南省","city":"临沧市","name":"滇西科技师范学院"},{"province":"云南省","city":"昆明市","name":"昆明冶金高等专科学校"},{"province":"云南省","city":"昆明市","name":"云南国土资源职业学院"},{"province":"云南省","city":"昆明市","name":"云南交通职业技术学院"},{"province":"云南省","city":"昆明市","name":"昆明工业职业技术学院"},{"province":"云南省","city":"昆明市","name":"云南农业职业技术学院"},{"province":"云南省","city":"昆明市","name":"云南司法警官职业学院"},{"province":"云南省","city":"昆明市","name":"云南文化艺术职业学院"},{"province":"云南省","city":"昆明市","name":"云南体育运动职业技术学院"},{"province":"云南省","city":"昆明市","name":"云南科技信息职业学院"},{"province":"云南省","city":"西双版纳傣族自治州","name":"西双版纳职业技术学院"},{"province":"云南省","city":"昆明市","name":"昆明艺术职业学院"},{"province":"云南省","city":"玉溪市","name":"玉溪农业职业技术学院"},{"province":"云南省","city":"曲靖市","name":"云南能源职业技术学院"},{"province":"云南省","city":"昆明市","name":"云南国防工业职业技术学院"},{"province":"云南省","city":"昆明市","name":"云南机电职业技术学院"},{"province":"云南省","city":"昆明市","name":"云南林业职业技术学院"},{"province":"云南省","city":"昆明市","name":"云南城市建设职业学院"},{"province":"云南省","city":"昆明市","name":"云南工程职业学院"},{"province":"云南省","city":"曲靖市","name":"曲靖医学高等专科学校"},{"province":"云南省","city":"楚雄彝族自治州","name":"楚雄医药高等专科学校"},{"province":"云南省","city":"保山市","name":"保山中医药高等专科学校"},{"province":"云南省","city":"丽江市","name":"丽江师范高等专科学校"},{"province":"云南省","city":"德宏傣族景颇族自治州","name":"德宏师范高等专科学校"},{"province":"云南省","city":"昆明市","name":"云南新兴职业学院"},{"province":"云南省","city":"红河哈尼族彝族自治州","name":"云南锡业职业技术学院"},{"province":"云南省","city":"昆明市","name":"云南经贸外事职业学院"},{"province":"云南省","city":"文山壮族苗族自治州","name":"云南三鑫职业技术学院"},{"province":"云南省","city":"德宏傣族景颇族自治州","name":"德宏职业学院"},{"province":"云南省","city":"昆明市","name":"云南商务职业学院"},{"province":"云南省","city":"昆明市","name":"昆明卫生职业学院"},{"province":"云南省","city":"楚雄彝族自治州","name":"云南现代职业技术学院"},{"province":"云南省","city":"昆明市","name":"云南旅游职业学院"},{"province":"云南省","city":"红河哈尼族彝族自治州","name":"红河卫生职业学院"},{"province":"云南省","city":"昆明市","name":"云南外事外语职业学院"},{"province":"云南省","city":"大理白族自治州","name":"大理农林职业技术学院"},{"province":"云南省","city":"昆明市","name":"公安消防部队高等专科学校"},{"province":"云南省","city":"昆明市","name":"云南财经职业学院"},{"province":"云南省","city":"昆明市","name":"昆明铁道职业技术学院"},{"province":"云南省","city":"昭通市","name":"昭通卫生职业学院"},{"province":"云南省","city":"大理白族自治州","name":"大理护理职业学院"},{"province":"云南省","city":"昆明市","name":"云南水利水电职业学院"},{"province":"云南省","city":"大理白族自治州","name":"滇西应用技术大学"},{"province":"云南省","city":"昆明市","name":"云南轻纺职业学院"},{"province":"云南省","city":"昆明市","name":"云南特殊教育职业学院"},{"province":"云南省","city":"昆明市","name":"云南工贸职业技术学院"},{"province":"云南省","city":"昆明市","name":"云南交通运输职业学院"},{"province":"西藏自治区","city":"拉萨市","name":"西藏大学"},{"province":"西藏自治区","city":"咸阳市","name":"西藏民族大学"},{"province":"西藏自治区","city":"拉萨市","name":"西藏藏医学院"},{"province":"西藏自治区","city":"拉萨市","name":"西藏警官高等专科学校"},{"province":"西藏自治区","city":"拉萨市","name":"拉萨师范高等专科学校"},{"province":"西藏自治区","city":"拉萨市","name":"西藏职业技术学院"},{"province":"西藏自治区","city":"林芝市","name":"西藏农牧学院"},{"province":"陕西省","city":"西安市","name":"西北大学"},{"province":"陕西省","city":"西安市","name":"西安交通大学"},{"province":"陕西省","city":"西安市","name":"西北工业大学"},{"province":"陕西省","city":"西安市","name":"西安理工大学"},{"province":"陕西省","city":"西安市","name":"西安电子科技大学"},{"province":"陕西省","city":"西安市","name":"西安工业大学"},{"province":"陕西省","city":"西安市","name":"西安建筑科技大学"},{"province":"陕西省","city":"西安市","name":"西安科技大学"},{"province":"陕西省","city":"西安市","name":"西安石油大学"},{"province":"陕西省","city":"西安市","name":"陕西科技大学"},{"province":"陕西省","city":"西安市","name":"西安工程大学"},{"province":"陕西省","city":"西安市","name":"长安大学"},{"province":"陕西省","city":"咸阳市","name":"西北农林科技大学"},{"province":"陕西省","city":"咸阳市","name":"陕西中医药大学"},{"province":"陕西省","city":"西安市","name":"陕西师范大学"},{"province":"陕西省","city":"延安市","name":"延安大学"},{"province":"陕西省","city":"汉中市","name":"陕西理工大学"},{"province":"陕西省","city":"宝鸡市","name":"宝鸡文理学院"},{"province":"陕西省","city":"咸阳市","name":"咸阳师范学院"},{"province":"陕西省","city":"渭南市","name":"渭南师范学院"},{"province":"陕西省","city":"西安市","name":"西安外国语大学"},{"province":"陕西省","city":"西安市","name":"西北政法大学"},{"province":"陕西省","city":"西安市","name":"西安体育学院"},{"province":"陕西省","city":"西安市","name":"西安音乐学院"},{"province":"陕西省","city":"西安市","name":"西安美术学院"},{"province":"陕西省","city":"西安市","name":"西安文理学院"},{"province":"陕西省","city":"榆林市","name":"榆林学院"},{"province":"陕西省","city":"商洛市","name":"商洛学院"},{"province":"陕西省","city":"安康市","name":"安康学院"},{"province":"陕西省","city":"西安市","name":"西安培华学院"},{"province":"陕西省","city":"西安市","name":"西安财经学院"},{"province":"陕西省","city":"西安市","name":"西安邮电大学"},{"province":"陕西省","city":"西安市","name":"西安航空学院"},{"province":"陕西省","city":"西安市","name":"西安医学院"},{"province":"陕西省","city":"西安市","name":"西安欧亚学院"},{"province":"陕西省","city":"西安市","name":"西安外事学院"},{"province":"陕西省","city":"西安市","name":"西安翻译学院"},{"province":"陕西省","city":"西安市","name":"西京学院"},{"province":"陕西省","city":"西安市","name":"西安思源学院"},{"province":"陕西省","city":"咸阳市","name":"陕西国际商贸学院"},{"province":"陕西省","city":"咸阳市","name":"陕西服装工程学院"},{"province":"陕西省","city":"西安市","name":"西安交通工程学院"},{"province":"陕西省","city":"西安市","name":"西安交通大学城市学院"},{"province":"陕西省","city":"西安市","name":"西北大学现代学院"},{"province":"陕西省","city":"西安市","name":"西安建筑科技大学华清学院"},{"province":"陕西省","city":"西安市","name":"西安财经学院行知学院"},{"province":"陕西省","city":"咸阳市","name":"陕西科技大学镐京学院"},{"province":"陕西省","city":"西安市","name":"西安工业大学北方信息工程学院"},{"province":"陕西省","city":"西安市","name":"延安大学西安创新学院"},{"province":"陕西省","city":"西安市","name":"西安电子科技大学长安学院"},{"province":"陕西省","city":"西安市","name":"西北工业大学明德学院"},{"province":"陕西省","city":"西安市","name":"长安大学兴华学院"},{"province":"陕西省","city":"西安市","name":"西安理工大学高科学院"},{"province":"陕西省","city":"西安市","name":"西安科技大学高新学院"},{"province":"陕西省","city":"西安市","name":"陕西学前师范学院"},{"province":"陕西省","city":"咸阳市","name":"陕西工业职业技术学院"},{"province":"陕西省","city":"咸阳市","name":"杨凌职业技术学院"},{"province":"陕西省","city":"西安市","name":"西安电力高等专科学校"},{"province":"陕西省","city":"咸阳市","name":"陕西能源职业技术学院"},{"province":"陕西省","city":"西安市","name":"陕西国防工业职业技术学院"},{"province":"陕西省","city":"西安市","name":"西安航空职业技术学院"},{"province":"陕西省","city":"咸阳市","name":"陕西财经职业技术学院"},{"province":"陕西省","city":"西安市","name":"陕西交通职业技术学院"},{"province":"陕西省","city":"西安市","name":"陕西职业技术学院"},{"province":"陕西省","city":"西安市","name":"西安高新科技职业学院"},{"province":"陕西省","city":"西安市","name":"西安城市建设职业学院"},{"province":"陕西省","city":"渭南市","name":"陕西铁路工程职业技术学院"},{"province":"陕西省","city":"宝鸡市","name":"宝鸡职业技术学院"},{"province":"陕西省","city":"汉中市","name":"陕西航空职业技术学院"},{"province":"陕西省","city":"西安市","name":"陕西电子信息职业技术学院"},{"province":"陕西省","city":"咸阳市","name":"陕西邮电职业技术学院"},{"province":"陕西省","city":"西安市","name":"西安海棠职业学院"},{"province":"陕西省","city":"西安市","name":"西安汽车科技职业学院"},{"province":"陕西省","city":"西安市","name":"西安东方亚太职业技术学院"},{"province":"陕西省","city":"西安市","name":"陕西警官职业学院"},{"province":"陕西省","city":"西安市","name":"陕西经济管理职业技术学院"},{"province":"陕西省","city":"西安市","name":"西安铁路职业技术学院"},{"province":"陕西省","city":"咸阳市","name":"咸阳职业技术学院"},{"province":"陕西省","city":"西安市","name":"西安职业技术学院"},{"province":"陕西省","city":"商洛市","name":"商洛职业技术学院"},{"province":"陕西省","city":"汉中市","name":"汉中职业技术学院"},{"province":"陕西省","city":"延安市","name":"延安职业技术学院"},{"province":"陕西省","city":"渭南市","name":"渭南职业技术学院"},{"province":"陕西省","city":"安康市","name":"安康职业技术学院"},{"province":"陕西省","city":"铜川市","name":"铜川职业技术学院"},{"province":"陕西省","city":"西安市","name":"陕西青年职业学院"},{"province":"陕西省","city":"西安市","name":"陕西工商职业学院"},{"province":"陕西省","city":"西安市","name":"陕西电子科技职业学院"},{"province":"陕西省","city":"西安市","name":"陕西旅游烹饪职业学院"},{"province":"陕西省","city":"西安市","name":"西安医学高等专科学校"},{"province":"陕西省","city":"榆林市","name":"榆林职业技术学院"},{"province":"陕西省","city":"西安市","name":"陕西艺术职业学院"},{"province":"陕西省","city":"宝鸡市","name":"陕西机电职业技术学院"},{"province":"陕西省","city":"西安市","name":"中国人民解放军陆军边海防学院"},{"province":"陕西省","city":"西安市","name":"中国人民解放军空军工程大学"},{"province":"陕西省","city":"西安市","name":"中国人民解放军空军西安飞行学院"},{"province":"陕西省","city":"西安市","name":"中国人民解放军空军军医大学（第四军医大学）"},{"province":"陕西省","city":"西安市","name":"中国人民解放军火箭军工程大学"},{"province":"陕西省","city":"西安市","name":"中国人民武装警察部队工程大学"},{"province":"甘肃省","city":"兰州市","name":"兰州大学"},{"province":"甘肃省","city":"兰州市","name":"兰州理工大学"},{"province":"甘肃省","city":"兰州市","name":"兰州交通大学"},{"province":"甘肃省","city":"兰州市","name":"甘肃农业大学"},{"province":"甘肃省","city":"兰州市","name":"甘肃中医药大学"},{"province":"甘肃省","city":"兰州市","name":"西北师范大学"},{"province":"甘肃省","city":"兰州市","name":"兰州城市学院"},{"province":"甘肃省","city":"庆阳市","name":"陇东学院"},{"province":"甘肃省","city":"天水市","name":"天水师范学院"},{"province":"甘肃省","city":"张掖市","name":"河西学院"},{"province":"甘肃省","city":"兰州市","name":"兰州财经大学"},{"province":"甘肃省","city":"兰州市","name":"西北民族大学"},{"province":"甘肃省","city":"兰州市","name":"甘肃政法学院"},{"province":"甘肃省","city":"甘南藏族自治州","name":"甘肃民族师范学院"},{"province":"甘肃省","city":"兰州市","name":"兰州文理学院"},{"province":"甘肃省","city":"平凉市","name":"甘肃医学院"},{"province":"甘肃省","city":"兰州市","name":"兰州工业学院"},{"province":"甘肃省","city":"兰州市","name":"西北师范大学知行学院"},{"province":"甘肃省","city":"兰州市","name":"兰州财经大学陇桥学院"},{"province":"甘肃省","city":"兰州市","name":"兰州财经大学长青学院"},{"province":"甘肃省","city":"兰州市","name":"兰州交通大学博文学院"},{"province":"甘肃省","city":"兰州市","name":"兰州理工大学技术工程学院"},{"province":"甘肃省","city":"兰州市","name":"兰州石化职业技术学院"},{"province":"甘肃省","city":"陇南市","name":"陇南师范高等专科学校"},{"province":"甘肃省","city":"定西市","name":"定西师范高等专科学校"},{"province":"甘肃省","city":"兰州市","name":"甘肃建筑职业技术学院"},{"province":"甘肃省","city":"酒泉市","name":"酒泉职业技术学院"},{"province":"甘肃省","city":"兰州市","name":"兰州外语职业学院"},{"province":"甘肃省","city":"兰州市","name":"兰州职业技术学院"},{"province":"甘肃省","city":"兰州市","name":"甘肃警察职业学院"},{"province":"甘肃省","city":"天水市","name":"甘肃林业职业技术学院"},{"province":"甘肃省","city":"天水市","name":"甘肃工业职业技术学院"},{"province":"甘肃省","city":"武威市","name":"武威职业学院"},{"province":"甘肃省","city":"兰州市","name":"甘肃交通职业技术学院"},{"province":"甘肃省","city":"兰州市","name":"兰州资源环境职业技术学院"},{"province":"甘肃省","city":"兰州市","name":"甘肃农业职业技术学院"},{"province":"甘肃省","city":"武威市","name":"甘肃畜牧工程职业技术学院"},{"province":"甘肃省","city":"嘉峪关市","name":"甘肃钢铁职业技术学院"},{"province":"甘肃省","city":"天水市","name":"甘肃机电职业技术学院"},{"province":"甘肃省","city":"金昌市","name":"甘肃有色冶金职业技术学院"},{"province":"甘肃省","city":"白银市","name":"白银矿冶职业技术学院"},{"province":"甘肃省","city":"兰州市","name":"甘肃卫生职业学院"},{"province":"甘肃省","city":"兰州市","name":"兰州科技职业学院"},{"province":"甘肃省","city":"庆阳市","name":"庆阳职业技术学院"},{"province":"甘肃省","city":"临夏州","name":"临夏现代职业学院"},{"province":"甘肃省","city":"兰州市","name":"甘肃能源化工职业学院"},{"province":"甘肃省","city":"兰州市","name":"兰州现代职业学院"},{"province":"甘肃省","city":"平凉市","name":"平凉职业技术学院"},{"province":"甘肃省","city":"兰州市","name":"甘肃财贸职业学院"},{"province":"青海省","city":"西宁市","name":"青海大学"},{"province":"青海省","city":"西宁市","name":"青海师范大学"},{"province":"青海省","city":"西宁市","name":"青海民族大学"},{"province":"青海省","city":"西宁市","name":"青海大学昆仑学院"},{"province":"青海省","city":"西宁市","name":"青海卫生职业技术学院"},{"province":"青海省","city":"西宁市","name":"青海警官职业学院"},{"province":"青海省","city":"西宁市","name":"青海畜牧兽医职业技术学院"},{"province":"青海省","city":"西宁市","name":"青海交通职业技术学院"},{"province":"青海省","city":"西宁市","name":"青海建筑职业技术学院"},{"province":"青海省","city":"西宁市","name":"西宁城市职业技术学院"},{"province":"青海省","city":"海东市","name":"青海高等职业技术学院"},{"province":"青海省","city":"海西蒙古族藏族自治州","name":"青海柴达木职业技术学院"},{"province":"宁夏回族自治区","city":"银川市","name":"宁夏大学"},{"province":"宁夏回族自治区","city":"银川市","name":"宁夏医科大学"},{"province":"宁夏回族自治区","city":"固原市","name":"宁夏师范学院"},{"province":"宁夏回族自治区","city":"银川市","name":"北方民族大学"},{"province":"宁夏回族自治区","city":"石嘴山市","name":"宁夏理工学院"},{"province":"宁夏回族自治区","city":"银川市","name":"宁夏大学新华学院"},{"province":"宁夏回族自治区","city":"银川市","name":"银川能源学院"},{"province":"宁夏回族自治区","city":"银川市","name":"中国矿业大学银川学院"},{"province":"宁夏回族自治区","city":"吴忠市","name":"宁夏民族职业技术学院"},{"province":"宁夏回族自治区","city":"银川市","name":"宁夏工业职业学院"},{"province":"宁夏回族自治区","city":"银川市","name":"宁夏职业技术学院"},{"province":"宁夏回族自治区","city":"银川市","name":"宁夏工商职业技术学院"},{"province":"宁夏回族自治区","city":"银川市","name":"宁夏财经职业技术学院"},{"province":"宁夏回族自治区","city":"银川市","name":"宁夏警官职业学院"},{"province":"宁夏回族自治区","city":"银川市","name":"宁夏建设职业技术学院"},{"province":"宁夏回族自治区","city":"银川市","name":"宁夏葡萄酒与防沙治沙职业技术学院"},{"province":"宁夏回族自治区","city":"银川市","name":"宁夏幼儿师范高等专科学校"},{"province":"宁夏回族自治区","city":"银川市","name":"宁夏艺术职业学院"},{"province":"宁夏回族自治区","city":"银川市","name":"宁夏体育职业学院"},{"province":"新疆维吾尔自治区","city":"乌鲁木齐市","name":"新疆大学"},{"province":"新疆维吾尔自治区","city":"阿拉尔市","name":"塔里木大学"},{"province":"新疆维吾尔自治区","city":"乌鲁木齐市","name":"新疆农业大学"},{"province":"新疆维吾尔自治区","city":"石河子市","name":"石河子大学"},{"province":"新疆维吾尔自治区","city":"乌鲁木齐市","name":"新疆医科大学"},{"province":"新疆维吾尔自治区","city":"乌鲁木齐市","name":"新疆师范大学"},{"province":"新疆维吾尔自治区","city":"喀什地区","name":"喀什大学"},{"province":"新疆维吾尔自治区","city":"伊犁哈萨克自治州","name":"伊犁师范学院"},{"province":"新疆维吾尔自治区","city":"乌鲁木齐市","name":"新疆财经大学"},{"province":"新疆维吾尔自治区","city":"乌鲁木齐市","name":"新疆艺术学院"},{"province":"新疆维吾尔自治区","city":"乌鲁木齐市","name":"新疆工程学院"},{"province":"新疆维吾尔自治区","city":"昌吉回族自治州","name":"昌吉学院"},{"province":"新疆维吾尔自治区","city":"乌鲁木齐市","name":"新疆警察学院"},{"province":"新疆维吾尔自治区","city":"乌鲁木齐市","name":"新疆大学科学技术学院"},{"province":"新疆维吾尔自治区","city":"乌鲁木齐市","name":"新疆农业大学科学技术学院"},{"province":"新疆维吾尔自治区","city":"乌鲁木齐市","name":"新疆医科大学厚博学院"},{"province":"新疆维吾尔自治区","city":"乌鲁木齐市","name":"新疆财经大学商务学院"},{"province":"新疆维吾尔自治区","city":"石河子市","name":"石河子大学科技学院"},{"province":"新疆维吾尔自治区","city":"和田地区","name":"和田师范专科学校"},{"province":"新疆维吾尔自治区","city":"昌吉回族自治州","name":"新疆农业职业技术学院"},{"province":"新疆维吾尔自治区","city":"乌鲁木齐市","name":"乌鲁木齐职业大学"},{"province":"新疆维吾尔自治区","city":"和田地区","name":"新疆维吾尔医学专科学校"},{"province":"新疆维吾尔自治区","city":"克拉玛依市","name":"克拉玛依职业技术学院"},{"province":"新疆维吾尔自治区","city":"乌鲁木齐市","name":"新疆机电职业技术学院"},{"province":"新疆维吾尔自治区","city":"乌鲁木齐市","name":"新疆轻工职业技术学院"},{"province":"新疆维吾尔自治区","city":"乌鲁木齐市","name":"新疆能源职业技术学院"},{"province":"新疆维吾尔自治区","city":"昌吉回族自治州","name":"昌吉职业技术学院"},{"province":"新疆维吾尔自治区","city":"伊犁哈萨克自治州","name":"伊犁职业技术学院"},{"province":"新疆维吾尔自治区","city":"阿克苏地区","name":"阿克苏职业技术学院"},{"province":"新疆维吾尔自治区","city":"巴音郭楞蒙古自治州","name":"巴音郭楞职业技术学院"},{"province":"新疆维吾尔自治区","city":"乌鲁木齐市","name":"新疆建设职业技术学院"},{"province":"新疆维吾尔自治区","city":"五家渠市","name":"新疆兵团警官高等专科学校"},{"province":"新疆维吾尔自治区","city":"乌鲁木齐市","name":"新疆现代职业技术学院"},{"province":"新疆维吾尔自治区","city":"乌鲁木齐市","name":"新疆天山职业技术学院"},{"province":"新疆维吾尔自治区","city":"乌鲁木齐市","name":"新疆交通职业技术学院"},{"province":"新疆维吾尔自治区","city":"石河子市","name":"新疆石河子职业技术学院"},{"province":"新疆维吾尔自治区","city":"乌鲁木齐市","name":"新疆职业大学"},{"province":"新疆维吾尔自治区","city":"乌鲁木齐市","name":"新疆体育职业技术学院"},{"province":"新疆维吾尔自治区","city":"伊犁哈萨克自治州","name":"新疆应用职业技术学院"},{"province":"新疆维吾尔自治区","city":"乌鲁木齐市","name":"新疆师范高等专科学校"},{"province":"新疆维吾尔自治区","city":"乌鲁木齐市","name":"新疆铁道职业技术学院"},{"province":"新疆维吾尔自治区","city":"乌鲁木齐市","name":"新疆生产建设兵团兴新职业技术学院"},{"province":"新疆维吾尔自治区","city":"哈密市","name":"哈密职业技术学院"},{"province":"新疆维吾尔自治区","city":"乌鲁木齐市","name":"新疆科技职业技术学院"},{"province":"新疆维吾尔自治区","city":"吐鲁番市","name":"吐鲁番职业技术学院"},{"province":"新疆维吾尔自治区","city":"乌鲁木齐市","name":"新疆工业职业技术学院"},{"province":"新疆维吾尔自治区","city":"博尔塔拉蒙古自治州","name":"博尔塔拉职业技术学院"},{"province":"台湾省","city":"台湾省","name":"国立台湾大学"},{"province":"台湾省","city":"台湾省","name":"国立中兴大学"},{"province":"台湾省","city":"台湾省","name":"国立成功大学"},{"province":"台湾省","city":"台湾省","name":"国立政治大学"},{"province":"台湾省","city":"台湾省","name":"国立清华大学"},{"province":"台湾省","city":"台湾省","name":"国立台湾海洋大学"},{"province":"台湾省","city":"台湾省","name":"国立交通大学"},{"province":"台湾省","city":"台湾省","name":"国立阳明大学"},{"province":"台湾省","city":"台湾省","name":"国立中央大学"},{"province":"台湾省","city":"台湾省","name":"国立中山大学"},{"province":"台湾省","city":"台湾省","name":"国立中正大学"},{"province":"台湾省","city":"台湾省","name":"国立东华大学"},{"province":"台湾省","city":"台湾省","name":"国立暨南国际大学"},{"province":"台湾省","city":"台湾省","name":"国立嘉义大学"},{"province":"台湾省","city":"台湾省","name":"国立台北大学"},{"province":"台湾省","city":"台湾省","name":"国立高雄大学"},{"province":"台湾省","city":"台湾省","name":"国立宜兰大学"},{"province":"台湾省","city":"台湾省","name":"国立台东大学"},{"province":"台湾省","city":"台湾省","name":"国立联合大学"},{"province":"台湾省","city":"台湾省","name":"国立台南大学"},{"province":"台湾省","city":"台湾省","name":"国立金门大学"},{"province":"台湾省","city":"台湾省","name":"台北市立大学"},{"province":"台湾省","city":"台湾省","name":"国立屏东大学"},{"province":"台湾省","city":"台湾省","name":"国立台湾师范大学"},{"province":"台湾省","city":"台湾省","name":"国立高雄师范大学"},{"province":"台湾省","city":"台湾省","name":"国立彰化师范大学"},{"province":"台湾省","city":"台湾省","name":"国立台北教育大学"},{"province":"台湾省","city":"台湾省","name":"国立台中教育大学"},{"province":"台湾省","city":"台湾省","name":"国立新竹教育大学"},{"province":"台湾省","city":"台湾省","name":"国立台湾艺术大学"},{"province":"台湾省","city":"台湾省","name":"国立台北艺术大学"},{"province":"台湾省","city":"台湾省","name":"国立台南艺术大学"},{"province":"台湾省","city":"台湾省","name":"国立体育大学"},{"province":"台湾省","city":"台湾省","name":"国立台湾体育运动大学"},{"province":"台湾省","city":"台湾省","name":"东海大学"},{"province":"台湾省","city":"台湾省","name":"辅仁大学"},{"province":"台湾省","city":"台湾省","name":"东吴大学"},{"province":"台湾省","city":"台湾省","name":"淡江大学"},{"province":"台湾省","city":"台湾省","name":"中原大学"},{"province":"台湾省","city":"台湾省","name":"逢甲大学"},{"province":"台湾省","city":"台湾省","name":"中国文化大学"},{"province":"台湾省","city":"台湾省","name":"静宜大学"},{"province":"台湾省","city":"台湾省","name":"世新大学"},{"province":"台湾省","city":"台湾省","name":"铭传大学"},{"province":"台湾省","city":"台湾省","name":"实践大学"},{"province":"台湾省","city":"台湾省","name":"义守大学"},{"province":"台湾省","city":"台湾省","name":"长庚大学"},{"province":"台湾省","city":"台湾省","name":"元智大学"},{"province":"台湾省","city":"台湾省","name":"华梵大学"},{"province":"台湾省","city":"台湾省","name":"中华大学"},{"province":"台湾省","city":"台湾省","name":"大叶大学"},{"province":"台湾省","city":"台湾省","name":"真理大学"},{"province":"台湾省","city":"台湾省","name":"大同大学"},{"province":"台湾省","city":"台湾省","name":"南华大学"},{"province":"台湾省","city":"台湾省","name":"慈济大学"},{"province":"台湾省","city":"台湾省","name":"长荣大学"},{"province":"台湾省","city":"台湾省","name":"玄奘大学"},{"province":"台湾省","city":"台湾省","name":"亚洲大学"},{"province":"台湾省","city":"台湾省","name":"开南大学"},{"province":"台湾省","city":"台湾省","name":"佛光大学"},{"province":"台湾省","city":"台湾省","name":"明道大学"},{"province":"台湾省","city":"台湾省","name":"康宁大学"},{"province":"台湾省","city":"台湾省","name":"台湾首府大学"},{"province":"台湾省","city":"台湾省","name":"高雄医学大学"},{"province":"台湾省","city":"台湾省","name":"台北医学大学"},{"province":"台湾省","city":"台湾省","name":"中山医学大学"},{"province":"台湾省","city":"台湾省","name":"中国医药大学"},{"province":"台湾省","city":"台湾省","name":"马偕医学院"},{"province":"台湾省","city":"台湾省","name":"中信金融管理学院"},{"province":"台湾省","city":"台湾省","name":"稻江科技暨管理学院"},{"province":"台湾省","city":"台湾省","name":"法鼓文理学院"},{"province":"台湾省","city":"台湾省","name":"国立台湾科技大学"},{"province":"台湾省","city":"台湾省","name":"国立屏东科技大学"},{"province":"台湾省","city":"台湾省","name":"国立台北科技大学"},{"province":"台湾省","city":"台湾省","name":"国立云林科技大学"},{"province":"台湾省","city":"台湾省","name":"国立高雄第一科技大学"},{"province":"台湾省","city":"台湾省","name":"国立高雄应用科技大学"},{"province":"台湾省","city":"台湾省","name":"国立高雄海洋科技大学"},{"province":"台湾省","city":"台湾省","name":"国立虎尾科技大学"},{"province":"台湾省","city":"台湾省","name":"国立澎湖科技大学"},{"province":"台湾省","city":"台湾省","name":"国立勤益科技大学"},{"province":"台湾省","city":"台湾省","name":"国立台北护理健康大学"},{"province":"台湾省","city":"台湾省","name":"国立高雄餐旅大学"},{"province":"台湾省","city":"台湾省","name":"国立台中科技大学"},{"province":"台湾省","city":"台湾省","name":"国立台北商业大学"},{"province":"台湾省","city":"台湾省","name":"国立台湾戏曲学院"},{"province":"台湾省","city":"台湾省","name":"国立台南护理专科学校"},{"province":"台湾省","city":"台湾省","name":"国立台东专科学校"},{"province":"台湾省","city":"台湾省","name":"朝阳科技大学"},{"province":"台湾省","city":"台湾省","name":"南台科技大学"},{"province":"台湾省","city":"台湾省","name":"昆山科技大学"},{"province":"台湾省","city":"台湾省","name":"嘉南药理大学"},{"province":"台湾省","city":"台湾省","name":"树德科技大学"},{"province":"台湾省","city":"台湾省","name":"龙华科技大学"},{"province":"台湾省","city":"台湾省","name":"辅英科技大学"},{"province":"台湾省","city":"台湾省","name":"明新科技大学"},{"province":"台湾省","city":"台湾省","name":"健行科技大学"},{"province":"台湾省","city":"台湾省","name":"正修科技大学"},{"province":"台湾省","city":"台湾省","name":"弘光科技大学"},{"province":"台湾省","city":"台湾省","name":"明志科技大学"},{"province":"台湾省","city":"台湾省","name":"建国科技大学"},{"province":"台湾省","city":"台湾省","name":"万能科技大学"},{"province":"台湾省","city":"台湾省","name":"岭东科技大学"},{"province":"台湾省","city":"台湾省","name":"中国科技大学"},{"province":"台湾省","city":"台湾省","name":"中台科技大学"},{"province":"台湾省","city":"台湾省","name":"大仁科技大学"},{"province":"台湾省","city":"台湾省","name":"圣约翰科技大学"},{"province":"台湾省","city":"台湾省","name":"高苑科技大学"},{"province":"台湾省","city":"台湾省","name":"元培医事科技大学"},{"province":"台湾省","city":"台湾省","name":"台南应用科技大学"},{"province":"台湾省","city":"台湾省","name":"远东科技大学"},{"province":"台湾省","city":"台湾省","name":"德明财经科技大学"},{"province":"台湾省","city":"台湾省","name":"中华医事科技大学"},{"province":"台湾省","city":"台湾省","name":"东南科技大学"},{"province":"台湾省","city":"台湾省","name":"景文科技大学"},{"province":"台湾省","city":"台湾省","name":"南开科技大学"},{"province":"台湾省","city":"台湾省","name":"侨光科技大学"},{"province":"台湾省","city":"台湾省","name":"中华科技大学"},{"province":"台湾省","city":"台湾省","name":"育达科技大学"},{"province":"台湾省","city":"台湾省","name":"吴凤科技大学"},{"province":"台湾省","city":"台湾省","name":"美和科技大学"},{"province":"台湾省","city":"台湾省","name":"环球科技大学"},{"province":"台湾省","city":"台湾省","name":"修平科技大学"},{"province":"台湾省","city":"台湾省","name":"中州科技大学"},{"province":"台湾省","city":"台湾省","name":"长庚科技大学"},{"province":"台湾省","city":"台湾省","name":"台北城市科技大学"},{"province":"台湾省","city":"台湾省","name":"醒吾科技大学"},{"province":"台湾省","city":"台湾省","name":"大华科技大学"},{"province":"台湾省","city":"台湾省","name":"文藻外语大学"},{"province":"台湾省","city":"台湾省","name":"南荣科技大学"},{"province":"台湾省","city":"台湾省","name":"华夏科技大学"},{"province":"台湾省","city":"台湾省","name":"慈济科技大学"},{"province":"台湾省","city":"台湾省","name":"致理科技大学"},{"province":"台湾省","city":"台湾省","name":"大汉技术学院"},{"province":"台湾省","city":"台湾省","name":"和春技术学院"},{"province":"台湾省","city":"台湾省","name":"亚东技术学院"},{"province":"台湾省","city":"台湾省","name":"桃园创新技术学院"},{"province":"台湾省","city":"台湾省","name":"兰阳技术学院"},{"province":"台湾省","city":"台湾省","name":"德霖技术学院"},{"province":"台湾省","city":"台湾省","name":"东方设计学院"},{"province":"台湾省","city":"台湾省","name":"经国管理暨健康学院"},{"province":"台湾省","city":"台湾省","name":"黎明技术学院"},{"province":"台湾省","city":"台湾省","name":"大同技术学院"},{"province":"台湾省","city":"台湾省","name":"崇右技术学院"},{"province":"台湾省","city":"台湾省","name":"亚太创意技术学院"},{"province":"台湾省","city":"台湾省","name":"台湾观光学院"},{"province":"台湾省","city":"台湾省","name":"台北海洋技术学院"},{"province":"台湾省","city":"台湾省","name":"仁德医护管理专科学校"},{"province":"台湾省","city":"台湾省","name":"马偕医护管理专科学校"},{"province":"台湾省","city":"台湾省","name":"慈惠医护管理专科学校"},{"province":"台湾省","city":"台湾省","name":"树人医护管理专科学校"},{"province":"台湾省","city":"台湾省","name":"耕莘健康管理专科学校"},{"province":"台湾省","city":"台湾省","name":"育英医护管理专科学校"},{"province":"台湾省","city":"台湾省","name":"敏惠医护管理专科学校"},{"province":"台湾省","city":"台湾省","name":"高美医护管理专科学校"},{"province":"台湾省","city":"台湾省","name":"新生医护管理专科学校"},{"province":"台湾省","city":"台湾省","name":"圣母医护管理专科学校"},{"province":"台湾省","city":"台湾省","name":"崇仁医护管理专科学校"},{"province":"台湾省","city":"台湾省","name":"中央警察大学"},{"province":"台湾省","city":"台湾省","name":"台湾警察专科学校"},{"province":"台湾省","city":"台湾省","name":"国防大学"},{"province":"台湾省","city":"台湾省","name":"国防医学院"},{"province":"台湾省","city":"台湾省","name":"陆军军官学校"},{"province":"台湾省","city":"台湾省","name":"海军军官学校"},{"province":"台湾省","city":"台湾省","name":"空军军官学校"},{"province":"台湾省","city":"台湾省","name":"陆军专科学校"},{"province":"台湾省","city":"台湾省","name":"空军航空技术学院"},{"province":"台湾省","city":"台湾省","name":"基督教台湾浸会神学院"},{"province":"台湾省","city":"台湾省","name":"台北基督学院"},{"province":"台湾省","city":"台湾省","name":"一贯道天皇学院"},{"province":"台湾省","city":"台湾省","name":"台湾神学院"},{"province":"台湾省","city":"台湾省","name":"玉山神学院"},{"province":"台湾省","city":"台湾省","name":"台南神学院"},{"province":"台湾省","city":"台湾省","name":"中台神学院"},{"province":"台湾省","city":"台湾省","name":"三育基督学院"},{"province":"台湾省","city":"台湾省","name":"圣光神学院"},{"province":"台湾省","city":"台湾省","name":"圣德基督学院"},{"province":"台湾省","city":"台湾省","name":"台湾浸信宣道会神学院"},{"province":"台湾省","city":"台湾省","name":"中华福音神学院"},{"province":"台湾省","city":"台湾省","name":"中华信义神学院"},{"province":"台湾省","city":"台湾省","name":"佛光山丛林学院"},{"province":"台湾省","city":"台湾省","name":"神召神学院"},{"province":"台湾省","city":"台湾省","name":"灵粮教牧宣教神学院"},{"province":"台湾省","city":"台湾省","name":"天主教台湾总修院"},{"province":"台湾省","city":"台湾省","name":"法鼓山僧伽大学"},{"province":"台湾省","city":"台湾省","name":"辅仁圣博敏神学院"},{"province":"台湾省","city":"台湾省","name":"国立空中大学"},{"province":"台湾省","city":"台湾省","name":"高雄市立空中大学"},{"province":"香港特别行政区","city":"香港特别行政区","name":"香港大学"},{"province":"香港特别行政区","city":"香港特别行政区","name":"香港中文大学"},{"province":"香港特别行政区","city":"香港特别行政区","name":"香港科技大学"},{"province":"香港特别行政区","city":"香港特别行政区","name":"香港理工大学"},{"province":"香港特别行政区","city":"香港特别行政区","name":"香港浸会大学"},{"province":"香港特别行政区","city":"香港特别行政区","name":"香港城市大学"},{"province":"香港特别行政区","city":"香港特别行政区","name":"香港教育学院"},{"province":"香港特别行政区","city":"香港特别行政区","name":"岭南大学"},{"province":"香港特别行政区","city":"香港特别行政区","name":"香港公开大学"},{"province":"香港特别行政区","city":"香港特别行政区","name":"香港演艺学院"},{"province":"香港特别行政区","city":"香港特别行政区","name":"香港树仁大学"},{"province":"香港特别行政区","city":"香港特别行政区","name":"珠海学院"},{"province":"香港特别行政区","city":"香港特别行政区","name":"明德学院"},{"province":"香港特别行政区","city":"香港特别行政区","name":"东华学院"},{"province":"香港特别行政区","city":"香港特别行政区","name":"明爱专上学院"},{"province":"香港特别行政区","city":"香港特别行政区","name":"恒生管理学院"},{"province":"香港特别行政区","city":"香港特别行政区","name":"香港能仁专上学院"},{"province":"香港特别行政区","city":"香港特别行政区","name":"港专学院"},{"province":"香港特别行政区","city":"香港特别行政区","name":"宏恩基督教学院"},{"province":"香港特别行政区","city":"香港特别行政区","name":"香港高等科技教育学院"},{"province":"香港特别行政区","city":"香港特别行政区","name":"香港专业教育学院"},{"province":"香港特别行政区","city":"香港特别行政区","name":"香港知专设计学院"},{"province":"香港特别行政区","city":"香港特别行政区","name":"明爱白英奇专业学校"},{"province":"香港特别行政区","city":"香港特别行政区","name":"明爱社区书院"},{"province":"香港特别行政区","city":"香港特别行政区","name":"香港专业进修学校"},{"province":"香港特别行政区","city":"香港特别行政区","name":"香港艺术学院"},{"province":"香港特别行政区","city":"香港特别行政区","name":"青年会专业书院"},{"province":"香港特别行政区","city":"香港特别行政区","name":"香港科技专上书院"},{"province":"香港特别行政区","city":"香港特别行政区","name":"萨凡纳艺术设计学院（香港校区）"},{"province":"澳门特别行政区","city":"澳门特别行政区","name":"澳门大学"},{"province":"澳门特别行政区","city":"澳门特别行政区","name":"澳门理工学院"},{"province":"澳门特别行政区","city":"澳门特别行政区","name":"旅游学院"},{"province":"澳门特别行政区","city":"澳门特别行政区","name":"澳门保安部队高等学校"},{"province":"澳门特别行政区","city":"澳门特别行政区","name":"澳门城市大学"},{"province":"澳门特别行政区","city":"澳门特别行政区","name":"澳门科技大学"},{"province":"澳门特别行政区","city":"澳门特别行政区","name":"圣若瑟大学"},{"province":"澳门特别行政区","city":"澳门特别行政区","name":"澳门镜湖护理学院"},{"province":"澳门特别行政区","city":"澳门特别行政区","name":"澳门管理学院"},{"province":"澳门特别行政区","city":"澳门特别行政区","name":"中西创新学院"}];

/***/ }),
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */
/*!*******************************************************************************************************************!*\
  !*** /Users/yuanhy/Desktop/Chat/pages/apply-organization/apply-organization.css?vue&type=style&index=0&lang=css& ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_apply_organization_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/css-loader??ref--6-oneOf-1-2!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!./apply-organization.css?vue&type=style&index=0&lang=css& */ 153);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_apply_organization_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_apply_organization_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_apply_organization_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_apply_organization_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_apply_organization_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 153 */
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!/Users/yuanhy/Desktop/Chat/pages/apply-organization/apply-organization.css?vue&type=style&index=0&lang=css& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */
/*!*********************************************************************************************!*\
  !*** /Users/yuanhy/Desktop/Chat/pages/article/article.css?vue&type=style&index=0&lang=css& ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_article_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/css-loader??ref--6-oneOf-1-2!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!./article.css?vue&type=style&index=0&lang=css& */ 168);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_article_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_article_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_article_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_article_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_article_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 168 */
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!/Users/yuanhy/Desktop/Chat/pages/article/article.css?vue&type=style&index=0&lang=css& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */
/*!***********************************************************************************************!*\
  !*** /Users/yuanhy/Desktop/Chat/pages/activity/activity.css?vue&type=style&index=0&lang=css& ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_activity_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/css-loader??ref--6-oneOf-1-2!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!./activity.css?vue&type=style&index=0&lang=css& */ 176);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_activity_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_activity_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_activity_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_activity_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_activity_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 176 */
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!/Users/yuanhy/Desktop/Chat/pages/activity/activity.css?vue&type=style&index=0&lang=css& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */
/*!*****************************************************************************************************************!*\
  !*** /Users/yuanhy/Desktop/Chat/pages/activity-register/activity-register.css?vue&type=style&index=0&lang=css& ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_activity_register_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/css-loader??ref--6-oneOf-1-2!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!./activity-register.css?vue&type=style&index=0&lang=css& */ 184);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_activity_register_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_activity_register_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_activity_register_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_activity_register_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_activity_register_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 184 */
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!/Users/yuanhy/Desktop/Chat/pages/activity-register/activity-register.css?vue&type=style&index=0&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */
/*!************************************************************************************************************************!*\
  !*** /Users/yuanhy/Desktop/Chat/components/tabbar/tabbar.css?vue&type=style&index=0&id=3214a57a&scoped=true&lang=css& ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_tabbar_css_vue_type_style_index_0_id_3214a57a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/css-loader??ref--6-oneOf-1-2!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!./tabbar.css?vue&type=style&index=0&id=3214a57a&scoped=true&lang=css& */ 202);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_tabbar_css_vue_type_style_index_0_id_3214a57a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_tabbar_css_vue_type_style_index_0_id_3214a57a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_tabbar_css_vue_type_style_index_0_id_3214a57a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_tabbar_css_vue_type_style_index_0_id_3214a57a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_tabbar_css_vue_type_style_index_0_id_3214a57a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 202 */
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!/Users/yuanhy/Desktop/Chat/components/tabbar/tabbar.css?vue&type=style&index=0&id=3214a57a&scoped=true&lang=css& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */
/*!***************************************************************************************!*\
  !*** /Users/yuanhy/Desktop/Chat/pages/user/user.css?vue&type=style&index=0&lang=css& ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_user_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/css-loader??ref--6-oneOf-1-2!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!./user.css?vue&type=style&index=0&lang=css& */ 209);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_user_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_user_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_user_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_user_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_user_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 209 */
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!/Users/yuanhy/Desktop/Chat/pages/user/user.css?vue&type=style&index=0&lang=css& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */
/*!**************************************************************************************************!*\
  !*** /Users/yuanhy/Desktop/Chat/components/indexes/indexes.css?vue&type=style&index=0&lang=css& ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_indexes_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/css-loader??ref--6-oneOf-1-2!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!./indexes.css?vue&type=style&index=0&lang=css& */ 235);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_indexes_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_indexes_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_indexes_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_indexes_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_indexes_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 235 */
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!/Users/yuanhy/Desktop/Chat/components/indexes/indexes.css?vue&type=style&index=0&lang=css& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-qq/common/vendor.js.map