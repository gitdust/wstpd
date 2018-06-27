import React, { Component } from 'react';
import { BackTop } from 'antd';
import Helmet from 'react-helmet';

import Header from './views/frame/Header';
import Footer from './views/frame/Footer';
import Routes from './routes/Routes';

import style from './views/frame/Frame.less';

class App extends Component {
  render() {
    return [
      <Helmet key="title">
        <link rel="icon" type="image/png" href={require('Images/favicon.png')} sizes="32x32" />
      </Helmet>,
      <Header key="header" />,
      <main key="main" className={style.main}>
        <Routes />
      </main>,
      <Footer key="footer" />,
      <BackTop key="back-top" visibilityHeight="50" />,
    ];
  }
}

export default App;