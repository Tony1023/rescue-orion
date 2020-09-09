import React from 'react';
import { connect } from 'react-redux';
import { updateGame } from './store/actions';
import { GameState, UpdateGameRequest, UPDATE_REQUEST } from './store/types';
import styled from 'styled-components';
import metadata from './metadata/data';

const GameBoard = styled.div`
  background-image: url(${`${process.env.PUBLIC_URL}/game_map.jpg`});
  height: 810px;
  width: 1440px;
  background-size: contain;
  position: relative;
  margin: 0 auto;
`;

const Gemini1 = styled.div`
  position: absolute;
  left: 535px;
  top: 180px;
  width: 60px;
  height: 60px;
  background-color: blue;
  border-radius: 30px;
`;

interface GameStateRedux extends GameState {
  dispatch: (request: UpdateGameRequest) => void,
}

const connector = connect(
  (state: GameState) => ({...state}),
  null,
  null,
  { pure: false }
);

class App extends React.Component<GameStateRedux> {

  shouldComponentUpdate(): boolean {
    return true;
  }

  onClick(): void {
    this.props.dispatch(updateGame(this.props.data));
  }

  render() {
    console.log(metadata);
    return (
      <GameBoard>
        <Gemini1/>
      </GameBoard>
    );
  }
}

export default connector(App);
