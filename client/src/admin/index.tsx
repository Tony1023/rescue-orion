import React from 'react';
import { GameState, RoomSocketMessage } from '../metadata/types';
import styled, { createGlobalStyle } from 'styled-components';
import SocketIOClient from 'socket.io-client';
import { Location } from 'history';
import queryString from 'query-string';
import axios from 'axios';

const Form = styled.div`
  border-radius: 3px;
  &>h1{
    text-align: center;
    background-color:rgba(164, 164, 164, 0);
    border-radius: 3px;
  }
  &>h6{
    text-align: center;
    background-color:rgba(164, 164, 164, 0);
    border-radius: 3px;
  }
`;

const Extra = styled.div`
  float:right;
	position: relative;
	top:-38px;
`;

export default class extends React.Component<{}, {username: string, password:string }> {
  constructor(props:any){
    super(props);
    this.state={username:'', password:''};
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleExtraSubmit = this.handleExtraSubmit.bind(this);
  }

  handleUsernameChange(event: { target: { value: any; }; }){
    this.setState({username: event.target.value});
  }
  handlePasswordChange(event: { target: { value: any; }; }){
    this.setState({password: event.target.value});
  }

  async handleFormSubmit(event: { preventDefault: () => void; }){
    alert('Trying to login: A username and password was ssubmitted: ' + this.state.username + " " + this.state.password);
    try {
      await axios.post('http://localhost:9000/admin/login', {
        username: this.state.username,
        password: this.state.password,
      });
    } catch(err) {
      console.log(err);
    }
    event.preventDefault();
  }

  handleExtraSubmit(event: { preventDefault: () => void; }){
    alert('Trying to register: A username and password was submitted: ' + this.state.username + " " + this.state.password);
    event.preventDefault();
  }

  render(){
    return (
      <div style={{ color: 'black' }}>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous"></link>
        <div className="col-lg-12" style={{borderColor:"black", borderWidth:10}}>
          <Form>
            <h1>Login to Rescue-Orion</h1>
            <div className="form-group">
              Username:
              <input type="text" className="form-control" id="username" name="username" value={this.state.username} onChange={this.handleUsernameChange} required></input>
            </div>
            <div className="form-group">
            </div>
            <div className="form-group">
              Password:
              <input type="password" className="form-control" id="password" name="password" value={this.state.password} onChange={this.handlePasswordChange} required></input>
            </div>
            <button type="submit" className="btn btn-dark" onClick={this.handleFormSubmit}>Submit</button>
          </Form>
          {/* <Extra>
              <button type="submit" className="btn btn-dark" onClick={this.handleExtraSubmit}>Register</button>
          </Extra> */}
        </div>
      </div>
    );
  }
}

