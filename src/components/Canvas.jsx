import React from 'react';
import { Button } from 'react-bootstrap';

const Canvas = ({ toggleGame }) => (
  <div>
    <Button variant="outline-warning" onClick={toggleGame}>Restart</Button>
  </div>
);

export default Canvas;
