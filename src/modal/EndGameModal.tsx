import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { GameState } from '../store/types';

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

  const stats = useSelector((state: GameState) => state.gameStats);

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
      </StyledModal>
    </BaseModalTextBackground>
  </ModalBackground>
}