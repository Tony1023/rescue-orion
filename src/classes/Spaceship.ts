import TimeVaryingAgent from "./TimeVaryingAgent";
import ResourceCarrier from "./ResourceCarrier";
import { RescueResource } from "./RescueResource";

export default abstract class Spaceship implements ResourceCarrier, TimeVaryingAgent{
  energyCells: number = 0;
  lifeSupportPacks: number = 0;
  readonly rescueResources: RescueResource[] = [];
  path: string[] = [];

  pickUpFrom(r: RescueResource): void {
  
  }

  canPickUp(r: RescueResource): boolean{
    return true;
  }

  dropOffTo(r: RescueResource): void {

  }

  onDayUpdate(day: number): void {

  }
  
  addToPath(location: string): void{
      
  }
}