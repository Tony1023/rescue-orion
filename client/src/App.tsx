import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Room from './room';
import Admin from './Admin';

export default () => {

  return <BrowserRouter>
    <Switch>
      <Route
        path='/room'
        component={Room}
      >
      </Route>
      <Route
        path='/admin'
        component={Admin}
      >
      </Route>
    </Switch>
  </BrowserRouter>
}