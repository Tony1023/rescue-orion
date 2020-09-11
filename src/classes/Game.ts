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
    const current = path[path.length - 1];
    if (metadata[current].location.type !== LocationType.TimePortal) {
      let neighbors = metadata[current].neighbors;
      neighbors.push(current);
      return neighbors;
    }
    return metadata[current].neighbors;
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
          gemini1: ['sagittarius', 'b3', 'b2'],
          gemini2: ['sagittarius', 'b3', 'h1'] 
        }
      }),
      spaceStations: {
        
      },
      messages: this.dumpMessages(),
      time: this.time,
    };
  }
};
