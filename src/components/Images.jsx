// 系统所有图片统一这里引入
import React from 'react';

const logo = require('Images/logo.png');
const weibo = require('Images/weibo.jpg');
const wechat = require('Images/wechat.jpg');

const Logo = () => <img alt="logo" className="logo" src={logo} /> 
const Weibo = () => <img className="pop-img" src={weibo} alt={`${name} qrcode`} />
const Wechat = () => <img className="pop-img" src={wechat} alt={`${name} qrcode`} />

export default {
  Logo,
  Weibo,
  Wechat,
}

