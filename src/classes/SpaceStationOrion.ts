import SpaceStation from "./SpaceStation"
import { RescueResource } from "./RescueResource";
import TimeVaryingAgent from "./TimeVaryingAgent";

export default class SpaceStationOrion extends SpaceStation implements TimeVaryingAgent {

  private scientistCount: number = 20;

  constructor(scientistCount: number, location: string, energyCells: number, lifeSupportPacks: number, resources?: RescueResource[]) {
    super(location, energyCells, lifeSupportPacks, resources);
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