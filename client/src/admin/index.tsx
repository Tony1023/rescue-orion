import React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import Login from './Login';
import RoomListPage from './RoomListPage';

export default (props: RouteComponentProps) => {

  return <>
    {/* <Route
      exact
      path='/admin/lobbies'
      component={Admin}
    /> */}
    <Route
      path={`${props.match.url}/lobbies/:code`}
      component={RoomListPage}
    />
    <Route
      exact
      path={`${props.match.url}/`}
      component={Login}
    />
  </>
}