import SpaceStation from "./SpaceStation"
import { RescueResource } from "./RescueResource";
import TimeVaryingAgent from "./TimeVaryingAgent";

export default class SpaceStationAndromeda extends SpaceStation implements TimeVaryingAgent {

  onDayUpdate(day: number): void {

  }
}