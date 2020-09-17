import React from 'react';
import styled from 'styled-components';

import {
  Modal,
  ModalBackground,
  DismissButton,
} from './modal';
import { Message } from '../store/types';


const Header = styled.div`
  font-family: aviano-future, sans-serif;
  height: 40px;
  line-height: 40px;
`;

const Body = styled.div`
  white-space: pre-wrap;
`;

export default (props: {
  message?: Message,
  onClose?: () => void,
}) => {
  return <ModalBackground>
    <Modal>
      <Header>
        <DismissButton onClose={props.onClose} />
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