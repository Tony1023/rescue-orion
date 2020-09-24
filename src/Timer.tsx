import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { enqueueMessages } from './store/actions';
import { GameState } from './store/types';

export default () => {

  const dispatch = useDispatch();
  const spaceshipPositions = useSelector((state: GameState): 
    { [id: string]: string } => {
      return Object.keys(state.spaceships).reduce((accumulator: { [id: string]: string }, id: string) => {
        accumulator[id] = state.spaceships[id].location;
        return accumulator;
      }, {});
  });
  const [minutes, setMinutes] = useState(0);
  const [positions, setPositions] = useState(spaceshipPositions);
  const [movedSinceStart, setMovedSinceStart] = useState(false);
  const [lastMove, setLastMove] = useState(0);

  if (JSON.stringify(spaceshipPositions) !== JSON.stringify(positions)) {
    setPositions(spaceshipPositions);
    setLastMove(minutes);
    setMovedSinceStart(true);
  }

  useEffect(actionDependentHints, [minutes]);

  useEffect(constantHints, [minutes]);
 
  useEffect(() => {
    const interval = setInterval(tickMinute, 60 * 1000);
    return () => {
      clearInterval(interval);
    }
  });

  function actionDependentHints() {
    if (minutes === 10 && !movedSinceStart) {
      dispatch(enqueueMessages([{
        title: 'Incoming relay from Ground Control',
        paragraphs: [
          { text: 'Analysis paralysis: s situation where a group is unable to move forward with a decision as a result of overanalyzing data or overthinking a problem' },
          { text: 'The clock is ticking! You may want to consider making your first move so that you don’t run out of time!' },
          { text: '-Ground Control' },
        ],
      }]));
      return;
    }
    if (minutes - lastMove === 5) { // every 5 minutes?
      dispatch(enqueueMessages([{
        title: 'Incoming relay from Ground Control',
        paragraphs: [
          { text: 'Greetings crew, we’re getting readings that your ships have stayed in one spot for quite some time.' },
          { text: 'If you are stuck on what to do next, you may request help from your Space Commander. Alternatively, you may wish to visit a space station to see if they have any intel for you that could help you decide what to do next.' },
          { text: 'Remember to watch the clock to see your remaining time!' },
          { text: '-Ground Control' },
        ],
      }]));
    }
  }

  function constantHints() {
    if (minutes === 2) {
      dispatch(enqueueMessages([{
        title: 'Incoming relay from Ground Control',
        paragraphs: [
          { text: 'We hope this message finds you out in space already. We wanted to remind you of a few key reminders for your mission:' },
          { text: 'Remember that other space stations have received critical information on Orion’s status', number: 1 },
          { text: 'Don\'t forget that Orion will run out of oxygen on Day 6', number: 2 },
          { text: 'Recue related resources (similar to the oxygen replacement cells on board your ship) cannot be picked up or dropped off when traveling through Time Portals', number: 3 },
          { text: '-Ground Control' },
        ],
      }]));
    } else if (minutes === 8) {
      dispatch(enqueueMessages([{
        title: 'Incoming relay from the Space Commander',
        paragraphs: [
          { text: 'Greetings, crews!' },
          { text: 'This is a friendly reminder that there is intel regarding the location and quantity of various Energy Cells and Life Support Packs available at different space stations in one of your crew member’s documents!' },
          { text: 'Sometimes in all of the excitement, we forget that it is there!' },
          { text: 'Things don’t look to good at Orion right now. I must get back to work trying to re-establish communications with them!' },
          { text: '-Space Commander' },
        ],
      }]));
    } else if (minutes === 35) {
      dispatch(enqueueMessages([{
        title: 'Incoming relay from Ground Control',
        paragraphs: [
          { text: 'You are halfway through your mission time. Be sure to keep an eye on the clock to make sure you have enough time to Rescue Orion!' },
          { text: 'We are all counting on you!' },
          { text: '-Ground Control' },
        ],
      }]));
    } else if (minutes === 65) {
      dispatch(enqueueMessages([{
        title: 'Urgent relay from Ground Control',
        paragraphs: [
          { text: 'Only 10 minutes remain for you to Rescue Orion and return to Sagittarius by Day 30!' },
          { text: 'When time is up, your ship will power down and you will be beamed into the main room to report back to the Space Commander.' },
          { text: 'We eagerly await your safe arrival!' },
          { text: 'Things don’t look to good at Orion right now. I must get back to work trying to re-establish communications with them!' },
          { text: '-Ground Control' },
        ],
      }]));
    }
  }
 
  function tickMinute() {
    setMinutes(minutes + 1);
  }
 
  return <></>;
}
