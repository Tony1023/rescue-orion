import express from 'express';
import http from 'http';
import room from './room';
import lobby from './lobby';
import io from 'socket.io';

export default (app: express.Express, server: http.Server): void => {

  const lobbyRouter = express.Router();
  app.use('/lobbies', lobbyRouter);
  lobby(lobbyRouter);

  const wss = io().path('/rooms').attach(server);
  const roomRouter = express.Router();
  app.use('/rooms', roomRouter);
  room(roomRouter, wss);

  /** Dev only stuff below, will be removed close to the end */
  const devWss = io().path('/dev').attach(server);
  devRoute(devWss);
};


import { Room } from '../repository';
import * as Types from '../metadata/types';

function devRoute(wss: io.Server) {
  const room = new Room();
  wss.on('connection', (socket) => {
    room.startGameIfNot();
    room.setSocket(socket);
    room.sendUpdate();

    socket.on(Types.RoomSocketMessage.Action, (json) => {
      const action = JSON.parse(json.toString());
      room.applyGameAction(action);
      room.sendUpdate();
    })

    socket.on('disconnect', () => {
      room.onSocketDisconnect();
    });
  });
}