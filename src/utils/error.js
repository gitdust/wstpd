import * as env from '@/env';

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
  // window.setTimeout(() => { window.location.reload(true); }, 1000);
};
