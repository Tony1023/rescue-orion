import React, { useState, useEffect, createContext } from 'react';
import GameBoard from './GameBoard';
import store from './store';
import SocketContext from './GameContext';
import { GameState } from './store/types';

export default () => {

  const [socket, setSocket] = useState<WebSocket>();
  const [gameState, setGameState] = useState<GameState>();

  useEffect(() => {
    let newSocket = new WebSocket('ws://localhost:9000/rooms');
    newSocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      switch (message.type) {
        case '@GameUpdate':
          const newState = message.payload as GameState;
          setGameState(newState);
      }
    }
    newSocket.onopen = () => {
      newSocket.send(JSON.stringify({
        type: '@Auth',
        payload: {
          room: 'JFF123',
          password: 'asdf',
        },
      }));
    }
    
    setSocket(newSocket);
  }, []);

  return gameState ?
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
  );
  
  

}