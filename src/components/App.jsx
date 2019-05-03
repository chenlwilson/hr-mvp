import React, { Component } from 'react';
import Canvas from './Canvas.jsx';
import Cover from './Cover.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.toggleGame = this.toggleGame.bind(this);

    this.state = {
      isDrawing: false,
      vector: [],
    };
  }

  componentDidMount() {

  }

  toggleGame() {
    this.setState({
      isDrawing: !this.state.isDrawing,
    });
  }

  render() {
    return (
      <div>
        { this.state.isDrawing
          ? <Canvas toggleGame={this.toggleGame} /> : <Cover toggleGame={this.toggleGame} /> }
      </div>
    );
  }
}
