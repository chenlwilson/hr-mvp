import React from 'react';
import { Navbar, Button, Badge } from 'react-bootstrap';

const Canvas = ({ countdown, stopGame }) => (
  <div>
    <Navbar bg="light">
      <Button variant="outline-warning" onClick={stopGame}>Restart</Button>
      <h2><Badge bg="light" variant="warning">00:0{countdown}</Badge></h2>
    </Navbar>
    {/* <canvas
          id="drawingCanvas"
          resize="true"
          width="2022"
          height="360"
          style="-webkit-user-drag: none; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); width: 2022px; height: 360px;"
        /> */}
  </div>
);

export default Canvas;
