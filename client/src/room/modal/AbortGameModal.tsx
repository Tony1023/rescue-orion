import React from 'react';
import styled from 'styled-components';
import EndGameStatsModal from './EndGameStatsModal';

import {
  BaseModalEndBackground,
  ModalBackground,
  Header,
  Body,
  StyledModal
} from './modal';
import { StyledExtraModal } from './MessageModal';

export default () => {
  return <ModalBackground zIndex={1}>
    <BaseModalEndBackground>
      <StyledModal>
        <Header>
          Mission Aborted!
        </Header>
        <Body>
          <p>You have aborted your mission and without your assistance, </p>
          <p>we fear the worst has happened at Space Station Orion. </p>
          <p>Please alert the Space Commander to come and instruct you what to do next. </p>
          <p>-Ground Control </p>
        </Body>
      </StyledModal>
      <StyledExtraModal>
        <EndGameStatsModal />
      </StyledExtraModal>    
    </BaseModalEndBackground>
  </ModalBackground>
}