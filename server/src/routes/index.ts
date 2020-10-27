import express from 'express';
import http from 'http';
import room from './room';
import admin from './admin';
import lobby from './lobby';
import io from 'socket.io';
import { passport } from '../auth';

export default (app: express.Express, server: http.Server): void => {

  const adminRouter = express.Router();
  app.use('/admin', adminRouter);
  admin(adminRouter);

  const lobbyWss = io().path('/lobbies/socket').attach(server);
  const lobbyRouter = express.Router();
  lobbyRouter.use(passport.authenticate("jwt", { session: false }));
  app.use('/lobbies', lobbyRouter);
  lobby(lobbyRouter, lobbyWss);

  const roomWss = io().path('/rooms/socket').attach(server);
  const roomRouter = express.Router();
  app.use('/rooms', roomRouter);
  room(roomRouter, roomWss);

  /** Dev only stuff below, will be removed close to the end */
  const devWss = io().path('/dev').attach(server);
  devRoute(devWss);
};


import { Lobby, Room } from '../repository';
import * as Types from '../metadata/types';

function devRoute(wss: io.Server) {
  const lobby = new Lobby(12306, 'admin');
  if (!lobby.isRoomNameTaken('room')) {
    lobby.insertRoom('room');
  }
  const room = lobby.findRoom('room');
  wss.on('connection', (socket) => {
    lobby.startGames();
    room.setSocketAndPushUpdate(socket);

    socket.on(Types.SocketMessages.Action, (json) => {
      const action = JSON.parse(json.toString());
      room.applyGameAction(action);
    })

    socket.on('disconnect', () => {
      room.onSocketDisconnect();
    });
  });
}