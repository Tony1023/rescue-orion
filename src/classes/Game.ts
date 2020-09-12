import { GameState } from '../store/types';
import metadata from '../metadata/data';
import { LocationType } from './Location';

export interface SpaceshipNextMoves {
  [location: string]: { [id: string]: boolean }
};

export default class Game {

  private time = 0;
  private messages: string[] = [];

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
      let nextMoves = metadata[location].neighbors;
      nextMoves.push(location);
      return nextMoves;
    }

    function timePortalNextMovesFrom(timePortal: string) {
      let nextMoves: string[] = [];
      metadata[timePortal].neighbors.forEach((neighbor: string) => {
        if (metadata[neighbor].location.type === LocationType.TimePortal) {
          nextMoves.push(neighbor);
        }
      });
      return nextMoves;
    }

    const current = path[path.length - 1];

    // On a beacon star or hyper gate, can go anywhere
    if (metadata[current].location.type !== LocationType.TimePortal) {
      return normalNextMovesFrom(current);
    }

    let entryIndex = null;
    // To be at a time portal, there must be at least two in the location history
    for (let i = path.length - 2; i >= 0; --i) {
      const prev = path[i];
      if (metadata[prev].location.type === LocationType.TimePortal) {
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
          gemini1: ['sagittarius', 'b3', 'h1', 't3', 't5', 't2', 't4', 't3'],
          gemini2: ['sagittarius', 'b3', 'h1', 't3', 't5', 't2', 't5', 't3'],
        }
      }),
      spaceStations: {
        
      },
      messages: this.dumpMessages(),
      time: this.time,
    };
  }
};
