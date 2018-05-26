import React, { Component } from 'react';
import { Button, Popover, Icon } from 'antd';
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
          <BaseLink url="https://github.com/gitdust/wstpd">
            <Button icon="github" size="small">Star</Button>
          </BaseLink>
          <Popover placement="bottom" content={PopImg('weibo')} trigger="hover">
            <Icon className="my-icon" type="weibo" />
          </Popover>
          <Popover placement="bottom" content={PopImg('wechat')} trigger="hover">
            <Icon className="my-icon" type="wechat" />
          </Popover>
        </span>
      </header>
    );
  }
}

export default Header;