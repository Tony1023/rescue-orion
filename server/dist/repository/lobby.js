"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LobbyStatus = void 0;
const countdown_clock_1 = __importDefault(require("./countdown-clock"));
const room_1 = __importDefault(require("./room"));
const index_1 = __importDefault(require("./index"));
var LobbyStatus;
(function (LobbyStatus) {
    LobbyStatus[LobbyStatus["Waiting"] = 0] = "Waiting";
    LobbyStatus[LobbyStatus["Started"] = 1] = "Started";
    LobbyStatus[LobbyStatus["Finished"] = 2] = "Finished";
})(LobbyStatus = exports.LobbyStatus || (exports.LobbyStatus = {}));
class Lobby {
    constructor(code, admin) {
        this.rooms = {};
        this.countDownClock = new countdown_clock_1.default(75 * 60);
        this.status = LobbyStatus.Waiting;
        this.code = code;
        this.admin = admin;
        this.countDownClock.onTimeUp = () => {
            setTimeout(() => this.destroy(), 2 * 60 * 60);
        };
        this.countDownClock.onTick = () => this.tickRooms();
    }
    tickRooms() {
        Object.values(this.rooms).forEach((room) => room.onTick(this.countDownClock.getSecondsRemaining(), this.countDownClock.getSecondsElapsed()));
    }
    startGames() {
        if (this.status === LobbyStatus.Waiting) {
            this.status = LobbyStatus.Started;
            Object.values(this.rooms).forEach((room) => room.startGameIfNot());
            this.countDownClock.start();
        }
    }
    isRoomNameTaken(name) {
        return this.rooms[name] !== undefined;
    }
    insertRoom(name) {
        const room = new room_1.default();
        if (this.status === LobbyStatus.Started) {
            room.startGameIfNot();
        }
        room.onTick(this.countDownClock.getSecondsRemaining(), this.countDownClock.getSecondsElapsed());
        this.rooms[name] = room;
    }
    findRoom(name) {
        return this.rooms[name];
    }
    setCountDown(from) {
        if (this.status === LobbyStatus.Waiting) {
            this.countDownClock.setCountDownTime(from);
            this.tickRooms();
        }
    }
    destroy() {
        var _a, _b;
        this.countDownClock.stop();
        Object.values(this.rooms).forEach((room) => room.destroy());
        const index = (_a = index_1.default.adminLobbies[this.admin]) === null || _a === void 0 ? void 0 : _a.indexOf(this.code);
        if (index) {
            (_b = index_1.default.adminLobbies[this.admin]) === null || _b === void 0 ? void 0 : _b.splice(index, 1);
        }
        delete index_1.default.lobbies[this.code];
    }
}
exports.default = Lobby;
//# sourceMappingURL=lobby.js.map