import React from 'react';
import {
  BaseModalTextBackground,
  Modal,
  ModalBackground,
  Body,
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
  left: 150px;
`;

const CancelButton = styled(StyledButton)`
  position: absolute;
  right: 150px;
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
          About to abort mission
        </Header>
        <Body>
          <p>Are you sure you want to abandon your mission to Rescue Orion?</p>
          <p>Confirming this will end your mission and undo all progress made so far.</p>
        </Body>
        <div style={{
          position: 'relative',
          height: '80px',
        }}>
          <AbortButton
            data-testid="abort-mission-confirm"
            onClick={() => {
              dispatch(abortMission());
              props.onClose();
            }}
            >YES</AbortButton>
          <CancelButton
            data-testid="abort-mission-cancel"
            onClick={props.onClose}
          >NO</CancelButton>
        </div>
      </Modal>
    </BaseModalTextBackground>
  </ModalBackground>;
}