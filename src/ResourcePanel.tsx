import React from 'react';
import styled from 'styled-components';
import { PlainSpaceship } from "./store/types";

const GEMINI1_LEFT_OFFSET = 38;
const GEMINI2_LEFT_OFFSET = 175;
const ENERGY_OFFSET = 170;
const LIFE_SUPPORT_OFFSET = 300;
const RESOURCE_OFFSET = 400;

const Number = styled.div`
  display: inline-block;
  position: absolute;
  color: white;
  font-size: 40px;
  font-weight: bold;
  text-align: center;
  width: 130px;
`;
const Gemini1Energy = styled(Number)`
  top: ${ENERGY_OFFSET}px;
  left: ${GEMINI1_LEFT_OFFSET}px;
`;
const Gemini2Energy = styled(Number)`
  top: ${ENERGY_OFFSET}px;
  left: ${GEMINI2_LEFT_OFFSET}px;
`;
const Gemini1LifeSupport = styled(Number)`
  top: ${LIFE_SUPPORT_OFFSET}px;
  left: ${GEMINI1_LEFT_OFFSET}px;
`;
const Gemini2LifeSupport = styled(Number)`
  top: ${LIFE_SUPPORT_OFFSET}px;
  left: ${GEMINI2_LEFT_OFFSET}px;
`;
const Time = styled(Number)`
  top: 550px;
  left: 100px;
`

const Resource = styled.div`
  position: absolute;
  width: 130px;
  height: 90px;
  text-align: center;
  color: white;
  font-weight: bold;
  overflow-wrap: normal;
  word-wrap: break-word;
  font-size: 10px;
  margin: 0px;
  > p {
    margin: 2px;
  }
`;
const Gemini1Resource = styled(Resource)`
  top: ${RESOURCE_OFFSET}px;
  left: ${GEMINI1_LEFT_OFFSET}px;
`;
const Gemini2Resource = styled(Resource)`
  top: ${RESOURCE_OFFSET}px;
  left: ${GEMINI2_LEFT_OFFSET}px;
`;

interface Props {
  gemini1: PlainSpaceship,
  gemini2: PlainSpaceship,
  time: number,
}

export default function(props: Props) {
  return (
    <>
      <Gemini1Energy>{props.gemini1.energyCells}</Gemini1Energy>
      <Gemini2Energy>{props.gemini2.energyCells}</Gemini2Energy>
      <Gemini1LifeSupport>{props.gemini1.lifeSupportPacks}</Gemini1LifeSupport>
      <Gemini2LifeSupport>{props.gemini2.lifeSupportPacks}</Gemini2LifeSupport>
      <Gemini1Resource>
        {
          props.gemini1.rescueResources.map((resource, i) => {
          return <p key={i}>{resource}</p>
          })
        }
      </Gemini1Resource>
      <Gemini2Resource>
        {
          props.gemini2.rescueResources.map((resource, i) => {
          return <p key={i}>{resource}</p>
          })
        }
      </Gemini2Resource>
      <Time>{props.time}</Time>
    </>
  );
}
