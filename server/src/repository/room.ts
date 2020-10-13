import Game from './classes/Game';
import io from 'socket.io';
import { RoomSocketMessage } from '../metadata/types';
import * as Types from '../metadata/types';
import CountDownClock from './countdown-clock';

class Room {

  constructor() {
    this.game.load();
    this.countDownClock.onTick = () => {
      this.game.onTick(this.countDownClock.getSecondsElapsed());
      this.sendUpdate();
    }
  }

  private game: Game = new Game();
  private socket: io.Socket = null;
  private countDownClock = new CountDownClock(75 * 60);

  sendUpdate() {
    this.socket?.emit(RoomSocketMessage.StateUpdate, JSON.stringify(this.game.toGameState()));
  }

  startGameIfNot() {
    if (this.game.status === Types.GameStatus.NotStarted) {
      this.game.status = Types.GameStatus.Started;
      this.countDownClock.start();
    }
  }

  destroy() {
    this.countDownClock.stop();
    this.setSocket(null);
  }

  setSocket(socket: io.Socket) {
    if (this.socket) {
      this.socket.disconnect();
    }
    this.socket = socket;
  }

  onSocketDisconnect() {
    this.socket = null;
  }

  applyGameAction(action: Types.GameAction) {
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
  };

}

export default Room;