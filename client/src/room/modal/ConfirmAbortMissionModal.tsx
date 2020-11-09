import React from 'react';
import {
  BaseModalTextBackground,
  Modal,
  ModalBackground,
  Body,
  Header,
} from './modal';
import { useDispatch } from '../redux-hook-adapters';
import { abortMission } from '../actions';
import styled from 'styled-components';

const AbortButton = styled.div`
  position: absolute;
  top: 20px;
  left: 120px;
  cursor: pointer;
  height: 70px;
  width: 140px;
  background-size: cover;
  background-image: url(${`"${process.env.PUBLIC_URL}/buttons/Map Buttons_outlines_Yes.png"`});
`;

const CancelButton = styled.div`
  position: absolute;
  right: 120px;
  top: 20px;
  cursor: pointer;
  height: 70px;
  width: 140px;
  background-size: cover;
  background-image: url(${`"${process.env.PUBLIC_URL}/buttons/Map Buttons_outlines_No.png"`});
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
          />
          <CancelButton
            data-testid="abort-mission-cancel"
            onClick={props.onClose}
          />
        </div>
      </Modal>
    </BaseModalTextBackground>
  </ModalBackground>;
}