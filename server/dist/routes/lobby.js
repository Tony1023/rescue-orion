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
const repository_1 = __importStar(require("../repository"));
exports.default = (router, wss) => {
    router.delete('/', (req, res) => {
        const lobbyCode = parseInt(req.body.lobby);
        const lobby = repository_1.default.lobbies[lobbyCode];
        if (isNaN(lobbyCode) || !lobby) {
            res.status(404).send(`Lobby code ${req.body.lobby} not found!`);
            return;
        }
        lobby.destroy();
        res.status(200).send();
    });
    router.put('/start/:code', (req, res) => {
        const code = parseInt(req.params.code);
        const lobby = repository_1.default.lobbies[code];
        if (isNaN(code) || !lobby) {
            res.status(404).send(`Lobby code ${req.params.code} not found.`);
            return;
        }
        lobby.startGames();
        res.status(200).send();
    });
    router.put('/:code', (req, res) => {
        const code = parseInt(req.params.code);
        const lobby = repository_1.default.lobbies[code];
        if (isNaN(code) || !lobby) {
            res.status(404).send(`Lobby code ${req.params.code} not found.`);
            return;
        }
        const { countDown } = req.body;
        const countDownInSeconds = parseInt(countDown);
        if (isNaN(countDownInSeconds) || countDownInSeconds <= 0) {
            res.status(403).send('Bad count down range.');
            return;
        }
        if (lobby.status !== repository_1.LobbyStatus.Waiting) {
            res.status(403).send('Cannot set count down for started or finished lobbies.');
            return;
        }
        lobby.setCountDown(countDownInSeconds);
        res.status(200).send();
    });
    wss.use((socket, next) => {
    }).on('connection', (socket) => {
    });
};
//# sourceMappingURL=lobby.js.map