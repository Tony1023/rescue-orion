import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default () => {

  const [minutes, setMinutes] = useState(0);
 
  function tickMinute() {
    setMinutes(minutes + 1);
  }
 
  useEffect(() => {
    const interval = setInterval(tickMinute, 1000);
    return () => {
      clearInterval(interval);
    }
  });
 
  return <></>;
}
