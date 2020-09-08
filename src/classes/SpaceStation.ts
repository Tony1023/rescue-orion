import { TimeVaryingAgent } from "./TimeVaryingAgent";
import { ResourceCarrier } from "./ResourceCarrier";

export class SpaceStation implements TimeVaryingAgent, ResourceCarrier {
  energyCells: number = 0;
  rescueResources: number[] = [];

  dropOff(): void {

  }

  onDayUpdate(day: number): void {

  }

}