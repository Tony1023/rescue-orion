import {
  UpdateGameRequest,
  UPDATE_REQUEST,
} from './types';

export const updateGame = (set: Set<number>): UpdateGameRequest => {
  console.log('Generate action: ', set);
  return {
    type: UPDATE_REQUEST,
    payload: { set },
  };
}