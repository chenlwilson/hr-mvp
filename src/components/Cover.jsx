import React from 'react';
import PropTypes from 'prop-types';
import { Button, Jumbotron } from 'react-bootstrap';

const Cover = ({ startGame }) => (
  <Jumbotron className="text-center">
    <img id="panda-logo" src="logo.png" alt="panda-logo" />
    <h1>Draw something!</h1>
    <p>and let me tell you if it's a panda or not a panda...</p>
    <Button variant="warning" onClick={startGame}>Start</Button>
  </Jumbotron>
);

Cover.propTypes = {
  startGame: PropTypes.func.isRequired,
};

export default Cover;
