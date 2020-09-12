import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ButtonGroup from './ButtonGroup';
import { GameState } from './store/types';
import styled from 'styled-components';
import metadata from './metadata/data';
import * as Actions from './store/actions';
import HintModal from './modal/HintModal';
import Timer from './Timer';

const GameBoard = styled.div`
  background-image: url(${`${process.env.PUBLIC_URL}/game_map.jpg`});
  height: 810px;
  width: 1440px;
  background-size: contain;
  position: relative;
  margin: 0 auto;
`;

export default () => {

  const gameState = useSelector((state: GameState) => state);
  const dispatch = useDispatch();

  
  const [gemini1NextMove, setGemini1NextMove] = useState(null);
  const [gemini2NextMove, setGemini2NextMove] = useState(null);
  const [showHintModal, setShowHintModal] = useState(false);

  useEffect(() => {
    setShowHintModal(gameState.messages.length > 0);
  }, [gameState.messages]);

  return <>
    <GameBoard>
      {
        Object.entries(gameState.nextMoves).map((location, index) => {
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

      {
        showHintModal ?
        <HintModal
          message={gameState.messages[0]}
          onClose={() => setShowHintModal(false)}
        /> : <></>
      }
    </GameBoard>
    <Timer />
  </>;
}
