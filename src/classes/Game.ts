import { GameState, PlainSpaceship, PlainSpaceStation } from '../store/types';
import TimeVaryingAgent from './TimeVaryingAgent';
import ResourceCarrier from './ResourceCarrier';
import Spaceship from './Spaceship';
import SpaceStation from './SpaceStation';
import Gemini_1 from './Gemini_1';
import * as IDs from '../metadata/agent-ids';
import Gemini_2 from './Gemini_2';
import SpaceStationAndromeda from './SpaceStationAndromeda';
import SpaceStationBorealis from './SpaceStationBorealis';
import SpaceStationOrion from './SpaceStationOrion';
import { RescueResource } from './RescueResource';
import { locationData } from '../metadata';

export interface SpaceshipNextMoves {
  [location: string]: { [id: string]: boolean }
};

export default class Game {

  private time = 0;
  private messages: string[] = [];
  private agents: { [id: string]: TimeVaryingAgent } = {};
  private carriers: { [id: string]: ResourceCarrier } = {};
  private spaceships: { [id: string]: Spaceship } = {};
  private spaceStations: { [id: string]: SpaceStation } = {};

  load(): void {
    const gemini_1 = new Gemini_1(40, 80, [RescueResource.O2ReplaceMentCells]);
    this.spaceships[IDs.GEMINI_1] = gemini_1;
    this.agents[IDs.GEMINI_1] = gemini_1;
    this.carriers[IDs.GEMINI_1] = gemini_1;

    const gemini_2 = new Gemini_2(gemini_1, 40, 100);
    this.spaceships[IDs.GEMINI_2] = gemini_2;
    this.agents[IDs.GEMINI_2] = gemini_2;
    this.carriers[IDs.GEMINI_2] = gemini_2;
    
    const andromeda = new SpaceStationAndromeda(0, 0);
    this.spaceStations[IDs.ANDROMEDA] = andromeda;
    this.agents[IDs.ANDROMEDA] = andromeda;
    this.carriers[IDs.ANDROMEDA] = andromeda;

    const aquarius = new SpaceStation(20, 50, [RescueResource.WaterRepairTeam]);
    this.spaceStations[IDs.AQUARIUS] = aquarius;
    this.carriers[IDs.AQUARIUS] = aquarius;

    const borealis = new SpaceStationBorealis(50, 30, [RescueResource.OxygenRepairTeam]);
    this.spaceStations[IDs.BOREALIS] = borealis;
    this.carriers[IDs.BOREALIS] = borealis;

    const capricorn = new SpaceStation(40, 70, [RescueResource.AITechnology]);
    this.spaceStations[IDs.CAPRICORN] = capricorn;
    this.carriers[IDs.CAPRICORN] = capricorn;

    const cassiopeia = new SpaceStation(30, 20, [RescueResource.MedicalRepairTeam]);
    this.spaceStations[IDs.CASSIOPEIA] = cassiopeia;
    this.carriers[IDs.CASSIOPEIA] = cassiopeia;

    const orion = new SpaceStationOrion(20, 0, 0);
    this.spaceStations[IDs.ORION] = orion;
    this.agents[IDs.ORION] = orion;
    this.carriers[IDs.ORION] = orion;

    const sagittarius = new SpaceStation(0, 0);
    this.spaceStations[IDs.SAGITTARIUS] = sagittarius;
    this.carriers[IDs.SAGITTARIUS] = sagittarius;
    sagittarius.visited = true;
  }

  advanceTime(): void {
    ++this.time;
    for (const id in this.agents) {
      this.agents[id].onDayUpdate(this.time);
    }
  }

  dumpMessages(): string[] {
    const messages = this.messages;
    this.messages = [];
    return messages;
  }

  moveSpaceships(moves: { [id: string]: string }): void {
    for (const id in moves) {
      this.spaceships[id].addToPath(moves[id]);
      const spaceStation = locationData[moves[id]].location.spaceStationName;
      if (spaceStation) {
        this.spaceStations[spaceStation].visited = true;
      }
    }
  }

  transferEnergyCells(from: string, to: string, count?: number): void {

  }

  transferLifeSupportPacks(from: string, to: string, count?: number): void {

  }

  transferRescueResource(from: string, to: string, type: number): void {

  }

  toGameState(): GameState {
    return {
      spaceships: Object.keys(this.spaceships).reduce((accumulator: {
          [id: string]: PlainSpaceship 
        }, id: string) => {
          const spaceship = this.spaceships[id];
          const path = spaceship.getPath();
          accumulator[id] = {
            energyCells: spaceship.energyCells,
            lifeSupportPacks: spaceship.lifeSupportPacks,
            location: path[path.length - 1],
            rescueResources: spaceship.getRescueResources(),
            isInTimePortal: spaceship.getIsTravelingThruTimePortals(),
          };
          return accumulator;
        },
      {}),
      nextMoves: Object.keys(this.spaceships).reduce((accumulator: SpaceshipNextMoves, id: string) => {
        const reachableNeighbors = this.spaceships[id].generateReachableNeighbors();
        reachableNeighbors.forEach((location: string) => {
          if (!accumulator[location]) {
            accumulator[location] = {};
          }
          accumulator[location][id] = true;
        });
        return accumulator;
      }, {}),
      spaceStations: Object.keys(this.spaceStations).reduce((accumulator: {
          [id: string]: PlainSpaceStation
        }, id: string) => {
          const spaceStation = this.spaceStations[id];
          accumulator[id] = {
            visited: spaceStation.visited,
            energyCells: spaceStation.energyCells,
            lifeSupportPacks: spaceStation.lifeSupportPacks,
            rescueResources: spaceStation.getRescueResources(),
            canPickUp: spaceStation.getRescueResources().reduce((accumulator: {
                [resource: string]: boolean
              }, r: RescueResource) => {
                accumulator[r] = spaceStation.canPickUp(r);
                return accumulator;
              },
            {})
          }
          return accumulator;
        },
      {}),
      messages: this.dumpMessages(),
      time: this.time,
    };
  }
};
