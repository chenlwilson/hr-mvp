import React from 'react';
import { Navbar, Button, Badge } from 'react-bootstrap';

const Canvas = ({ countdown, stopGame, coordinates, startPolyline, stopPolyline }) => (
  <div>
    <Navbar bg="light">
      <Button variant="outline-warning" onClick={stopGame}>Restart</Button>
      <Button bg="light" variant="warning">00:0{countdown}</Button>
    </Navbar>
    <svg
      onMouseDown={(e) => { startPolyline(e); }}
      onMouseUp={(e) => { stopPolyline(e); }}
    >
      {coordinates.map(vector => <polyline points={vector.join(' ')} key={vector[0].join(',')} />)}
    </svg>
  </div>
);

export default Canvas;
