import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { updateGame } from './store/actions';
import { GameState, UpdateGameRequest, UPDATE_REQUEST } from './store/types';

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
    return (
      <div className="App">
        <button onClick={this.onClick.bind(this)}></button>
      </div>
    );
  }
}

export default connector(App);
