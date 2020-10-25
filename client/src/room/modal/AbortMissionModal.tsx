import React from 'react';
import {
  BaseModalTextBackground,
  Modal,
  ModalBackground,
  StyledButton,
  Header,
} from './modal';
import { useDispatch } from '../redux-hook-adapters';
import { abortMission } from '../actions';
import styled from 'styled-components';

const AbortButton = styled(StyledButton)`
  background-color: red;
  color: white;
  position: absolute;
  top: 20px;
  left: 100px;
`;

const CancelButton = styled(StyledButton)`
  position: absolute;
  right: 100px;
  top: 20px;
`;

export default (props: {
  onClose: () => void,
}) => {

  const dispatch = useDispatch();

  return <ModalBackground>
    <BaseModalTextBackground>
      <Modal>
        <Header>
          Are you sure to abort mission?
        </Header>
        <div style={{
          position: 'relative',
          height: '80px',
        }}>
          <AbortButton
            onClick={() => {
              dispatch(abortMission());
              props.onClose();
            }}
            >YES</AbortButton>
          <CancelButton
            onClick={props.onClose}
          >NO</CancelButton>
        </div>
      </Modal>
    </BaseModalTextBackground>
  </ModalBackground>;
}