import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Location from './classes/Location';
import { PixelPosition } from './classes/Location';
import * as IDs from './metadata/agent-ids';

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
  location: Location,
  position: PixelPosition,
  shipReachability: { [id: string]: boolean },
}

export default function(props: Props) {

  const dispatch = useDispatch();

  return (
    <ButtonGroupBackground position={props.position}>
      {
        props.shipReachability[IDs.GEMINI_1] ? 
        <Gemini1Button /> : <></>
      }
      {
        props.shipReachability[IDs.GEMINI_2] ? 
        <Gemini2Button /> : <></>
      }
      {
        props.shipReachability[IDs.GEMINI_1] && props.shipReachability[IDs.GEMINI_2] ? 
        <Gemini12Button /> : <></>
      }
    </ButtonGroupBackground>
  );
}
