import TimeVaryingAgent from "./TimeVaryingAgent";
import ResourceCarrier from "./ResourceCarrier";
import { RescueResource } from "./RescueResource";
import { locationData } from '../metadata';
import { LocationType } from './Location';
import * as IDs from '../metadata/agent-ids';

export default abstract class Spaceship implements ResourceCarrier, TimeVaryingAgent{
  energyCells: number = 0;
  lifeSupportPacks: number = 0;
  readonly rescueResources: RescueResource[] = [];
  readonly path: string[] = [IDs.SAGITTARIUS];

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
    this.path.push(location);
  }

  generateReachableNeighbors(): string[] {

    function normalNextMovesFrom(location: string) {
      let nextMoves = locationData[location].neighbors;
      nextMoves.push(location);
      return nextMoves;
    }

    function timePortalNextMovesFrom(timePortal: string) {
      let nextMoves: string[] = [];
      locationData[timePortal].neighbors.forEach((neighbor: string) => {
        if (locationData[neighbor].location.type === LocationType.TimePortal) {
          nextMoves.push(neighbor);
        }
      });
      return nextMoves;
    }

    const current = this.path[this.path.length - 1];

    // On a beacon star or hyper gate, can go anywhere
    if (locationData[current].location.type !== LocationType.TimePortal) {
      return normalNextMovesFrom(current);
    }

    let entryIndex = null;
    // To be at a time portal, there must be at least two in the location history
    for (let i = this.path.length - 2; i >= 0; --i) {
      const prev = this.path[i];
      if (locationData[prev].location.type === LocationType.TimePortal) {
        entryIndex = i;
      } else {
        break;
      }
    }

    // Is not travelling thru a time portal or
    // Is exsiting from t1
    if (!entryIndex || current === 't1') {
      return normalNextMovesFrom(current);
    }
    // Not at the entry point, then can only go to other time portals
    if (this.path[entryIndex] !== current) {
      return timePortalNextMovesFrom(current);
    }

    // At the entry point, see if it is a boomarange (palindrome) path
    for (let endIndex = this.path.length - 1; endIndex >= entryIndex; --endIndex) {
      if (this.path[entryIndex] !== this.path[endIndex]) {
        return timePortalNextMovesFrom(current);
      }
      ++entryIndex;
    }
    return normalNextMovesFrom(current);
  }
}