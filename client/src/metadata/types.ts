import Location from '../classes/Location';
import { Message } from '../store/types';

export type LocationMetadata = { [id: string]: {
    location: Location,
    neighbors: string[],
    pixelPosition: { left: number, top: number },
  }
};

export type SpaceStationMetadata = { [id: string]: {
    location: string,
    message: Message,
  }
}