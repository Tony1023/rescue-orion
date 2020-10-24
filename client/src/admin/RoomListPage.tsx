import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SocketIOClient from 'socket.io-client';
import { GameState, GameStatus, LobbyState, SocketMessages, RescueResource, GameDuration, LobbyStatus } from '../metadata/types';
import axios from 'axios';

function pad(n: number): string {
  let digits = 0;
  let copy = n;
  while (copy > 0) {
    copy = Math.floor(copy / 10);
    ++digits;
  }
  if (digits < 2) {
    return `0${n}`;
  } else {
    return `${n}`;
  }
}

function formatTime(time: number) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${pad(minutes)}:${pad(seconds)}`;
}

export default () => {
  const { code } = useParams<{ code?: string }>();

  const [socket, setSocket] = useState<SocketIOClient.Socket>();
  const [duration, setDuration] = useState(0);
  const [countDownMinutes, setCountDownMinutes] = useState(0);
  const [countDownSeconds, setCountDownSeconds] = useState(0);
  const [rooms, setRooms] = useState<{
    [name: string]: GameState
  }>({});
  const [status, setStaus] = useState<LobbyStatus>();

  const [startGameStatus, setStartGameStatus] = useState<string | boolean>(false);
  const [configCountDownStatus, setConfigCountDownStatus] = useState<string | boolean>(false);

  useEffect(() => {
    const newSocket = SocketIOClient('http://localhost:9000', {
      path: '/lobbies/socket',
      query: {
        lobby: code,
      }
    });
    setSocket(newSocket);

    newSocket.on(SocketMessages.LobbyUpdate, (data: string) => {
      const state = JSON.parse(data) as LobbyState;
      setStaus(state.status);
      setDuration(state.gameDuration.duration);
      setCountDownMinutes(Math.floor(state.gameDuration.countDown / 60));
      setCountDownSeconds(state.gameDuration.countDown % 60);
      if (Object.keys(state.updatedRooms).length > 0) {
        const newRooms = {...rooms};
        Object.keys(state.updatedRooms).forEach((name) => {
          newRooms[name] = state.updatedRooms[name];
        });
        setRooms(newRooms);
      }
    });

    newSocket.on('disconnect', () => {
      setSocket(undefined);
    });

    newSocket.on('connect_error', () => {
      setSocket(undefined);
    });

  }, [code]);

  function onMinutesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.target.value);
    if (isNaN(value) || !Number.isInteger(value)) {
      setCountDownMinutes(0);
      return;
    }
    if (value < 1 || value > 999) {
      return;
    }
    setCountDownMinutes(value);
  }

  function onSecondsChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.target.value);
    if (isNaN(value) || !Number.isInteger(value)) {
      setCountDownSeconds(0);
      return;
    }
    if (value < 0 || value >= 60) {
      return;
    }
    setCountDownSeconds(value);
  }

  function startGames() {
    axios.put(`http://localhost:9000/lobbies/start/${code}`)
      .then(() => {
        setStartGameStatus(true);
        setTimeout(() => setStartGameStatus(false), 5000);
      })
      .catch(() => {
        setStartGameStatus('Something went wrong...');
      });
  }

  function setGameCountDown() {
    const countDownInSeconds = countDownMinutes * 60 + countDownSeconds;
    axios.put(`http://localhost:9000/lobbies/${code}`, { countDown: countDownInSeconds })
      .then(() => {
        setConfigCountDownStatus(true);
        setTimeout(() => setConfigCountDownStatus(false), 5000);
      })
      .catch(() => {
        setConfigCountDownStatus('Something went wrong...');
      });
  }

  return <>
    {
      socket ?
      <>
        <h1>Lobby {code}</h1>
        <p>
          Lobby status: {status ?? 'Unknown'}
          <button
            onClick={startGames}
            disabled={status !== LobbyStatus.Waiting}
          >Start Games</button>
          {
            startGameStatus ?
            (
              typeof startGameStatus === 'string' ?
              <span color={'red'}>{startGameStatus}</span> : <>&#10003;</>
            )
            :
            <></>
          }
        </p>
        <p>
          {'Time remaining: '}
          <input
            value={countDownMinutes > 0 ? `${countDownMinutes}`.replace(/^0+/, ''): 0}
            onChange={onMinutesChange}
            onFocus={(e) => e.target.select()}
            disabled={status !== LobbyStatus.Waiting}
            type='number'
            min={0}
            max={999}
            step={1}
          />
          :
          <input
            value={countDownSeconds > 0 ? `${countDownSeconds}`.replace(/^0+/, ''): 0}
            onChange={onSecondsChange}
            onFocus={(e) => e.target.select()}
            disabled={status !== LobbyStatus.Waiting}
            type='number'
            min={0}
            max={59}
            step={1}
          />
          <button
            disabled={status !== LobbyStatus.Waiting}
            onClick={setGameCountDown}
          >Set</button>
          {
            configCountDownStatus ?
            (
              typeof configCountDownStatus === 'string' ?
              <span color={'red'}>{configCountDownStatus}</span> : <>&#10003;</>
            )
            :
            <></>
          }
        </p>
        <table>
          <tbody>
            <tr>
              <th>Room Name</th>
              <th>Oxygen Cells<br/>(day 6)</th>
              <th>Oxygen Repairment<br/>(day 21)</th>
              <th>Water Repairment<br/>(day 23)</th>
              <th>Food Repairment<br/>(day 24)</th>
              <th>Medical Repairement<br/>(day 25)</th>
              <th>Scientists Alive</th>
              <th>Day Count</th>
              <th>Mission Time</th>
            </tr>
            {
              Object.keys(rooms).map((name, index) => {
                const room = rooms[name];
                const dropOffTimes = room.gameStats.dropOffTimes;
                return <tr key={index}>
                  <td>{name}</td>
                  {
                    [
                      RescueResource.O2ReplacementCells,
                      RescueResource.OxygenRepairTeam,
                      RescueResource.WaterRepairTeam,
                      RescueResource.FoodRepairTeam,
                      RescueResource.MedicalRepairTeam,
                    ].map((resource, index) => <td key={index}>
                      {dropOffTimes[resource] >= 0 ? dropOffTimes[resource] : '-'}
                    </td>)
                  }
                  <td>
                    {
                      room.status === GameStatus.MissionFailed ?
                      'Mission Failed':
                      `${room.gameStats.scientistsRemaining}/20`
                    }
                  </td>
                  <td>{room.time}</td>
                  <td>
                    {
                      room.gameStats.endTime ?
                      formatTime(room.gameStats.endTime) :
                      formatTime(duration)
                    }
                  </td>
                </tr>;
              })
            }
          </tbody>
        </table>
      </> : <>
        <h1>Lobby {code} does not exist.</h1>
      </>
    }
  </>
}
