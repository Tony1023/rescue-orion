import { RescueResource } from "./RescueResource";
import Spaceship from "./Spaceship";

export default class Gemini_1 extends Spaceship {

  constructor() {
    super();
    this.energyCells = 40;
    this.lifeSupportPacks = 80;
    this.rescueResources = [RescueResource.O2ReplaceMentCells];
  }

}
