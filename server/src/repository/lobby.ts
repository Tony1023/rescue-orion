import CountDownClock from './countdown-clock';
import Room from './room';
import repository from './index';

class Lobby {

  constructor(code: number, admin: string) {
    this.code = code;
    this.admin = admin;
    this.countDownClock.onTimeUp = () => this.destroy();
    this.countDownClock.start();
  }

  rooms: { [name: string]: Room } = {};

  private code: number;
  private admin: string;
  private countDownClock = new CountDownClock(4 * 60 * 60); // four hours

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