import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import room from './room';

export default (app: express.Express, server: http.Server): void => {

  const wss = new WebSocket.Server({
    server,
    path: '/rooms',
  });
  const roomRouter = express.Router();
  app.use('/rooms', roomRouter);
  room(roomRouter, wss);
};
