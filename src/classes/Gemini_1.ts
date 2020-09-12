import { RescueResource } from "./RescueResource";
import Spaceship from "./SpaceStation";

export default class Gemini_1 extends Spaceship {
    energyCells: number = 0;
    lifeSupportPacks: number = 0;
    readonly rescueResources: RescueResource[] = [];
    readonly path: string[] = [];
  
    pickUpFrom(r: RescueResource): void {
      
    }

    canPickUp(r: RescueResource): boolean {
      return true;
    }

    dropOffTo(r: RescueResource): void {
  
    }
  
    onDayUpdate(day: number): void {
  
    }
    addToPath(location: string): void{

    }
  }