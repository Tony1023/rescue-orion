import { GameState, PlainSpaceship, PlainSpaceStation, Message } from '../types';
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
import { locationData, spaceStationData } from '../metadata';
import Websocket = require('ws');

export interface SpaceshipNextMoves {
  [location: string]: { [id: string]: boolean }
};

function asserTogether(left: ResourceCarrier, right: ResourceCarrier): void {
  if (left.getLocation() !== right.getLocation()) {
    throw Error('The resource carriers must be at the same location to transfer resources between them.');
  }
}

export default class Game {

  private time = 0;
  private messages: Message[] = [];
  private agents: { [id: string]: TimeVaryingAgent } = {};
  private carriers: { [id: string]: ResourceCarrier } = {};
  private spaceships: { [id: string]: Spaceship } = {};
  private spaceStations: { [id: string]: SpaceStation } = {};
  socket: Websocket;

  load(): void {
    const gemini_1 = new Gemini_1(40, 80, [RescueResource.O2ReplacementCells]);
    this.spaceships[IDs.GEMINI_1] = gemini_1;
    this.agents[IDs.GEMINI_1] = gemini_1;
    this.carriers[IDs.GEMINI_1] = gemini_1;

    const gemini_2 = new Gemini_2(gemini_1, 40, 100);
    this.spaceships[IDs.GEMINI_2] = gemini_2;
    this.agents[IDs.GEMINI_2] = gemini_2;
    this.carriers[IDs.GEMINI_2] = gemini_2;
    
    const andromeda = new SpaceStationAndromeda(spaceStationData[IDs.ANDROMEDA].location, 0, 0);
    this.spaceStations[IDs.ANDROMEDA] = andromeda;
    this.agents[IDs.ANDROMEDA] = andromeda;
    this.carriers[IDs.ANDROMEDA] = andromeda;

    const aquarius = new SpaceStation(spaceStationData[IDs.AQUARIUS].location, 20, 50, [RescueResource.WaterRepairTeam]);
    this.spaceStations[IDs.AQUARIUS] = aquarius;
    this.carriers[IDs.AQUARIUS] = aquarius;

    const borealis = new SpaceStationBorealis(spaceStationData[IDs.BOREALIS].location, 50, 30, [RescueResource.OxygenRepairTeam]);
    this.spaceStations[IDs.BOREALIS] = borealis;
    this.carriers[IDs.BOREALIS] = borealis;

    const capricorn = new SpaceStation(spaceStationData[IDs.CAPRICORN].location, 40, 70, [RescueResource.AITechnology]);
    this.spaceStations[IDs.CAPRICORN] = capricorn;
    this.carriers[IDs.CAPRICORN] = capricorn;

    const cassiopeia = new SpaceStation(spaceStationData[IDs.CASSIOPEIA].location, 30, 20, [RescueResource.MedicalRepairTeam]);
    this.spaceStations[IDs.CASSIOPEIA] = cassiopeia;
    this.carriers[IDs.CASSIOPEIA] = cassiopeia;

    const orion = new SpaceStationOrion(20, spaceStationData[IDs.ORION].location, 0, 0);
    this.spaceStations[IDs.ORION] = orion;
    this.agents[IDs.ORION] = orion;
    this.carriers[IDs.ORION] = orion;

    const sagittarius = new SpaceStation(spaceStationData[IDs.SAGITTARIUS].location, 0, 0);
    this.spaceStations[IDs.SAGITTARIUS] = sagittarius;
    this.carriers[IDs.SAGITTARIUS] = sagittarius;
    sagittarius.visited = true;
    this.messages.push(spaceStationData[IDs.SAGITTARIUS].message);
  }

  advanceTime(): void {
    // Invoking onDayUpdate at the end of day
    for (const id in this.agents) {
      this.agents[id].onDayUpdate(this.time);
    }
    this.generateOrionMessage();
    ++this.time;
  }

  dumpMessages(): Message[] {
    const messages = this.messages.slice(0);
    this.messages = [];
    return messages;
  }

  moveSpaceships(moves: { [id: string]: string }): void {
    for (const id in moves) {
      this.spaceships[id].addToPath(moves[id]);
      const spaceStation = locationData[moves[id]].location.spaceStationName;
      if (spaceStation && !this.spaceStations[spaceStation].visited) {
        this.spaceStations[spaceStation].visited = true;
        this.messages.push(spaceStationData[spaceStation].message);
      }
    }
  }

  transferEnergyCells(from: string, to: string, count?: number): void {
    const sendingCarrier = this.carriers[from];
    const receivingCarrier = this.carriers[to];
    asserTogether(sendingCarrier, receivingCarrier);
    const transferCount = count ?? sendingCarrier.energyCells;
    sendingCarrier.energyCells -= transferCount;
    receivingCarrier.energyCells += transferCount;
  }

