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
