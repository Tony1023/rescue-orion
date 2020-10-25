"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SpaceStation_1 = __importDefault(require("./SpaceStation"));
const RescueResource_1 = require("./RescueResource");
class SpaceStationBorealis extends SpaceStation_1.default {
    constructor(location, energyCells, lifeSupportPacks, resources, messageQueue) {
        super(location, energyCells, lifeSupportPacks, resources);
        this.messageQueue = messageQueue;
    }
    canPickUp(r) {
        if (this.rescueResources.includes(RescueResource_1.RescueResource.AITechnology) && this.rescueResources.includes(RescueResource_1.RescueResource.OxygenRepairTeam)) {
            if (this.rescueResources.includes(r)) {
                return true;
            }
        }
        return false;
    }
}
exports.default = SpaceStationBorealis;
//# sourceMappingURL=SpaceStationBorealis.js.map