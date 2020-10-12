import React, { useState, useEffect } from 'react';
import GameBoard from './GameBoard';
import SocketContext from './game-context';
import { GameState, RoomSocketMessage } from '../metadata/types';
import styled from 'styled-components';
import SocketIOClient from 'socket.io-client';
import { Location } from 'history';
import queryString from 'query-string';

const SocketError = styled.div`
  background-color: rgb(240, 240, 240);
  font-size: 18px;
  display: inline-block;
  padding: 5px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 100;
`;

export default (props: {
  location: Location,
}) => {
  const { lobby, room } = queryString.parse(props.location.search);

  const [socket, setSocket] = useState<SocketIOClient.Socket>();
  const [gameState, setGameState] = useState<GameState>();

  useEffect(() => {
    if (!lobby || !room) {
      return;
    }

    let newSocket = SocketIOClient('http://localhost:9000', {
      path: '/rooms',
      query: {
        lobby: lobby,
        room: room,
      },
      reconnection: false,
    });
    setSocket(newSocket);

    newSocket.on(RoomSocketMessage.StateUpdate, (data: string) => {
      const message = JSON.parse(data);
      const newState = message as GameState;
      setGameState(newState);
    });

    newSocket.on('disconnect', () => {
      setSocket(undefined);
    });

    newSocket.on('connect_error', () => {
      setSocket(undefined);
    })
    
  }, [lobby, room]);

  return <>
    {
      socket ?
      <></>
      :
      <SocketError>
        Cannot connect to Rescue Orion server... Try refreshing the page or report to your commander!
      </SocketError>
    }  
    {
      gameState ?
      (
        <SocketContext.Provider value={{
          socket: socket,
          gameState: gameState,
        }}>
          <GameBoard />
        </SocketContext.Provider>
      )
      :
      (
        <div>Loading</div>
      )
    }
  </>
}