import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {
  Col,
  Button,
} from 'react-bootstrap';

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
    return <>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
        crossOrigin='anonymous'
      />
      <div style={{ color: 'black' }}>
        <Col style={{borderColor:"black", borderWidth:10}}>
          <Form>
            <h1>Login to Rescue-Orion</h1>
            Username:
            <input type="text" className="form-control" id="username" name="username" value={this.state.username} onChange={this.handleUsernameChange} required></input>
            Password:
            <input type="password" className="form-control" id="password" name="password" value={this.state.password} onChange={this.handlePasswordChange} required></input>
            <Button variant='dark' onClick={this.handleFormSubmit}>Submit</Button>
          </Form>
          {/* <Extra>
              <button type="submit" className="btn btn-dark" onClick={this.handleExtraSubmit}>Register</button>
          </Extra> */}
        </Col>
      </div>
    </>;
  }
}
