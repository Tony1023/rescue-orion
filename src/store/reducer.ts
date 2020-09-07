import {
  GameState,
  UPDATE_REQUEST,
  UpdateGameRequest,
} from './types';

const initialGameState: GameState = {
  data: new Set<number>()
};

export default (state = initialGameState, action: UpdateGameRequest): GameState => {
  console.log('Received action: ', state);
  if (action.type === UPDATE_REQUEST) {
    state.data = action.payload.set;
  }
  return state;
};
