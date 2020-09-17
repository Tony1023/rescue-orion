import React from 'react';
import styled from 'styled-components';

import {
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
`;

const Body = styled.div`
  font-family: 'Roboto' sans-serif;
  font-size: 20px;
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
  </ModalBackground>;
}