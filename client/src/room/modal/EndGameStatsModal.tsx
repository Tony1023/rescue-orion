import React from 'react';
import { useSelector } from '../redux-hook-adapters';
import styled from 'styled-components';
import { GameState, GameStatus, RescueResource } from '../../metadata/types';
import * as IDs from '../../metadata/agent-ids';
import { formatTime } from '../../time-format-utils';

const Title = styled.h1`
  font-family: 'Grandstander', cursive;
  text-align: center;
`;

const ColumnHalf = styled.div`
  width: calc(50% - 20px);
  display: inline-block;
  padding: 10px;
`;

const DataPoint = styled.div`
  margin-bottom: 10px;
`;

const StatName = styled.div`
  display: inline-block;
  font-weight: bold;
  width: 50%;
  margin-right: 10px;
`;

const StatValue = styled.div`
  display: inline-block;
`;

export default () => {

  const state = useSelector((state: GameState) => state);
  const stats = state.gameStats;
  const gemini_1 = state.spaceships[IDs.GEMINI_1];
  const gemini_2 = state.spaceships[IDs.GEMINI_2];

  return <>
    <Title>End Game Stats</Title>
    <ColumnHalf>
      <DataPoint>
        <StatName>Return to Sagittarius</StatName>
        <StatValue>
          {
            state.status === GameStatus.MissionSucceeded ?
            state.time : 'Did not finish'
          }
        </StatValue>
      </DataPoint>
      <DataPoint>
        <StatName>Scientists Saved</StatName>
        <StatValue>
          {
            state.status === GameStatus.MissionSucceeded ?
            `${stats.scientistsRemaining} of 20` : 'None'
          }
        </StatValue>
      </DataPoint>
      <DataPoint>
        <StatName>Mission Duration</StatName>
        <StatValue>
          {
            formatTime(state.endTime!)
          }
        </StatValue>
      </DataPoint>
      <DataPoint>
        <StatName>O2 temp (by day 6)</StatName>
        <StatValue>
          {
            stats.dropOffTimes[RescueResource.O2ReplacementCells] > -1 ?
            stats.dropOffTimes[RescueResource.O2ReplacementCells] : 'Did not fix'
          }
        </StatValue>
      </DataPoint>
    </ColumnHalf>
    <ColumnHalf>
      <DataPoint>
        <StatName>Oxygen (by day 21)</StatName>
        <StatValue>
          {
            stats.dropOffTimes[RescueResource.OxygenRepairTeam] > -1 ?
            stats.dropOffTimes[RescueResource.OxygenRepairTeam] : 'Did not fix'
          }
        </StatValue>
      </DataPoint>
      <DataPoint>
        <StatName>Water (by day 23)</StatName>
        <StatValue>
          {
            stats.dropOffTimes[RescueResource.WaterRepairTeam] > -1 ?
            stats.dropOffTimes[RescueResource.WaterRepairTeam] : 'Did not fix'
          }
        </StatValue>
      </DataPoint>
      <DataPoint>
        <StatName>Food (by day 24)</StatName>
        <StatValue>
          {
            stats.dropOffTimes[RescueResource.FoodRepairTeam] > -1 ?
            stats.dropOffTimes[RescueResource.FoodRepairTeam] : 'Did not fix'
          }
        </StatValue>
      </DataPoint>
      <DataPoint>
        <StatName>Medical (by day 25)</StatName>
        <StatValue>
          {
            stats.dropOffTimes[RescueResource.FoodRepairTeam] > -1 ?
            stats.dropOffTimes[RescueResource.FoodRepairTeam] : 'Did not fix'
          }
        </StatValue>
      </DataPoint>
    </ColumnHalf>
  </>;
}