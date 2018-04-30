import React, { Component } from 'react';
import { Icon } from 'antd';

class Header extends Component {
  render() {
    return (
      <header>
        <h1>WSTPD</h1>
        <span>
          <Icon type="github" />
        </span>
      </header>
    );
  }
}

export default Header;