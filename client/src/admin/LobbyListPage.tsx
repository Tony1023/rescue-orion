import React, { useState, useEffect } from 'react';
import client from '../axios-client';
import { Jumbotron, Table, Button, Badge, Modal } from 'react-bootstrap';

export default () => {

  const [lobbies, setLobbies] = useState<{ code: number, createTime: number }[]>([]);

  useEffect(() => {
    client.get('http://localhost:9000/lobbies',
      { headers: { Authorization: `bearer ${localStorage.getItem('token')}` }}).then((res) => {
      setLobbies(res.data);
    });
  },[]);

  async function post() {
    let res = await client.post('http://localhost:9000/lobbies', {}, { headers: { Authorization: `bearer ${localStorage.getItem('token')}` }});
  }
  
  return <>
  {
    
    <div>
     <button onClick={post}>Create Lobby</button>
      <div>
      <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Lobby Code</th>
          <th>Create Time</th>
        </tr>
      </thead>
      <tbody id="lobbies">
        {
          lobbies.map((lobby) => <tr>
            <td>{lobby.code}</td>
            <td>{lobby.createTime}</td>
          </tr>)
        }
      </tbody>
      </Table>
      </div>
      {/* <div>{lobbyCodes}</div>
      <div>{lobbyTimes}</div> */}
    </div>
  }
  </>
}