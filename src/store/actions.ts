import * as Types from './types';

export function moveSpaceship(nextMoves: {
  [id: string]: string
}): Types.MoveSpaceshipAction {
  return {
    type: Types.MOVE_SPACESHIP,
    payload: nextMoves,
  };
}

export function pickUpSupplyResource(data: Types.Transfer): Types.PickUpSupplyResourceAction {
  return {
    type: Types.PICK_UP_SUPPLY_RESOURCE,
    payload: data,
  };
}

export function pickUpRescueResource(data: Types.TransferWithResourceType): Types.PickUpRescueResourceAction {
  return {
    type: Types.PICK_UP_RESCUE_RESOURCE,
    payload: data,
  };
}

export function dropOffRescueResource(data: Types.TransferWithResourceType): Types.DropOffRescueResourceAction {
  return {
    type: Types.DROP_OFF_RESCUE_RESOURCE,
    payload: data,
  };
}

export function transferEnergyCells(data: Types.TransferWithCount): Types.TransferEnergyCellsAction {
  return {
    type: Types.TRANSFER_ENERGY_CELLS,
    payload: data,
  };
}

export function transferLifeSupportPacks(data: Types.TransferWithCount): Types.TransferLifeSupportPacksAction {
  return {
    type: Types.TRANSFER_LIFE_SUPPORT_PACKS,
    payload: data,
  };
}

export function transferRescueResource(data: Types.TransferWithResourceType): Types.TransferRescueResourceAction {
  return {
    type: Types.TRANSFER_RESCUE_RESOURCE,
    payload: data,
  };
}

export function enqueueMessages(messages: string[]): Types.EnqueueMessagesAction {
  return {
    type: Types.ENQUEUE_MESSAGES,
    payload: messages,
  };
}
