require('@tensorflow/tfjs-node');
const tf = require('@tensorflow/tfjs');
const convertCoordinates = require('./helper/convertCoordinates.js');
const convertSingle = require('./helper/convertSingle.js');
const { fileNames } = require('./dbIndex.js');

const predictor = async (coordinates) => {
  const model = await tf.loadLayersModel('file://./data/model/model.json');
  const optimizer = tf.train.adam();
  model.compile({
    optimizer,
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy'],
  });

  const convertedDrawing = convertCoordinates(coordinates);
  const normalizedDrawing = convertSingle(convertedDrawing);
  const single = tf.tensor3d([normalizedDrawing]);

  const result = await model.predict(single);
  result.print();
  const index = result.argMax(1).dataSync()[0];
  console.log(index);
  const name = fileNames[index];
  return name;
};

module.exports = predictor;
