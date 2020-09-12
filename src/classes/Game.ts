import { GameState } from '../store/types';
import { locationData } from '../metadata';
import { LocationType } from './Location';
import TimeVaryingAgent from './TimeVaryingAgent';
import ResourceCarrier from './ResourceCarrier';
import Spaceship from './Spaceship';
import SpaceStation from './SpaceStation';
import Gemini_1 from './Gemini_1';
import * as IDs from '../metadata/agent-ids';
import Gemini_2 from './Gemini_2';
import SpaceStationAndromeda from './SpaceStationAndromeda';
import SpaceStationBorealis from './SpaceStationBorealis';
import SpaceStationOrion from './SpaceStationOrion';

export interface SpaceshipNextMoves {
  [location: string]: { [id: string]: boolean }
};

export default class Game {

  private time = 0;
  private messages: string[] = [];
  private agents: { [id: string]: TimeVaryingAgent } = {};
  private carriers: { [id: string]: ResourceCarrier } = {};
  private spaceships: { [id: string]: Spaceship } = {};
  private spaceStations: { [id: string]: SpaceStation } = {};

  constructor() {
    const gemini_1 = new Gemini_1();
    this.spaceships[IDs.GEMINI_1] = gemini_1;
    this.agents[IDs.GEMINI_1] = gemini_1;
    this.carriers[IDs.GEMINI_1] = gemini_1;

    const gemini_2 = new Gemini_2(gemini_1);
    this.spaceships[IDs.GEMINI_2] = gemini_2;
    this.agents[IDs.GEMINI_2] = gemini_2;
    this.carriers[IDs.GEMINI_2] = gemini_2;
    
    const andromeda = new SpaceStationAndromeda();
    this.spaceStations[IDs.ANDROMEDA] = andromeda;
    this.agents[IDs.ANDROMEDA] = andromeda;
    this.carriers[IDs.ANDROMEDA] = andromeda;

    const aquarius = new SpaceStation();
    this.spaceStations[IDs.AQUARIUS] = aquarius;
    this.agents[IDs.AQUARIUS] = aquarius;
    this.carriers[IDs.AQUARIUS] = aquarius;

    const borealis = new SpaceStationBorealis();
    this.spaceStations[IDs.BOREALIS] = borealis;
    this.agents[IDs.BOREALIS] = borealis;
    this.carriers[IDs.BOREALIS] = borealis;

    const capricorn = new SpaceStation();
    this.spaceStations[IDs.CAPRICORN] = capricorn;
    this.agents[IDs.CAPRICORN] = capricorn;
    this.carriers[IDs.CAPRICORN] = capricorn;

    const cassiopeia = new SpaceStation();
    this.spaceStations[IDs.CASSIOPEIA] = cassiopeia;
    this.agents[IDs.CASSIOPEIA] = cassiopeia;
    this.carriers[IDs.CASSIOPEIA] = cassiopeia;

    const orion = new SpaceStationOrion();
    this.spaceStations[IDs.ORION] = orion;
    this.agents[IDs.ORION] = orion;
    this.carriers[IDs.ORION] = orion;

    const sagittarius = new SpaceStation();
    this.spaceStations[IDs.SAGITTARIUS] = sagittarius;
    this.agents[IDs.SAGITTARIUS] = sagittarius;
    this.carriers[IDs.SAGITTARIUS] = sagittarius;
  }

  dumpMessages(): string[] {
    const messages = this.messages;
    this.messages = [];
    return messages;
  }

  moveSpaceships(moves: { [id: string]: string }): void {

  }

  transferEnergyCells(from: string, to: string, count?: number): void {

  }

  transferLifeSupportPacks(from: string, to: string, count?: number): void {

  }

  transferRescueResource(from: string, to: string, type: number): void {

  }

  // Move them to Spaceship class
  private generateReachableNeighbors(path: string[]): string[] {

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

    const current = path[path.length - 1];

    // On a beacon star or hyper gate, can go anywhere
    if (locationData[current].location.type !== LocationType.TimePortal) {
      return normalNextMovesFrom(current);
    }

    let entryIndex = null;
    // To be at a time portal, there must be at least two in the location history
    for (let i = path.length - 2; i >= 0; --i) {
      const prev = path[i];
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
    if (path[entryIndex] !== current) {
      return timePortalNextMovesFrom(current);
    }

    // At the entry point, see if it is a boomarange (palindrome) path
    for (let endIndex = path.length - 1; endIndex >= entryIndex; --endIndex) {
      if (path[entryIndex] !== path[endIndex]) {
        return timePortalNextMovesFrom(current);
      }
      ++entryIndex;
    }
    return normalNextMovesFrom(current);
  }

  private computeNextMoves(data: {
    spaceships: {
      [id: string]: string[]
    },
  }): SpaceshipNextMoves {
    let nextMoves: SpaceshipNextMoves = {};
    for (const spaceship in data.spaceships) {
      const reachableNeighbors = this.generateReachableNeighbors(data.spaceships[spaceship]);
      reachableNeighbors.forEach((location: string) => {
        if (!nextMoves[location]) {
          nextMoves[location] = { gemini1: false, gemini2: false };
        }
        nextMoves[location][spaceship] = true;
      });
    }
    return nextMoves;
  }


  toGameState(): GameState {
    return {
      spaceships: {
        gemini1: {
          location: 'b2',
          energyCells: 38,
          lifeSupportPacks: 38,
        },
        gemini2: {
          location: 'h1',
          energyCells: 38,
          lifeSupportPacks: 38,
        }
      },
      nextMoves: this.computeNextMoves({
        spaceships: {
          gemini_1: ['sagittarius', 'b3', 'h1', 't3', 't5', 't2', 't4', 't3'],
          gemini_2: ['sagittarius', 'b3', 'h1', 't3', 't5', 't2', 't5', 't3'],
        }
      }),
      spaceStations: {
        
      },
      messages: this.dumpMessages(),
      time: this.time,
    };
  }
};
