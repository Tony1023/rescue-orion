import express from 'express';
import http from 'http';
import room from './room';
import io from 'socket.io';

export default (app: express.Express, server: http.Server): void => {
  
  const wss = io().path('/rooms').attach(server);
  const roomRouter = express.Router();
  app.use('/rooms', roomRouter);
  room(roomRouter, wss);
};
