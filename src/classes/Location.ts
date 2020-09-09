export enum LocationType {
  BeaconStar,
  HyperGate,
  TimePortal,
};

export default interface Location {
  id: string,
  type: LocationType,
  spaceStation?: string,
};
