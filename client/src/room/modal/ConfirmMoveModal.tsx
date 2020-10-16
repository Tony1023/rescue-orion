import React from 'react';
import { useSelector } from '../redux-hook-adapters';
import styled from 'styled-components';
import { GameState } from '../../metadata/types';
import * as IDs from '../../metadata/agent-ids';
import { locationData } from '../../metadata';

import {
  BaseModalTextBackground,
  Modal,
  ModalBackground,
} from './modal';
import {
  Header,
  StyledDismissButton
} from './MessageModal';

const StyledModal = styled(Modal)`
  padding: 30px;
  font-family: 'roboto';
`;

const Title = styled.h1`
  font-family: 'Grandstander', cursive;
  text-align: center;
`;

export default (props: {
  onClose?: () => void,
}) => {

  const state = useSelector((state: GameState) => state);
  const stats = state.gameStats;
  const gemini_1 = state.spaceships[IDs.GEMINI_1];
  const gemini_2 = state.spaceships[IDs.GEMINI_2];

  return <ModalBackground>
    <BaseModalTextBackground>
      <StyledModal>
        <StyledDismissButton onClose={props.onClose} />
        <Header>
          Do you wish to confirm your move?
        </Header>
      </StyledModal>
    </BaseModalTextBackground>
  </ModalBackground>
}