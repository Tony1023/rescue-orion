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
const Game_1 = __importDefault(require("./classes/Game"));
const types_1 = require("../metadata/types");
const Types = __importStar(require("../metadata/types"));
const metadata_1 = require("../metadata");
const IDs = __importStar(require("../metadata/agent-ids"));
class Room {
    constructor() {
        this.game = new Game_1.default();
        this.socket = null;
        this.game.load();
    }
    sendUpdate() {
        var _a;
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.emit(types_1.RoomSocketMessage.StateUpdate, JSON.stringify(this.game.toGameState()));
    }
    startGameIfNot() {
        if (this.game.status === Types.GameStatus.NotStarted) {
            this.game.status = Types.GameStatus.Started;
            this.game.pushMessage(metadata_1.spaceStationData[IDs.SAGITTARIUS].message);
        }
    }
    destroy() {
        this.setSocketAndPushUpdate(null);
    }
    setSocketAndPushUpdate(socket) {
        if (this.socket) {
            this.socket.disconnect();
        }
        this.socket = socket;
        this.sendUpdate();
    }
    onSocketDisconnect() {
        this.socket = null;
    }
    onTick(countDown, timeElapsed) {
        this.game.onTick(countDown, timeElapsed);
        this.sendUpdate();
    }
    applyGameAction(action) {
        if (this.game.status !== Types.GameStatus.Started) {
            return;
        }
        switch (action.type) {
            case Types.MOVE_SPACESHIP: {
                this.game.moveSpaceships(action.payload);
                this.game.advanceTime();
                break;
            }
            case Types.PICK_UP_SUPPLY_RESOURCE: {
                const transfer = action.payload;
                this.game.transferEnergyCells(transfer.from, transfer.to);
                this.game.transferLifeSupportPacks(transfer.from, transfer.to);
                break;
            }
            case Types.PICK_UP_RESCUE_RESOURCE: {
                const transfer = action.payload;
                this.game.transferRescueResource(transfer.from, transfer.to, transfer.type);
                break;
            }
            case Types.DROP_OFF_RESCUE_RESOURCE: {
                const transfer = action.payload;
                this.game.transferRescueResource(transfer.from, transfer.to, transfer.type);
                break;
            }
            case Types.TRANSFER_ENERGY_CELLS: {
                const transfer = action.payload;
                this.game.transferEnergyCells(transfer.from, transfer.to, transfer.count);
                break;
            }
            case Types.TRANSFER_LIFE_SUPPORT_PACKS: {
                const transfer = action.payload;
                this.game.transferLifeSupportPacks(transfer.from, transfer.to, transfer.count);
                break;
            }
            case Types.TRANSFER_RESCUE_RESOURCE: {
                const transfer = action.payload;
                this.game.transferRescueResource(transfer.from, transfer.to, transfer.type);
            }
            default:
                break;
        }
        this.sendUpdate();
    }
    ;
}
exports.default = Room;
//# sourceMappingURL=room.js.map