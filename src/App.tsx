import React, { useState, useLayoutEffect, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ButtonGroup from './ButtonGroup';
import SpaceStation from './SpaceStation'
import { GameState, Message } from './store/types';
import styled from 'styled-components';
import { locationData, spaceStationData } from './metadata';
import * as IDs from './metadata/agent-ids';
import * as Actions from './store/actions';
import MessageModal from './modal/MessageModal';
import { PixelPosition } from './classes/Location';
import Timer from './Timer';
import OrionMessageEmitter from './OrionMessageEmitter';
import ResourcePanel from './ResourcePanel';
import RebalanceResourceModal from './modal/RebalanceResourceModal';
import EndGameModal from './modal/EndGameModal';

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

  const [gemini1NextMove, setGemini1NextMove] = useState<string | undefined>();
  const [gemini2NextMove, setGemini2NextMove] = useState<string | undefined>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [showRebalanceModal, setShowRebalanceModal] = useState(false);

  useLayoutEffect(() => {
    setGemini1NextMove(undefined);
    setGemini2NextMove(undefined);
  }, [gameState.time]);
  
  useEffect(() => {
    setMessages(messages.concat(gameState.messages));
  }, [gameState.messages]);

  const selectedMove = gemini1NextMove && gemini2NextMove;

  const gemini1CurrentLocation = gameState.spaceships[IDs.GEMINI_1].location;
  const gemini2CurrentLocation = gameState.spaceships[IDs.GEMINI_2].location
  const gemini1Location = gemini1NextMove ?? gemini1CurrentLocation;
  const gemini2Location = gemini2NextMove ?? gemini2CurrentLocation;
  const position1 = locationData[gemini1Location].pixelPosition;
  const position2 = locationData[gemini2Location].pixelPosition;

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
        }}
        disabled={!selectedMove}
      >
        Confirm Move
      </button>
      <button
        onClick={() => setShowRebalanceModal(true)}
        disabled={gemini1CurrentLocation !== gemini2CurrentLocation}
      >Rebalance Resources
      </button>
      {
        gemini1Location === gemini2Location ? 
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
              gemini1NextMove={gemini1NextMove === location[0]}
              gemini2NextMove={gemini2NextMove === location[0]}
              setGemini1NextMove={setGemini1NextMove}
              setGemini2NextMove={setGemini2NextMove}
              shipReachability={location[1]}
            />
          );
        })
      }
      {
        Object.entries(spaceStationData).map((spaceStation, index) => {
          return <SpaceStation
            key={index}
            id={spaceStation[0]}
          />;
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
      {
        showRebalanceModal ?
        <RebalanceResourceModal
          onClose={() => setShowRebalanceModal(false)}
        /> : <></>
      }
      {
        gameState.time === 31 ?
        <EndGameModal/> : <></>
      }

      <ResourcePanel
        gemini1={gameState.spaceships[IDs.GEMINI_1]}
        gemini2={gameState.spaceships[IDs.GEMINI_2]}
        time={gameState.time}
      ></ResourcePanel>

    </GameBoard>
    {
      gameState.time < 31 ?
      <Timer /> : <></>
    }
    <OrionMessageEmitter />
  </>;
}
