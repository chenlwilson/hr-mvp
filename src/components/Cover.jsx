import React from 'react';
import PropTypes from 'prop-types';
import { Button, Jumbotron } from 'react-bootstrap';

const Cover = ({ startGame }) => (
  <Jumbotron>
    <h1>Draw something!</h1>
    <p>and let me tell you if it's a panda or not a panda...</p>
    <p>
      <Button variant="outline-warning" onClick={startGame}>Start</Button>
    </p>
  </Jumbotron>
);

Cover.propTypes = {
  startGame: PropTypes.func.isRequired,
};

export default Cover;
