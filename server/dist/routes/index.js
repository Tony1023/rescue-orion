"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const room_1 = __importDefault(require("./room"));
const lobby_1 = __importDefault(require("./lobby"));
const socket_io_1 = __importDefault(require("socket.io"));
exports.default = (app, server) => {
    const lobbyWss = socket_io_1.default().path('/lobbies/socket').attach(server);
    const lobbyRouter = express_1.default.Router();
    app.use('/lobbies', lobbyRouter);
    lobby_1.default(lobbyRouter, lobbyWss);
    const roomWss = socket_io_1.default().path('/rooms/socket').attach(server);
    const roomRouter = express_1.default.Router();
    app.use('/rooms', roomRouter);
    room_1.default(roomRouter, roomWss);
    /** Dev only stuff below, will be removed close to the end */
    const devWss = socket_io_1.default().path('/dev').attach(server);
    devRoute(devWss);
};
const repository_1 = require("../repository");
const Types = __importStar(require("../metadata/types"));
function devRoute(wss) {
    const lobby = new repository_1.Lobby(12306, 'admin');
    if (!lobby.isRoomNameTaken('room')) {
        lobby.insertRoom('room');
    }
    const room = lobby.findRoom('room');
    wss.on('connection', (socket) => {
        lobby.startGames();
        room.setSocketAndPushUpdate(socket);
        socket.on(Types.RoomSocketMessage.Action, (json) => {
            const action = JSON.parse(json.toString());
            room.applyGameAction(action);
        });
        socket.on('disconnect', () => {
            room.onSocketDisconnect();
        });
    });
}
//# sourceMappingURL=index.js.map