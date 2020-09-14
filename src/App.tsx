import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ButtonGroup from './ButtonGroup';
import { GameState } from './store/types';
import styled from 'styled-components';
import { locationData } from './metadata';
import * as IDs from './metadata/agent-ids';
import * as Actions from './store/actions';
import MessageModal from './modal/MessageModal';
import { PixelPosition } from './classes/Location';
import Timer from './Timer';

const GameBoard = styled.div`
  background-image: url(${`${process.env.PUBLIC_URL}/game_map.jpg`});
  height: 810px;
  width: 1440px;
  background-size: contain;
  position: relative;
  margin: 0 auto;
`;

const GeminiShip = styled.div`
  width: 80px;
  height: 80px;
  display: block;
  position: absolute;
  background-size: contain;
`;
const Gemini1 = styled(GeminiShip)`
  background-image: url(${`${process.env.PUBLIC_URL}/Gemini1.png`});
`;
const Gemini2 = styled(GeminiShip)`
  background-image: url(${`${process.env.PUBLIC_URL}/Gemini2.png`});
`;
const Gemini12 = styled(GeminiShip)`
  background-image: url(${`${process.env.PUBLIC_URL}/Gemini12.png`});
  left: 450px;
   top: 550px;
`;

export default function() {

  const gameState = useSelector((state: GameState) => state);
  const dispatch = useDispatch();

  console.log(gameState);

  const [gemini1NextMove, setGemini1NextMove] = useState(IDs.SAGITTARIUS);
  const [gemini2NextMove, setGemini2NextMove] = useState(IDs.SAGITTARIUS);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    setMessages(messages.concat(gameState.messages));
  }, [gameState.messages]);

  useEffect(() => {
    const position1 = locationData[gemini1NextMove].pixelPosition;
    const position2 = locationData[gemini2NextMove].pixelPosition;
    if(position1 === position2) {
      const item = document.getElementById('Gemini12');
      if(item !== null) {
        item.style.left = `${position1.left-40}px`;
        item.style.top = `${position1.top-50}px`;
      }
    }
    else {
      const item1 = document.getElementById('Gemini1');
      const item2 = document.getElementById('Gemini2');
      if(item1 !== null && item2 !== null) {
        item1.style.left = `${position1.left-40}px`;
        item1.style.top = `${position1.top-50}px`;
        item2.style.left = `${position2.left-40}px`;
        item2.style.top = `${position2.top-50}px`;
      }
    }
  }, [gemini1NextMove, gemini2NextMove])

  function popMessageModal() {
    const remainingMessages = messages.slice(0);
    remainingMessages.pop();
    setMessages(remainingMessages);
  }

  return <>
    <GameBoard>
      <button 
        onClick={() => {
          dispatch(Actions.moveSpaceship({
            gemini_1: `${gemini1NextMove}`,
            gemini_2: `${gemini2NextMove}`
          }))
        }}>
        Confirm Move
      </button>
      {
        gemini1NextMove === gemini2NextMove ? 
        <Gemini12 id="Gemini12"/> :
        <>
          <Gemini1 id="Gemini1"/>
          <Gemini2 id="Gemini2"/>
        </>
      }
      {
        Object.entries(gameState.nextMoves).map((location, index) => {
          return (
            <ButtonGroup 
              key={index}
              id={location[0]}
              setGemini1NextMove={setGemini1NextMove}
              setGemini2NextMove={setGemini2NextMove}
              shipReachability={location[1]}
            />
          );
        })
      }

      {
        messages.map((message: string, index: number) => {
          return <MessageModal
            key={index}
            message={message}
            onClose={popMessageModal}
          />;
        })
      }
    </GameBoard>
    <Timer />
  </>;
}
