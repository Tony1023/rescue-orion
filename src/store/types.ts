import { SpaceshipNextMoves } from "../classes/Game";

interface Spaceship {
  location: string,
  energyCells: number,
  lifeSupportPacks: number,
  // rescueResources: [],
}

interface SpaceStation {
  location: string,
  visited: boolean,
  information: string,
  energyCells: number,
  lifeSupportPacks: number,
  // rescueResources { [resource: type]: boolean }
}

export interface GameState {
  spaceships: {
    [id: string]: Spaceship,
  },
  nextMoves: SpaceshipNextMoves,
  spaceStations: {
    [id: string]: SpaceStation,
  },
  messages: string[],
  time: number,
};

export const MOVE_SPACESHIP = '@GameAction/moveSpaceship';
export interface MoveSpaceshipAction {
  type: string,
  payload: {
    gemini1: string,
    gemini2: string,
  },
};


export const PICKUP_SUPPLY_RESOURCE = '@GameAction/pickUpSupplyResource';
export interface PickUpSupplyResourceAction {
  type: string,
  payload: {
    from: string,
    to: string,
  },
};

export const PICK_UP_RESCUE_RESOURCE = '@GameAction/pickUpRescueResource';
export interface PickUpRescueResourceAction {
  type: string,
  payload: {
    from: string,
    to: string, // rescue resource type
  },
};

export const DROP_OFF_RESCUE_RESOURCE = '@GameAction/dropOffRescueResource';
export interface DropOffRescueResourceAction {
  type: string,
  payload: {
    from: string,
    to: string, // rescue resource type
  },
};

export const TRANSFER_ENERGY_CELLS = '@GameAction/transferEnergyCells';
export interface TransferEnergyCellsAction {
  type: string,
  payload: {
    from: string,
    to: string, // rescue resource type
  },
};

export const TRANSFER_LIFE_SUPPORT_PACKS = '@GameAction/transferLifeSupportPacks';
export interface TransferLifeSupportPacksAction {
  type: string,
  payload: {
    from: string,
    to: string, // rescue resource type
  },
};

export const TRANSFER_RESCUE_RESOURCE = '@GameAction/transferRescueResource';
export interface TransferRescueResourceAction {
  type: string,
  payload: {
    from: string,
    to: string, // rescue resource type
  },
};

export const ENQUEUE_MESSAGES = '@GameAction/enqueueMessages';
export interface EnqueueMessagesAction {
  type: string,
  payload: string[],
};

export const EMPTY_MESSAGES = '@GameAction/emptyMessages';
export interface EmptyMessagesAction {
  type: string,
  payload: {
    from: string,
    to: string, // rescue resource type
  },
};

export type GameAction = MoveSpaceshipAction
  | PickUpSupplyResourceAction
  | PickUpRescueResourceAction
  | DropOffRescueResourceAction
  | TransferEnergyCellsAction
  | TransferLifeSupportPacksAction
  | TransferRescueResourceAction
  | EnqueueMessagesAction
  | EmptyMessagesAction
;
