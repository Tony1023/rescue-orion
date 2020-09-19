import React from 'react';
import styled from 'styled-components';

import {
  ExtraModal,
  Modal,
  ModalBackground,
  DismissButton,
} from './modal';
import { Message } from '../store/types';

const Header = styled.div`
  font-family: 'Alegreya Sans SC', sans-serif;
  height: 40px;
  line-height: 40px;
  font-weight: bold;
  font-size: 28px;
  text-align: center;
  color: #b62021;
  font-family: 'Permanent Marker', cursive;
`;

const Body = styled.div`
  font-family: 'Roboto' sans-serif;
  font-size: 20px;
  font-weight: bold;
`;

const Note = styled.div`
  font-family: 'Permanent Marker', cursive;
  font-size: 20px;
  text-align: center;
  color: #b62021;
`;

export default (props: {
  message?: Message,
  onClose?: () => void,
}) => {
  return <ModalBackground>
    <Modal>
      <DismissButton onClose={props.onClose} />
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
    </Modal>
    {
      props.message?.technology?
      <ExtraModal>
        <Body>{props.message?.note}</Body>
        <Header>{props.message?.technology}</Header>
        {
          props.message?.sideNote? <Note>{props.message?.sideNote}</Note> : <></>
        }
      </ExtraModal> : <></>
    }
  </ModalBackground>;
}