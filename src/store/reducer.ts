import GameState from './GameState';
import {
  GameAction,
  MOVE_SPACESHIP,
} from './actions';

const initialGameState: GameState = {
  data: new Set<number>()
};

export default function(state = initialGameState, action: GameAction): GameState {
  switch (action.type) {
    case MOVE_SPACESHIP:
      state.data.add(1);
    default:
      break;
  }
  return state;
};
