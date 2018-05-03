import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from '@/views/home';
import Admin from '@/views/admin';

const routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/admin" component={Admin} />
    </Switch>
  </Router>
);

export default routes;
