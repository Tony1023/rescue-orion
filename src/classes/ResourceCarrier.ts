export default interface ResourceCarrier {
  energyCells: number,
  readonly rescueResources: number[],
  dropOff: () => void,
}