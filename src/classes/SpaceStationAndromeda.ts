import SpaceStation from "./SpaceStation"
import { RescueResource } from "./RescueResource";

export default class SpaceStationAndromeda extends SpaceStation {
  readonly visited: boolean =false;
  INFORMATION: string = "";
  location: string = "";
  energyCells: number = 0;
  lifeSupportPacks: number = 0;
  readonly rescueResources: RescueResource[] = [];

  pickUpFrom(r: RescueResource): void {
    
  }

  canPickUp(r: RescueResource): boolean{
    return true;
  }
  dropOffTo(r: RescueResource): void {

  }

  onDayUpdate(day: number): void {

  }

}