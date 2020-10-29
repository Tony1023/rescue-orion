import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import client from '../axios-client';
import { Jumbotron, Table, Button, Modal } from 'react-bootstrap';
import { Title, Wrapper } from './styles';
import styled from 'styled-components';

const TableCell = styled.td`
  &:hover {
    cursor: pointer;
  }
`;

export default () => {

  const history = useHistory();
  const [lobbies, setLobbies] = useState<{ code: number, createTime: number }[]>([]);
  const [deleteModal, setDeleteModal] = useState<number>();

  useEffect(loadLobbies, []);

  function loadLobbies() {
    client.get('http://localhost:9000/lobbies',
      { headers: { Authorization: `bearer ${localStorage.getItem('token')}` }}).then((res) => {
      setLobbies(res.data);
    });
  }

  function createLobby() {
    client.post('http://localhost:9000/lobbies', {}, {
      headers: { Authorization: `bearer ${localStorage.getItem('token')}` }
    })
      .then(loadLobbies);
  }

  function deleteLobby(code: number) {
    client.delete(`http://localhost:9000/lobbies/${code}`, {
      headers: { Authorization: `bearer ${localStorage.getItem('token')}` }
    })
      .then(() => {
        setDeleteModal(undefined);
        loadLobbies();
      });
  }

  function navigateToLobby(code: number) {
    history.push(`/admin/lobbies/${code}`);
  }
  
  return <>
    <Wrapper>
      <Jumbotron>
        <Title>Welcome, {localStorage.getItem('username')}</Title>
        <h5 style={{ textAlign: 'center' }}>The table below is the list of lobbies you are in charge of.</h5>
      </Jumbotron>
      <Button
        style={{ marginBottom: '10px' }}
        onClick={createLobby}
      >Create Lobby</Button>
      <Table striped bordered hover size='sm'>
        <tbody>
          <tr>
            <th>Lobby Code</th>
            <th>Create Time</th>
            <th style={{ width: '110px'}}>Close Lobby</th>
          </tr>
          {
            lobbies.map((lobby) => {
              const date = new Date(lobby.createTime);
              const timeString = date.toLocaleString();
              return <tr>
                <TableCell onClick={() => navigateToLobby(lobby.code)}>{lobby.code}</TableCell>
                <td>{timeString}</td>
                <td style={{ textAlign: 'center', padding: '0.1em' }}>
                  <Button
                    size='sm'
                    variant='outline-danger'
                    onClick={() => setDeleteModal(lobby.code)}
                    >Close</Button>
                </td>
              </tr>;
            })
          }
        </tbody>
      </Table>
    </Wrapper>
    <Modal
      show={deleteModal}
      onHide={() => setDeleteModal(undefined)}
    >
      <Modal.Header closeButton>
        <h4>About to shut down lobby {deleteModal}</h4>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure to shutdown lobby {deleteModal}?</p>
        <p>It cannot be undone and all games in it will be lost.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='secondary'
          onClick={() => setDeleteModal(undefined)}
        >Cancel</Button>
        <Button
          variant='danger'
          onClick={() => deleteLobby(deleteModal!)}
        >Yes, close it</Button>
      </Modal.Footer>
    </Modal>
  </>;
}