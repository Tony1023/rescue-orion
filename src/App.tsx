import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ButtonGroup from './ButtonGroup';
import { GameState, Message } from './store/types';
import { RescueResource } from './classes/RescueResource';
import styled from 'styled-components';
import { locationData } from './metadata';
import * as IDs from './metadata/agent-ids';
import * as Actions from './store/actions';
import MessageModal from './modal/MessageModal';
import { PixelPosition } from './classes/Location';
import Timer from './Timer';
import Resource from './Resource';

const GEMINI_LEFT_OFFSET = 45;
const GEMINI_TOP_OFFSET = 50;

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
  top: ${(props: { position: PixelPosition }) => `${props.position.top - GEMINI_TOP_OFFSET}px`};
  left: ${(props: { position: PixelPosition }) => `${props.position.left - GEMINI_LEFT_OFFSET}px`};
`;
const Gemini2 = styled(GeminiShip)`
  background-image: url(${`${process.env.PUBLIC_URL}/Gemini2.png`});
  top: ${(props: { position: PixelPosition }) => `${props.position.top - GEMINI_TOP_OFFSET}px`};
  left: ${(props: { position: PixelPosition }) => `${props.position.left - GEMINI_LEFT_OFFSET}px`};
`;
const Gemini12 = styled(GeminiShip)`
  background-image: url(${`${process.env.PUBLIC_URL}/Gemini12.png`});
  top: ${(props: { position: PixelPosition }) => `${props.position.top - GEMINI_TOP_OFFSET}px`};
  left: ${(props: { position: PixelPosition }) => `${props.position.left - GEMINI_LEFT_OFFSET}px`};
`;

export default function() {

  const gameState = useSelector((state: GameState) => state);
  const dispatch = useDispatch();

  console.log(gameState.spaceships);

  const [gemini1NextMove, setGemini1NextMove] = useState(IDs.SAGITTARIUS);
  const [gemini2NextMove, setGemini2NextMove] = useState(IDs.SAGITTARIUS);
  const [messages, setMessages] = useState<Message[]>([]);

  
  useEffect(() => {
    setMessages(messages.concat(gameState.messages));
  }, [gameState.messages]);

  const position1 = locationData[gemini1NextMove].pixelPosition;
  const position2 = locationData[gemini2NextMove].pixelPosition;

  function popMessageModal() {
    const remainingMessages = messages.slice(0);
    remainingMessages.pop();
    setMessages(remainingMessages);
  }

  return <>
    <GameBoard>
      <button onClick={() => {
        dispatch(Actions.moveSpaceship({
          gemini_1: `${gemini1NextMove}`,
          gemini_2: `${gemini2NextMove}`
        }))
      }}>
        Confirm Move
      </button>
      <button
        onClick={() => {
          dispatch(Actions.transferRescueResource({
            from: IDs.GEMINI_1,
            to: IDs.GEMINI_2,
            type: RescueResource.O2ReplacementCells,
          }));
        }}
      >Move Resource</button>
      {
        gemini1NextMove === gemini2NextMove ? 
        <Gemini12 position={position1} /> :
        <>
          <Gemini1 position={position1} />
          <Gemini2 position={position2} />
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
        messages.map((message: Message, index: number) => {
          return <MessageModal
            key={index}
            message={message}
            onClose={popMessageModal}
          />;
        })
      }

      <Resource
        gemini1={gameState.spaceships[IDs.GEMINI_1]}
        gemini2={gameState.spaceships[IDs.GEMINI_2]}
      ></Resource>
      
    </GameBoard>
    <Timer />
  </>;
}
