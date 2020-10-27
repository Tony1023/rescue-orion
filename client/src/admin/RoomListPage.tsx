import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SocketIOClient from 'socket.io-client';
import {
  GameState,
  GameStatus,
  LobbyState,
  SocketMessages,
  RescueResource,
  LobbyStatus
} from '../metadata/types';
import client from '../axios-client';
import fileSave from 'file-saver';
import { Jumbotron, Table, Button, Badge, Modal } from 'react-bootstrap';
import styled from 'styled-components';

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

const Wrapper = styled.div`
  max-width: 1024px;
  min-height: 100vh;
  margin: 0 auto;
  background-color: rgb(248, 248, 248);
  padding: 20px;
`;

const Title = styled.h1`
  margin-bottom: 30px;
  text-align: center;
`

const LobbyControls = styled.div`
  min-width: 350px;
  display: table;
  margin: 0 auto;
`;

export default () => {
  const { code } = useParams<{ code?: string }>();

  const [socket, setSocket] = useState<SocketIOClient.Socket>();
  const [duration, setDuration] = useState(0);
  const [countDownMinutes, setCountDownMinutes] = useState(0);
  const [countDownSeconds, setCountDownSeconds] = useState(0);
  const [createTime, setCreateTime] = useState<string>();
  const [rooms, setRooms] = useState<{
    [name: string]: GameState
  }>({});
  const [status, setStaus] = useState<LobbyStatus>();

  const [startGameStatus, setStartGameStatus] = useState<string | boolean>(false);
  const [configCountDownStatus, setConfigCountDownStatus] = useState<string | boolean>(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    client.get(`http://localhost:9000/lobbies/${code}`, {
      headers: { Authorization: `bearer ${localStorage.getItem('token')}` }
    })
      .then((res) => {
        const date = new Date(res.data.createTime);
        setCreateTime(date.toLocaleString());
      })
      .catch(() => {
        setCreateTime(undefined);
      });
    
    const newSocket = SocketIOClient('http://localhost:9000', {
      path: '/lobbies/socket',
      query: {
        lobby: code,
        token: localStorage.getItem('token'),
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

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      setGameCountDown();
    }
  }

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
    client.put(`http://localhost:9000/lobbies/start/${code}`, {}, {
      headers: { Authorization: `bearer ${localStorage.getItem('token')}` }
    })
      .then(() => {
        setStartGameStatus(true);
        setTimeout(() => setStartGameStatus(false), 5000);
      })
      .catch((err) => {
        setStartGameStatus(err.response.data);
      });
  }

  function setGameCountDown() {
    const countDownInSeconds = countDownMinutes * 60 + countDownSeconds;
    client.put(`http://localhost:9000/lobbies/${code}`, { 
        countDown: countDownInSeconds
      }, {
        headers: { Authorization: `bearer ${localStorage.getItem('token')}` }
    })
      .then(() => {
        setConfigCountDownStatus(true);
        setTimeout(() => setConfigCountDownStatus(false), 5000);
      })
      .catch((err) => {
        setConfigCountDownStatus(err.response.data);
      });
  }

  function exportSnapshot() {
    const lines = Object.keys(rooms).reduce((accumulator: string[], name: string) => {
      const stats = rooms[name].gameStats;
      const strings = [
        name,
        stats.dropOffTimes[RescueResource.O2ReplacementCells],
        stats.dropOffTimes[RescueResource.OxygenRepairTeam],
        stats.dropOffTimes[RescueResource.WaterRepairTeam],
        stats.dropOffTimes[RescueResource.FoodRepairTeam],
        stats.dropOffTimes[RescueResource.MedicalRepairTeam],
        stats.scientistsRemaining,
        stats.endTime ? formatTime(stats.endTime) : '',
        rooms[name].status,
      ];
      accumulator.push(`${strings.join(',')}\n`);
      return accumulator;
    }, ['Name,O2-temp,Oxygen,Water,Food,Medical,Scientists,Day,Duration,Status\n']);
    const blob = new Blob(lines, { type: 'text/plain;charset=utf-8', endings: 'native' });
    fileSave.saveAs(blob, `lobby_${code} at ${createTime}.csv`);
  }

  return <>
    <Wrapper>
      {
        createTime && socket ?
        <>
          <Jumbotron>
            <Title>Lobby {code}</Title>
            <LobbyControls>
              <p>
                Time created: {createTime}
              </p>
              <p>
                {'Lobby status: '}
                <Badge
                  style={{ fontSize: '16px' }}
                  variant='secondary'
                >{status ?? 'Unknown'}</Badge>
                {'  '}
                <Button
                  variant='outline-success'
                  size='sm'
                  onClick={() => setShowModal(true)}
                  disabled={status !== LobbyStatus.Waiting}
                >Start Games</Button>
                {
                  startGameStatus ?
                  (
                    typeof startGameStatus === 'string' ?
                    <span style={{ color: 'red' }}> {startGameStatus}</span> : <>&#10003;</>
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
                  onKeyDown={onKeyDown}
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
                  onKeyDown={onKeyDown}
                />
                {'  '}
                <Button
                  variant='outline-success'
                  size='sm'
                  onClick={setGameCountDown}
                  disabled={status !== LobbyStatus.Waiting}
                >Set</Button>
                {
                  configCountDownStatus ?
                  (
                    typeof configCountDownStatus === 'string' ?
                    <span style={{ color: 'red' }}> {configCountDownStatus}</span> : <>&#10003;</>
                  )
                  :
                  <></>
                }
              </p>
            </LobbyControls>
          </Jumbotron>
          <Button
            variant='outline-info'
            onClick={exportSnapshot}
          >Export lobby snapshot as csv file</Button>
          <p style={{ margin: '10px 0' }}>
            Teams: {Object.keys(rooms).length}, not finished: {
              Object.values(rooms).reduce((accumulator: number, state: GameState) => {
                if (state.status === GameStatus.NotStarted || state.status === GameStatus.Started) {
                  return accumulator + 1;
                }
                return accumulator;
              }, 0)
            }
          </p>
          <Table striped bordered hover size='sm'>
            <tbody>
              <tr>
                <th>Room Name</th>
                <th>O2-temp<br/>(day 6)</th>
                <th>Oxygen<br/>(day 21)</th>
                <th>Water<br/>(day 23)</th>
                <th>Food<br/>(day 24)</th>
                <th>Medical<br/>(day 25)</th>
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
          </Table>
        </>
        :
        <Jumbotron><Title>Lobby {code} does not exist.</Title></Jumbotron>
      }
    </Wrapper>
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
    >
      <Modal.Header closeButton>
        <h4>About to start games</h4>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure to start games?</p>
        <p>It cannot be undone.</p>
        <p>No rooms can be added afterwards.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='secondary'
          onClick={() => setShowModal(false)}
        >Cancel</Button>
        <Button
          variant='primary'
          onClick={startGames}
        >Yes, let's start</Button>
      </Modal.Footer>
    </Modal>
  </>;
}
