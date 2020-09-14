import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ButtonGroup from './ButtonGroup';
import { GameState } from './store/types';
import styled from 'styled-components';
import { locationData } from './metadata';
import * as IDs from './metadata/agent-ids';
import * as Actions from './store/actions';
import MessageModal from './modal/MessageModal';
import Timer from './Timer';

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
  { gemini_1: 'h4', gemini_2: 'cassiopeia' },
  { gemini_1: 'h4', gemini_2: 'h2' },
  { gemini_1: 'h4', gemini_2: 'h4' },
  { gemini_1: 't2', gemini_2: 't2' },
  { gemini_1: 't1', gemini_2: 't1' },
  { gemini_1: 't1', gemini_2: 't1' },
]

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

  function popMessageModal() {
    const remainingMessages = messages.slice(0);
    remainingMessages.pop();
    setMessages(remainingMessages);
  }

  return <>
    <GameBoard>
      <button
        onClick={() => {
          if (nextMoves.length > 0) {
            dispatch(Actions.moveSpaceship(nextMoves[0]))
            nextMoves.splice(0, 1);
          }
        }}
      >Move!</button>
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
