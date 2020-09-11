import * as Types from './types';

export function moveSpaceship(nextMoves: {
  gemini1: string,
  gemini2: string,
}): Types.MoveSpaceshipAction {
  return {
    type: Types.MOVE_SPACESHIP,
    payload: nextMoves,
  };
}

export function pickUpSupplyResource(from: string, to: string): Types.PickUpSupplyResourceAction {
  return {
    type: Types.PICKUP_SUPPLY_RESOURCE,
    payload: {
      from: from, 
      to: to,
    },
  };
}

export function pickUpRescueResource(from: string, to: string): Types.PickUpRescueResourceAction {
  return {
    type: Types.PICK_UP_RESCUE_RESOURCE,
    payload: {
      from: from, 
      to: to,
    },
  };
}

export function dropOffRescueResource(from: string, to: string): Types.DropOffRescueResourceAction {
  return {
    type: Types.DROP_OFF_RESCUE_RESOURCE,
    payload: {
      from: from, 
      to: to,
    },
  };
}

export function transferEnergyCells(from: string, to: string): Types.TransferEnergyCellsAction {
  return {
    type: Types.TRANSFER_ENERGY_CELLS,
    payload: {
      from: from, 
      to: to,
    },
  };
}

export function transferLifeSupportPacks(from: string, to: string): Types.TransferLifeSupportPacksAction {
  return {
    type: Types.TRANSFER_LIFE_SUPPORT_PACKS,
    payload: {
      from: from, 
      to: to,
    },
  };
}

export function transferRescueResource(from: string, to: string): Types.TransferRescueResourceAction {
  return {
    type: Types.TRANSFER_RESCUE_RESOURCE,
    payload: {
      from: from, 
      to: to,
    },
  };
}

export function enqueueMessages(from: string, to: string): Types.EnqueueMessagesAction {
  return {
    type: Types.ENQUEUE_MESSAGES,
    payload: {
      from: from, 
      to: to,
    },
  };
}

export function emptyMessages(from: string, to: string): Types.EmptyMessagesAction {
  return {
    type: Types.EMPTY_MESSAGES,
    payload: {
      from: from, 
      to: to,
    },
  };
}
