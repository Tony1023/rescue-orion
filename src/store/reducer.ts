import * as Types from './types';

import Game from '../classes/Game';

let game = new Game();
game.load();

export default function reduce(state = game.toGameState(), action: Types.GameAction): Types.GameState {
  switch (action.type) {
    case Types.MOVE_SPACESHIP:
      console.log(action.payload);
      game.moveSpaceships((action as Types.MoveSpaceshipAction).payload);
      game.advanceTime();
      break;
    case Types.ENQUEUE_MESSAGES:
      let messages = (action as Types.EnqueueMessagesAction).payload;
      messages.concat(game.dumpMessages());
      let newState = {...state};
      newState.messages = messages;
      return newState;
    default:
      return state;
  }
  return game.toGameState();
};
