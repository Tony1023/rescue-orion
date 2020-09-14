import * as Types from './types';

import Game from '../classes/Game';

let game = new Game();
game.load();

export default function reduce(state = game.toGameState(), action: Types.GameAction): Types.GameState {
  switch (action.type) {
    case Types.MOVE_SPACESHIP: {
      game.moveSpaceships((action as Types.MoveSpaceshipAction).payload);
      game.advanceTime();
      break;
    }
    case Types.PICK_UP_SUPPLY_RESOURCE: {
      const transfer = (action as Types.PickUpSupplyResourceAction).payload;
      game.transferEnergyCells(transfer.from, transfer.to);
      game.transferLifeSupportPacks(transfer.from, transfer.to);
      break;
    }
    case Types.PICK_UP_RESCUE_RESOURCE: {
      const transfer = (action as Types.PickUpRescueResourceAction).payload;
      game.transferRescueResource(transfer.from, transfer.to, transfer.type);
      break;
    }
    case Types.DROP_OFF_RESCUE_RESOURCE: {
      const transfer = (action as Types.PickUpRescueResourceAction).payload;
      game.transferRescueResource(transfer.from, transfer.to, transfer.type);
      break;
    }
    case Types.TRANSFER_ENERGY_CELLS: {
      const transfer = (action as Types.TransferEnergyCellsAction).payload;
      game.transferEnergyCells(transfer.from, transfer.to, transfer.count);
      break;
    }
    case Types.TRANSFER_LIFE_SUPPORT_PACKS: {
      const transfer = (action as Types.TransferLifeSupportPacksAction).payload;
      game.transferLifeSupportPacks(transfer.from, transfer.to, transfer.count);
      break;
    }
    case Types.TRANSFER_RESCUE_RESOURCE: {
      const transfer = (action as Types.TransferRescueResourceAction).payload;
      game.transferRescueResource(transfer.from, transfer.to, transfer.type);
      break;
    }
    case Types.ENQUEUE_MESSAGES: {
      let messages = (action as Types.EnqueueMessagesAction).payload;
      messages.concat(game.dumpMessages());
      let newState = {...state};
      newState.messages = messages;
      return newState;
    }
  }
  return game.toGameState();
};
