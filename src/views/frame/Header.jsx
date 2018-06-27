import React, { Component } from 'react';
import { Button, Popover } from 'antd';
import BaseLink from '@/components/BaseLink';
import Images from '@/components/Images';

import style from './Frame.less';

class Header extends Component {
  render() {
    return (
      <header className={style.header}>
        <a href="/">
          <Images.Logo />
        </a>
        <span>
          <Popover placement="bottom" content={<Images.Weibo />} trigger="click">
            <Button icon="weibo" size="small" />
          </Popover>
          <Popover placement="bottom" content={<Images.Wechat />} trigger="click">
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