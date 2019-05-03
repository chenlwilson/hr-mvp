import React, { Component } from 'react';
import Canvas from './Canvas.jsx';
import Cover from './Cover.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.startGame = this.startGame.bind(this);
    this.stopGame = this.stopGame.bind(this);

    this.state = {
      isDrawing: false,
      countdown: 9,
      coordinates: [[
        [149, 15], [122, 13], [97, 17], [72, 32], [59, 43], [35, 74], [26, 92], [18, 127], [17, 164], [21, 181], [29, 196],
        [40, 208], [66, 225], [80, 230], [113, 233], [132, 233], [153, 227], [186, 203], [213, 168], [231, 129], [233, 95],
        [228, 79], [203, 44], [164, 16], [150, 14],
      ]],
    };
  }

  componentDidMount() {

  }

  startGame() {
    this.setState({
      isDrawing: true,
    });
    this.timer = setInterval(() => {
      this.setState({
        countdown: this.state.countdown - 1,
      });
      if (this.state.countdown < 0) {
        this.stopGame();
      }
    }, 1000);
  }

  stopGame() {
    this.setState({
      isDrawing: false,
      countdown: 9,
    });
    clearInterval(this.timer);
  }

  render() {
    return (
      <div>
        { this.state.isDrawing
          ? <Canvas stopGame={this.stopGame} countdown={this.state.countdown} coordinates={this.state.coordinates} />
          : <Cover startGame={this.startGame} /> }
      </div>
    );
  }
}