  transferLifeSupportPacks(from: string, to: string, count?: number): void {
    const sendingCarrier = this.carriers[from];
    const receivingCarrier = this.carriers[to];
    asserTogether(sendingCarrier, receivingCarrier);
    const transferCount = count ?? sendingCarrier.lifeSupportPacks;
    sendingCarrier.lifeSupportPacks -= transferCount;
    receivingCarrier.lifeSupportPacks += transferCount;
  }

  transferRescueResource(from: string, to: string, type: RescueResource): void {
    const sendingCarrier = this.carriers[from];
    const receivingCarrier = this.carriers[to];
    asserTogether(sendingCarrier, receivingCarrier);
    sendingCarrier.pickUpFrom(type);
    receivingCarrier.dropOffTo(type);
  }

  toGameState(): GameState {
    const orion = this.spaceStations[IDs.ORION] as SpaceStationOrion;
    return {
      spaceships: Object.keys(this.spaceships).reduce((accumulator: {
          [id: string]: PlainSpaceship 
        }, id: string) => {
          const spaceship = this.spaceships[id];
          accumulator[id] = {
            energyCells: spaceship.energyCells,
            lifeSupportPacks: spaceship.lifeSupportPacks,
            location: spaceship.getLocation(),
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
            location: spaceStation.getLocation(),
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
          };
          return accumulator;
        },
      {}),
      messages: this.dumpMessages(),
      time: this.time,
      gameStats: {
        scientistsRemaining: orion.getScientistCount(),
        dropOffTimes: orion.getDropOffTimes(),
      },
    };
  }

  private generateOrionMessage() {
    const orion = this.spaceStations[IDs.ORION];
    switch (this.time) {
      case 6:
        if (orion.getRescueResources().indexOf(RescueResource.O2ReplacementCells) === -1) {
          this.messages.push({
            title: 'Incident at Orion',
            paragraphs: [
              { text: 'Oh no! It appears you were too late.' }, 
              { text: 'The oxygen systems were not fixed in time and 1 scientist has passed away and taken their place amongst the stars!' },
              { text: 'Hurry to fix this before total loss of life happens!' },
            ]
          });
        }
        break;
      case 21:
        if (orion.getRescueResources().indexOf(RescueResource.OxygenRepairTeam) === -1) {
          if (orion.getRescueResources().indexOf(RescueResource.O2ReplacementCells) === -1) {
            this.messages.push({
              title: 'Incident at Orion',
              paragraphs: [
                { text: 'Oh no! It appears you were too late.' }, 
                { text: 'The oxygen systems were not permanently fixed in time and one scientist has passed away and taken their place amongst the stars!' },
                { text: 'Hurry to fix this before total loss of life happens!' },
              ]
            });
          } else {
            this.messages.push({
              title: 'Incident at Orion',
              paragraphs: [
                { text: 'Oh no! It appears you were too late.' }, 
                { text: 'The oxygen systems were not permanently fixed in time and the worst has happened. All of the scientists on Space Station Orion have passed away and have taken their place amongst the stars!' },
                { text: 'While we may not have successfully complete our mission, let’s have a discussion, where did we go wrong? What could we have done differently.' },
              ]
            });
          }
        }
        break;
      case 23:
        if (orion.getRescueResources().indexOf(RescueResource.WaterRepairTeam) === -1) {
          this.messages.push({
            title: 'Incident at Orion',
            paragraphs: [
              { text: 'Oh no! It appears you were too late.' }, 
              { text: 'Day 23 has passed and one scientist has passed away because the station is out of water!' },
              { text: 'Hurry to fix this before total loss of life happens!' },
            ]
          });
        }
        break;
      case 24:
        if (orion.getRescueResources().indexOf(RescueResource.FoodRepairTeam) === -1) {
          this.messages.push({
            title: 'Incident at Orion',
            paragraphs: [
              { text: 'I just got an update from Orion.' }, 
              { text: 'Day 24 has passed one scientist has passed away because the station ran out of food!' },
              { text: 'Hurry to fix this or find the solution before total loss of life happens!' },
            ]
          });
        }
        break;
      case 25:
        if (orion.getRescueResources().indexOf(RescueResource.MedicalRepairTeam) === -1) {
          this.messages.push({
            title: 'Incident at Orion',
            paragraphs: [
              { text: 'I just got an update from Orion.' }, 
              { text: 'Day 25 has passed, and 3 scientists have been lost because the injuries that happened at the time of the damage were not treated in time!' },
            ]
          });
        }
      default:
        break;
    }
  }
};
