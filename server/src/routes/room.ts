import express from 'express';
import * as Types from '../metadata/types';
import io from 'socket.io';
import repository, { Lobby, Room } from '../repository';

export default (router: express.Router, wss: io.Server) => {

  router.post('/', (req, res) => {
    const lobbyCode = parseInt(req.body.lobby);
    let lobby = repository.lobbies[lobbyCode];
    if (isNaN(lobbyCode) || !lobby) {
      res.status(404).send(`Lobby code ${req.body.lobby} not found!`);
      // return;
      lobby = new Lobby(lobbyCode, 'me');
    }
    repository.lobbies[lobbyCode] = lobby;

    const roomName = req.body.room;
    if (lobby.rooms[roomName]) {
      res.status(403).send(`Room name ${roomName} already taken.`);
      return;
    }
    lobby.rooms[roomName] = new Room();
    res.status(200).send();
  });

  wss.use((socket, next) => {
    const query = socket.handshake.query;
    const lobbyCode = parseInt(query?.lobby);
    const lobby = repository.lobbies[lobbyCode];
    if (isNaN(lobbyCode) || !lobby) {
      next(new Error(`Lobby code ${query?.lobby} not found!`));
      return;
    }
    const roomName = query?.room;
    const room = lobby.rooms[roomName];
    if (!roomName || !room) {
      next(new Error(`Room ${roomName} not found!`));
      return;
    }
    socket.handshake.query.room = room;
    next();
  }).on('connection', (socket) => {
    const room = socket.handshake.query.room as Room;
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
