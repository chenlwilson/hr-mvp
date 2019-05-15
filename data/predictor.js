require('@tensorflow/tfjs-node');
const tf = require('@tensorflow/tfjs');
const convertCoordinates = require('./convertCoordinates.js');
const convertSingle = require('./convertSingle.js');

const predictor = async (coordinates) => {
  const model = await tf.loadLayersModel('file://./data/model.json');
  const optimizer = tf.train.adam();
  model.compile({
    optimizer,
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy'],
  });

  const convertedDrawing = convertCoordinates(coordinates);
  const normalizedDrawing = convertSingle(convertedDrawing);
  const single = tf.tensor3d([normalizedDrawing]);
  const testResult = model.predict(single);
  console.log(testResult.print());
  const index = testResult.argMax(1).dataSync()[0];
  console.log(index);
};

module.exports = predictor;
