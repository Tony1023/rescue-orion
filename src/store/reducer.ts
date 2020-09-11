import * as Types from './types';

import Game from '../classes/Game';

let game = new Game();

export default function reduce(state = game.toGameState(), action: Types.GameAction): Types.GameState {
  console.log(state);
  switch (action.type) {
    case Types.MOVE_SPACESHIP:
      // game.moveSpaceship;
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
