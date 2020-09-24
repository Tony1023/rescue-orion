import React from 'react';
import styled from 'styled-components';

export const ModalBackground = styled.div`
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  position: absolute;
  margin: 0 auto;
  background-color: rgba(10, 10, 10, 0.2);
  z-index: 10;
`;

export const BaseModalBackground = styled.div`
  position: absolute;
  padding: 30px;
  top: 80px;
  width: 700px;
`;

export const BaseModalImageBackground = styled(BaseModalBackground)`
  left: calc(50% - 350px);
  height: 500px;
  background-size: cover;
  background-image: ${(props: {backgroundImage: string|undefined }) => props.backgroundImage !== undefined ? `url(${`${process.env.PUBLIC_URL}/${props.backgroundImage}`})`: 'none'};
`;

export const BaseModalTextBackground = styled(BaseModalBackground)`
  left: 50%;
`;

export const BaseModal = styled.div`
  transform: translate(-50%, 0);
  background-color: white;
  padding: 30px;
  background-color: rgb(197, 205, 233);
  border-bottom: 5px solid #b62021;
`;

export const Modal = styled(BaseModal)`
  clip-path: polygon(5% 0, 95% 0, 100% 0, 100% 86%, 94% 100%, 0 100%, 0 87%, 0 12%);
  margin-bottom: 20px;
`;

export const ExtraModal = styled(BaseModal)`
  clip-path: polygon(0 0, 95% 0, 100% 11%, 100% 100%, 95% 100%, 5% 100%, 0 87%, 0 12%);
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
