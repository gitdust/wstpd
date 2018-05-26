import React, { Component } from 'react';
import { Button, Popover } from 'antd';
import BaseLink from '@/components/BaseLink';
import { PopImg } from '@/utils/tools';

class Header extends Component {
  render() {
    return (
      <header>
        <a href="/">
          <img alt="logo" className="logo" src="/statics/img/logo.png" /> 
        </a>
        <span>
          <Popover placement="bottom" content={PopImg('weibo')} trigger="click">
            <Button icon="weibo" size="small" />
          </Popover>
          <Popover placement="bottom" content={PopImg('wechat')} trigger="click">
            <Button icon="wechat" size="small" />
          </Popover>
          <BaseLink url="https://github.com/gitdust/wstpd">
            <Button icon="github" size="small">Star</Button>
          </BaseLink>
        </span>
      </header>
    );
  }
}

export default Header;