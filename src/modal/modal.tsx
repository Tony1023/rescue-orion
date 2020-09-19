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

export const BaseModal = styled.div`
  position: absolute;
  width: 700px;
  transform: translate(-50%, 0);
  background-color: white;
  padding: 30px;
  background-color: rgb(197, 205, 233);
  border-bottom: 5px solid #b62021;
`;

export const Modal = styled(BaseModal)`
  top: 80px;
  left: 50%;
  width: 700px;
  border-radius: 50px 20px;
`;

export const ExtraModal = styled(BaseModal)`
  top: 430px;
  left: 50%;
  width: 700px;
  border-radius: 20px 50px;
`;

const StyledButton = styled.div`
  font-family: 'Roboto' sans-serif;
  background-color: rgb(0, 198, 170);
  display: flex;
  cursor: pointer;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  letter-spacing: 1px;
  font-weight: 500;
  width: 70px;
  margin-left: auto;
`;

export function DismissButton({ onClose }: {
  onClose?: () => void,
}) {
  return <StyledButton
    onClick={onClose}
  >DISMISS</StyledButton>;
}
