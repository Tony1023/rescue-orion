import { RescueResource } from "../metadata/types";
import Gemini_1 from "../repository/classes/Gemini_1";

describe('spaceships in Rescue Orion', () => {
  it('picks up and drops off resources correctly', () => {
    const spaceship = new Gemini_1(10, 10, [RescueResource.O2ReplacementCells]);
    spaceship.dropOffTo(RescueResource.AITechnology);
    expect(spaceship.getRescueResources()).toHaveLength(2);
  });

});