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

const request = (url, config = {}) => {
  globalLoading.start();
  defaultConfig.url = url;
  const newConfig = Object.assign(config, defaultConfig);
  return client.request(newConfig)
    .catch((err) => {
      globalMessage.error(err.message);
    })
    .finally(() => {
      globalLoading.done();
    });
};

export default request;
