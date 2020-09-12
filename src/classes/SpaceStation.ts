import TimeVaryingAgent from "./TimeVaryingAgent";
import ResourceCarrier from "./ResourceCarrier";
import { RescueResource } from "./RescueResource";

export default class SpaceStation implements TimeVaryingAgent, ResourceCarrier {
  readonly visited: boolean =false;
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