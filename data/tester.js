require('@tensorflow/tfjs-node');
const tf = require('@tensorflow/tfjs');
const getAsync = require('./helper/getDrawing.js');
const convert = require('./helper/converter.js');

const tester = async () => {
  const model = await tf.loadLayersModel('file://./data/model/model.json');
  const optimizer = tf.train.adam();
  model.compile({
    optimizer,
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy'],
  });

  getAsync('draw_10', Math.floor(Math.random() * 11000), 10)
    .then((data) => {
      const { normalized, labels } = convert(data)[2];
      console.log(normalized.length);
      console.log(labels);
      normalized.forEach((draw) => {
        const single = tf.tensor3d([draw]);
        const result = model.predict(single);
        result.print();
        console.log(result.argMax(1).dataSync()[0]);
      });
    });
};

// tester();

module.exports = tester;
