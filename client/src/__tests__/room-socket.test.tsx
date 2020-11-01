import '@testing-library/jest-dom';
import SocketIOClient from 'socket.io-client';
import axios from 'axios';
import { SocketMessages } from '../metadata/types';

describe('socket.io client in rooms', () => {
  let socket: SocketIOClient.Socket;
  let token: string;

  beforeAll(async (done) => {
    const res = await axios.post('http://localhost:9000/admin/login',
      { username: 'tony', password: 'pwd' }
    );
    token = res.data.token;

    done();
  });

  beforeEach(() => {
    socket = SocketIOClient('http://localhost:9000', {
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
