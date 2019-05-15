require('@tensorflow/tfjs-node');
const tf = require('@tensorflow/tfjs');
const convertSingle = require('./convertSingle.js');

const predictor = async (drawing) => {
  const model = await tf.loadLayersModel('file://./data/model.json');
  const optimizer = tf.train.adam();
  model.compile({
    optimizer,
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy'],
  });
  const convertedDrawing = convertSingle(drawing);
  const single = tf.tensor3d([convertedDrawing]);
  const testResult = model.predict(single);
  console.log(testResult);
  const index = testResult.argMax(1).dataSync()[0];
  console.log(index);
};

module.exports = predictor;
