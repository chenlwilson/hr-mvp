import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import convert from '../data/helper/convertCoordinates';

ReactDOM.render(<App convert={convert} />,
  document.getElementById('app'));
