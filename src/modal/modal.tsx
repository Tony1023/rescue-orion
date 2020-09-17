import React from 'react';
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
  width: 700px;
  transform: translate(-50%, 0);
  background-color: white;
  padding: 30px 50px;
  background-color: rgb(197, 205, 233);
`;

const StyledButton = styled.div`
  font-family: 'Roboto' sans-serif;
  background-color: rgb(0, 198, 170);
  display: inline-block;
  cursor: pointer;
  padding: 10px;
  border-radius: 5px;
  letter-spacing: 1px;
`;

export function DismissButton({ onClose }: {
  onClose?: () => void,
}) {
  return <StyledButton
    onClick={onClose}
  >DISMISS</StyledButton>;
}
