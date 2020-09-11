import { GameState } from '../store/types';
import { computeNextMoves } from '../utils';

export default class Game {

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
      nextMoves: computeNextMoves({
        spaceships: {
          gemini1: ['sagittarius', 'b3', 'b2'],
          gemini2: ['sagittarius', 'b3', 'h1'] 
        }
      }),
      spaceStations: {
        
      },
      messages: [],
      time: 2,
    };
  }
};
