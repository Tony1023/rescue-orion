import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import client from '../axios-client';
import { Jumbotron, InputGroup, FormControl, Button, Modal } from 'react-bootstrap';
import styled, { createGlobalStyle } from 'styled-components';

const Wrapper = styled(Jumbotron)`
  margin: 50px auto;
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
    client.post('http://localhost:9000/rooms', {
      lobby: lobbyCode,
      room: roomName,
    }).then(() => redirectToRoom())
      .catch((err) => {
      if (err.response.status === 403) {
        setShowReconnectModal(true);
      } else {
        setError(err.response.data);
      }
    });
  }

  function redirectToRoom() {
    history.push(`/rooms?lobby=${lobbyCode}&room=${roomName}`);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      joinRoom();
    }
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
          onKeyDown={onKeyDown}
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
          onKeyDown={onKeyDown}
        />
      </InputGroup>
      <p style={{ height: '20px', color: 'red' }}>
        {error}
      </p>
      <Button
        onClick={joinRoom}
        block
      >Join</Button>
    </Wrapper>
    <Modal
      show={showReconnectModal}
      onHide={() => setShowReconnectModal(false)}
    >
      <Modal.Header closeButton>
        <h4>Room name {roomName} is taken</h4>
      </Modal.Header>
      <Modal.Body>
        <p>Are you trying to reconnect?</p>
        <p>You will kick out anyone that's connected to the room.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='secondary'
          onClick={() => setShowReconnectModal(false)}
        >No, enter another name</Button>
        <Button
          variant='primary'
          onClick={redirectToRoom}
        >Yes, reconnect</Button>
      </Modal.Footer>
    </Modal>
  </>;
}