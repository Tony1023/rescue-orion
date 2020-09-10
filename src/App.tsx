import React from 'react';
import { connect } from 'react-redux';
import { updateGame } from './store/actions';
import ButtonGroup from './ButtonGroup';
import { GameState, UpdateGameRequest, UPDATE_REQUEST } from './store/types';
import styled from 'styled-components';
import metadata from './metadata/data';
import { computeNextMoves } from './utils';

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

  state = {
    nextMove: {
      gemini1: null,
      gemini2: null,
    }
  };

  onClick(): void {
    this.props.dispatch(updateGame(this.props.data));
  }

  render() {
    const nextMoves = computeNextMoves({
      gemini1: ['sagittarius', 'b3', 'b2'],
      gemini2: ['sagittarius', 'b3', 'h1'] 
    });
    return (
      <GameBoard>
        {
          Object.entries(nextMoves).map((location, index) => {
            const locationId = location[0];
            const locationData = metadata[locationId];
            return (
              <ButtonGroup 
                key={index}
                id={locationId}
                location={locationData.location}
                position={locationData.pixelPosition}
                shipReachability={location[1]}
              />
            );
          })
        }
      </GameBoard>
    );
  }
}

export default connector(App);
