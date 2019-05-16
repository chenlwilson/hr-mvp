import React from 'react';
import { Button, Jumbotron, ButtonGroup } from 'react-bootstrap';

const Result = ({ options }) => (
  <Jumbotron className="text-center">
    <h1>{options.result}</h1>
    {options.isLoading && <h3>Um...Panda face recognition machine is thinking...</h3>}
    <div>
      <ButtonGroup className="mt-4 mr-2 mb-4" aria-label="First group">
        <Button variant="warning" onClick={options.startGame}>Play Again!</Button>
      </ButtonGroup>
      <ButtonGroup className="mt-4 mr-2 mb-4" aria-label="Second group">
        <Button variant="outline-warning" onClick={options.showDrawings}>See what panda looks like!</Button>
      </ButtonGroup>
    </div>
    {options.result === 'PAAAANNNNNNDA!' && !options.showRandom && <img id="panda-gif" src="panda.gif" alt="panda-pushup" />}
    {options.showRandom
      && (
      <svg className="random">
        {options.random[Math.floor(Math.random() * options.random.length)].map(vector => <polyline points={vector.join(' ')} key={vector[0].join(',')} />)}
      </svg>
      )
    }
  </Jumbotron>
);

export default Result;
