import TimeVaryingAgent from "./TimeVaryingAgent";
import ResourceCarrier from "./ResourceCarrier";
import { RescueResource } from "./RescueResource";
import { locationData } from '../../metadata';
import { LocationType } from '../../metadata/types';
import * as IDs from '../../metadata/agent-ids';

interface NeighborCost {
  location: string,
  cost: {
    energyCells: number,
    lifeSupportPacks: number,
  }
};

function computeSupplyConsumption(prev: string, curr: string): {
  energyCells: number,
  lifeSupportPacks: number,
} {
  // If different type of locations, then it must be a starway.
  // If staying at the same location, then it's equivalent to staying staionary
  if (locationData[curr].location.type !== locationData[prev].location.type || curr === prev) {
    return {
      energyCells: 1,
      lifeSupportPacks: 1,
    };
  }
  switch (locationData[curr].location.type) {
    case LocationType.BeaconStar:
      return {
        energyCells: 1,
        lifeSupportPacks: 1,
      };
    case LocationType.HyperGate:
      return {
        energyCells: 20,
        lifeSupportPacks: 5,
      };
    case LocationType.TimePortal:
      return {
        energyCells: 10,
        lifeSupportPacks: 30,
      };
  }
}

export default abstract class Spaceship implements ResourceCarrier, TimeVaryingAgent{
  energyCells: number;
  lifeSupportPacks: number;
  protected rescueResources: RescueResource[] = [];
  protected path: string[] = [IDs.SAGITTARIUS];
  private isTravelingThruTimePortals = false;

  constructor(energyCells: number, lifeSupportPacks: number, resources?: RescueResource[]) {
    this.energyCells = energyCells;
    this.lifeSupportPacks = lifeSupportPacks;
    this.rescueResources = resources ?? [];
  }

  getLocation(): string {
    return this.path[this.path.length - 1];
  }

  getRescueResources(): RescueResource[] {
    return this.rescueResources.slice(0);
  }

  getPath(): string[] {
    return this.path.slice(0);
  }

  getIsTravelingThruTimePortals(): boolean {
    return this.isTravelingThruTimePortals;
  }

  pickUpFrom(r: RescueResource): void {
    const index = this.rescueResources.indexOf(r);
    if (index === -1) {
      throw new Error(`${r} not found onboard.`);
    }
    this.rescueResources.splice(index, 1);
  }

  canPickUp(r: RescueResource): boolean {
    return true;
  }

  dropOffTo(r: RescueResource): void {
    this.rescueResources.push(r);
  }

  onDayUpdate(_: number): void {
    const current = this.path[this.path.length - 1];
    const prev = this.path[this.path.length - 2];
    const consumption = computeSupplyConsumption(prev, current);
    this.energyCells -= consumption.energyCells;
    this.lifeSupportPacks -= consumption.lifeSupportPacks;
  }

  addToPath(location: string): void {
    this.path.push(location);
    this.updateIfTravelingThruTimePortals();
  }

  private updateIfTravelingThruTimePortals(): void {
    if (this.path.length <= 1) {
      this.isTravelingThruTimePortals = false;
      return;
    }

    const current = this.path[this.path.length - 1];
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
    // Is exiting from t1
    if (!entryIndex || current === 't1') {
      this.isTravelingThruTimePortals = false;
      return;
    }
    // Not at the entry point, then can only go to other time portals
    if (this.path[entryIndex] !== current) {
      this.isTravelingThruTimePortals = true;
      return;
    }

    // At the entry point, see if it is a boomarange (palindrome) path
    for (let endIndex = this.path.length - 1; endIndex >= entryIndex; --endIndex) {
      if (this.path[entryIndex] !== this.path[endIndex]) {
        this.isTravelingThruTimePortals = true;
        return;
      }
      ++entryIndex;
    }
    this.isTravelingThruTimePortals = false;
  }

  generateReachableNeighbors(): NeighborCost[] {

    function normalNextMovesFrom(location: string) {
      const nextMoves = locationData[location].neighbors;
      nextMoves.push(location);
      return nextMoves;
    }

    function timePortalNextMovesFrom(timePortal: string) {
      const nextMoves: string[] = [];
      locationData[timePortal].neighbors.forEach((neighbor: string) => {
        if (locationData[neighbor].location.type === LocationType.TimePortal) {
          nextMoves.push(neighbor);
        }
      });
      return nextMoves;
    }

    const current = this.path[this.path.length - 1];

    let neighbors: string[];

    // On a beacon star or hyper gate, can go anywhere
    if (locationData[current].location.type !== LocationType.TimePortal) {
      neighbors = normalNextMovesFrom(current);
    } else {
      neighbors = this.isTravelingThruTimePortals ?
        timePortalNextMovesFrom(current) : normalNextMovesFrom(current);
    }
    return neighbors.reduce((accumulator: NeighborCost[], location: string) => {
      const neighborCost = {
        location: location,
        cost: computeSupplyConsumption(current, location),
      }
      accumulator.push(neighborCost);
      return accumulator;
    }, []);
  }
}