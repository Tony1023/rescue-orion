import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ButtonGroup from './ButtonGroup';
import GameState from './store/GameState';
import styled from 'styled-components';
import metadata from './metadata/data';
import { computeNextMoves } from './utils';

const GameBoard = styled.div`
  background-image: url(${`${process.env.PUBLIC_URL}/game_map.jpg`});
  height: 810px;
  width: 1440px;
  background-size: contain;
  position: relative;
  margin: 0 auto;
`;



export default function() {

  const [gemini1NextMove, setGemini1NextMove] = useState(null);
  const [gemini2NextMove, setGemini2NextMove] = useState(null);
  
  const gameState = useSelector((state: GameState) => state, () => false)
  const dispatch = useDispatch();
  
  const nextMoves = computeNextMoves({
    gemini1: ['sagittarius', 'b3', 'b2'],
    gemini2: ['sagittarius', 'b3', 'h1'] 
  });
  return (
    <GameBoard>
      {
        Object.entries(nextMoves).map((location, index) => {
          const locationId = location[0];
          const locationData = metadata[locationId];
          return (
            <ButtonGroup 
              key={index}
              id={locationId}
              location={locationData.location}
              position={locationData.pixelPosition}
              shipReachability={location[1]}
            />
          );
        })
      }
    </GameBoard>
  );
}
