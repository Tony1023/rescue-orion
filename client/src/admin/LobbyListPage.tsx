import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import client from '../axios-client';
import { Jumbotron, Table, Button, Badge, Modal } from 'react-bootstrap';
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

  useEffect(() => {
    client.get('http://localhost:9000/lobbies',
      { headers: { Authorization: `bearer ${localStorage.getItem('token')}` }}).then((res) => {
      setLobbies(res.data);
    });
  },[]);

  async function post() {
    let res = await client.post('http://localhost:9000/lobbies', {}, {
      headers: { Authorization: `bearer ${localStorage.getItem('token')}` }
    });
  }

  function navigateToLobby(code: number) {
    history.push(`/admin/lobbies/${code}`);
  }
  
  return <Wrapper>
    <Jumbotron>
      <Title>Welcome, {localStorage.getItem('username')}</Title>
      <h5 style={{ textAlign: 'center' }}>The table below is the list of lobbies you are in charge of.</h5>
    </Jumbotron>
    <Button onClick={post}>Create Lobby</Button>
    <Table striped bordered hover size='sm'>
      <tbody>
        <tr>
          <th>Lobby Code</th>
          <th>Create Time</th>
          <th style={{ width: '110px'}}>Close Lobby</th>
        </tr>
        {
          lobbies.map((lobby) => 
            <tr>
              <TableCell onClick={() => navigateToLobby(lobby.code)}>{lobby.code}</TableCell>
              <td>{lobby.createTime}</td>
              <td style={{ textAlign: 'center', padding: '0.1em' }}>
                <Button
                  size='sm'
                  variant='outline-danger'
                  onClick={() => setDeleteModal(lobby.code)}
                >Close</Button>
              </td>
            </tr>
          )
        }
      </tbody>
    </Table>
  </Wrapper>;
}