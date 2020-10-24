import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Room, { DevRoom } from './room';
import Admin, { RoomListPage } from './admin';
import Lobby from './join';

export default () => {

  return <BrowserRouter>
    <Switch>
      <Route
        path='/rooms'
        component={Room}
      >
      </Route>
      <Route
        exact
        path='/admin/lobbies'
        component={Admin}
      />
      <Route
        path='/admin/lobbies/:code'
        component={RoomListPage}
      />
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