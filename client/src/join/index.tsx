import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export default () => {
  const history = useHistory();
  const [roomName, setRoomName] = useState('');
  const [lobbyCode, setLobbyCode] = useState('');
  const [showReconnectModal, setShowReconnectModal] = useState(false);
  const [error, setError] = useState<string>();

  function joinRoom() {
    axios.post('http://localhost:9000/rooms', {
      lobby: lobbyCode,
      room: roomName,
    }).then(() => {
      history.push(`/rooms?lobby=${lobbyCode}&room=${roomName}`);
    }).catch((err) => {
      if (err.status === 400) {
        setShowReconnectModal(true);
      } else {
        setError(err.response.data);
      }
    });
  }

  return <>
    <p>
      <label>Lobby code</label>
      <input
        type='text'
        value={lobbyCode}
        onChange={(e) => setLobbyCode(e.target.value)}
      />
      {error}
    </p>
    <p>
      <label>Room name</label>
      <input
        type='text'
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />
    </p>
    <p>
      <button onClick={joinRoom}>Join</button>
    </p>
    {
      showReconnectModal ?
      <div>Modal!</div> : <></>
    }
  </>;
}