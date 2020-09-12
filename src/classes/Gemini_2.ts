import { RescueResource } from "./RescueResource";
import Spaceship from "./Spaceship";
import Gemini_1 from "./Gemini_1";

export default class Gemini_2 extends Spaceship {
  gemini_1: Gemini_1;

  constructor(gemini_1: Gemini_1) {
    super();
    this.gemini_1 = gemini_1;
  }

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
