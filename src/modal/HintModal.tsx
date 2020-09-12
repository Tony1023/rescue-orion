import React from 'react';
import styled from 'styled-components';

import {
  Modal,
  ModalBackground,
  DismissButton,
} from './modal';


const Header = styled.div`
  height: 40px;
  line-height: 40px;
`;

const Body = styled.div`

`;

export default (props: {
  message?: string,
  onClose?: () => void,
}) => {
  return <ModalBackground>
    <Modal>
      <Header>
        <DismissButton onClose={props.onClose} />
      </Header>
      <Body>
        {props.message}
      </Body>
    </Modal>
  </ModalBackground>;
}