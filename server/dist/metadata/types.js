"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENQUEUE_MESSAGES = exports.TRANSFER_RESCUE_RESOURCE = exports.TRANSFER_LIFE_SUPPORT_PACKS = exports.TRANSFER_ENERGY_CELLS = exports.DROP_OFF_RESCUE_RESOURCE = exports.PICK_UP_RESCUE_RESOURCE = exports.PICK_UP_SUPPLY_RESOURCE = exports.MOVE_SPACESHIP = exports.GameStatus = exports.RescueResource = exports.LocationType = exports.RoomSocketMessage = void 0;
var RoomSocketMessage;
(function (RoomSocketMessage) {
    RoomSocketMessage["StateUpdate"] = "@GameUpdate";
    RoomSocketMessage["Action"] = "@GameAction";
})(RoomSocketMessage = exports.RoomSocketMessage || (exports.RoomSocketMessage = {}));
var LocationType;
(function (LocationType) {
    LocationType[LocationType["BeaconStar"] = 0] = "BeaconStar";
    LocationType[LocationType["HyperGate"] = 1] = "HyperGate";
    LocationType[LocationType["TimePortal"] = 2] = "TimePortal";
})(LocationType = exports.LocationType || (exports.LocationType = {}));
;
;
;
var RescueResource;
(function (RescueResource) {
    RescueResource["O2ReplacementCells"] = "O2 Replacement Cells";
    RescueResource["FoodRepairTeam"] = "Food Repair Team";
    RescueResource["WaterRepairTeam"] = "Water Repair Team";
    RescueResource["MedicalRepairTeam"] = "Medical Repair Team";
    RescueResource["OxygenRepairTeam"] = "Oxygen Repair Team";
    RescueResource["AITechnology"] = "AI Technology";
})(RescueResource = exports.RescueResource || (exports.RescueResource = {}));
;
;
;
;
var GameStatus;
(function (GameStatus) {
    GameStatus[GameStatus["NotStarted"] = 0] = "NotStarted";
    GameStatus[GameStatus["Started"] = 1] = "Started";
    GameStatus[GameStatus["MissionSucceeded"] = 2] = "MissionSucceeded";
    GameStatus[GameStatus["MissionFailed"] = 3] = "MissionFailed";
})(GameStatus = exports.GameStatus || (exports.GameStatus = {}));
;
;
exports.MOVE_SPACESHIP = '@GameAction/moveSpaceship';
;
exports.PICK_UP_SUPPLY_RESOURCE = '@GameAction/pickUpSupplyResource';
;
exports.PICK_UP_RESCUE_RESOURCE = '@GameAction/pickUpRescueResource';
;
exports.DROP_OFF_RESCUE_RESOURCE = '@GameAction/dropOffRescueResource';
;
exports.TRANSFER_ENERGY_CELLS = '@GameAction/transferEnergyCells';
;
exports.TRANSFER_LIFE_SUPPORT_PACKS = '@GameAction/transferLifeSupportPacks';
;
exports.TRANSFER_RESCUE_RESOURCE = '@GameAction/transferRescueResource';
;
exports.ENQUEUE_MESSAGES = '@GameAction/enqueueMessages';
;
//# sourceMappingURL=types.js.map