import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Jumbotron, InputGroup, FormControl, Button } from 'react-bootstrap';
import styled, { createGlobalStyle } from 'styled-components';

const Wrapper = styled(Jumbotron)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
`;

const Global = createGlobalStyle`
  html, body {
    background-color: rgb(248, 248, 248) !important;
  }
`;

export default () => {
  const history = useHistory();
  const [roomName, setRoomName] = useState('');
  const [lobbyCode, setLobbyCode] = useState('');
  const [showReconnectModal, setShowReconnectModal] = useState(false);
  const [error, setError] = useState<string>();

  function joinRoom() {
    if (!lobbyCode || !roomName) {
      setError('Lobby code and room name must not be empty.');
      return;
    }
    axios.post('http://localhost:9000/rooms', {
      lobby: lobbyCode,
      room: roomName,
    }).then(() => {
      history.push(`/rooms?lobby=${lobbyCode}&room=${roomName}`);
    }).catch((err) => {
      if (err.status === 403) {
        setShowReconnectModal(true);
      } else {
        setError(err.response.data);
      }
    });
  }

  return <>
    <Global />
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
      integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
      crossOrigin='anonymous'
    />
    <Wrapper>
      <h1 style={{
        textAlign: 'center',
        marginBottom: '40px',
      }}>Join Rescue Orion</h1>
      <InputGroup style={{ marginBottom: '10px' }}>
        <InputGroup.Prepend>
          <InputGroup.Text
            style={{
              width: '120px',
              backgroundColor: 'rgb(73, 81, 87)',
              color: 'white',
            }}
          >Lobby Code</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl 
          value={lobbyCode}
          onChange={(e) => setLobbyCode(e.target.value)}
        />
      </InputGroup>
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text
            style={{
              width: '120px',
              backgroundColor: 'rgb(73, 81, 87)',
              color: 'white',
            }}
          >Room Name</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl 
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
      </InputGroup>
      <p style={{ height: '20px', color: 'red' }}>
        {error}
      </p>
      <Button
        onClick={joinRoom}
        block
      >Join</Button>
      {
        showReconnectModal ?
        <div>Modal!</div> : <></>
      }
    </Wrapper>
  </>;
}