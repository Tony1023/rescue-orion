import SpaceStation from "./SpaceStation"
import { RescueResource } from "./RescueResource";
import MessageQueue from "./MessageQueue";

export default class SpaceStationBorealis extends SpaceStation {

  private messageQueue: MessageQueue;

  constructor(location: string, energyCells: number, lifeSupportPacks: number, resources: RescueResource[], messageQueue: MessageQueue) {
    super(location, energyCells, lifeSupportPacks, resources);
    this.messageQueue = messageQueue;
  }

  canPickUp(r: RescueResource): boolean {
    if(this.rescueResources.includes(RescueResource.AITechnology) && this.rescueResources.includes(RescueResource.OxygenRepairTeam)){
      if(this.rescueResources.includes(r)){
        return true;
      }
    }
    return false;
  }

  checkDropOffResource(r: RescueResource): void {
    if(r === RescueResource.AITechnology) {
      this.messageQueue.pushMessage({
        title: 'AI TECHNOLOGY DELIVERED',
          paragraphs: [
            { text: 'Well done!' },
            { text: 'With the AI Technology from Capricorn here to replace them, the Oxygen Repair Team can now leave Borealis safely!' },
            { text: 'The Oxygen Repair Team are ready to board your ship!' },
            { text: '-Ground Control' },
          ],
      })
    }
  }

}