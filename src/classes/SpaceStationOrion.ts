import SpaceStation from "./SpaceStation"
import { RescueResource } from "./RescueResource";
import TimeVaryingAgent from "./TimeVaryingAgent";

export default class SpaceStationOrion extends SpaceStation implements TimeVaryingAgent {

  private scientistCount: number = 20;
  private time: number = 0;
  private dropOffTimes: { [resource: string]: number} = {
    [RescueResource.O2ReplacementCells]: -1,
    [RescueResource.FoodRepairTeam]: -1,
    [RescueResource.WaterRepairTeam]: -1,
    [RescueResource.MedicalRepairTeam]: -1,
    [RescueResource.OxygenRepairTeam]: -1,
  };

  constructor(scientistCount: number, location: string, energyCells: number, lifeSupportPacks: number, resources?: RescueResource[]) {
    super(location, energyCells, lifeSupportPacks, resources);
    this.scientistCount = scientistCount;
  }

  dropOffTo(r: RescueResource): void {
    super.dropOffTo(r);
    this.dropOffTimes[r] = this.time;
  }

  getDropOffTimes(): { [resource: string]: number } {
    return this.dropOffTimes;
  }

  canPickUp(_: RescueResource): boolean {
    return false;
  }

  onDayUpdate(day: number): void {
    this.time = day;
    if(this.scientistCount<=0){
      return;
    }

    //Oxygen Related
    if (day >= 6 && day < 21) {
      if (!this.rescueResources.includes(RescueResource.O2ReplacementCells) && !this.rescueResources.includes(RescueResource.OxygenRepairTeam)) {
        --this.scientistCount;
      }
    } else if (day >= 21) {
      if (!this.rescueResources.includes(RescueResource.O2ReplacementCells) && !this.rescueResources.includes(RescueResource.OxygenRepairTeam)) {
        this.scientistCount = 0;
        return;
      } else if (!this.rescueResources.includes(RescueResource.OxygenRepairTeam)) {
        --this.scientistCount;
      }
    }
    
    //Water Related
    if(day>=23 && this.rescueResources.includes(RescueResource.WaterRepairTeam)==false){
      if(day>=30){
        //All Scientist Die
        this.scientistCount=0;
        return;
        //Gameend
      }else{
        //"I just got an update from Orion. Day 23 has passed and one scientist has passed away because the station is out of water!"
        this.scientistCount--;
      }
    }

    //Food Related
    if(day>=24 && this.rescueResources.includes(RescueResource.FoodRepairTeam)==false){
      if(day>=30){
        //All Scientist Die
        this.scientistCount=0;
        return;
        //Gameend
      }else{
        //I just got an update from Orion. Day 24 has passed and one scientist has passed away because the station ran out of food!Hurry to fix this or find the solution before total loss of life happens!
        this.scientistCount--;
      }
    }

    //Medical Related
    if(day==25 && this.rescueResources.includes(RescueResource.MedicalRepairTeam)==false){
      //I just got an update from Orion. Day 25 has passed, and 3 scientists have been lost because the injuries that happened at the time of the damage were not treated in time!
      this.scientistCount-=3;
    }
    
    if (this.scientistCount < 0) {
      this.scientistCount = 0;
    }
  }


  getScientistCount(): number {
    return this.scientistCount;
  }
}