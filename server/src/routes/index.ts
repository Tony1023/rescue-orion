import express from 'express';
import http from 'http';
import WebSocket from 'ws';

module.exports = (app: express.Express, server: http.Server) => {

  const wss = new WebSocket.Server({
    server: server,
    path: '/rooms',
  });
  const roomRouter = express.Router();
  app.use('/rooms', roomRouter);
  require('./room')(roomRouter, wss);
}