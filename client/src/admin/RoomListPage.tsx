import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SocketIOClient from 'socket.io-client';
import { LobbyState, LobbyUpdate } from '../metadata/types';

export default () => {
  const { code } = useParams<{ code?: string }>();

  const [socket, setSocket] = useState<SocketIOClient.Socket>();
  const [lobbyState, setLobbyState] = useState<string>();

  useEffect(() => {
    const newSocket = SocketIOClient('http://localhost:9000', {
      path: '/lobbies/socket',
      query: {
        lobby: code,
      }
    });

    newSocket.on(LobbyUpdate, (data: string) => {
      const state = JSON.parse(data) as LobbyState;
      setLobbyState(JSON.stringify(state, undefined, 2));
    });

    newSocket.on('disconnect', () => {
      setSocket(undefined);
    });

    newSocket.on('connect_error', () => {
      setSocket(undefined);
    })
  }, [code]);

  return <>
    <pre>
      {lobbyState}
    </pre>
  </>
}
