import express from 'express';
import io from 'socket.io';
import { LobbyStatus } from '../metadata/types';
import repository, { Lobby } from '../repository';
import jwt from 'jsonwebtoken';
import { jwtOptions } from '../auth';

export default (router: express.Router, wss: io.Server) => {
  router.get('/:code', (req, res) => {
    const code = parseInt(req.params.code);
    const lobby = repository.lobbies[code];
    if (isNaN(code) || !lobby) {
      res.status(404).send(`Lobby code ${req.params.code} not found.`);
      return;
    }
    res.status(200).send({
      createTime: lobby.createTime,
    });
  });

  router.delete('/', (req, res) => {
    const lobbyCode = parseInt(req.body.lobby);
    const lobby = repository.lobbies[lobbyCode];
    if (isNaN(lobbyCode) || !lobby) {
      res.status(404).send(`Lobby code ${req.body.lobby} not found!`);
      return;
    }
    lobby.destroy();
    res.status(200).send();
  });

  router.put('/start/:code', (req, res) => {
    const code = parseInt(req.params.code);
    const lobby = repository.lobbies[code];
    if (isNaN(code) || !lobby) {
      res.status(404).send(`Lobby code ${req.params.code} not found.`);
      return;
    }
    lobby.startGames();
    res.status(200).send();
  });

  router.put('/:code', (req, res) => {
    const code = parseInt(req.params.code);
    const lobby = repository.lobbies[code];
    if (isNaN(code) || !lobby) {
      res.status(404).send(`Lobby code ${req.params.code} not found.`);
      return;
    }
    const { countDown } = req.body;
    const countDownInSeconds = parseInt(countDown);
    if (isNaN(countDownInSeconds) || countDownInSeconds <= 0 || countDownInSeconds > 999 * 60) {
      res.status(400).send('Bad count down range.');
      return;
    }
    if (lobby.status !== LobbyStatus.Waiting) {
      res.status(403).send('Cannot set count down for started or finished lobbies.');
      return;
    }
    lobby.setCountDown(countDownInSeconds);
    res.status(200).send();
  });

  wss.use((socket, next) => {
    const token = socket.handshake.query?.token;
    if (!token) {
      socket.disconnect();
      return;
    }
    let username: string;

    // sync callback
    jwt.verify(token, jwtOptions.secretOrKey, (err: any, decoded: { username: string }) => {
      if (err) {
        next(new Error('Authentication failed.'));
        return;
      }
      username = decoded.username;
    });

    if (!username) {
      socket.disconnect();
      return;
    }

    // TODO: compare with lobby's admin

    const lobbyCode = parseInt(socket.handshake.query?.lobby);
    const lobby = repository.lobbies[lobbyCode];
    if (isNaN(lobbyCode) || !lobby) {
      socket.disconnect();
      return;
    }
    socket.handshake.query.lobbyObj = lobby;
    next();
  }).on('connection', (socket) => {
    const lobby = socket.handshake.query.lobbyObj as Lobby;
    lobby.addSocket(socket);
  });

}