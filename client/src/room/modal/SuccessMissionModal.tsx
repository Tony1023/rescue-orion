import React from 'react';
import {
  BaseModalTextBackground,
  Modal,
  ModalBackground,
  Header,
} from './modal';
import { StyledExtraModal } from './MessageModal';
import { useDispatch } from '../redux-hook-adapters';
import EndGameModal from './EndGameModal';
import styled from 'styled-components';

const StyledModal = styled(Modal)`
  padding: 30px;
`;

const SuccessModalBackground = styled(ModalBackground)`
  background-image: url(${process.env.PUBLIC_URL}/game_success_map.png);
  background-size: contain;
`;

const Body = styled.div`
  font-family: 'Roboto' sans-serif;
  font-size: 20px;
  font-weight: bold;
`;

export default () => {
  const dispatch = useDispatch();

  return <SuccessModalBackground>
    <BaseModalTextBackground>
      <StyledModal>
        <Header>
          Welcome back to Sagittarius!
        </Header>
        <Body>
          <p>We are so excited to hear the tales of your successful mission! </p>
          <p>When you are ready, please call in the Space Commander to come and congratulate you personally! </p>
          <p>Thank you for all you did to Rescue Orion! </p>
          <p>-Ground Control </p>
        </Body>
      </StyledModal>
      <StyledExtraModal>
        <EndGameModal />
      </StyledExtraModal>      
    </BaseModalTextBackground>
  </SuccessModalBackground>;
}