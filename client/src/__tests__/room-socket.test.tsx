import '@testing-library/jest-dom';
import SocketIOClient from 'socket.io-client';
import axios from 'axios';
import { SocketMessages } from '../metadata/types';
import { API_BASE_URL } from '../config';

describe('socket.io client in rooms', () => {
  let socket: SocketIOClient.Socket;
  let token: string;

  beforeAll(async (done) => {
    const res = await axios.post(`${API_BASE_URL}/admin/login`,
      { username: 'tony', password: 'pwd' }
    );
    token = res.data.token;

    done();
  });

  beforeEach(() => {
    socket = SocketIOClient(`${API_BASE_URL}`, {
      path: '/rooms/socket',
      query: {
        lobby: 'something',
        room: 'room',
      },
      autoConnect: false,
    });
  });

  it('disconnects immediately after', (done) => {
    socket.connect();
    socket.on(SocketMessages.StateUpdate, () => done(new Error('Not supposed to receive game')));
    socket.on('disconnect', () => done());
  });
});
