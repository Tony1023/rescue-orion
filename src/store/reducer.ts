import {
  GameState,
  GameAction,
  MOVE_SPACESHIP,
} from './types';

import Game from '../classes/Game';

const game = new Game();

export default function(_: GameState | undefined, action: GameAction): GameState {
  switch (action.type) {
    case MOVE_SPACESHIP:
      // game.moveSpaceship;
    default:
      break;
  }
  return game.toGameState();
};
