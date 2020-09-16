import { SpaceshipNextMoves } from "../classes/Game";
import { RescueResource } from "../classes/RescueResource";

export interface PlainSpaceship {
  location: string,
  energyCells: number,
  lifeSupportPacks: number,
  rescueResources: RescueResource[],
  isInTimePortal: boolean,
};

export interface PlainSpaceStation {
  visited: boolean,
  location: string,
  energyCells: number,
  lifeSupportPacks: number,
  rescueResources: RescueResource[],
  canPickUp: { [resource: string]: boolean },
};

export interface GameState {
  spaceships: {
    [id: string]: PlainSpaceship,
  },
  nextMoves: SpaceshipNextMoves,
  spaceStations: {
    [id: string]: PlainSpaceStation,
  },
  messages: string[],
  time: number,
};

export interface Transfer {
  from: string,
  to: string,
}

export interface TransferWithCount extends Transfer {
  count: number,
}

export interface TransferWithResourceType extends Transfer {
  type: RescueResource,
}

export const MOVE_SPACESHIP = '@GameAction/moveSpaceship';
export interface MoveSpaceshipAction {
  type: string,
  payload: { [id: string]: string },
};


export const PICK_UP_SUPPLY_RESOURCE = '@GameAction/pickUpSupplyResource';
export interface PickUpSupplyResourceAction {
  type: string,
  payload: Transfer,
};

export const PICK_UP_RESCUE_RESOURCE = '@GameAction/pickUpRescueResource';
export interface PickUpRescueResourceAction {
  type: string,
  payload: TransferWithResourceType,
};

export const DROP_OFF_RESCUE_RESOURCE = '@GameAction/dropOffRescueResource';
export interface DropOffRescueResourceAction {
  type: string,
  payload: TransferWithResourceType,
};

export const TRANSFER_ENERGY_CELLS = '@GameAction/transferEnergyCells';
export interface TransferEnergyCellsAction {
  type: string,
  payload: TransferWithCount,
};

export const TRANSFER_LIFE_SUPPORT_PACKS = '@GameAction/transferLifeSupportPacks';
export interface TransferLifeSupportPacksAction {
  type: string,
  payload: TransferWithCount,
};

export const TRANSFER_RESCUE_RESOURCE = '@GameAction/transferRescueResource';
export interface TransferRescueResourceAction {
  type: string,
  payload: TransferWithResourceType,
};

export const ENQUEUE_MESSAGES = '@GameAction/enqueueMessages';
export interface EnqueueMessagesAction {
  type: string,
  payload: string[],
};

export type GameAction = MoveSpaceshipAction
  | PickUpSupplyResourceAction
  | PickUpRescueResourceAction
  | DropOffRescueResourceAction
  | TransferEnergyCellsAction
  | TransferLifeSupportPacksAction
  | TransferRescueResourceAction
  | EnqueueMessagesAction
;
