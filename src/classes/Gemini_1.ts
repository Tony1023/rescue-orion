import { RescueResource } from "./RescueResource";
import Spaceship from "./Spaceship";

export default class Gemini_1 extends Spaceship {

  energyCells = 40;
  lifeSupportPacks = 80;
  protected rescueResources = [RescueResource.O2ReplaceMentCells];

}
