import express from 'express';
import http from 'http';
import room from './room';
import io from 'socket.io';

export default (app: express.Express, server: http.Server): void => {

  const wss = io();
  wss.path('/rooms');
  wss.attach(server);
  const roomRouter = express.Router();
  app.use('/rooms', roomRouter);
  room(roomRouter, wss);
};
