import React from 'react';
import { connect } from 'react-redux';
import { updateGame } from './store/actions';
import ButtonGroup from './ButtonGroup';
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
        {
          Object.entries(metadata).map((data, i) => {
            return <ButtonGroup id={data[0]} key={i} location={data[1].location} neighbors={data[1].neighbors} position={data[1].pixelPosition}/>;
          })
        }
      </GameBoard>
    );
  }
}

export default connector(App);
