import React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import Login from './Login';
import RoomListPage from './RoomListPage';
import LobbyListPage from './LobbyListPage';
import { createGlobalStyle } from 'styled-components';

const Global = createGlobalStyle`
  html, body {
    background-color: rgb(233, 233, 233) !important;
  }
`;

export default (props: RouteComponentProps) => {

  return <>
    <Global />
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
      integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
      crossOrigin='anonymous'
    />
    <Route
      path={`${props.match.url}/lobbies/:code`}
      component={RoomListPage}
    />
    <Route
      exact
      path={`${props.match.url}/lobbies`}
      component={LobbyListPage}
    />
    <Route
      exact
      path={`${props.match.url}/`}
      component={Login}
    />
  </>
}