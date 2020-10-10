import express from 'express';
import Game from '../classes/Game';
import * as Types from '../metadata/types';
import io from 'socket.io';

const rooms: {
  [room: string]: Game
} = {};

export default (router: express.Router, wss: io.Server) => {

  wss.use((socket, next) => {
    const query = socket.handshake.query;
    if (query?.room && query?.lobby) {
      // TODO: only check if room and lobby are correct
      if (!rooms[query.room]) {
        const game = new Game();
        game.load();
        rooms[query.room] = game;
      }
      query.game = rooms[query.room];
      next();
    }
  }).on('connection', (socket) => {
    const game = socket.handshake.query.game as Game;
    if (game.getStatus() === Types.GameStatus.NotStarted) {
      game.start();
    }
    if (game.socket) { // kick the existing one off
      game.socket.disconnect();
    }
    game.socket = socket;
    game.sendUpdate();

    socket.on(Types.RoomSocketMessage.Action, (json) => {
      const message = JSON.parse(json.toString());
      applyAction(game, message);
      game.sendUpdate();
    })
    
    socket.on('disconnect', () => {
      const { game } = socket.handshake.query;
      game.socket = null;
    });
  });

}

function applyAction(game: Game, action: Types.GameAction) {
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
};
