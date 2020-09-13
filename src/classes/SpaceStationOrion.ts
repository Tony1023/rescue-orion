import SpaceStation from "./SpaceStation"
import { RescueResource } from "./RescueResource";

export default class SpaceStationOrion extends SpaceStation {

  private scientistCount: number = 20;

  constructor(scientistCount: number, energyCells: number, lifeSupportPacks: number, resources?: RescueResource[]) {
    super(energyCells, lifeSupportPacks, resources);
    this.scientistCount = scientistCount;
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