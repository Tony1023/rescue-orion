import React, { useState, useLayoutEffect, useEffect } from 'react';
import ButtonGroup from './ButtonGroup';
import SpaceStation from './SpaceStation'
import { GameState, GameStatus, Message } from '../metadata/types';
import styled from 'styled-components';
import { locationData, spaceStationData } from '../metadata';
import * as IDs from '../metadata/agent-ids';
import MessageModal from './modal/MessageModal';
import { PixelPosition } from '../metadata/types';
import ResourcePanel from './ResourcePanel';
import RebalanceResourceModal from './modal/RebalanceResourceModal';
import EndGameModal from './modal/EndGameModal';
import ConfirmMoveModal from './modal/ConfirmMoveModal';
import { useSelector } from './redux-hook-adapters';
import Clock from './Clock';
import AbortMissionModal from './modal/AbortMissionModal';

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

const ActionButton = styled.div`
  width: 120px;
  height: 40px;
  position: absolute;
  background-size: cover;
  cursor: pointer;
`;

const ConfirmMoveButton = styled(ActionButton)`
  background-image: url(${`${process.env.PUBLIC_URL}/confirm_move.png`});
  top: 10px;
  left: 30px;
  cursor: ${(props: { noMove: Boolean }) => !props.noMove ? 'cursor': `not-allowed`};
  :hover {
    background-image: ${(props: { noMove: Boolean }) => props.noMove ? `url(${process.env.PUBLIC_URL}/confirm_move.png)`: `url(${process.env.PUBLIC_URL}/confirm_move_hover.png)`};
  }
`;

const MoveResourceButton = styled(ActionButton)`
  background-image: url(${`${process.env.PUBLIC_URL}/move_resources.png`});
  top: 580px;
  left: 100px;
  cursor: ${(props: { disabled: Boolean }) => !props.disabled ? 'cursor': `not-allowed`};
  :hover {
    background-image: ${(props: { disabled: Boolean }) => !props.disabled ? `url(${process.env.PUBLIC_URL}/move_resources_hover.png)`: `url(${process.env.PUBLIC_URL}/move_resources.png)`};
  }
`;

const TerminateGameButton = styled(ActionButton)`
  background-image: url(${`${process.env.PUBLIC_URL}/abort_mission.png`});
  top: 55px;
  left: 30px;
  :hover {
    background-image: url(${`${process.env.PUBLIC_URL}/abort_mission_hover.png`});
  }
`;

export default function() {
  const gameState = useSelector((state: GameState) => state);

  const [gemini1NextMove, setGemini1NextMove] = useState<string | undefined>();
  const [gemini2NextMove, setGemini2NextMove] = useState<string | undefined>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [showRebalanceModal, setShowRebalanceModal] = useState(false);
  const [showConfirmMoveModal, setShowConfirmMoveModal] = useState(false);
  const [showAbortMissionModal, setShowAbortMissionModal] = useState(false);

  useLayoutEffect(() => {
    setGemini1NextMove(undefined);
    setGemini2NextMove(undefined);
    if (gameState.time > 30) {
      // setGameOver(true);
    }
  }, [gameState.time]);
  
  useEffect(() => {
    setMessages(messages.concat(gameState.messages));
  }, [gameState.messages]);

  const selectedMove = gemini1NextMove && gemini2NextMove;

  const gemini_1 = gameState.spaceships[IDs.GEMINI_1];
  const gemini_2 = gameState.spaceships[IDs.GEMINI_2];
  const gemini1CurrentLocation = gemini_1.location;
  const gemini2CurrentLocation = gemini_2.location
  const gemini1Location = gemini1NextMove ?? gemini1CurrentLocation;
  const gemini2Location = gemini2NextMove ?? gemini2CurrentLocation;
  const position1 = locationData[gemini1Location].pixelPosition;
  const position2 = locationData[gemini2Location].pixelPosition;

  const canRebalanceResource = gemini1CurrentLocation === gemini2CurrentLocation &&
    gemini_1.isInTimePortal === gemini_2.isInTimePortal;

  function popMessageModal() {
    const remainingMessages = messages.slice(0);
    remainingMessages.pop();
    setMessages(remainingMessages);
  }

  return <>
    <GameBoard>
      <ConfirmMoveButton  
        noMove={!selectedMove}
        onClick={() => {
          if(selectedMove) {
            setShowConfirmMoveModal(true);
          }
        }}
        ></ConfirmMoveButton>
      <MoveResourceButton
        disabled={!canRebalanceResource}
        onClick={() => {
          if (canRebalanceResource) {
            setShowRebalanceModal(true)
          }
        }}
      ></MoveResourceButton>
      <TerminateGameButton 
        onClick={() => {
          setShowAbortMissionModal(true);
        }}
      ></TerminateGameButton>
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
        gameState.status === GameStatus.MissionFailed ?
        <EndGameModal/> : <></>
      }
      {
        showConfirmMoveModal ?
        <ConfirmMoveModal
          gemini1NextMove={gemini1Location}
          gemini2NextMove={gemini2Location}
          onClose={() => {
            setShowConfirmMoveModal(false)
          }}
        /> : <></>
      }
      {
        showAbortMissionModal ?
        <AbortMissionModal
          onClose={() => {
            setShowAbortMissionModal(false);
          }}
        /> : <></>
      }

      <ResourcePanel
        gemini1={gameState.spaceships[IDs.GEMINI_1]}
        gemini2={gameState.spaceships[IDs.GEMINI_2]}
        time={gameState.time}
      ></ResourcePanel>

      <Clock />

    </GameBoard>
  </>;
}
