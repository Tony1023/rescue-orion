import { RescueResource } from "../metadata/types";
import Gemini_1 from "../repository/classes/Gemini_1";
import {describe, expect, it } from '@jest/globals';

describe('spaceships in Rescue Orion', () => {
  it('picks up and drops off resources correctly', () => {
    const spaceship = new Gemini_1(10, 10, [RescueResource.O2ReplacementCells]);
    spaceship.dropOffTo(RescueResource.AITechnology);
    expect(spaceship.getRescueResources()).toEqual([ 'O2 Replacement Cells' , 'AI Technology' ]);
    spaceship.pickUpFrom(RescueResource.AITechnology);
    expect(spaceship.getRescueResources()).toEqual([ 'O2 Replacement Cells' ]);
  });

  it('get location, neighbours, add path, move, and consume correctly',()=>{
    const spaceship = new Gemini_1(100, 100, [RescueResource.O2ReplacementCells]);
    expect(spaceship.getLocation()).toEqual('sagittarius');
    expect(spaceship.generateReachableNeighbors()).toHaveLength(3);

    spaceship.addToPath('t1');
    expect(spaceship.getPath()).toEqual(["sagittarius", "t1"]);
    spaceship.onDayUpdate(1);
    expect(spaceship.generateReachableNeighbors()).toHaveLength(6);
    expect(spaceship.getLocation()).toEqual('t1');
    expect(spaceship.lifeSupportPacks).toEqual(99);
    expect(spaceship.energyCells).toEqual(99);

    spaceship.addToPath('t4');
    spaceship.onDayUpdate(1);
    expect(spaceship.generateReachableNeighbors()).toHaveLength(4);
    expect(spaceship.getLocation()).toEqual('t4');
    expect(spaceship.energyCells).toEqual(89);
    expect(spaceship.lifeSupportPacks).toEqual(69);
    expect(spaceship.getTimePortalRoute()).toEqual(["t1"]);
  });

});

