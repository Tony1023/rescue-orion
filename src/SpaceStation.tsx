import React, { useState, useLayoutEffect, useEffect } from 'react';
import styled from 'styled-components';
import { PixelPosition } from './classes/Location';
import * as IDs from './metadata/agent-ids';
import locationData from './metadata/location-data';
import spaceStationData from './metadata/space-station-data';
import SpaceStationModal from './modal/SpaceStationModal';
import { PlainSpaceStation } from './store/types';

const StationInformationButton = styled.button`
  position: absolute; 
  font-family: 'Grandstander', cursive;
  top: ${(props: { position: PixelPosition }) => `${props.position.top + 50}px`};
  left: ${(props: { position: PixelPosition }) => `${props.position.left - 60}px`};
  &:hover {
    cursor: pointer;
  }
`;

export interface Props {
    name: string,
    info: PlainSpaceStation,
  }
  
export default function(props: Props) {
    const StationPosition =  locationData[props.info.location].pixelPosition;
    const [showStationInformationModel, setStationInformationModel] = useState(false);
    return <>
    <div>
        <StationInformationButton position={StationPosition}
        onClick={() => setStationInformationModel(true)}
        disabled={false}>
            Station Information
        </StationInformationButton>
    </div>
    
    {
        showStationInformationModel ?
        <SpaceStationModal
          onClose={() => setStationInformationModel(false)}
        /> : <></>
    }
    </>;
  }