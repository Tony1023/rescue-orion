import React from 'react';
import styled from 'styled-components';
import { useSelector } from './redux-hook-adapters';

const Clock = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
  color: white;
  font-weight: bold;
  font-size: 36px;
  font-family: monospace;
`;

function pad(n: number): string {
  let digits = 0;
  let copy = n;
  while (copy > 0) {
    copy = Math.floor(copy / 10);
    ++digits;
  }
  if (digits < 2) {
    return `0${n}`;
  } else {
    return `${n}`;
  }
}

export default () => {
  const durationInSeconds = useSelector((state) => state.countDown);
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = durationInSeconds % 60;
  
  return <Clock>
    {pad(minutes)}:{pad(seconds)}
  </Clock>;
}