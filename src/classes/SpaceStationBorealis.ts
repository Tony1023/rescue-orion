import SpaceStation from "./SpaceStation"
import { RescueResource } from "./RescueResource";

export default class SpaceStationBorealis extends SpaceStation {

  pickUpFrom(r: RescueResource): void {
    
  }

  canPickUp(r: RescueResource): boolean {
    return true;
  }

}