# fetch-with-loading

fetch-with-loading 是一个带有 loading 的 promise 扩展

## 特点

1. 使用方便，没有 API，仅仅是对默认请求的扩展
1. 提示可以自定义内容和样式，灵活快捷
1. 支持其他 promise 请求库，如 axios
1. 无任何依赖，非常轻量，无框架限制

## 实现效果

使用该扩展，可以带来丰富细腻的用户体验

1. 如果请求可以在200ms内完成，表示网速很快，则不显示loading
1. 如果请求超过200ms，则至少显示200ms的loading，避免一闪而过的情况
1. 如果请求时间更长，比如超过10s，需要每隔3秒更换提示，缓解用户焦虑，如："加载中=>正在努力加载中=>快好了"

[在线预览](https://yued-fe.github.io/fetch-with-loading/)

## 快速开始

### 安装

1. 直接在 [github](https://github.com/yued-fe/fetch-with-loading) 获取 fetch-with-loading.js

```html
<script src="fetch-with-loading.js"></script>
```

2. 直接使用 unpkg [在线链接](https://unpkg.com/fetch-with-loading)

```html
<script src="https://unpkg.com/fetch-with-loading"></script>
```

3. 通过 [npm](https://www.npmjs.com/package/fetch-with-loading) 安装

```cmd
npm i fetch-with-loading
```

### 使用

通过 script 引用，会得到一个全局变量 `fetchWithLoading`

通过 npm 安装，需要 import 导入

```js
import fetchWithLoading from 'fetch-with-loading';
```

在页面中使用

```js
// 重新定义一个请求方法
const fetch_with_loading = new fetchWithLoading();
fetch_with_loading('/list').then(res => console.log(res))

// 也可以直接重置默认fetch
window.fetch = new fetchWithLoading();
fetch('/list').then(res => console.log(res))

// 自定义提示
window.fetch = new fetchWithLoading(['加载中...','正在努力加载中...','快好了...']);
```

## 可选配置项

```js
new fetchWithLoading(tips|options, NativeFetch)
```

参数

第一个参数支持数组或者对象两种格式，分别是

* `tips`是一个数组，表示 Loading 提示队列，默认为 `['加载中...','正在努力加载中...','快好了...']`，可无限追加

```js
// 示例
new fetchWithLoading(['加载中...','还在努力加载中...','请稍等，快好了...'])
```

* `options`是一个对象，表示 Loading 的所有可定制选项，默认为

```js
{
    tips: ['加载中...', '正在努力加载中...', '快好了...'],
    timestep: 3000,
    delay: 200,
    duration: 200,
}
```

其中：

* `tips` 和前面一致
* `timestep(ms)` 表示每隔多长时间更换提示信息，默认为 `3000`
* `delay(ms)` 表示在多长时间内完成请求可无需显示提示信息，默认为 `200`
* `duration(ms)` 表示出现提示信息后，至少显示多长时间，默认为 `200`

```js
// 示例
new fetchWithLoading({
    tips: ['加载中...', '正在努力加载中...', '快好了...'],
    timestep: 2000,
    delay: 300,
    duration: 500,
})
```

第二个参数是一个 promise 对象

* `NativeFetch` 表示请求方法，默认是 `fetch`

如果习惯使用 [axios](http://www.axios-js.com/zh-cn/) ，可以传入

```js
// 示例
import axios from 'axios';
const axios_with_loading = new fetchWithLoading(['加载中...','还在努力加载中...','请稍等，快好了...'], axios)
```

如果需要自定义拦截器

```js
import axios from 'axios';
const service = axios.create({...});
// 请求拦截器
service.interceptors.request.use(）;
// 响应拦截器
service.interceptors.response.use();
// fetch with loading
const axios_with_loading = new fetchWithLoading(['加载中...','还在努力加载中...','请稍等，快好了...'], service);
```
也就是说，不影响原有逻辑，只需要在最后包裹一层就行了

## 自定义样式

loading 的样式可以通过以下自定义，默认是一个黑色半透明的圆角矩形

```css
.toast{
    /*toast*/
}
.toast[loading]::before{
    /*loading*/
}
```

## 兼容性

现代浏览器，包括移动端，不支持 `IE`

> 兼容性取决于 [Promise](https://caniuse.com/?search=Promise)


## 联系我

有相关问题或者意见可与我联系 yanwenbin@yuewen.com 或者直接提 [issue](https://github.com/yued-fe/fetch-with-loading/issues)