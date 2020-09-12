import { RescueResource } from "./RescueResource";
import Spaceship from "./Spaceship";

export default class Gemini_1 extends Spaceship {
  
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
