import React from 'react';
import { useSelector, useDispatch } from '../redux-hook-adapters';
import styled from 'styled-components';
import { moveSpaceship } from '../actions';
import {
  BaseModalTextBackground,
  Modal,
  ModalBackground,
  StyledButton,
  Header,
} from './modal';
import * as IDs from '../../metadata/agent-ids';

const StyledModal = styled(Modal)`
  padding: 30px;
  font-family: 'roboto';
`;

const Column = styled.div`
  width: 50%;
  display: inline-block;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const GeminiImage = styled.div`
  background-image: ${(props: {backgroundImage: string}) => `url(${`${process.env.PUBLIC_URL}/${props.backgroundImage}`})`};
  background-size: cover;
  width: 120px;
  height: 120px;
  margin: auto;
`;

const Title = styled.div`
  width: 150px;
  margin: auto;
  font-size: 20px;
  font-weight: bold;
`;

const Number = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const ActionButton = styled(StyledButton)`
  margin: auto;
  width: 150px;
  text-transform: uppercase;
`;

export default (props: {
  gemini1NextMove: string,
  gemini2NextMove: string,
  onClose: () => void,
}) => {
  const dispatch = useDispatch();
  const gameState = useSelector((state) => state);
  const day = gameState.time;
  const gemini1 = gameState.spaceships[IDs.GEMINI_1];
  const gemini2 = gameState.spaceships[IDs.GEMINI_2];
  const nextMoves = gameState.nextMoves;

  const travelTogether = gemini1.location === gemini2.location && props.gemini1NextMove == props.gemini2NextMove;

  const costs = { 
    gemini1: nextMoves[props.gemini1NextMove][IDs.GEMINI_1].cost,
    gemini2: nextMoves[props.gemini2NextMove][IDs.GEMINI_2].cost,
  };

  return <ModalBackground>
    <BaseModalTextBackground>
      <StyledModal>
        <Header>
          Do you wish to confirm your move?
        </Header>
        <Column>
          <GeminiImage backgroundImage='Gemini1.png' />
          <Title>Gemini 1</Title>
          <Column>
            <h4>Energy Cells</h4>
            <Number>{gemini1.energyCells}</Number>
            <i className="fas fa-long-arrow-alt-down"></i>
            <Number>
              {
                gemini1.energyCells - costs.gemini1.energyCells <= 0 ?
                <span style={{color: 'red'}}>0</span>
                :
                gemini1.energyCells - costs.gemini1.energyCells
              }
            </Number>
          </Column>
          <Column>
            <h4>Life Support Packs</h4>
            <Number>{gemini1.lifeSupportPacks}</Number>
            <i className="fas fa-long-arrow-alt-down"></i>
            <Number>
              {
                gemini1.lifeSupportPacks - costs.gemini1.lifeSupportPacks <= 0 ?
                <span style={{color: 'red'}}>0</span>
                :
                gemini1.lifeSupportPacks - costs.gemini1.lifeSupportPacks
              }
            </Number>
          </Column>
        </Column>
        <Column>
          <GeminiImage backgroundImage='Gemini2.png'/>
          <Title>Gemini 2</Title>
          <Column>
            <h4>Energy Cells</h4>
            <Number>{gemini2.energyCells}</Number>
            <i className="fas fa-long-arrow-alt-down"></i>
            <Number>
              {
                gemini2.energyCells - (travelTogether ? 0 : costs.gemini2.energyCells) <= 0 ?
                <span style={{color: 'red'}}>0</span>
                :
                gemini2.energyCells - (travelTogether ? 0 : costs.gemini2.energyCells)
              }
            </Number>
          </Column>
          <Column>
            <h4>Life Support Packs</h4>
            <Number>{gemini2.lifeSupportPacks}</Number>
            <i className="fas fa-long-arrow-alt-down"></i>
            <Number>
              {
                gemini2.lifeSupportPacks - (travelTogether ? 0 : costs.gemini2.lifeSupportPacks) <= 0 ?
                <span style={{color: 'red'}}>0</span>
                :
                gemini2.lifeSupportPacks - (travelTogether ? 0 : costs.gemini2.lifeSupportPacks)
              }
            </Number>
          </Column>
        </Column>
          <Title><span>Day {day}</span> <i className="fas fa-long-arrow-alt-right"></i> <span>Day {day + 1}</span></Title>
        <Column>
          <ActionButton onClick={() => {
            dispatch(moveSpaceship({
              gemini_1: `${props.gemini1NextMove}`,
              gemini_2: `${props.gemini2NextMove}`
            }))
            props.onClose();
          }}>Confirm Move</ActionButton>
        </Column>
        <Column>
          <ActionButton onClick={props.onClose}>Cancel Move</ActionButton>
        </Column>
      </StyledModal>
    </BaseModalTextBackground>
  </ModalBackground>
}