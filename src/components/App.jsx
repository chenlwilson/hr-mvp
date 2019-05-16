import React, { Component } from 'react';
import $ from 'jquery';
import Canvas from './Canvas.jsx';
import Cover from './Cover.jsx';
import Nav from './Nav.jsx';
import Result from './Result.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.startGame = this.startGame.bind(this);
    this.stopGame = this.stopGame.bind(this);
    this.startPolyline = this.startPolyline.bind(this);
    this.stopPolyline = this.stopPolyline.bind(this);
    this.continuePolyline = this.continuePolyline.bind(this);
    this.predict = this.predict.bind(this);
    this.restart = this.restart.bind(this);
    this.erase = this.erase.bind(this);
    this.showDrawings = this.showDrawings.bind(this);

    this.state = {
      isLoading: false,
      hasStarted: false,
      showResult: false,
      showRandom: false,
      isDrawing: false,
      countdown: 19,
      coordinates: [],
      navbarHeight: 54,
      result: '',
      random: [],
    };
  }

  componentDidMount() {
    this.showDrawings();
  }

  startGame() {
    this.setState({
      hasStarted: true,
      showResult: false,
      showRandom: false,
      countdown: 19,
      coordinates: [],
      result: '',
    });
    this.timer = setInterval(() => {
      this.setState({
        countdown: this.state.countdown - 1,
      });
      if (this.state.countdown < 0) {
        this.showResult();
      }
    }, 1000);
  }

  showResult() {
    this.predict();
    this.setState({
      showResult: true,
    });
    clearInterval(this.timer);
  }

  stopGame() {
    this.setState({
      hasStarted: false,
    });
    clearInterval(this.timer);
  }

  erase() {
    const { coordinates } = this.state;
    const updated = coordinates.slice(0, coordinates.length - 1);
    this.setState({
      coordinates: updated,
    });
  }

  restart() {
    this.setState({
      countdown: 19,
      coordinates: [],
    });
  }

  predict() {
    const { coordinates } = this.state;
    this.setState({
      isLoading: true,
    });
    $.ajax({
      url: '/predict',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(coordinates),
    })
      .done((res) => {
        let message;
        switch (res.name) {
          case 'bee':
          case 'bird':
          case 'crab':
          case 'fish':
          case 'octopus':
            message = 'Not even a mammal...';
            break;
          case 'cat':
          case 'dog':
            message = 'You pet is not a panda!';
            break;
          case 'giraffe':
          case 'lion':
            message = "Panda doesn't live in safari!";
            break;
          case 'panda':
            message = 'PAAAANNNNNNDA!';
            break;
          case 'others':
            message = 'No animal detected. Try again?';
            break;
          default:
            message = 'No animal detected. Try again?';
        }

        this.setState({
          result: message,
          isLoading: false,
        });
        console.log(res.name);
      })
      .fail(() => {
        console.log('fail to get results');
      });
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

  showDrawings() {
    $.ajax({
      url: '/random',
      type: 'GET',
      contentType: 'application/json',
    })
      .done((res) => {
        this.setState({
          showRandom: true,
          random: res.result,
        });
        console.log(res);
      })
      .fail(() => {
        console.log('fail to get more drawings');
      });
  }

  render() {
    const {
      hasStarted, countdown, coordinates, showResult, result, isLoading, random, showRandom,
    } = this.state;

    const canvasOptions = {
      coordinates,
      startPolyline: this.startPolyline,
      stopPolyline: this.stopPolyline,
      continuePolyline: this.continuePolyline,
    };

    const navOptions = {
      countdown,
      stopGame: this.stopGame,
      restart: this.restart,
      erase: this.erase,
    };

    const resultOptions = {
      isLoading,
      result,
      random,
      showRandom,
      startGame: this.startGame,
      showDrawings: this.showDrawings,
    };

    let display;
    if (hasStarted && showResult) {
      display = (
        <div>
          <Result options={resultOptions} />
        </div>
      );
    } else if (hasStarted) {
      display = (
        <div>
          <Nav options={navOptions} />
          <Canvas options={canvasOptions} />
        </div>
      );
    } else {
      display = (
        <div>
          <Cover startGame={this.startGame} />
        </div>
      );
    }

    return (
      display
    );
  }
}
