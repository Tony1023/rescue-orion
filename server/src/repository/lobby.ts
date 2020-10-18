import io from 'socket.io';
import CountDownClock from './countdown-clock';
import Room from './room';
import repository from './index';
import { LobbyState, LobbyUpdate } from '../metadata/types';

export enum LobbyStatus {
  Waiting,
  Started,
  Finished,
}

class Lobby {

  constructor(code: number, admin: string) {
    this.code = code;
    this.admin = admin;
    this.countDownClock.onTimeUp = () => {
      setTimeout(() => this.destroy(), 2 * 60 * 60);
    }
    this.countDownClock.onTick = () => {
      this.tickRooms();
      this.sendUpdate();
    }
  }

  private sockets: io.Socket[] = [];
  private rooms: { [name: string]: Room } = {};
  private code: number;
  private admin: string;
  private countDownClock = new CountDownClock(75 * 60);
  status = LobbyStatus.Waiting;

  private tickRooms() {
    Object.values(this.rooms).forEach((room) => 
      room.onTick(this.countDownClock.getSecondsRemaining(), this.countDownClock.getSecondsElapsed())
    );
  }

  startGames() {
    if (this.status === LobbyStatus.Waiting) {
      this.status = LobbyStatus.Started;
      Object.values(this.rooms).forEach((room) => room.startGameIfNot());
      this.countDownClock.start();
    }
  }

  isRoomNameTaken(name: string) {
    return this.rooms[name] !== undefined;
  }

  insertRoom(name: string) {
    const room = new Room();
    if (this.status === LobbyStatus.Started) {
      room.startGameIfNot();
    }
    room.onTick(this.countDownClock.getSecondsRemaining(), this.countDownClock.getSecondsElapsed());
    this.rooms[name] = room;
    this.sendUpdate();
  }

  findRoom(name: string) {
    return this.rooms[name];
  }

  setCountDown(from: number) {
    if (this.status === LobbyStatus.Waiting) {
      this.countDownClock.setCountDownTime(from);
      this.tickRooms();
    }
  }

  destroy() {
    this.countDownClock.stop();
    Object.values(this.rooms).forEach((room) => room.destroy());
    const index = repository.adminLobbies[this.admin]?.indexOf(this.code);
    if (index >= 0) {
      repository.adminLobbies[this.admin]?.splice(index, 1);
    }
    delete repository.lobbies[this.code];
  }

  addSocket(socket: io.Socket) {
    this.sockets.push(socket);
    socket.on('disconnect', () => {
      const index = this.sockets.indexOf(socket);
      delete this.sockets[index];
    });
    socket.emit(LobbyUpdate, JSON.stringify(Object.keys(this.rooms).reduce((accumulator: LobbyState, name: string) => {
      accumulator[name] = this.rooms[name].getGameState();
      return accumulator;
    }, {})));
  }

  // Streamed each second tick & new room joins & new admin joins
  private sendUpdate() {
    this.sockets.forEach((socket) =>
      socket.emit(LobbyUpdate, JSON.stringify(Object.keys(this.rooms).reduce((accumulator: LobbyState, name: string) => {
        accumulator[name] = this.rooms[name].getGameState();
        return accumulator;
      }, {})))
    );
  }
}

export default Lobby;