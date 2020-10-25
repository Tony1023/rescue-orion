import Game from './classes/Game';
import io from 'socket.io';
import { SocketMessages } from '../metadata/types';
import * as Types from '../metadata/types';
import { spaceStationData } from '../metadata';
import * as IDs from '../metadata/agent-ids';
import CountDownClock from './countdown-clock';


class Room {

  constructor(countDownClock: CountDownClock) {
    this.game = new Game(countDownClock);
    this.game.load();
    countDownClock.subscribeTick(() => {
      if (this.game.status === Types.GameStatus.NotStarted || this.game.status === Types.GameStatus.Started) {
        this.sendTimeUpdate();
        if (this.game.newMessage) {
          this.sendGameUpdate();
        }
      }
    });
    this.countDownClock = countDownClock;
  }

  private game;
  private socket: io.Socket = null;
  private countDownClock: CountDownClock;
  dirty = true;

  private sendGameUpdate() {
    this.socket?.emit(SocketMessages.StateUpdate, JSON.stringify(this.game.toGameState()));
  }

  private sendTimeUpdate() {
    this.socket?.emit(SocketMessages.TimeUpdate, JSON.stringify(this.countDownClock.getGameDuration()));
  }

  startGameIfNot() {
    if (this.game.status === Types.GameStatus.NotStarted) {
      this.game.status = Types.GameStatus.Started;
      this.game.pushMessage(spaceStationData[IDs.SAGITTARIUS].message);
      this.sendGameUpdate();
    }
  }

  getGameState() {
    return this.game.toGameState(false);
  }

  destroy() {
    this.setSocketAndPushUpdate(null);
  }

  setSocketAndPushUpdate(socket: io.Socket) {
    if (this.socket) {
      this.socket.disconnect();
    }
    this.socket = socket;
    this.sendGameUpdate();
    this.sendTimeUpdate();
  }

  onSocketDisconnect() {
    this.socket = null;
  }

  applyGameAction(action: Types.GameAction) {
    if (this.game.status !== Types.GameStatus.Started) { return; }
    this.dirty = true;
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
        break;
      }
      case Types.ABORT_MISSION: {
        this.game.endMission(false);
      }
      default:
        break;
    }
    this.sendGameUpdate();
  };

}

export default Room;