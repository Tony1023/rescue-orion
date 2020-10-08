import express from 'express';
import http from 'http';
import WebSocket from 'ws';

module.exports = (app: express.Express, server: http.Server) => {

  const wss = new WebSocket.Server({
    server: server,
    path: '/rooms',
  });
  require('./room')(app, wss);
}