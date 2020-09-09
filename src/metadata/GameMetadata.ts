import Location from '../classes/Location';

type GameMetadata  = { [id: string]: {
    location: Location,
    neighbors: string[],
    pixelPosition: { left: number, top: number },
  }
};

export default GameMetadata;
