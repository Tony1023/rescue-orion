import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SocketIOClient from 'socket.io-client';
import { GameState, LobbyState, LobbyUpdate } from '../metadata/types';
import room from '../room';

export default () => {
  const { code } = useParams<{ code?: string }>();

  const [socket, setSocket] = useState<SocketIOClient.Socket>();
  const [countDown, setCountDown] = useState<number>();
  const [rooms, setRooms] = useState<{
    [name: string]: GameState
  }>({});

  useEffect(() => {
    const newSocket = SocketIOClient('http://localhost:9000', {
      path: '/lobbies/socket',
      query: {
        lobby: code,
      }
    });

    newSocket.on(LobbyUpdate, (data: string) => {
      const state = JSON.parse(data) as LobbyState;
      console.log(state);
      setCountDown(state.countDown);
      if (Object.keys(state.updatedRooms).length > 0) {
        const newRooms = {...rooms};
        Object.keys(state.updatedRooms).forEach((name) => {
          newRooms[name] = state.updatedRooms[name];
        });
        setRooms(newRooms);
      }
    });

    newSocket.on('disconnect', () => {
      setSocket(undefined);
    });

    newSocket.on('connect_error', () => {
      setSocket(undefined);
    })
  }, [code]);

  return <>
    <div>
      {countDown}
    </div>
    <pre>
      {JSON.stringify(rooms, undefined, 2)}
    </pre>
  </>
}
