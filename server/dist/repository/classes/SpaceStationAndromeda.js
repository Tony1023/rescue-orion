"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SpaceStation_1 = __importDefault(require("./SpaceStation"));
const RescueResource_1 = require("./RescueResource");
class SpaceStationAndromeda extends SpaceStation_1.default {
    onDayUpdate(day) {
        if (day === 13) { // to be available at day 14
            this.rescueResources.push(RescueResource_1.RescueResource.FoodRepairTeam);
        }
    }
}
exports.default = SpaceStationAndromeda;
//# sourceMappingURL=SpaceStationAndromeda.js.map