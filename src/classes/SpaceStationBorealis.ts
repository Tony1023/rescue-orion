import SpaceStation from "./SpaceStation"
import { RescueResource } from "./RescueResource";

export default class SpaceStationBorealis extends SpaceStation {

  canPickUp(r: RescueResource): boolean {
    if(this.rescueResources.includes(RescueResource.AITechnology) && this.rescueResources.includes(RescueResource.OxygenRepairTeam)){
      if(this.rescueResources.includes(r)){
        return true;
      }
    }
    return false;
  }

}