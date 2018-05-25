import React, { Component } from 'react';
import { Button, Popover } from 'antd';
import BaseLink from '@/components/BaseLink';

const PopImg = (type) => <img className="pop-img" src={`/statics/img/${type}.jpg`} alt={`${type} qrcode`} />

class Header extends Component {
  render() {
    return (
      <header>
        <a href="/">
          <img alt="logo" className="logo" src="/statics/img/logo.png" /> 
        </a>
        <span>
          <BaseLink url="https://github.com/gitdust/wstpd">
            <Button icon="github" size="small">Star</Button>
          </BaseLink>
          <Popover placement="bottom" content={PopImg('weibo')} trigger="hover">
            <Button style={{ margin: '0 8px', cursor: 'default' }} size="small" shape="circle" icon="weibo" />
          </Popover>
          <Popover placement="bottom" content={PopImg('wechat')} trigger="hover">
            <Button style={{ cursor: 'default' }} size="small" shape="circle" icon="wechat" />
          </Popover>
        </span>
      </header>
    );
  }
}

export default Header;