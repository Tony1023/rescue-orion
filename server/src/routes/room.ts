import express from 'express';
import Room from '../repository/room';
import * as Types from '../metadata/types';
import io from 'socket.io';
import repository, { Lobby } from '../repository';

const rooms: {
  [room: string]: Room
} = {};

export default (router: express.Router, wss: io.Server) => {

  router.post('/', (req, res) => {
    const lobbyCode = parseInt(req.body.lobby);
    let lobby = repository.lobbies[lobbyCode];
    if (!isNaN(lobbyCode) && !lobby) {
      res.status(404).send(`Lobby code ${req.body.lobby} not found!`);
    }
    lobby = new Lobby(lobbyCode, 'me');
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
    if (query?.room && query?.lobby) {
      // TODO: only check if room and lobby are correct
      if (!rooms[query.room]) {
        const room = new Room();
        rooms[query.room] = room;
      }
      query.room = rooms[query.room];
      next();
    }
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
