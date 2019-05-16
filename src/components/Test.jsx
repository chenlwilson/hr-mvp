import React from 'react';
import { Button } from 'react-bootstrap';

const Test = ({ coordinates, test, predict }) => (
  <div>
    <p>
      <Button variant="outline-warning" onClick={test}>Test</Button>
    </p>
    <p>
      <Button variant="outline-warning" onClick={predict}>Predict</Button>
    </p>
    <svg>
      {coordinates.map(vector => <polyline points={vector.join(' ')} key={vector[0].join(',')} />)}
    </svg>
  </div>
);

export default Test;
