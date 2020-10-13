import express from 'express';
import repository from '../repository';

export default (router: express.Router) => {
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
}