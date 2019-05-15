const express = require('express');
const path = require('path');
const parser = require('body-parser');
const predictor = require('../data/predictor.js');

const app = express();

app.use(express.static(path.join(__dirname, './dist')));
app.use(parser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.post('/predict', (req, res) => {
  const { drawing } = req.body;
});

module.exports = app;
