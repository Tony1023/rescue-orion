export enum LocationType {
  BeaconStar,
  HyperGate,
  TimePortal,
};

export type PixelPosition = {
  left: number,
  top: number,
}

export default interface Location {
  id: string,
  type: LocationType,
  spaceStation?: string,
};
