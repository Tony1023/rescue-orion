import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Room, { DevRoom } from './room';
import Admin from './admin';
import Lobby from './lobby';

export default () => {

  return <BrowserRouter>
    <Switch>
      <Route
        path='/rooms'
        component={Room}
      >
      </Route>
      <Route
        path='/admin'
        component={Admin}
      />
      <Route
        path='/lobbies'
        component={Lobby}
      />
      <Route
        path='/dev'
        component={DevRoom}
      />
      {/* <Route component={allotherlinks} /> */}
    </Switch>
  </BrowserRouter>
}