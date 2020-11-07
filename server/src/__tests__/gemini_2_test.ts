import { RescueResource } from "../metadata/types";
import Gemini_1 from "../repository/classes/Gemini_1";
import Gemini_2 from "../repository/classes/Gemini_2";
import {describe, expect, it } from '@jest/globals';

describe('gemini2', () => {
    it('move together with gemini1 along its path onDayUpdate', () => {
      const spaceship1 = new Gemini_1(10, 10, [RescueResource.O2ReplacementCells]);
      const spaceship2 = new Gemini_2(spaceship1, 10, 10, [RescueResource.O2ReplacementCells]);
      spaceship1.addToPath('t1');
      spaceship2.addToPath('t1');
      spaceship2.onDayUpdate(1);
      spaceship1.onDayUpdate(1);
      expect(spaceship1.energyCells).toEqual(9);
      expect(spaceship2.energyCells).toEqual(10);
      expect(spaceship1.lifeSupportPacks).toEqual(9);
      expect(spaceship2.lifeSupportPacks).toEqual(10);
    });

    it('do not move together with gemini1',()=>{
      const spaceship1 = new Gemini_1(10, 10, [RescueResource.O2ReplacementCells]);
      const spaceship2 = new Gemini_2(spaceship1, 10, 10, [RescueResource.O2ReplacementCells]);
      spaceship1.addToPath('t1');
      spaceship2.addToPath('b3');
      spaceship2.onDayUpdate(1);
      spaceship1.onDayUpdate(1);
      expect(spaceship1.energyCells).toEqual(9);
      expect(spaceship2.energyCells).toEqual(9);
      expect(spaceship1.lifeSupportPacks).toEqual(9);
      expect(spaceship2.lifeSupportPacks).toEqual(9);
    });

  });