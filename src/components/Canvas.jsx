import React from 'react';
import { Navbar, Button, Badge } from 'react-bootstrap';

const Canvas = ({ countdown, stopGame, coordinates }) => (
  <div>
    <Navbar bg="light">
      <Button variant="outline-warning" onClick={stopGame}>Restart</Button>
      <Button bg="light" variant="warning">00:0{countdown}</Button>
    </Navbar>
    <svg>
      {coordinates.map(vector => <polyline points={vector.join(' ')} />)}
    </svg>
  </div>
);

export default Canvas;
