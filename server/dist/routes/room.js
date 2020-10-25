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
Object.defineProperty(exports, "__esModule", { value: true });
const Types = __importStar(require("../metadata/types"));
const repository_1 = __importStar(require("../repository"));
exports.default = (router, wss) => {
    router.post('/', (req, res) => {
        const lobbyCode = parseInt(req.body.lobby);
        let lobby = repository_1.default.lobbies[lobbyCode];
        if (isNaN(lobbyCode) || !lobby) {
            res.status(404).send(`Lobby code ${req.body.lobby} not found!`);
            // return;
            lobby = new repository_1.Lobby(lobbyCode, 'me');
        }
        repository_1.default.lobbies[lobbyCode] = lobby;
        const roomName = req.body.room;
        if (lobby.isRoomNameTaken(roomName)) {
            res.status(403).send(`Room name ${roomName} already taken.`);
            return;
        }
        if (lobby.status === repository_1.LobbyStatus.Finished) {
            res.status(403).send('Lobby is no longer accepting players.');
            return;
        }
        lobby.insertRoom(roomName);
        res.status(200).send();
    });
    wss.use((socket, next) => {
        const query = socket.handshake.query;
        const lobbyCode = parseInt(query === null || query === void 0 ? void 0 : query.lobby);
        const lobby = repository_1.default.lobbies[lobbyCode];
        if (isNaN(lobbyCode) || !lobby) {
            next(new Error(`Lobby code ${query === null || query === void 0 ? void 0 : query.lobby} not found!`));
            return;
        }
        const roomName = query === null || query === void 0 ? void 0 : query.room;
        const room = lobby.findRoom(roomName);
        if (!roomName || !room) {
            next(new Error(`Room ${roomName} not found!`));
            return;
        }
        socket.handshake.query.room = room;
        next();
    }).on('connection', (socket) => {
        const room = socket.handshake.query.room;
        room.setSocketAndPushUpdate(socket);
        socket.on(Types.RoomSocketMessage.Action, (json) => {
            const action = JSON.parse(json.toString());
            room.applyGameAction(action);
        });
        socket.on('disconnect', () => {
            room.onSocketDisconnect();
        });
    });
};
//# sourceMappingURL=room.js.map