import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useState
} from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import {
  BaseModalTextBackground,
  Modal,
  ModalBackground,
  DismissButton,
} from './modal';
import { GameState } from '../store/types';
import * as IDs from '../metadata/agent-ids';
import {
  transferEnergyCells,
  transferRescueResource,
  transferLifeSupportPacks,
} from '../store/actions';
import Triangle from './TriangleButton';

const ModalWrapper = styled(BaseModalTextBackground)`
  width: 1000px;
  padding: 0;
`;

const StyledModal = styled(Modal)`
  height: 520px;
`;

const StyledButton = styled(DismissButton)`
  position: absolute;
  right: 30px;
  top: 20px;
`;

const Column = styled.div`
  display: inline-block;
  overflow: auto;
  vertical-align: top;
`;

const SpaceshipName = styled.h1`
  font-family: 'Grandstander', cursive;
`;

const ResourceName = styled.div`
  font-family: 'Roboto' sans-serif;
  text-align: center;
  font-weight: 500;
  font-size: 24px;
  margin-top: 10px;
  margin-bottom: 5px;
  position: relative;
`;

const ResourceCount = styled.div`
  font-family: 'Roboto' sans-serif;
  text-align: center;
  font-weight: bold;
  font-size: 40px;
  position: relative;
`;

const Divider = styled.div`
  border-bottom: 1px solid grey;
  margin-top: 10px;
`;

const LeftPanelTriangle = styled(Triangle)`
  position: absolute;
  right: 5px;
  top: 0;
`;

const RightPanelTriangle = styled(Triangle)`
  position: absolute;
  left: 5px;
  top: 0;
  transform: rotate(180deg);
`;

const ResourceCountInput = styled.input`
  position: absolute;
  bottom: 0;
  font-size: 36px;
  width: 80px;
  text-align: center;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid grey;

  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type=number] {
    -moz-appearance: textfield;
  }
    
`;

const LeftPanelInput = styled(ResourceCountInput)`
  right: 0;
`;

const RightPanelInput = styled(ResourceCountInput)`
  left: 0;
`;

export default (props: {
  onClose?: () => void,
}) => {

  const spaceships = useSelector((state: GameState) => state.spaceships);
  const dispatch = useDispatch();

  const gemini_1 = spaceships[IDs.GEMINI_1];
  const gemini_2 = spaceships[IDs.GEMINI_2];

  const [energyCellsInputLeft, setEnergyCellsInputLeft] = useState('');
  const [lifeSupportPacksInputLeft, setLifeSupportPacksInputLeft] = useState('');
  const [energyCellsInputRight, setEnergyCellsInputRight] = useState('');
  const [lifeSupportPacksInputRight, setLifeSupportPacksInputRight] = useState('');

  function handleInput(_: string, setStateFunction: Dispatch<SetStateAction<string>>)
      : (event: ChangeEvent<HTMLInputElement>) => void {
    return (event: ChangeEvent<HTMLInputElement>) => {
      const input = event.target.value;
      if (input.length > 3) { return; }
      const trimmed = input.replace(/\D/g, '');
      setStateFunction(trimmed);
    };
  }

  return <ModalBackground>
    <ModalWrapper>
      <Column style={{ width: '45%' }}>
        <StyledModal>
          <SpaceshipName>Gemini 1</SpaceshipName>
          <ResourceName>
            Energy Cells
            <LeftPanelTriangle
              onClick={() => {
                setEnergyCellsInputLeft('');
                dispatch(transferEnergyCells({
                  from: IDs.GEMINI_1,
                  to: IDs.GEMINI_2,
                  count: Number.parseInt(energyCellsInputLeft)
                }));
              }}
            />
          </ResourceName>
          <ResourceCount>
            {gemini_1.energyCells}
            <LeftPanelInput
              placeholder={'0'}
              value={energyCellsInputLeft}
              onChange={handleInput(energyCellsInputLeft, setEnergyCellsInputLeft)}
            />
          </ResourceCount>
          <ResourceName>
            Life Support Packs
            <LeftPanelTriangle
              onClick={() => {
                setLifeSupportPacksInputLeft('');
                dispatch(transferLifeSupportPacks({
                  from: IDs.GEMINI_1,
                  to: IDs.GEMINI_2,
                  count: Number.parseInt(lifeSupportPacksInputLeft)
                }));
              }}
            />
          </ResourceName>
          <ResourceCount>
            {gemini_1.lifeSupportPacks}
            <LeftPanelInput
              placeholder={'0'}
              value={lifeSupportPacksInputLeft}
              onChange={handleInput(lifeSupportPacksInputLeft, setLifeSupportPacksInputLeft)}
            />          
          </ResourceCount>
          <Divider />
          {
            gemini_1.rescueResources.map((resource, i) => 
              <ResourceName key={i}>
                {resource}
                <LeftPanelTriangle
                  onClick={() => {
                    dispatch(transferRescueResource({
                      from: IDs.GEMINI_1,
                      to: IDs.GEMINI_2,
                      type: resource,
                    }));
                  }}
                />
              </ResourceName>
            )
          }
        </StyledModal>
      </Column>
      <Column style={{ width: '10%' }} />
      <Column style={{ width: '45%' }}>
        <StyledModal>
          <StyledButton onClose={props.onClose} />
          <SpaceshipName>Gemini 2</SpaceshipName>
          <ResourceName>
            Energy Cells
            <RightPanelTriangle
              onClick={() => {
                setEnergyCellsInputRight('');
                dispatch(transferEnergyCells({
                  from: IDs.GEMINI_2,
                  to: IDs.GEMINI_1,
                  count: Number.parseInt(energyCellsInputRight)
                }));
              }}
            />
          </ResourceName>
          <ResourceCount>
            {gemini_2.energyCells}
            <RightPanelInput
              placeholder={'0'}
              value={energyCellsInputRight}
              onChange={handleInput(energyCellsInputRight, setEnergyCellsInputRight)}
            />
          </ResourceCount>
          <ResourceName>
            Life Support Packs
            <RightPanelTriangle
              onClick={() => {
                setLifeSupportPacksInputRight('');
                dispatch(transferLifeSupportPacks({
                  from: IDs.GEMINI_2,
                  to: IDs.GEMINI_1,
                  count: Number.parseInt(lifeSupportPacksInputRight)
                }));
              }}
            />
          </ResourceName>
          <ResourceCount>
            {gemini_2.lifeSupportPacks}
            <RightPanelInput
              placeholder={'0'}
              value={lifeSupportPacksInputRight}
              onChange={handleInput(lifeSupportPacksInputRight, setLifeSupportPacksInputRight)}
            />          
          </ResourceCount>
          <Divider />
          {
            gemini_2.rescueResources.map((resource, i) =>
              <ResourceName key={i}>
                {resource}
                <RightPanelTriangle
                  onClick={() => {
                    dispatch(transferRescueResource({
                      from: IDs.GEMINI_2,
                      to: IDs.GEMINI_1,
                      type: resource,
                    }));
                  }}
                />
              </ResourceName>
            )
          }
        </StyledModal>
      </Column>
    </ModalWrapper>
  </ModalBackground>;
}