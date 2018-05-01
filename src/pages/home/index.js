import React, { Component } from 'react';
import { BackTop } from 'antd';

import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.onClick = this.onClick.bind(this);
  // }
  // onClick() {
  //   request('/api').then((result) => {
  //     console.log({result});
  //   });
  // }
  render() {
    return [
      // <button key='key' onClick={this.onClick} />,
      <Header key="header" />,
      <Main key="main" />,
      <Footer key="footer" />,
      <BackTop key="back-top" visibilityHeight="50" />,
    ];
  }
}

export default App;