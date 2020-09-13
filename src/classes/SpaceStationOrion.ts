import SpaceStation from "./SpaceStation"
import { RescueResource } from "./RescueResource";

export default class SpaceStationOrion extends SpaceStation {

  private scientistCount: number = 20;

  pickUpFrom(r: RescueResource): void {
    
  }

  canPickUp(r: RescueResource): boolean {
    return false;
  }

  onDayUpdate(day: number): void {

  }

  getScientistCount(): number {
    return this.scientistCount;
  }
}