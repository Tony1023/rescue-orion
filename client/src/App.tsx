import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Room, { DevRoom } from './room';
import Admin from './admin';
import Join from './join';
import LobbyListPage from './admin/LobbyListPage';

export default () => {

  return <BrowserRouter>
    <Switch>
      <Route
        path='/rooms'
        component={Room}
      >
      <Route
        path='/admin/lobbies'
        component={LobbyListPage}
      />
      </Route>
      <Route
        path='/admin'
        component={Admin}
      />
      <Route
        path='/join'
        component={Join}
      />
      <Route
        path='/dev'
        component={DevRoom}
      />
      {/* <Route component={allotherlinks} /> */}
    </Switch>
  </BrowserRouter>
}