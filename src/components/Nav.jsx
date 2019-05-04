import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Button, Badge } from 'react-bootstrap';

const Nav = ({ countdown, stopGame }) => (
  <Navbar bg="dark">
    <Button variant="outline-warning" onClick={stopGame}>Restart</Button>
    <Button bg="dark" variant="warning">
      00:0
      {countdown}
    </Button>
  </Navbar>
);

Nav.propTypes = {
  countdown: PropTypes.number.isRequired,
  stopGame: PropTypes.func.isRequired,
};
export default Nav;
