import Game from './classes/Game';
import io from 'socket.io';
import { RoomSocketMessage } from '../metadata/types';
import * as Types from '../metadata/types';
import { spaceStationData } from '../metadata';
import * as IDs from '../metadata/agent-ids';


class Room {
  
  constructor() {
    this.game.load();
  }

  private game: Game = new Game();
  private socket: io.Socket = null;
  
  private sendUpdate() {
    this.socket?.emit(RoomSocketMessage.StateUpdate, JSON.stringify(this.game.toGameState()));
  }
  
  startGameIfNot() {
    if (this.game.status === Types.GameStatus.NotStarted) {
      this.game.status = Types.GameStatus.Started;
      this.game.pushMessage(spaceStationData[IDs.SAGITTARIUS].message);
    }
  }

  destroy() {
    this.setSocketAndPushUpdate(null);
  }

  setSocketAndPushUpdate(socket: io.Socket) {
    if (this.socket) {
      this.socket.disconnect();
    }
    this.socket = socket;
    this.sendUpdate();
  }

  onSocketDisconnect() {
    this.socket = null;
  }

  onTick(countDown: number, timeElapsed: number) {
    this.game.onTick(countDown, timeElapsed);
    this.sendUpdate();
  }

  applyGameAction(action: Types.GameAction) {
    if (this.game.status !== Types.GameStatus.Started) { return; }
    switch (action.type) {
      case Types.MOVE_SPACESHIP: {
        this.game.moveSpaceships((action as Types.MoveSpaceshipAction).payload);
        this.game.advanceTime();
        break;
      }
      case Types.PICK_UP_SUPPLY_RESOURCE: {
        const transfer = (action as Types.PickUpSupplyResourceAction).payload;
        this.game.transferEnergyCells(transfer.from, transfer.to);
        this.game.transferLifeSupportPacks(transfer.from, transfer.to);
        break;
      }
      case Types.PICK_UP_RESCUE_RESOURCE: {
        const transfer = (action as Types.PickUpRescueResourceAction).payload;
        this.game.transferRescueResource(transfer.from, transfer.to, transfer.type);
        break;
      }
      case Types.DROP_OFF_RESCUE_RESOURCE: {
        const transfer = (action as Types.PickUpRescueResourceAction).payload;
        this.game.transferRescueResource(transfer.from, transfer.to, transfer.type);
        break;
      }
      case Types.TRANSFER_ENERGY_CELLS: {
        const transfer = (action as Types.TransferEnergyCellsAction).payload;
        this.game.transferEnergyCells(transfer.from, transfer.to, transfer.count);
        break;
      }
      case Types.TRANSFER_LIFE_SUPPORT_PACKS: {
        const transfer = (action as Types.TransferLifeSupportPacksAction).payload;
        this.game.transferLifeSupportPacks(transfer.from, transfer.to, transfer.count);
        break;
      }
      case Types.TRANSFER_RESCUE_RESOURCE: {
        const transfer = (action as Types.TransferRescueResourceAction).payload;
        this.game.transferRescueResource(transfer.from, transfer.to, transfer.type);
      }
      default:
        break;
    }
    this.sendUpdate();
  };

}

export default Room;