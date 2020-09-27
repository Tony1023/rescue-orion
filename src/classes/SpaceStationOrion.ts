import SpaceStation from "./SpaceStation"
import { RescueResource } from "./RescueResource";
import TimeVaryingAgent from "./TimeVaryingAgent";

export default class SpaceStationOrion extends SpaceStation implements TimeVaryingAgent {

  private scientistCount: number = 20;

  constructor(scientistCount: number, location: string, energyCells: number, lifeSupportPacks: number, resources?: RescueResource[]) {
    super(location, energyCells, lifeSupportPacks, resources);
    this.scientistCount = scientistCount;
  }

  canPickUp(r: RescueResource): boolean {
    return false;
  }

  onDayUpdate(day: number): void {

    if(this.scientistCount<=0){
      //Gameend, all scientist have died.
    }

    //Oxygen Related
    if(day>=6 && this.rescueResources.includes(RescueResource.O2ReplacementCells)===false){
      if(day>=21){
        //Oh no! It appears you were too late. The oxygen systems were not permanently fixed in time and the worst has happened. All of the scientists on Space Station Orion have passed away and have taken their place amongst the stars!While we may not have successfully complete our mission, let’s have a discussion, where did we go wrong? What could we have done differently
        this.scientistCount=0;
        //Gameend
      }else{//6<=day<=21
        //"Oh no! It appears you were too late. The oxygen systems were not fixed in time and 1 scientist has passed away and taken their place amongst the stars!Hurry to fix this before total loss of life happens!"
        this.scientistCount--;
      }
    }else if(day>=21 && this.rescueResources.includes(RescueResource.OxygenRepairTeam)==false){
      //Oh no! It appears you were too late. The oxygen systems were not permanently fixed in time and one scientist has passed away and taken their place amongst the stars!Hurry to fix this before total loss of life happens
      this.scientistCount--;
    }
    
    //Water Related
    if(day>=23 && this.rescueResources.includes(RescueResource.WaterRepairTeam)==false){
      if(day==30){
        //All Scientist Die
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
        //Gameend
      }else{
        //I just got an update from Orion. Day 24 has passed and one scientist has passed away because the station ran out of food!Hurry to fix this or find the solution before total loss of life happens!
        this.scientistCount--;
      }
    }

    //Medical Related
    if(day>=24 && this.rescueResources.includes(RescueResource.MedicalRepairTeam)==false){
      if(day>=30){
        //All Scientist Die
        //Gameend
      }else{
        //I just got an update from Orion. Day 25 has passed, and 3 scientists have been lost because the injuries that happened at the time of the damage were not treated in time!
        this.scientistCount-=3;
      }
    }
  }


  getScientistCount(): number {
    return this.scientistCount;
  }
}