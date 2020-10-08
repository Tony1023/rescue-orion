import { createContext } from "react";
import { GameState } from "./store/types";

interface Context {
  socket?: WebSocket,
  gameState?: GameState,
}

const defaultValue: Context = {};

const context = createContext(defaultValue);

export default context;