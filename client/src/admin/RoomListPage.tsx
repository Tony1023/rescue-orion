import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SocketIOClient from 'socket.io-client';
import { GameState, GameStatus, LobbyState, SocketMessages, RescueResource, GameDuration } from '../metadata/types';

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
  const [gameDuration, setGameDuration] = useState<GameDuration>({
    duration: 0,
    countDown: 0,
  });
  const [rooms, setRooms] = useState<{
    [name: string]: GameState
  }>({});

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
      if (state.gameDuration) {
        setGameDuration(state.gameDuration);
      }
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
    })
  }, [code]);


  return <>
    {
      socket ?
      <>
        <h1>Lobby {code}</h1>
        <p>Time remaining: {formatTime(gameDuration.duration)}</p>
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
                  <td>{formatTime(gameDuration.countDown)}</td>
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
