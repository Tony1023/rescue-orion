import { act, waitFor } from '@testing-library/react';
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

describe('Load resource panel and updates with move', () => {
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

  it('should match initial resource level', async (done) => {
    // check resource panel initial resource level
    expect(gameBoard.find(ResourcePanel)).toHaveLength(1);
    const resourcePanel = gameBoard.find(ResourcePanel);
    // gemini 1
    expect(resourcePanel.find('div[data-testid="energy-gemini1"]').text()).toEqual('40');
    expect(resourcePanel.find('div[data-testid="lifeSupport-gemini1"]').text()).toEqual('80');
    expect(resourcePanel.find('div[data-testid="resource-gemini1"]').text().includes('O2 Replacement Cells')).toBeTruthy();
    // gemini 2
    expect(resourcePanel.find('div[data-testid="energy-gemini2"]').text()).toEqual('40');
    expect(resourcePanel.find('div[data-testid="lifeSupport-gemini2"]').text()).toEqual('100');
    expect(resourcePanel.find('div[data-testid="resource-gemini2"]').text()).toEqual('');
    done();
  });

  it('should reduce correctly after a starway move', async (done) => {
    // press next move to Beacon Star 3
    await confirmMove('b3', '40');

    // check resource panel resource level
    gameBoard.update();
    const resourcePanel = gameBoard.find(ResourcePanel);
    // gemini 1
    expect(resourcePanel.find('div[data-testid="energy-gemini1"]').text()).toEqual('39');
    expect(resourcePanel.find('div[data-testid="lifeSupport-gemini1"]').text()).toEqual('79');
    expect(resourcePanel.find('div[data-testid="resource-gemini1"]').text().includes('O2 Replacement Cells')).toBeTruthy();
    // gemini 2
    expect(resourcePanel.find('div[data-testid="energy-gemini2"]').text()).toEqual('40');
    expect(resourcePanel.find('div[data-testid="lifeSupport-gemini2"]').text()).toEqual('100');
    expect(resourcePanel.find('div[data-testid="resource-gemini2"]').text()).toEqual('');
    done();
  });

  it('should reduce correctly after a hypergate move', async (done) => {
    // press next move to Hypergate 1
    await confirmMove('h1', '39');

    // check resource panel resource level
    gameBoard.update();
    let resourcePanel = gameBoard.find(ResourcePanel);
    // gemini 1
    expect(resourcePanel.find('div[data-testid="energy-gemini1"]').text()).toEqual('38');
    expect(resourcePanel.find('div[data-testid="lifeSupport-gemini1"]').text()).toEqual('78');
    expect(resourcePanel.find('div[data-testid="resource-gemini1"]').text().includes('O2 Replacement Cells')).toBeTruthy();
    // gemini 2
    expect(resourcePanel.find('div[data-testid="energy-gemini2"]').text()).toEqual('40');
    expect(resourcePanel.find('div[data-testid="lifeSupport-gemini2"]').text()).toEqual('100');
    expect(resourcePanel.find('div[data-testid="resource-gemini2"]').text()).toEqual('');

    // press next move to HyperGate 2
    await confirmMove('h2', '38');

    // check resource panel initial resource level
    gameBoard.update();
    resourcePanel = gameBoard.find(ResourcePanel);
    // gemini 1
    expect(resourcePanel.find('div[data-testid="energy-gemini1"]').text()).toEqual('18');
    expect(resourcePanel.find('div[data-testid="lifeSupport-gemini1"]').text()).toEqual('73');
    expect(resourcePanel.find('div[data-testid="resource-gemini1"]').text().includes('O2 Replacement Cells')).toBeTruthy();
    // gemini 2
    expect(resourcePanel.find('div[data-testid="energy-gemini2"]').text()).toEqual('40');
    expect(resourcePanel.find('div[data-testid="lifeSupport-gemini2"]').text()).toEqual('100');
    expect(resourcePanel.find('div[data-testid="resource-gemini2"]').text()).toEqual('');
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