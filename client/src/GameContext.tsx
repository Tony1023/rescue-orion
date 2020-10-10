import { createContext } from "react";
import { GameState } from "./metadata/types";

interface Context {
  socket?: SocketIOClient.Socket,
  gameState?: GameState,
}

const defaultValue: Context = {};

const context = createContext(defaultValue);

export default context;