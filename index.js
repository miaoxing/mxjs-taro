import $, {Ret} from 'miaoxing';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import appendUrl from 'append-url';
import qs from 'query-string';

const NOT_FOUND = 404;
const UNAUTHORIZED_CODE = 401;
const TIPS_DELAY = 3000;

$.alert = (message, fn) => {
  return Taro.showModal({
    content: message,
    showCancel: false,
    success: function () {
      fn && fn();
    },
  });
};

$.confirm = (message, fn) => {
  return Taro.showModal({
    content: message,
    success: function (result) {
      fn && fn(result.confirm);
    },
  });
};

$.ret = (ret, duration = 3000, callback) => {
  Taro.showToast({
    title: ret.message,
    icon: 'none',
    duration,
    success: callback,
  });

  let suc;
  let err;

  const result = new Promise(resolve => setTimeout(() => {
    if (ret.code === 0 && suc) {
      suc();
    }
    if (ret.code !== 0 && err) {
      err();
    }
    resolve();
  }, duration));

  result.suc = fn => {
    suc = fn;
    return result;
  };

  result.err = fn => {
    err = fn;
    return result;
  };

  return result;
};

$.suc = (message, duration, callback) => {
  return $.ret({code: 0, message}, duration, callback);
};

$.err = (message, duration, callback) => {
  return $.ret({code: 1, message}, duration, callback);
};

$.loading = (options = 'show') => {
  switch (options) {
    case 'show':
      return Taro.showLoading({
        title: '加载中',
      });

    case 'hide':
      return Taro.hideLoading();

    default:
      return Taro.showLoading(options);
  }
};

$.req = (name) => {
  return getCurrentInstance().router.params[name];
};

// 发送请求之前执行的操作
let onBeforeHttp;
const setOnBeforeHttp = (fn) => {
  onBeforeHttp = fn;
};

/**
 * 1. 将 HTTP 状态错误转换为请求错误
 * 2. 默认增加 Accept 头，让接口优先返回 JSON 数据（同 axios）
 * 3. 增加 `loading` 选项，控制请求时是否显示加载中的提示 (H5 暂不支持)
 *
 * @param urlOrConfig
 * @param config
 * @returns {Promise<T>}
 */
$.http = async (urlOrConfig, config) => {
  let conf;
  if (typeof urlOrConfig === 'string') {
    conf = config || {};
    conf.url = urlOrConfig;
  } else {
    conf = urlOrConfig;
  }

  // @internal 用于发送请求前执行登录操作
  if (conf.skipBeforeEvent !== true && onBeforeHttp) {
    await onBeforeHttp();
  }

  const {header = {}, loading, complete, ignoreError, ...rest} = conf;

  // 小程序不支持 PATCH，通过 header 传输给后台
  if (rest.method?.toUpperCase() === 'PATCH') {
    rest.method = 'POST';
    header['X-HTTP-Method-Override'] = 'PATCH';
  }

  // 让接口优先返回 JSON 数据
  if (!header.Accept) {
    header.Accept = 'application/json, text/plain, */*';
  }

  // 如果有 token，附加到请求中
  const token = Taro.getStorageSync('token');
  if (token) {
    header.Authorization = 'Bearer ' + token;
  }

  if (loading) {
    Taro.showLoading();
  }

  if (process.env.TARO_ENV !== 'h5') {
    Taro.showNavigationBarLoading();
  }

  return Taro
    .request({
      ...rest,
      header,
      complete: () => {
        loading && Taro.hideLoading();
        if (process.env.TARO_ENV !== 'h5') {
          Taro.hideNavigationBarLoading();
        }
        complete && complete();
      },
    })
    .then(res => {
      // 将 HTTP 状态错误转换为请求错误
      const isSuccess = res.statusCode >= 200 && res.statusCode < 300 || res.statusCode === 304;
      if (!isSuccess) {

        if (!ignoreError) {
          $.err(res.statusCode === NOT_FOUND ? '很抱歉，您访问的页面不存在，请检查后再试' : '很抱歉，请求出错，请稍后再试');
        }

        return Promise.reject({
          errMsg: res.statusCode,
          res: res,
        });
      }

      // 未登录，跳转到登录地址
      if (typeof res.data.code !== 'undefined' && res.data.code === UNAUTHORIZED_CODE) {
        Taro.removeStorageSync('token');
        if (process.env.TARO_ENV === 'h5') {
          res.data.message = '重新授权中（' + res.data.message + '）';
          setTimeout(function () {
            window.location.href = res.data.next.replace(
              encodeURIComponent('%next%'),
              encodeURIComponent(window.location.href),
            );
          }, TIPS_DELAY);
        }
      }

      res.ret = new Ret(res.data);

      return res;
    });
};

// @internal 用于发送请求前执行登录操作
export {setOnBeforeHttp};

$.url = (url, argsOrParams, params) => {
  url || (url = 'index');

  let query = '';
  if (url.includes('?')) {
    const result = qs.parseUrl(url);
    url = result.url;
    query = result.query;
  }

  if (url.substr(0, 1) !== '/') {
    // from "products" to "products/index"
    const parts = url.split('/');
    if (parts.length === 1) {
      url += '/index';
    }

    // from "products/index" to "/pages/products/index"
    url = '/pages/' + url;
  }

  if (query) {
    url += '?' + qs.stringify(query);
  }

  return appendUrl(url, argsOrParams, params);
};

let apiUrl = '';
let apiUrlParam = '';

$.apiUrl = (url = '', argsOrParams, params) => {
  url = apiUrl + '/m-api/' + url;
  if (apiUrlParam) {
    url += (url.includes('?') ? '&' : '?') + apiUrlParam;
  }
  return appendUrl(url, argsOrParams, params);
};

const setApiUrl = (url) => {
  [apiUrl, apiUrlParam] = url.split('?');
};

export {setApiUrl};
