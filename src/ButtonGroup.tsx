import React from 'react';
import { connect } from 'react-redux';
import { updateGame } from './store/actions';
import { GameState, UpdateGameRequest } from './store/types';
import styled from 'styled-components';
import Location from './classes/Location';
import {PixelPosition} from './classes/Location';

const Wrapper = styled.div`
  position: absolute;
  background-color: rgba(18, 92, 112, 0.8);
  width: 60px;
  height: 20px;
  border-radius: 25%;
`;
const Gemini1 = styled.div`
  position: absolute;
  width: 12px;
  height: 12px;
  background-color: #fcc409;
  border-radius: 50%;
  &:hover {
    cursor: pointer;
  }
`;
const Gemini2 = styled.div`
  position: absolute;
  width: 12px;
  height: 12px;
  background-color: #46b3e8;
  border-radius: 50%;
  &:hover {
    cursor: pointer;
  }
`;
const Gemini12 = styled.div`
  position: absolute;
  width: 12px;
  height: 12px;
  background-image: linear-gradient(135deg, #fcc409 50%, #46b3e8 50%);
  border-radius: 50%;
  &:hover {
    cursor: pointer;
  }
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

interface Props {
  id: string,
  location: Location,
  neighbors: string[],
  position: PixelPosition,
}

class ButtonGroup extends React.Component<GameStateRedux & Props> {

  shouldComponentUpdate(): boolean {
    return true;
  }

  onClick(): void {
    this.props.dispatch(updateGame(this.props.data));
  }

  render() {
    const Gemini1Button = styled(Gemini1)`
      top: ${this.props.position.top+25}px;
      left: ${this.props.position.left-22}px;
    `
    const Gemini2Button = styled(Gemini2)`
      top: ${this.props.position.top+25}px;
      left: ${this.props.position.left-5}px;
    `
    const Gemini12Button = styled(Gemini12)`
      top: ${this.props.position.top+25}px;
      left: ${this.props.position.left+12}px;
    `
    const ButtonWrapper = styled(Wrapper)`
      top: ${this.props.position.top+20}px;
      left: ${this.props.position.left-28}px;
    `
    return (
      <div>
        <ButtonWrapper />
        <Gemini1Button />
        <Gemini2Button />
        <Gemini12Button />
      </div>
    );
  }
}

export default connector(ButtonGroup);
