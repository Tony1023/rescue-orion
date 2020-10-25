import { useContext } from 'react';
import GameContext from './game-context';
import * as Types from '../metadata/types';

export function useSelector<TSelected = unknown>(
  selector: (state: Types.GameState) => TSelected
): TSelected {
  const context = useContext(GameContext);
  const state = context.gameState!;
  return selector(state);
}

export function useTime(): Types.GameDuration {
  const context = useContext(GameContext);
  return context.gameDuration!;
}

export function useDispatch() {
  const context = useContext(GameContext);
  return (action: Types.GameAction) => {
    context.socket?.emit(Types.SocketMessages.Action, JSON.stringify(action));
  }
}