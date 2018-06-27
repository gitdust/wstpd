import React from 'react';
import ReactDOM from 'react-dom';
import 'nprogress/nprogress.css';
import './styles/app.less';

import './utils/error';

import App from './App';

const rootDOM = document.getElementById('app');

const render = () => {
  ReactDOM.render(
    <App />,
    rootDOM,
  );
};

render();
if (module.hot) {
  module.hot.accept(() => {
    render();
  });
}