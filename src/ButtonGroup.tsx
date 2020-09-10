import React from 'react';
import { connect } from 'react-redux';
import { updateGame } from './store/actions';
import { GameState, UpdateGameRequest } from './store/types';
import styled from 'styled-components';
import Location from './classes/Location';
import {PixelPosition} from './classes/Location';

const ButtonGroupBackground = styled.div`
  position: absolute;
  background-color: rgba(18, 92, 112, 0.8);
  width: 60px;
  height: 20px;
  line-height: 20px;
  border-radius: 25%;
  top: ${(props: { position: PixelPosition }) => `${props.position.top + 25}px`};
  left: ${(props: { position: PixelPosition }) => `${props.position.left - 28}px`};
  text-align: center;
`;

const NextMoveButton = styled.div`
  width: 12px;
  height: 12px;
  display: inline-block;
  margin: 0 3px;
`;

const Gemini1Button = styled(NextMoveButton)`
  background-color: #fcc409;
  border-radius: 50%;
  &:hover {
    cursor: pointer;
  }
`;
const Gemini2Button = styled(NextMoveButton)`
  background-color: #46b3e8;
  border-radius: 50%;
  &:hover {
    cursor: pointer;
  }
`;
const Gemini12Button = styled(NextMoveButton)`
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
  position: PixelPosition,
  shipReachability: { gemini1: boolean, gemini2: boolean },
}

class ButtonGroup extends React.Component<GameStateRedux & Props> {

  render() {
    return (
      <ButtonGroupBackground position={this.props.position}>
        {
          this.props.shipReachability.gemini1 ? 
          <Gemini1Button /> : <></>
        }
        {
          this.props.shipReachability.gemini2 ? 
          <Gemini2Button /> : <></>
        }
        {
          this.props.shipReachability.gemini1 && this.props.shipReachability.gemini2 ? 
          <Gemini12Button /> : <></>
        }
      </ButtonGroupBackground>
    );
  }
}

export default connector(ButtonGroup);
