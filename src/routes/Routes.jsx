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
  loader: () => import(/* webpackChunkName: 'home' */ '@/views/home/Home'),
  loading: Loading,
});

const Admin = Loadable({
  loader: () => import(/* webpackChunkName: 'admin' */ '@/views/admin/Admin'),
  loading: Loading,
});

const NotFound = Loadable({
  loader: () => import(/* webpackChunkName: '404' */ '@/views/frame/NotFound'),
  loading: Loading,
});

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/admin" component={Admin} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
);

export default Routes;
