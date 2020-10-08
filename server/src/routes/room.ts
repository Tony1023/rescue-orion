import express from 'express';
import WebSocket from 'ws';
import Game from '../classes/Game';
import * as Types from '../metadata/types';

let rooms: {
  [room: string]: Game
} = {};

module.exports = (app: express.Express, wss: WebSocket.Server) => {

  wss.on('connection', (ws) => {
    let game: Game;
    ws.on('message', (json) => {
      const message = JSON.parse(json.toString());
      console.log(message);
      const type = message.type;
      const payload = message.payload;
      if (!(type && payload)) {
        ws.close();
        return;
      }
      switch (message.type) {
        case '@Auth':
          if (payload.password === 'asdf') {
            if (rooms[payload.room]) {
              game = rooms[payload.room];
            } else {
              game = new Game();
              game.load();
              rooms[payload.room] = game;
            }
            console.log(game.toGameState());
            ws.send(JSON.stringify({
              type: '@GameUpdate',
              payload: game.toGameState(),
            }))
          }
          break;
        
        default:
          if (type.startsWith('@GameAction/')) {
            const newState = applyAction(game, message);
            ws.send(JSON.stringify({
              type: '@GameUpdate',
              payload: newState,
            }));
          }
          break;
      }
    });
  });

}

function applyAction(game: Game, action: Types.GameAction): Types.GameState {
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
    }
    default:
      break;
  }
  return game.toGameState();
};
