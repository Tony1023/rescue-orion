import {RescueResource} from "./RescueResource"

export default interface ResourceCarrier {
  energyCells: number,
  lifeSupportPacks: number,
  readonly rescueResources: number[],
  pickUpFrom(r: RescueResource): void,
  canPickUp(r: RescueResource): boolean,
  dropOffTo(r: RescueResource): void,
}
