"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Spaceship_1 = __importDefault(require("./Spaceship"));
class Gemini_2 extends Spaceship_1.default {
    constructor(gemini_1, energyCells, lifeSupportPacks, resources) {
        super(energyCells, lifeSupportPacks, resources);
        this.gemini_1 = gemini_1;
    }
    onDayUpdate(day) {
        const current = this.path[this.path.length - 1];
        const prev = this.path[this.path.length - 2];
        const gemini_1Path = this.gemini_1.getPath();
        // Traveling together thru the last segment instead of just landing at
        // the same location
        if (current === gemini_1Path[gemini_1Path.length - 1] &&
            prev === gemini_1Path[gemini_1Path.length - 2]) {
            return;
        }
        super.onDayUpdate(day);
    }
}
exports.default = Gemini_2;
//# sourceMappingURL=Gemini_2.js.map