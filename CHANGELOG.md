## [0.1.1](https://github.com/miaoxing/mxjs-taro/compare/v0.1.0...v0.1.1) (2021-10-28)


### Bug Fixes

* **taro:** `$.ret` 等浮层隐藏后才执行回调 ([5797df2](https://github.com/miaoxing/mxjs-taro/commit/5797df2cf45807f5dbff35694f91e885d969de7c))


### Features

* **taro:** h5 可以直接解析 URL 参数，不用等到 router 实例化 ([03853fd](https://github.com/miaoxing/mxjs-taro/commit/03853fdf5cdcc87b6be3d0d6600223d6d8d544de))
* **taro:** http 请求自动提示错误，允许忽略错误 ([3a88aa7](https://github.com/miaoxing/mxjs-taro/commit/3a88aa79b47fc237435b86affd845db60bb36478))
* **taro:** 初始化接口 ([5c8be20](https://github.com/miaoxing/mxjs-taro/commit/5c8be20d363f777f151c8765f10ab16b2d9eef01))
* **taro:** 发送请求头部自动加上 token ([cd57e61](https://github.com/miaoxing/mxjs-taro/commit/cd57e61389d5e001b946e80cb05b5313f3db8802))
* **taro:** 增加 `apiUrl` 接口 ([bec181e](https://github.com/miaoxing/mxjs-taro/commit/bec181e989d870cbb2b12a6a5531032f7afe25f2))
* **taro:** 增加 `ret`、`suc` 和 `err` 接口 ([3c2fd87](https://github.com/miaoxing/mxjs-taro/commit/3c2fd879848ae6c28b94813e301e19e8808f5191))
* **taro:** 增加 `url` 接口 ([3c88016](https://github.com/miaoxing/mxjs-taro/commit/3c88016860505e4417e222647282cb503d675786))
* **taro:** 如果登录失败，跳转到登录页面 ([002e78c](https://github.com/miaoxing/mxjs-taro/commit/002e78ca4cef1bf2f532f478f218e4ea10fe0a9b))
* **taro:** 小程序不支持 `PATCH` 请求，通过 `header` 传输给后台 ([4eae737](https://github.com/miaoxing/mxjs-taro/commit/4eae7370c65ebea98a9ae168afbc1bd0de97888f))
* **taro:** 支持 apiUrl 带参数的情况 ([5072497](https://github.com/miaoxing/mxjs-taro/commit/50724970c8c975cf3804e7a4f53eb50c4a0af5c9))
* **taro, internal:** 增加 `setOnBeforeHttp` 方法和 `skipBeforeEvent` 选项，用于发送请求前执行登录操作 ([f3f3d5c](https://github.com/miaoxing/mxjs-taro/commit/f3f3d5cebc2c898764cac09a1e833514749bcd15))





### Dependencies

* **miaoxing:** upgrade from `0.2.5` to `0.3.0`
* **append-url:** upgrade from `1.0.13` to `1.0.14`
* **@miaoxing/dev:** upgrade from `7.0.1` to `8.0.0`
* **@mxjs/test:** upgrade from `0.1.8` to `0.2.0`

# 0.1.0 (2021-06-21)


### Features

* **taro:** 初始化 `@mxjs/taro` ([f7cc97f](https://github.com/miaoxing/mxjs-taro/commit/f7cc97f8604ec26c5f22ac055f6bceecd53955df))
