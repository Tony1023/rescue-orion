export interface GameState {
  data: Set<number>,
};

export const UPDATE_REQUEST = '@UPDATE_REQUEST';

export interface UpdateGameRequest {
  type: typeof UPDATE_REQUEST,
  payload: { set: Set<number> }
}
