"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LobbyStatus = exports.Lobby = exports.Room = void 0;
;
const repository = {
    adminLobbies: {},
    lobbies: {},
};
exports.default = repository;
var room_1 = require("./room");
Object.defineProperty(exports, "Room", { enumerable: true, get: function () { return __importDefault(room_1).default; } });
var lobby_1 = require("./lobby");
Object.defineProperty(exports, "Lobby", { enumerable: true, get: function () { return __importDefault(lobby_1).default; } });
Object.defineProperty(exports, "LobbyStatus", { enumerable: true, get: function () { return lobby_1.LobbyStatus; } });
//# sourceMappingURL=index.js.map