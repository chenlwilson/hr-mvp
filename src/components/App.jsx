import React, { Component } from 'react';
import Canvas from './Canvas.jsx';
import Cover from './Cover.jsx';
import Nav from './Nav.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.startGame = this.startGame.bind(this);
    this.stopGame = this.stopGame.bind(this);
    this.startPolyline = this.startPolyline.bind(this);
    this.stopPolyline = this.stopPolyline.bind(this);
    this.continuePolyline = this.continuePolyline.bind(this);

    this.state = {
      hasStarted: false,
      isDrawing: false,
      countdown: 2229,
      coordinates: [],
      navbarHeight: 54,
    };
  }

  startGame() {
    this.setState({
      hasStarted: true,
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
      hasStarted: false,
      countdown: 19,
      coordinates: [],
    });
    clearInterval(this.timer);
  }

  startPolyline(e) {
    const { navbarHeight, coordinates } = this.state;
    const x = e.clientX;
    const y = e.clientY - navbarHeight;
    this.setState({
      isDrawing: true,
      coordinates: [...coordinates, [[x, y]]],
    });
  }

  stopPolyline() {
    this.setState({
      isDrawing: false,
    });
  }

  continuePolyline(e) {
    const { isDrawing, navbarHeight, coordinates } = this.state;
    if (isDrawing) {
      const x = e.clientX;
      const y = e.clientY - navbarHeight;
      const currentStroke = coordinates[coordinates.length - 1];
      const updatedStroke = [...currentStroke, [x, y]];
      const prevStrokes = coordinates.slice(0, coordinates.length - 1);
      this.setState({
        coordinates: [...prevStrokes, updatedStroke],
      });
    }
  }

  render() {
    const { hasStarted, countdown, coordinates } = this.state;
    let display;
    if (hasStarted) {
      display = (
        <div>
          <Nav countdown={countdown} stopGame={this.stopGame} />
          <Canvas coordinates={coordinates} startPolyline={this.startPolyline} stopPolyline={this.stopPolyline} continuePolyline={this.continuePolyline} />
        </div>
      );
    } else {
      display = <Cover startGame={this.startGame} />;
    }

    return (
      display
    );
  }
}
