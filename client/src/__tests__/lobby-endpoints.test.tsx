import '@testing-library/jest-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';

describe('lobby endpoints', () => {
  let token1: string;
  let token2: string;
  
  beforeAll(async (done) => {
    {
      const res = await axios.post(`${API_BASE_URL}/admin/login`, {
        username: 'Gita',
        password: 'RescueOrion!',
      });
      token1 = res.data.token;
    }
    {
      const res = await axios.post(`${API_BASE_URL}/admin/login`, {
        username: 'Brady',
        password: 'RescueOrion!',
      });
      token2 = res.data.token;
    }
    done();
  });

  it('creates a lobby', async (done) => {
    let newLobbyCode;
    let lobbyList1, lobbyList2;
    {
      let res = await axios.get(`${API_BASE_URL}/lobbies`, {
        headers: { Authorization: `Bearer ${token1}`}
      });
      lobbyList1 = res.data;
      res = await axios.get(`${API_BASE_URL}/lobbies`, {
        headers: { Authorization: `Bearer ${token2}`}
      });
      lobbyList2 = res.data;
    }
    {
      const res = await axios.post(`${API_BASE_URL}/lobbies`, {}, {
        headers: { Authorization: `Bearer ${token1}` }
      });
      newLobbyCode = res.data.code;
    }
    {
      let res = await axios.get(`${API_BASE_URL}/lobbies`, {
        headers: { Authorization: `Bearer ${token1}`}
      });
      expect(res.data).toHaveLength(lobbyList1.length + 1);
      expect(res.data[0].code).toBe(newLobbyCode);
      res = await axios.get(`${API_BASE_URL}/lobbies`, {
        headers: { Authorization: `Bearer ${token2}`}
      });
      expect(res.data).toHaveLength(lobbyList2.length);
    }
    try {
      let res = await axios.get(`${API_BASE_URL}/lobbies/${newLobbyCode}`, {
        headers: { Authorization: `Bearer ${token1} `}
      });
      expect(res).toBeDefined();
      res = await axios.get(`${API_BASE_URL}/lobbies/${newLobbyCode}`, {
        headers: { Authorization: `Bearer ${token2} `}
      });
      done(new Error('Should\'ve failed'));
    } catch (err) { }
    done();
  });

  it('deletes a lobby', async (done) => {
    const res = await axios.get(`${API_BASE_URL}/lobbies`, {
      headers: { Authorization: `Bearer ${token1}`}
    });
    let lobbies;
    {
      let res = await axios.get(`${API_BASE_URL}/lobbies`, {
        headers: { Authorization: `Bearer ${token1}`}
      });
      lobbies = res.data;
    }
    try {
      await axios.delete(`${API_BASE_URL}/lobbies/${res.data.code}`, {
        headers: { Authorization: `Bearer ${token1} `}
      });
      expect(1).toBe(1);
      await axios.delete(`${API_BASE_URL}/lobbies/${res.data.code}`, {
        headers: { Authorization: `Bearer ${token1} `}
      });
      done(new Error('Should\'ve failed'));
    } catch (err) {
      expect(err.response.status).toBe(404);
    }
    {
      let res = await axios.get(`${API_BASE_URL}/lobbies`, {
        headers: { Authorization: `Bearer ${token1}`}
      });
      expect(res.data).toEqual(lobbies);
    }
    done();
  });
});

describe('lobby socket and endpoints', () => {

});