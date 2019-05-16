import React from 'react';
import PropTypes from 'prop-types';
import { Button, Jumbotron } from 'react-bootstrap';

const Result = ({ startGame, result }) => (
  <Jumbotron>
    <h1>Um...</h1>
    <p>Looks like a PANNNNNDA!...</p>
    <p>
      <Button variant="outline-warning" onClick={startGame}>Play Again!</Button>
    </p>
  </Jumbotron>
);

Result.propTypes = {
  startGame: PropTypes.func.isRequired,
  result: PropTypes.number.isRequired,
};

export default Result;
