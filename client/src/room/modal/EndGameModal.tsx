import React from 'react';
import styled from 'styled-components';
import EndGameStatsModal from './EndGameStatsModal';

import {
  BaseModalTextBackground,
  Modal,
  ModalBackground,
} from './modal';

const StyledModal = styled(Modal)`
  padding: 30px;
  font-family: 'roboto';
`;

export default () => {
  return <ModalBackground zIndex={1}>
    <BaseModalTextBackground>
      <StyledModal>
        <EndGameStatsModal />
      </StyledModal>
    </BaseModalTextBackground>
  </ModalBackground>
}