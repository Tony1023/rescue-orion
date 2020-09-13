import SpaceStation from "./SpaceStation"
import { RescueResource } from "./RescueResource";

export default class SpaceStationBorealis extends SpaceStation {

  canPickUp(r: RescueResource): boolean {
    return true;
  }

}