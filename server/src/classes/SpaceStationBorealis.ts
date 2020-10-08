import SpaceStation from "./SpaceStation"
import { RescueResource } from "./RescueResource";
import MessageQueue from "./MessageQueue";

export default class SpaceStationBorealis extends SpaceStation {

  private messageQueue = new WeakMap<SpaceStation, MessageQueue>();

  constructor(location: string, energyCells: number, lifeSupportPacks: number, resources: RescueResource[], messageQueue: MessageQueue) {
    super(location, energyCells, lifeSupportPacks, resources);
    this.messageQueue.set(this, messageQueue);
  }

  canPickUp(r: RescueResource): boolean {
    if(this.rescueResources.includes(RescueResource.AITechnology) && this.rescueResources.includes(RescueResource.OxygenRepairTeam)){
      if(this.rescueResources.includes(r)){
        return true;
      }
    }
    return false;
  }

}