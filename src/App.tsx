import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ButtonGroup from './ButtonGroup';
import { GameState } from './store/types';
import styled from 'styled-components';
import { locationData } from './metadata';
import * as Actions from './store/actions';

const GameBoard = styled.div`
  background-image: url(${`${process.env.PUBLIC_URL}/game_map.jpg`});
  height: 810px;
  width: 1440px;
  background-size: contain;
  position: relative;
  margin: 0 auto;
`;

let nextMoves = [
  { gemini_1: 'b3', gemini_2: 'b3' },
  { gemini_1: 'h1', gemini_2: 'b4' },
  { gemini_1: 'h4', gemini_2: 'b35' },
]

export default function() {

  const [gemini1NextMove, setGemini1NextMove] = useState(null);
  const [gemini2NextMove, setGemini2NextMove] = useState(null);
  
  const gameState = useSelector((state: GameState) => state);
  const dispatch = useDispatch();

  gameState.messages.forEach((message: string) => {
    console.log(message);
  });
  
  return (
    <GameBoard>
      <button
        onClick={() => {
          if (nextMoves.length > 0) {
            dispatch(Actions.moveSpaceship(nextMoves[0]))
            nextMoves.splice(0, 1);
          }
        }}
      >Move!</button>
      {
        Object.entries(gameState.nextMoves).map((location, index) => {
          const locationId = location[0];
          const locationPayload = locationData[locationId];
          return (
            <ButtonGroup 
              key={index}
              id={locationId}
              location={locationPayload.location}
              position={locationPayload.pixelPosition}
              shipReachability={location[1]}
            />
          );
        })
      }
    </GameBoard>
  );
}
