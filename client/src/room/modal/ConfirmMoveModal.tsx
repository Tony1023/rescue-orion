import React from 'react';
import { useSelector } from '../redux-hook-adapters';
import styled from 'styled-components';
import { GameState, PlainSpaceship } from '../../metadata/types';
import * as IDs from '../../metadata/agent-ids';

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

const Column = styled.div`
  width: 50%;
  display: inline-block;
  text-align: center;
`;

const GeminiImage = styled.div`
  background-image: ${(props: {backgroundImage: string}) => `url(${`${process.env.PUBLIC_URL}/${props.backgroundImage}`})`};
  background-size: cover;
  width: 120px;
  height: 120px;
  margin: auto;
`;

const Title = styled.div`
  width: 80px;
  margin: auto;
  font-size: 20px;
  font-weight: bold;
`;

export default (props: {
  gemini1: PlainSpaceship,
  gemini2: PlainSpaceship,
  onClose?: () => void,
}) => {

  const state = useSelector((state: GameState) => state);

  return <ModalBackground>
    <BaseModalTextBackground>
      <StyledModal>
        <StyledDismissButton onClose={props.onClose} />
        <Header>
          Do you wish to confirm your move?
        </Header>
        <Column>
          <GeminiImage backgroundImage='Gemini1.png' />
          <Title>Gemini 1</Title>
          <Column>
            <h4>Energy Cells</h4>
            {props.gemini1.energyCells}
          </Column>
          <Column>
            <h4>Life Support Packs</h4>
            {props.gemini1.lifeSupportPacks}
          </Column>
        </Column>
        <Column>
          <GeminiImage backgroundImage='Gemini2.png'/>
          <Title>Gemini 2</Title>
          <Column>
            <h4>Energy Cells</h4>
            {props.gemini2.energyCells}
          </Column>
          <Column>
            <h4>Life Support Packs</h4>
            {props.gemini2.lifeSupportPacks}
          </Column>
        </Column>
      </StyledModal>
    </BaseModalTextBackground>
  </ModalBackground>
}