import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { PixelPosition } from './classes/Location';
import locationData from './metadata/location-data';
import { spaceStationData } from './metadata';
import SpaceStationModal from './modal/SpaceStationModal';
import { GameState } from './store/types';

const StationInformationButton = styled.button`
  position: absolute; 
  font-family: 'Grandstander', cursive;
  top: ${(props: { position: PixelPosition }) => `${props.position.top + 50}px`};
  left: ${(props: { position: PixelPosition }) => `${props.position.left - 60}px`};
  &:hover {
    cursor: pointer;
  }
`;

export default (props: {
  id: string,
}) => {

  const visited = useSelector((state: GameState) => state.spaceStations[props.id].visited);

  const spaceStation = spaceStationData[props.id];
  const StationPosition = locationData[spaceStation.location].pixelPosition;
  const [showModal, setShowModal] = useState(false);

  return <>
    {
      visited ?
      <>
        <div>
          <StationInformationButton
            position={StationPosition}
            onClick={() => setShowModal(true)}
          >
            Station Information
          </StationInformationButton>
        </div>
        
        {
          showModal ?
          <SpaceStationModal
            onClose={() => setShowModal(false)}
            id={props.id}
            message={spaceStation.message}
          /> : <></>
        }
      </> : null
    }
  </>;
}