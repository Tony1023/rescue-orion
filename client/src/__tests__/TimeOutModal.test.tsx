import { act } from '@testing-library/react';
import waitFor from 'wait-for-expect';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect'
import axios from 'axios';
import { API_BASE_URL } from '../config';
import {mount, ReactWrapper} from 'enzyme';

import React from 'react';
import Room from '../room/index';
import ResourcePanel from '../room/ResourcePanel';
import GameBoard from '../room/GameBoard';
import ConfirmMoveModal from '../room/modal/ConfirmMoveModal';
import TimeOutModal from '../room/modal/TimeOutModal';

describe('Load time out modal', () => {
  let token: string;
  let lobbyCode: string;
  let room: ReactWrapper;
  let gameBoard: ReactWrapper;

  const confirmMove = async(moveLocation: string, previousEnergy: string) => {
    // press next move to moved location
    const moveButtons = gameBoard.find(`[data-testid="move-${moveLocation}"]`);
    expect(moveButtons.find(`div[data-testid="move-${moveLocation}-gemini12"]`)).toHaveLength(1);
    moveButtons.find(`div[data-testid="move-${moveLocation}-gemini12"]`).simulate('click');
    // open confirm move dialog
    gameBoard.find('div[data-testid="confirm-move-dialog"]').simulate('click');
    await act(async () => {
      await waitFor(() => {
        room.update();
        gameBoard = room.find(GameBoard);
        // should render confirm move modal
        expect(gameBoard.find(ConfirmMoveModal)).toHaveLength(1)
      });
    });
  
    // confirm move
    expect(gameBoard.find('div[data-testid="confirm-move-button"]')).toHaveLength(1);
    gameBoard.find('div[data-testid="confirm-move-button"]').simulate('click');
    await act(async () => {
      await waitFor(() => {
        room.update();
        gameBoard = room.find(GameBoard);
        // confirm modal should disappear and resource panel updated
        expect(gameBoard.find(ConfirmMoveModal)).toHaveLength(0);
        expect(gameBoard.find(ResourcePanel).find('div[data-testid="energy-gemini1"]').text().includes(previousEnergy)).toBeFalsy();
      });
    });
  }

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

  it('should render time out modal if travel days > 30', async (done) => {
    // make more than 30 moves
    await confirmMove('b3', '40');
    await confirmMove('b4', '39');
    await confirmMove('b3', '38');
    await confirmMove('b4', '37');
    await confirmMove('b3', '36');
    await confirmMove('b4', '35');
    await confirmMove('b3', '34');
    await confirmMove('b4', '33');
    await confirmMove('b3', '32');
    await confirmMove('b4', '31');
    await confirmMove('b3', '30');
    await confirmMove('b4', '29');
    await confirmMove('b3', '28');
    await confirmMove('b4', '27');
    await confirmMove('b3', '26');
    await confirmMove('b4', '25');
    await confirmMove('b3', '24');
    await confirmMove('b4', '23');
    await confirmMove('b3', '22');
    await confirmMove('b4', '21');
    await confirmMove('b3', '20');
    await confirmMove('b4', '19');
    await confirmMove('b3', '18');
    await confirmMove('b4', '17');
    await confirmMove('b3', '16');
    await confirmMove('b4', '15');
    await confirmMove('b3', '14');
    await confirmMove('b4', '13');
    await confirmMove('b3', '12');
    await confirmMove('b4', '11');
    await confirmMove('b3', '10');
    // render time out modal
    expect(gameBoard.find(TimeOutModal)).toHaveLength(1);
    expect(gameBoard.find('div[data-testid="travel-day"]').text()).toEqual('31');

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