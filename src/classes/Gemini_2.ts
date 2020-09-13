import Spaceship from "./Spaceship";
import Gemini_1 from "./Gemini_1";

export default class Gemini_2 extends Spaceship {
  
  private gemini_1: Gemini_1;
  energyCells = 40;
  lifeSupportPacks = 100;

  constructor(gemini_1: Gemini_1) {
    super();
    this.gemini_1 = gemini_1
  }

  onDayUpdate(day: number): void {
    const current = this.path[this.path.length - 1];
    const gemini_1Path = this.gemini_1.getPath();
    if (current === gemini_1Path[gemini_1Path.length - 1]) {
      return;
    }
    super.onDayUpdate(day);
  }

}
