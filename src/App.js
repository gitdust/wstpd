import React, { Component } from 'react';
import { BackTop } from 'antd';
import MyWorker from '@/utils/my.worker';

import routes from '@/routes';
import Header from './layouts/Header';
import Footer from './layouts/Footer';

class App extends Component {
  render() {
    return [
      <Header key="header" />,
      <main key="main">
        { routes() }
      </main>,
      <Footer key="footer" />,
      <BackTop key="back-top" visibilityHeight="50" />,
    ];
  }
}

var worker = new MyWorker();
worker.postMessage({a: 1});
worker.addEventListener("message", function(event) { 
  console.log('message from worker:', event.data)
});

export default App;