import React from 'react';
import { Button } from 'react-bootstrap';

const Cover = ({ toggleGame }) => (
  <div>
    <Button variant="outline-warning" onClick={toggleGame}>Start</Button>
  </div>
);

export default Cover;
