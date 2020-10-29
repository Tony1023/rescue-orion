import styled from 'styled-components';
import {Navbar, Nav} from 'react-bootstrap';
import React,{Component} from 'react';

export const Wrapper = styled.div`
  max-width: 1100px;
  min-height: 100vh;
  margin: 0 auto;
  background-color: rgb(248, 248, 248);
  padding: 20px;
`;

export const Title = styled.h1`
  margin-bottom: 30px;
  text-align: center;
`
export class NavBar extends Component{
  render() {
    return (
      <Navbar sticky="top" bg="dark" variant="dark">
      <Nav className="mr-auto">
        <Nav.Link href="/admin/lobbies">Return to Lobby</Nav.Link>
      </Nav>
      <Nav>
        <Nav.Link href="/admin">Log Out</Nav.Link>
      </Nav>
    </Navbar>
    );
  }
}
