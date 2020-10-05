import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { GameState } from '../store/types';
import * as IDs from '../metadata/agent-ids';
import { locationData } from '../metadata';

import {
  BaseModalTextBackground,
  Modal,
  ModalBackground,
} from './modal';

const StyledModal = styled(Modal)`
  padding: 30px;
  font-family: 'roboto';
`;

const Title = styled.h1`
  font-family: 'Grandstander', cursive;
  text-align: center;
`;

export default () => {

  const state = useSelector((state: GameState) => state);
  const stats = state.gameStats;
  const gemini_1 = state.spaceships[IDs.GEMINI_1];
  const gemini_2 = state.spaceships[IDs.GEMINI_2];

  return <ModalBackground>
    <BaseModalTextBackground>
      <StyledModal>
        <Title>End Game Stats</Title>
        <p>You saved {stats.scientistsRemaining} scientists at Orion.</p>
        {
          Object.keys(stats.dropOffTimes).map((item, index) => stats.dropOffTimes[item] === -1 ?
            <p key={index}>You did not drop off {item} at Orion</p>
            :
            <p key={index}>You dropped off {item} on day {stats.dropOffTimes[item]}</p>
          )
        }
        {
          gemini_1.location === locationData[IDs.SAGITTARIUS].location.id &&
          gemini_2.location === locationData[IDs.SAGITTARIUS].location.id ?
          <p>You successfully returned to SAGITTARIUS on day {state.time}.</p> :
          <p>You did not return to SAGITTARIUS.</p>
        }
      </StyledModal>
    </BaseModalTextBackground>
  </ModalBackground>
}