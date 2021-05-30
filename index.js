import $, {Ret} from 'miaoxing';
import Taro, {getCurrentInstance} from '@tarojs/taro';

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
  const result = Taro.showToast({
    title: ret.message,
    icon: 'none',
    duration,
    success: callback,
  });

  let suc;
  result.suc = fn => {
    suc = fn;
    return result;
  };

  let err;
  result.err = fn => {
    err = fn;
    return result;
  };

  result.then(() => {
    if (ret.code === 0 && suc) {
      suc();
    }
    if (ret.code !== 0 && err) {
      err();
    }
  });

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

/**
 * 1. 将 HTTP 状态错误转换为请求错误
 * 2. 默认增加 Accept 头，让接口优先返回 JSON 数据（同 axios）
 * 3. 增加 `loading` 选项，控制请求时是否显示加载中的提示 (H5 暂不支持)
 *
 * @param urlOrConfig
 * @param config
 * @returns {Promise<T>}
 */
$.http = (urlOrConfig, config) => {
  let conf;
  if (typeof urlOrConfig === 'string') {
    conf = config || {};
    conf.url = urlOrConfig;
  } else {
    conf = urlOrConfig;
  }

  const {header = {}, loading, complete, ...rest} = conf;

  // 让接口优先返回 JSON 数据
  if (!header.Accept) {
    header.Accept = 'application/json, text/plain, */*';
  }

  if (loading) {
    Taro.showNavigationBarLoading();
  }

  // TODO
  // 2. 如果是错误，提示错误
  // 3. 如果是未登录，跳转到登录页面

  return Taro
    .request({
      ...rest,
      header,
      complete: () => {
        loading && Taro.hideNavigationBarLoading();
        complete && complete();
      },
    })
    .then(res => {
      // 将 HTTP 状态错误转换为请求错误
      const isSuccess = res.statusCode >= 200 && res.statusCode < 300 || res.statusCode === 304;
      if (!isSuccess) {
        return Promise.reject({
          errMsg: res.statusCode,
          res: res,
        });
      }

      res.ret = new Ret(res.data);

      return res;
    });
};

// import {url} from '@mxjs/app';
//
// $.url = url.to.bind(url);
// $.apiUrl = url.api.bind(url);
//
// window.$ = $;
