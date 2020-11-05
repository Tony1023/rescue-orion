import { act } from '@testing-library/react';
import waitFor from 'wait-for-expect';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect'
import axios from 'axios';
import { API_BASE_URL } from '../config';
import {mount, ReactWrapper} from 'enzyme';

import React from 'react';
import Room from '../room/index';
import GameBoard from '../room/GameBoard';
import RebalanceResourceModal from '../room/modal/RebalanceResourceModal';

describe('Load confirm move modal', () => {
  let token: string;
  let lobbyCode: string;
  let room: ReactWrapper;
  let gameBoard: ReactWrapper;

  beforeAll(async (done) => {
    // admin log in
    const res = await axios.post(`${API_BASE_URL}/admin/login`,
      { username: 'GameboardTest', password: 'pwd' }
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
    room = mount(<Room location={{
      hash: "",
      key: "d2o3w6",
      pathname: "/rooms",
      search: `?lobby=${lobbyCode}&room=testRoom`,
      state: undefined,
    }} />);
    // start game from lobby list
    await axios.put(`${API_BASE_URL}/lobbies/start/${lobbyCode}`, {}, {
      headers: { Authorization: `bearer ${token}` }
    });
    done();
  });

  beforeEach(async (done) => {
    await act(async () => {
      await waitFor(() => {
        room.update();
        // should render game board
        expect(room.find(GameBoard)).toHaveLength(1);
      });
    });
    gameBoard = room.find(GameBoard);
    done();
  })

  it('should open move resource dialog if click button', async (done) => {
    // click Move Resource button
    expect(gameBoard.find('div[data-testid="move-resource-dialog"]')).toHaveLength(1);
    gameBoard.find('div[data-testid="move-resource-dialog"]').simulate('click');

    // should see rebalance resource dialog
    await act(async () => {
      await waitFor(() => {
        room.update();
        gameBoard = room.find(GameBoard);
        // should render game board
        expect(gameBoard.find(RebalanceResourceModal)).toHaveLength(1);
      });
    });
    done();
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