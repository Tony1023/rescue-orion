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
const metadata_1 = require("../../metadata");
const types_1 = require("../../metadata/types");
const IDs = __importStar(require("../../metadata/agent-ids"));
;
function computeSupplyConsumption(prev, curr) {
    // If different type of locations, then it must be a starway.
    // If staying at the same location, then it's equivalent to staying staionary
    if (metadata_1.locationData[curr].location.type !== metadata_1.locationData[prev].location.type || curr === prev) {
        return {
            energyCells: 1,
            lifeSupportPacks: 1,
        };
    }
    switch (metadata_1.locationData[curr].location.type) {
        case types_1.LocationType.BeaconStar:
            return {
                energyCells: 1,
                lifeSupportPacks: 1,
            };
        case types_1.LocationType.HyperGate:
            return {
                energyCells: 20,
                lifeSupportPacks: 5,
            };
        case types_1.LocationType.TimePortal:
            return {
                energyCells: 10,
                lifeSupportPacks: 30,
            };
    }
}
class Spaceship {
    constructor(energyCells, lifeSupportPacks, resources) {
        this.rescueResources = [];
        this.path = [IDs.SAGITTARIUS];
        this.isTravelingThruTimePortals = false;
        this.energyCells = energyCells;
        this.lifeSupportPacks = lifeSupportPacks;
        this.rescueResources = resources !== null && resources !== void 0 ? resources : [];
    }
    getLocation() {
        return this.path[this.path.length - 1];
    }
    getRescueResources() {
        return this.rescueResources.slice(0);
    }
    getPath() {
        return this.path.slice(0);
    }
    getIsTravelingThruTimePortals() {
        return this.isTravelingThruTimePortals;
    }
    pickUpFrom(r) {
        const index = this.rescueResources.indexOf(r);
        if (index === -1) {
            throw new Error(`${r} not found onboard.`);
        }
        this.rescueResources.splice(index, 1);
    }
    canPickUp(r) {
        return true;
    }
    dropOffTo(r) {
        this.rescueResources.push(r);
    }
    onDayUpdate(_) {
        const current = this.path[this.path.length - 1];
        const prev = this.path[this.path.length - 2];
        const consumption = computeSupplyConsumption(prev, current);
        this.energyCells -= consumption.energyCells;
        this.lifeSupportPacks -= consumption.lifeSupportPacks;
    }
    addToPath(location) {
        this.path.push(location);
        this.updateIfTravelingThruTimePortals();
        if (this.isTravelingThruTimePortals) {
            if (this.path[this.path.length - 1] === this.path[this.path.length - 2]) {
                throw new Error('Not allowed to stay stationary when traveling thru time portals');
            }
        }
    }
    updateIfTravelingThruTimePortals() {
        if (this.path.length <= 1) {
            this.isTravelingThruTimePortals = false;
            return;
        }
        const current = this.path[this.path.length - 1];
        let entryIndex = null;
        // To be at a time portal, there must be at least two in the location history
        for (let i = this.path.length - 2; i >= 0; --i) {
            const prev = this.path[i];
            if (metadata_1.locationData[prev].location.type === types_1.LocationType.TimePortal) {
                entryIndex = i;
            }
            else {
                break;
            }
        }
        // Is not travelling thru a time portal or
        // Is exiting from t1
        if (!entryIndex || current === 't1') {
            this.isTravelingThruTimePortals = false;
            return;
        }
        // Not at the entry point, then can only go to other time portals
        if (this.path[entryIndex] !== current) {
            this.isTravelingThruTimePortals = true;
            return;
        }
        // At the entry point, see if it is a boomarange (palindrome) path
        for (let endIndex = this.path.length - 1; endIndex >= entryIndex; --endIndex) {
            if (this.path[entryIndex] !== this.path[endIndex]) {
                this.isTravelingThruTimePortals = true;
                return;
            }
            ++entryIndex;
        }
        this.isTravelingThruTimePortals = false;
    }
    generateReachableNeighbors() {
        function normalNextMovesFrom(location) {
            const nextMoves = metadata_1.locationData[location].neighbors;
            nextMoves.push(location);
            return nextMoves;
        }
        function timePortalNextMovesFrom(timePortal) {
            const nextMoves = [];
            metadata_1.locationData[timePortal].neighbors.forEach((neighbor) => {
                if (metadata_1.locationData[neighbor].location.type === types_1.LocationType.TimePortal) {
                    nextMoves.push(neighbor);
                }
            });
            return nextMoves;
        }
        const current = this.path[this.path.length - 1];
        let neighbors;
        // On a beacon star or hyper gate, can go anywhere
        if (metadata_1.locationData[current].location.type !== types_1.LocationType.TimePortal) {
            neighbors = normalNextMovesFrom(current);
        }
        else {
            neighbors = this.isTravelingThruTimePortals ?
                timePortalNextMovesFrom(current) : normalNextMovesFrom(current);
        }
        return neighbors.reduce((accumulator, location) => {
            const neighborCost = {
                location,
                cost: computeSupplyConsumption(current, location),
            };
            accumulator.push(neighborCost);
            return accumulator;
        }, []);
    }
}
exports.default = Spaceship;
//# sourceMappingURL=Spaceship.js.map