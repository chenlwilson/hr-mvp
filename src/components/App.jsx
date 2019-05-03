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
      vector: [],
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
          ? <Canvas stopGame={this.stopGame} countdown={this.state.countdown} /> : <Cover startGame={this.startGame} /> }
      </div>
    );
  }
}
