import axios from 'axios';
import * as env from '@/env';
import * as globalMessage from './feedback';
import * as globalLoading from './loading';

const defaultConfig = {
  baseURL: env.API_HOST,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  // milliseconds
  timeout: 10000,
};

const client = axios.create(defaultConfig);

const rejectError = response => new Promise((resolve, reject) => {
  reject(response);
});

function handleResponse(response) {
  const { data } = response;
  const status = `${response.status}`;

  // 40x/50x
  if (status.charAt(0) === '4' || status.charAt(0) === '5') {
    return rejectError({
      message: `error with ${status}`,
    });
  }

  // success response but ok=false
  const { ok, message } = data;
  if (!ok) {
    return rejectError({ message });
  }
  return data;
}

client.interceptors.response.use(handleResponse, (error) => {
  if (error.response) {
    return handleResponse(error.response);
  }
  return rejectError({
    message: '网络不给力',
  });
});

/**
 * 客户端请求
 * @param {string} url 接口path
 * @param {object} config 接口参数
 * config = {
 *   // default 'GET'
 *   method: 'POST',
 *   // when method is 'GET'
 *   params: {
 *     username: 'admin',
 *   },
 *   // when method is not 'GET'
 *   data: {
 *     name: 'admin',
 *   },
 * }
 */
const request = (url, config = {}) => {
  globalLoading.start();
  defaultConfig.url = url;
  let newConfig = Object.assign(config, defaultConfig);
  
  // resolve HTTP 'GET' cache
  if (!newConfig.hasOwnProperty('method')) {
    newConfig.url += `?r=${Date.now()}`;
  }

  return client.request(newConfig)
    .then((res) => {
      globalLoading.done();
      return res.data;
    })
    .catch((err) => {
      globalLoading.done();
      globalMessage.error(err.message);
    })
};

export default request;
