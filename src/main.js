import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import 'nprogress/nprogress.css';

import './utils/error';

import './styles/global.less';

import App from './App';

const rootDOM = document.getElementById('app');

const render = () => {
  ReactDOM.render(
    <App />,
    rootDOM
  );
};

render();
if (module.hot) {
  module.hot.accept(() => {
    render();
  });
}