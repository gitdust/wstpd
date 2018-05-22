import React, { Component } from 'react';
import { Icon } from 'antd';

import BaseLink from '@/components/BaseLink';

class Header extends Component {
  render() {
    return (
      <header>
        <a href="/">
          <img alt="logo" className="logo" src="~statics/img/logo.png" /> 
        </a>
        <BaseLink url="https://github.com/gitdust/wstpd">
          <Icon type="github" />
        </BaseLink>
      </header>
    );
  }
}

export default Header;