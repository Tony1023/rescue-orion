import SpaceStation from "./SpaceStation"
import { RescueResource } from "./RescueResource";

export default class SpaceStationAndromeda extends SpaceStation {

  pickUpFrom(r: RescueResource): void {
    
  }

  canPickUp(r: RescueResource): boolean {
    return true;
  }
  
  dropOffTo(r: RescueResource): void {

  }

  onDayUpdate(day: number): void {

  }
}