import * as env from '@/env';
import * as globalMessage from './feedback';

window.onerror = (message, source, lineno, colno) => {
  // 收集客户端错误信息
  const msg = {};
  msg.userAgent = window.navigator.userAgent;
  msg.message = message;
  msg.source = source;
  msg.lineno = lineno;
  msg.colno = colno;
  msg.page = window.location.href;
  if (env.DEV) {
    console.log('client error:', msg);
  }
  if (env.PRO) {
    const img = new Image();
    img.src = `/api/client?error=${JSON.stringify(msg)}`;
  }
  // TODO: 运行时错误跳转页面
  globalMessage.error(message);
};

// 资源加载出错，比如 image 和  script
window.addEventListener('error', event => {
  console.log('resources load error: ', event);
});

// 未 catch 的 promise 异常
window.addEventListener('unhandledrejection', (event) => {
  console.warn(`WARNING: Unhandled promise rejection. Shame on you! Reason: ${event.reason}`);
});
