import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

export const ModalBackground = styled.div`
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  position: absolute;
  margin: 0 auto;
  background-color: rgba(10, 10, 10, 0.5);
`;

export const Modal = styled.div`
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: white;
  padding: 0 20px;
`;

export const StyledButton = styled.button`

`;

export const DismissButton: FunctionComponent<{
  onClose?: () => void,
}> = ({ onClose }) => {
  return (
    <StyledButton onClick={onClose}>Dismiss</StyledButton>
  )
}