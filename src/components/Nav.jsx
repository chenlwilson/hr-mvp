import React from 'react';
import {
  Navbar, Button, ButtonGroup,
} from 'react-bootstrap';

const Nav = ({ options }) => (
  <Navbar bg="dark">
    <ButtonGroup className="mr-2" aria-label="First group">
      <Button variant="outline-warning" onClick={options.stopGame}>Quit</Button>
    </ButtonGroup>
    <ButtonGroup className="mr-2" aria-label="Second group">
      <Button variant="outline-warning" onClick={options.restart}>Restart</Button>
    </ButtonGroup>
    <ButtonGroup className="mr-2" aria-label="Third group">
      <Button variant="outline-warning" onClick={options.erase}>Erase</Button>
    </ButtonGroup>
    <ButtonGroup className="mr-2" aria-label="Fourth group">
      <Button bg="dark" variant="warning">
      00:
        {options.countdown >= 10 ? options.countdown : `0${options.countdown}`}
      </Button>
    </ButtonGroup>
  </Navbar>
);

export default Nav;
