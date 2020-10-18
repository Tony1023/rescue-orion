import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SocketIOClient from 'socket.io-client';
import { LobbyUpdate } from '../metadata/types';

export default () => {
  const { code } = useParams<{ code?: string }>();

  const [socket, setSocket] = useState<SocketIOClient.Socket>();

  useEffect(() => {
    const newSocket = SocketIOClient('http://localhost:9000', {
      path: '/lobbies/socket',
      query: {
        lobby: code,
      }
    });

    newSocket.on(LobbyUpdate, (data: string) => {
      console.log(JSON.parse(data));
    });

    newSocket.on('disconnect', () => {
      setSocket(undefined);
    });

    newSocket.on('connect_error', () => {
      setSocket(undefined);
    })
  }, [code]);

  return <>

  </>
}
