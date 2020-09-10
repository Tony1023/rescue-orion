import GameState from './GameState';

export const MOVE_SPACESHIP = '@GameAction/moveSpaceship';
export interface MoveSpaceshipAction {
  type: string,
  payload: {
    gemini1: string,
    gemini2: string,
  },
};
export function moveSpaceship(nextMoves: {
  gemini1: string,
  gemini2: string,
}): MoveSpaceshipAction {
  return {
    type: MOVE_SPACESHIP,
    payload: nextMoves,
  };
}

export const PICKUP_SUPPLY_RESOURCE = '@GameAction/pickUpSupplyResource';
export interface PickUpSupplyResourceAction {
  type: string,
  payload: {
    from: string,
    to: string,
  },
};
export function pickUpSupplyResource(from: string, to: string): PickUpSupplyResourceAction {
  return {
    type: PICKUP_SUPPLY_RESOURCE,
    payload: {
      from: from, 
      to: to,
    },
  };
}

export const PICK_UP_RESCUE_RESOURCE = '@GameAction/pickUpRescueResource';
export interface PickUpRescueResourceAction {
  type: string,
  payload: {
    from: string,
    to: string, // rescue resource type
  },
};
export function pickUpRescueResource(from: string, to: string): PickUpRescueResourceAction {
  return {
    type: PICK_UP_RESCUE_RESOURCE,
    payload: {
      from: from, 
      to: to,
    },
  };
}

export const DROP_OFF_RESCUE_RESOURCE = '@GameAction/dropOffRescueResource';
export interface DropOffRescueResourceAction {
  type: string,
  payload: {
    from: string,
    to: string, // rescue resource type
  },
};
export function dropOffRescueResource(from: string, to: string): DropOffRescueResourceAction {
  return {
    type: DROP_OFF_RESCUE_RESOURCE,
    payload: {
      from: from, 
      to: to,
    },
  };
}

export const TRANSFER_ENERGY_CELLS = '@GameAction/transferEnergyCells';
export interface TransferEnergyCellsAction {
  type: string,
  payload: {
    from: string,
    to: string, // rescue resource type
  },
};
export function transferEnergyCells(from: string, to: string): TransferEnergyCellsAction {
  return {
    type: TRANSFER_ENERGY_CELLS,
    payload: {
      from: from, 
      to: to,
    },
  };
}

export const TRANSFER_LIFE_SUPPORT_PACKS = '@GameAction/transferLifeSupportPacks';
export interface TransferLifeSupportPacksAction {
  type: string,
  payload: {
    from: string,
    to: string, // rescue resource type
  },
};
export function transferLifeSupportPacks(from: string, to: string): TransferLifeSupportPacksAction {
  return {
    type: TRANSFER_LIFE_SUPPORT_PACKS,
    payload: {
      from: from, 
      to: to,
    },
  };
}

export const TRANSFER_RESCUE_RESOURCE = '@GameAction/transferRescueResource';
export interface TransferRescueResourceAction {
  type: string,
  payload: {
    from: string,
    to: string, // rescue resource type
  },
};
export function transferRescueResource(from: string, to: string): TransferRescueResourceAction {
  return {
    type: TRANSFER_RESCUE_RESOURCE,
    payload: {
      from: from, 
      to: to,
    },
  };
}

export const ENQUEUE_MESSAGES = '@GameAction/enqueueMessages';
export interface EnqueueMessagesAction {
  type: string,
  payload: {
    from: string,
    to: string, // rescue resource type
  },
};
export function enqueueMessages(from: string, to: string): EnqueueMessagesAction {
  return {
    type: ENQUEUE_MESSAGES,
    payload: {
      from: from, 
      to: to,
    },
  };
}

export const EMPTY_MESSAGES = '@GameAction/emptyMessages';
export interface EmptyMessagesAction {
  type: string,
  payload: {
    from: string,
    to: string, // rescue resource type
  },
};
export function emptyMessages(from: string, to: string): EmptyMessagesAction {
  return {
    type: EMPTY_MESSAGES,
    payload: {
      from: from, 
      to: to,
    },
  };
}

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
