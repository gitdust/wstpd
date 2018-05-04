import * as env from '@/env';
import * as globalMessage from './feedback';

window.onerror = (message, source, lineno, colno) => {
  const msg = {}; // 收集客户端错误信息
  // msg.userAgent = window.navigator.userAgent;
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
    img.src = `/api/client?error=${msg}`;
  }
  // TODO: 运行时错误友好处理方式以及使用图像Ping进行错误收集
  globalMessage.error(message);
};
