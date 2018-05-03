import React, { Component } from 'react';
import { Icon } from 'antd';

import BaseLink from '@/components/BaseLink';

class Header extends Component {
  render() {
    return (
      <header>
        <h1>WSTPD</h1>
        <BaseLink url="https://github.com/gitdust/wstpd">
          <Icon type="github" />
        </BaseLink>
      </header>
    );
  }
}

export default Header;