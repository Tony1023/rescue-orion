import React from 'react';
import styled from 'styled-components';

import {
  BaseModalTextBackground,
  BaseModalImageBackground,
  ExtraModal,
  Modal,
  ModalBackground,
  DismissButton,
} from './modal';
import { Message } from '../../metadata/types';

const Header = styled.div`
  height: 40px;
  line-height: 40px;
  font-weight: bold;
  font-size: 28px;
  text-align: center;
  color: #b62021;
  font-family: 'Grandstander', cursive;
  text-transform: uppercase;
`;

const Body = styled.div`
  font-family: 'Roboto' sans-serif;
  font-size: 20px;
  font-weight: bold;
`;

const Note = styled.div`
  font-family: 'Grandstander', cursive;
  font-size: 20px;
  text-align: center;
  color: #b62021;
`;

const StyledModal = styled(Modal)`
  padding: 30px;
`;

const StyledExtraModal = styled(ExtraModal)`
  padding: 30px;
`;

const StyledDismissButton = styled(DismissButton)`
  display: flex;
  margin-left: auto;
`;

export default (props: {
  message?: Message,
  onClose?: () => void,
}) => {

  return <ModalBackground> 
    {
      !props.message?.asset ?
      <BaseModalTextBackground>
        <StyledModal>
          <StyledDismissButton onClose={props.onClose} />
          <Header>
            {props.message?.title}
          </Header>
          <Body>
            {
              props.message?.paragraphs.map((paragraph, i) => {
                return <p key={i}>
                  {paragraph.text}
                </p>;
              })
            }
          </Body>
        </StyledModal>
        {props.message?.technology?
          <StyledExtraModal>
            <Body>{props.message?.note}</Body>
            <Header>{props.message?.technology}</Header>
            {
              props.message?.sideNote? <Note>{props.message?.sideNote}</Note> : <></>
            }
          </StyledExtraModal> : <></>
        }
      </BaseModalTextBackground> :
      <BaseModalImageBackground backgroundImage={props.message?.asset}>
        <StyledDismissButton onClose={props.onClose} />
      </BaseModalImageBackground>
    }
  </ModalBackground>;
}