import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PlainSpaceStation, GameState } from './store/types';
import { RescueResource } from './classes/RescueResource';
import { enqueueMessages } from './store/actions';
import * as ID from './metadata/agent-ids';

export default () => {

  const dispatch = useDispatch();
  const current = useSelector((state: GameState): {
      orion: PlainSpaceStation,
      day: number
    } => {
      return {
        orion: state.spaceStations[ID.ORION],
        day: state.time
      };
  });

  function emitDaySensitiveMessage() {
    console.log(current.day);
    switch (current.day) {
      case 7: // by day 6, which means dropping off stuff on day 6 still fixes the problem
        if (current.orion.rescueResources.indexOf(RescueResource.O2ReplacementCells) === -1) {
          dispatch(enqueueMessages([
            'Oh no! It appears you were too late. The oxygen systems were not fixed in time and 1 scientist has passed away and taken their place amongst the stars!Hurry to fix this before total loss of life happens!'
          ]));
        }
        break;
      case 22:
        if (current.orion.rescueResources.indexOf(RescueResource.OxygenRepairTeam) === -1) {
          if (current.orion.rescueResources.indexOf(RescueResource.O2ReplacementCells) === -1) {
            dispatch(enqueueMessages([
              'Oh no! It appears you were too late. The oxygen systems were not permanently fixed in time and one scientist has passed away and taken their place amongst the stars!Hurry to fix this before total loss of life happens!'
            ]));
          } else {
            dispatch(enqueueMessages([
              'Oh no! It appears you were too late. The oxygen systems were not permanently fixed in time and the worst has happened. All of the scientists on Space Station Orion have passed away and have taken their place amongst the stars!While we may not have successfully complete our mission, let’s have a discussion, where did we go wrong? What could we have done differently.'
            ]));
          }
        }
        break;
      case 24:
        if (current.orion.rescueResources.indexOf(RescueResource.WaterRepairTeam) === -1) {
          dispatch(enqueueMessages([
            'I just got an update from Orion. Day 23 has passed and one scientist has passed away because the station is out of water!Hurry to fix this or find the solution before total loss of life happens!'
          ]));
        }
        break;
      case 25:
        if (current.orion.rescueResources.indexOf(RescueResource.FoodRepairTeam) === -1) {
          dispatch(enqueueMessages([
            'I just got an update from Orion. Day 24 has passed one scientist has passed away because the station ran out of food!Hurry to fix this or find the solution before total loss of life happens!'
          ]));
        }
        break;
      case 26:
        if (current.orion.rescueResources.indexOf(RescueResource.MedicalRepairTeam) === -1) {
          dispatch(enqueueMessages([
            'I just got an update from Orion. Day 25 has passed, and 3 scientists have been lost because the injuries that happened at the time of the damage were not treated in time!'
          ]));
        }
      default:
        break;
    }
  }

  useEffect(emitDaySensitiveMessage, [current.day]);

  return <></>
}