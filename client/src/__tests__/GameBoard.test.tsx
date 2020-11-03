import { act, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect'
import axios from 'axios';
import { API_BASE_URL } from '../config';
import {shallow, mount} from 'enzyme';
import waitFor from 'wait-for-expect';

import React from 'react';
import Room from '../room/index';
import MessageModal from '../room/modal/MessageModal';
import WaitModal from '../room/modal/WaitModal';
import GameBoard from '../room/GameBoard';

describe('Load game board', () => {
  let token: string;
  let lobbyCode: string;

  beforeAll(async (done) => {
    // admin log in
    const res = await axios.post(`${API_BASE_URL}/admin/login`,
      { username: 'Gita', password: 'RescueOrion!' }
    );
    token = res.data.token;
    // create a lobby
    const res2 = await axios.post(`${API_BASE_URL}/lobbies`, {}, {
      headers: { Authorization: `bearer ${token}` }
    });
    lobbyCode = res2.data.code;
    // player join the game with lobby code
    await axios.post(`${API_BASE_URL}/rooms`, {
      lobby: lobbyCode,
      room: "testRoom",
    });
    done();
  });

  it('should render wait modal if not started', async (done) => {
    const room = mount(<Room location={{
      hash: "",
      key: "d2o3w6",
      pathname: "/rooms",
      search: `?lobby=${lobbyCode}&room=testRoom`,
      state: undefined,
    }} />);
    await act(async () => {
      await waitFor(async () => {
        room.update();
        expect(room.text().includes('Loading')).toBeFalsy();
      });
    });
    expect(room.text().includes('Cannot connect to Rescue Orion server... Try refreshing the page or report to your commander!')).toBeFalsy();
    expect(room.find(GameBoard)).toBeTruthy();
    const gameBoard = room.find(GameBoard);
    expect(gameBoard.find(WaitModal)).toBeTruthy();
    expect(room.text().includes('Waiting for your commander to start mission...')).toBeTruthy();
    done();
  });

  it('should render game board if started', async() => {
    const room = mount(<Room location={{
      hash: "",
      key: "d2o3w6",
      pathname: "/rooms",
      search: `?lobby=${lobbyCode}&room=testRoom`,
      state: undefined,
    }} />);
    await act(async () => {
      // start game from lobby list
      await axios.put(`${API_BASE_URL}/lobbies/start/${lobbyCode}`, {}, {
        headers: { Authorization: `bearer ${token}` }
      });
      // wait for room to update
      await waitFor(async () => {
        room.update();
        expect(room.text().includes('Waiting for your commander to start mission...')).toBeFalsy();
      });
    });
    // should render game board
    expect(room.find(GameBoard)).toHaveLength(1);
    // should show information card at Sagittarius
    const gameBoard = room.find(GameBoard);
    expect(gameBoard.find(MessageModal)).toHaveLength(1);
  });

  afterAll(async (done) => {
    await act(async () => {
      await axios.delete(`${API_BASE_URL}/lobbies/${lobbyCode}`, {
        headers: { Authorization: `bearer ${token}` }
      })
    });
    done();
  })

})