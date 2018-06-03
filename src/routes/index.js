import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loadable from 'react-loadable';

const Loading = ({ error }) => {
  if (error) {
    console.log(error);
    return <div>Something wrong!</div>;
  }
  return <div>loading</div>;

}

const Home = Loadable({
  loader: () => import(/* webpackChunkName: 'home' */ '@/views/home'),
  loading: Loading,
});

const Admin = Loadable({
  loader: () => import(/* webpackChunkName: 'admin' */ '@/views/admin'),
  loading: Loading,
});

const NotFound = Loadable({
  loader: () => import(/* webpackChunkName: '404' */ '@/layouts/NotFound'),
  loading: Loading,
});

const routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/admin" component={Admin} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
);

export default routes;
