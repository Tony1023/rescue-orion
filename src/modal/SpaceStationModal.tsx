import React, {
  ChangeEvent,
  KeyboardEvent,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import StationData from '../metadata/space-station-data'
import {
  BaseModalTextBackground,
  Modal,
  ModalBackground,
  DismissButton,
} from './modal';
import { GameState } from '../store/types';
import * as IDs from '../metadata/agent-ids';
import {
  pickUpSupplyResource,
  pickUpRescueResource,
  dropOffRescueResource
} from '../store/actions';
import { PlainSpaceStation } from '../store/types';
import { Message } from '../store/types';

const PickUpButton = styled.button`
  font-family: 'Grandstander', cursive;
  position: absolute; 
  right: 0;
  &:hover {
    cursor: pointer;
  }
`;
const DropOffButton = styled.button`
  font-family: 'Grandstander', cursive;
  position: absolute; 
  right: 0;
  &:hover {
    cursor: pointer;
  }
`;
const StationName = styled.div`
  font-family: 'Grandstander', cursive;
  text-align: center;
  font-size: 40px;
  margin-bottom: 30px;
`;
const TextInfo = styled.div`
  font-family: 'Roboto' sans-serif;
  text-align: center;
  font-weight: 500;
  font-size: 24px;
  margin-top: 10px;
  margin-bottom: 5px;
  position: relative;
`;
const ResourceInfo= styled.div`
  font-family: 'Roboto' sans-serif;
  text-align: left;
  font-weight: 500;
  font-size: 16px;
  margin-top: 10px;
  margin-bottom: 5px;
  position: relative;
`;
const TechnologyInfo= styled.div`
  font-family: 'Roboto' sans-serif;
  text-align: left;
  font-weight: 500;
  font-size: 16px;
  margin-top: 10px;
  margin-bottom: 5px;
  position: relative;
`;
const ModalWrapper = styled(BaseModalTextBackground)`
  width: 1000px;
  padding: 0;
`;
const Column = styled.div`
  display: inline-block;
  overflow: auto;
  vertical-align: top;
  position: relative;
`;
const StyledModal = styled(Modal)`
  position: relative;
  height: 520px;
`;
const StyledButton = styled(DismissButton)`
  position: absolute;
  left: 30px;
  bottom: 20px;
`;

function StationPanel() {
  const station = useSelector((state: GameState) => state.spaceStations[IDs.AQUARIUS]);
  const dispatch = useDispatch();
  return <>
    <StationName>
      {station.location}
    </StationName>
    <TextInfo>
      abababababa
      <br /><br />
    </TextInfo>

    <ResourceInfo>
    <br /><br />Energy Cells: {station.energyCells}<br />
      Life Support Packs: {station.lifeSupportPacks}
      <PickUpButton onClick={() => {
        dispatch(pickUpSupplyResource({
          from: IDs.AQUARIUS,
          to: IDs.GEMINI_1,
        }));
      }}>
      Pick Up
      </PickUpButton><br /><br />
      
    </ResourceInfo>

    <TechnologyInfo>
      {station.rescueResources}
      <PickUpButton>
        Pick Up
      </PickUpButton>
    </TechnologyInfo>
  </>
}



function Gemini1Panel() {
  const gemini1 = useSelector((state: GameState) => state.spaceships[IDs.GEMINI_1]);
  const dispatch = useDispatch();

  return <>
    <StationName>
      Gemini 1
    </StationName>
    <ResourceInfo>
      Energy Cells: {gemini1.energyCells}<br />
      Life Support Packs: {gemini1.lifeSupportPacks}
    </ResourceInfo>
    <br /><br />
    <TechnologyInfo>
      {gemini1.rescueResources}
      <DropOffButton>
        Drop Off
      </DropOffButton>
    </TechnologyInfo>

  </>
}

function Gemini2Panel() {
  const gemini2 = useSelector((state: GameState) => state.spaceships[IDs.GEMINI_2]);
  const dispatch = useDispatch();
  return <>
    <StationName>
      Gemini 2
    </StationName>
    <ResourceInfo>
      Energy Cells: {gemini2.energyCells}<br />
      Life Support Packs: {gemini2.lifeSupportPacks}
    </ResourceInfo>
    <br /><br />
    <TechnologyInfo>
      {gemini2.rescueResources}
      <DropOffButton>
        Drop Off
      </DropOffButton>
    </TechnologyInfo>

  </>
}

export default (props: {
  onClose?: () => void,
  id: string,
}) => {

  const gameState = useSelector((state: GameState) => state);
  const dispatch = useDispatch();
  const gemini1CurrentLocation = gameState.spaceships[IDs.GEMINI_1].location;
  const gemini2CurrentLocation = gameState.spaceships[IDs.GEMINI_2].location;
  const spaceStationLocation = gameState.spaceStations[IDs.AQUARIUS].location;
  console.log(gemini1CurrentLocation, gemini2CurrentLocation, spaceStationLocation);
  let columnStyle;
  columnStyle = {width: '33%'};

  if (gemini1CurrentLocation != spaceStationLocation) {
    columnStyle = {display: 'none'};
  }
  if (gemini2CurrentLocation != spaceStationLocation) {
    columnStyle = {display: 'none'};
  }

  return <ModalBackground>
    <ModalWrapper>
      <Column style={{ width: '33%' }}>
        <StyledModal>
          <StationPanel />
          <StyledButton onClose={props.onClose} />
        </StyledModal>
      </Column>
    
      <Column style={columnStyle}>
        <StyledModal>
          <Gemini1Panel />
        </StyledModal>
      </Column>

      <Column style={columnStyle}>
        <StyledModal>
          
          <Gemini2Panel />
        </StyledModal>
      </Column>


    </ModalWrapper>
  </ModalBackground>;
}