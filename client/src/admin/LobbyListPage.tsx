import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SocketIOClient from 'socket.io-client';
import axios from 'axios';
import { Jumbotron, Table, Button, Badge, Modal } from 'react-bootstrap';

export default () => {

    const [lobbyCodes, setLobbyCodes] =  useState([]);
    const [lobbyTimes, setLobbyTimes] =  useState([]);

    useEffect(() => {
        axios.get('http://localhost:9000/lobbies', { headers: { Authorization: `bearer ${localStorage.getItem('token')}` }}).then((res) => {
            console.log(res.data.lobbyCode);  
            console.log(res.data.lobbyCreateTime);  
            setLobbyCodes(res.data.lobbyCode);
            setLobbyTimes(res.data.lobbyCreateTime);            
        });
    },[]);

    async function post() {
        let res = await axios.post('http://localhost:9000/lobbies', {}, { headers: { Authorization: `bearer ${localStorage.getItem('token')}` }});
        console.log(res.data);
    }
    
    const code = lobbyCodes.map((number) => <li style={{ listStyleType: "none" }}>{number}</li>);
    const time = lobbyTimes.map((number) => <li style={{ listStyleType: "none" }}>{number}</li>);

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
                <tr>
                    <td><ol>{code}</ol></td>
                    <td>{time}</td>
                </tr>
            </tbody>
            </Table>
            </div>
            {/* <div>{lobbyCodes}</div>
            <div>{lobbyTimes}</div> */}
        </div>
    }
    </>
}