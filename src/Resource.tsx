import React from 'react';
import styled from 'styled-components';
import { PlainSpaceship } from "./store/types";

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
  top: 170px;
  left: 38px;
`;
const Gemini2Energy = styled(Number)`
  top: 170px;
  left: 175px;
`;
const Gemini1LifeSupport = styled(Number)`
  top: 300px;
  left: 38px;
`;
const Gemini2LifeSupport = styled(Number)`
  top: 300px;
  left: 175px;
`;

interface Props {
  gemini1: PlainSpaceship,
  gemini2: PlainSpaceship,
}

export default function(props: Props) {
  console.log(props.gemini1);
  console.log(props.gemini2);
  return (
    <>
      <Gemini1Energy>{props.gemini1.energyCells}</Gemini1Energy>
      <Gemini2Energy>{props.gemini2.energyCells}</Gemini2Energy>
      <Gemini1LifeSupport>{props.gemini1.lifeSupportPacks}</Gemini1LifeSupport>
      <Gemini2LifeSupport>{props.gemini2.lifeSupportPacks}</Gemini2LifeSupport>
    </>
  );
}
