import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { enqueueMessages } from './store/actions';

export default () => {

  const dispatch = useDispatch();
  const [minutes, setMinutes] = useState(0);

  function constantHints() {
    if (minutes === 2) {
      dispatch(enqueueMessages([
        `Incoming relay from Ground Control
  
        We hope this message finds you out in space already. We wanted to remind you of a few key reminders for your mission:
        1. Remember that other space stations have received critical information on Orion’s status
        2. Don't forget that Orion will run out of oxygen on Day 6 
        3. Recue related resources (similar to the oxygen replacement cells on board your ship) cannot be picked up or dropped off when traveling through Time Portals
        
        -Ground Control
        `
      ]));
    } else if (minutes === 8) {
      dispatch(enqueueMessages([
        `Incoming relay from the Space Commander

        Greetings, crews!
        
        This is a friendly reminder that there is intel regarding the location and quantity of various Energy Cells and Life Support Packs available at different space stations in one of your crew member’s documents!
        
        Sometimes in all of the excitement, we forget that it is there!
        
        Things don’t look to good at Orion right now. I must get back to work trying to re-establish communications with them!
        
        -Space Commander
        `
      ]));
    } else if (minutes === 35) {
      dispatch(enqueueMessages([
        `Incoming relay from Ground Control

        You are halfway through your mission time. Be sure to keep an eye on the clock to make sure you have enough time to Rescue Orion!
        
        We are all counting on you!
        
        -Ground Control
        `
      ]));
    } else if (minutes === 65) {
      dispatch(enqueueMessages([
        `Urgent relay from Ground Control

        Only 10 minutes remain for you to Rescue Orion and return to Sagittarius by Day 30!
        
        When time is up, your ship will power down and you will be beamed into the main room to report back to the Space Commander.
        
        We eagerly await your safe arrival!
        
        -Ground Control
        `
      ]));
    }
  }
 
  function tickMinute() {
    setMinutes(minutes + 1);
  }

  useEffect(constantHints, [minutes]);
 
  useEffect(() => {
    const interval = setInterval(tickMinute, 60 * 1000);
    return () => {
      clearInterval(interval);
    }
  });
 
  return <></>;
}
