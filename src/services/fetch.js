
import {message} from 'antd';
import fetch from 'dva/fetch';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const checkStatus = res => {
  if (200 === res.status) {
    return res;
  }
  message.error(codeMessage[res.status]);
  const error = new Error(res.statusText);
  error.response = error;
  throw error;
};

/**
 *  捕获成功登录过期状态码等
 * @param res
 * @returns {*}
 */
const judgeOkState = async res => {
  const cloneRes = await res.clone().json();
  //TODO:可以在这里管控全局请求
  if (cloneRes.success !== true) {
    message.error(`${cloneRes.message}${cloneRes.errorCode}`);
  }
  console.log('管控全局---', res);
  return res;
};

const handleError = error => {
  if (error instanceof TypeError) {
    message.error(`网络请求失败啦！${error}`);
  }
  return {   //防止页面崩溃，因为每个接口都有判断res.code以及data
    code: -1,
    data: false,
  };
};

class http {
  static async staticFetch(url='', options={}) {
    let defaultOptions = {
      mode: 'cors',
      credentials: 'include',
      headers: {
        // token: null,
        // Authorization: 'JSESSIONID=03DD65636FE55038142A9C20BA715279',
        cookie: 'JSESSIONID=ACCBB20D28642EC6E97D25AD4DFF339F'
      },

    };
    if (options.method === 'POST' || 'PUT') {
      defaultOptions.headers['Content-Type'] = 'application/json; charset=utf-8';
    }
    const newOptions = {...defaultOptions, ...options};
    console.log('is-new-options-', newOptions);
    return fetch(url, newOptions).then(checkStatus)
        .then(judgeOkState)
        .then(res => res.json())
        .catch(handleError)
  }
  post(url, params = {}, option = {}) {
    const options = Object.assign({method: 'POST'}, option);
    options.body = JSON.stringify(params);
    if (options.type === 'FormData' && options.body !== 'undefined') {
      let params = new FormData();
      for(let key of Object.keys(options.body)) {
        params.append(key, options.body[key]);
      }
      options.body = params;
    }
    return http.staticFetch(url, options);
  }
  put(url, params={}, option={}) {
    const options = Object.assign({method: 'PUT'}, option);
    options.body = JSON.stringify(params);
    return http.staticFetch(url, options);
  }
  get(url, option = {}) {
    const options = Object.assign({
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Cookie': 'JSESSIONID=ACCBB20D28642EC6E97D25AD4DFF339F',
        'Sec-Fetch-Site': 'same-origin'
      },
    }, option);
    return http.staticFetch(url, options);
  }
}

const requestFun = new http();
export const {post, get, put} = requestFun;
export default requestFun;
