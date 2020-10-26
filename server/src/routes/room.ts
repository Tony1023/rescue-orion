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
      repository.lobbies[lobbyCode] = new Lobby(lobbyCode, 'admin');
      return;
    }

    const roomName = req.body.room;
    if (!roomName) {
      res.status(400).send('Room name must not be empty.');
      return;
    }
    if (lobby.isRoomNameTaken(roomName)) {
      res.status(403).send(`Room name ${roomName} already taken.`);
      return;
    }
    if (lobby.status === Types.LobbyStatus.Finished) {
      res.status(404).send('Lobby is no longer accepting players.');
      return;
    }
    lobby.insertRoom(roomName);
    res.status(200).send();
  });

  wss.use((socket, next) => {
    const query = socket.handshake.query;
    const lobbyCode = parseInt(query?.lobby);
    const lobby = repository.lobbies[lobbyCode];
    if (isNaN(lobbyCode) || !lobby) {
      socket.disconnect();
      return;
    }
    const roomName = query?.room;
    const room = lobby.findRoom(roomName);
    if (!roomName || !room) {
      socket.disconnect();
      return;
    }
    socket.handshake.query.room = room;
    next();
  }).on('connection', (socket) => {
    const room = socket.handshake.query.room as Room;
    room.setSocketAndPushUpdate(socket);

    socket.on(Types.SocketMessages.Action, (json) => {
      const action = JSON.parse(json.toString());
      room.applyGameAction(action);
    })

    socket.on('disconnect', () => {
      room.onSocketDisconnect();
    });
  });

}
