import CountDownClock from './countdown-clock';
import Room from './room';
import repository from './index';

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
    this.countDownClock.onTick = () => this.tickRooms();
  }

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
    if (index) {
      repository.adminLobbies[this.admin]?.splice(index, 1);
    }
    delete repository.lobbies[this.code];
  }
}

export default Lobby;