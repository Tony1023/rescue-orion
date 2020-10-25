import express from 'express';
import io from 'socket.io';
import repository, { LobbyStatus } from '../repository';

export default (router: express.Router, wss: io.Server) => {
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
    if (isNaN(countDownInSeconds) || countDownInSeconds <= 0) {
      res.status(403).send('Bad count down range.');
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

  }).on('connection', (socket) => {

  });

}