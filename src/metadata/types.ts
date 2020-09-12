import Location from '../classes/Location';

export type LocationMetadata = { [id: string]: {
    location: Location,
    neighbors: string[],
    pixelPosition: { left: number, top: number },
  }
};

export type SpaceStationMetadata = { [id: string]: {
    location: string,
    information: Information,
  }
}

type Information = {
  title: string,
  bulletPoints: string[],
} | string;