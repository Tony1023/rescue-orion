import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { PixelPosition } from './classes/Location';
import * as IDs from './metadata/agent-ids';
import locationData from './metadata/location-data';

const ButtonGroupBackground = styled.div`
  position: absolute;
  background-color: rgba(18, 92, 112, 0.8);
  width: 60px;
  height: 20px;
  line-height: 20px;
  border-radius: 25%;
  top: ${(props: { position: PixelPosition }) => `${props.position.top + 25}px`};
  left: ${(props: { position: PixelPosition }) => `${props.position.left - 28}px`};
  text-align: center;
`;

const NextMoveButton = styled.div`
  width: 12px;
  height: 12px;
  display: inline-block;
  margin: 0 3px;
`;

const Gemini1Button = styled(NextMoveButton)`
  background-color: #fcc409;
  border-radius: 50%;
  &:hover {
    cursor: pointer;
  }
`;
const Gemini2Button = styled(NextMoveButton)`
  background-color: #46b3e8;
  border-radius: 50%;
  &:hover {
    cursor: pointer;
  }
`;
const Gemini12Button = styled(NextMoveButton)`
  background-image: linear-gradient(135deg, #fcc409 50%, #46b3e8 50%);
  border-radius: 50%;
  &:hover {
    cursor: pointer;
  }
`;

interface Props {
  id: string,
  shipReachability: { [id: string]: boolean },
  setGemini1NextMove: (Gemini1NextMove: string) => void,
  setGemini2NextMove: (Gemini2NextMove: string) => void,
}

export default function(props: Props) {

  const position = locationData[props.id].pixelPosition;

  return (
    <ButtonGroupBackground position={position}>
      {
        props.shipReachability[IDs.GEMINI_1] ? 
        <Gemini1Button onClick={()=>{
          props.setGemini1NextMove(props.id)
        }}/> : <></>
      }
      {
        props.shipReachability[IDs.GEMINI_2] ? 
        <Gemini2Button onClick={() => {
          props.setGemini2NextMove(props.id)
        }}/> : <></>
      }
      {
        props.shipReachability[IDs.GEMINI_1] && props.shipReachability[IDs.GEMINI_2] ? 
        <Gemini12Button onClick={() => {
          props.setGemini1NextMove(props.id)
          props.setGemini2NextMove(props.id)
        }}/> : <></>
      }
    </ButtonGroupBackground>
  );
}
