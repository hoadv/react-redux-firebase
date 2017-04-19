// src/routes.js
import React from 'react';
import { Router, Route } from 'react-router'

import Home from './home';
import Edit from './edit/'

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={Home} />
    <Route path="edit" component={Edit} />
  </Router>
);

export default Routes;
