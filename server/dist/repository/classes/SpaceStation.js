"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SpaceStation {
    constructor(location, energyCells, lifeSupportPacks, resources) {
        this.visited = false;
        this.energyCells = energyCells;
        this.lifeSupportPacks = lifeSupportPacks;
        this.rescueResources = resources;
        this.location = location;
    }
    getLocation() {
        return this.location;
    }
    getRescueResources() {
        return this.rescueResources.slice(0);
    }
    pickUpFrom(r) {
        const index = this.rescueResources.indexOf(r);
        if (index === -1) {
            throw new Error(`${r} not found at the space station.`);
        }
        this.rescueResources.splice(index, 1);
    }
    canPickUp(r) {
        return true;
    }
    dropOffTo(r) {
        this.rescueResources.push(r);
    }
}
exports.default = SpaceStation;
//# sourceMappingURL=SpaceStation.js.map