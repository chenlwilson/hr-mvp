const tf = require('@tensorflow/tfjs');
// const tfvis = require('@tensorflow/tfjs-vis');
const getModel = require('./model.js');
const load = require('./data.js');
const parseAsync = require('./parser.js');

const testFilePath = 'data/test-data.ndjson';

const BATCH_SIZE = 5000;
const MAX_LENGTH = 1731;

async function train(model) {
  // const metrics = ['loss', 'val_loss', 'acc', 'val_acc'];
  // const container = {
  //   name: 'Model Training', styles: { height: '1000px' },
  // };
  // const fitCallbacks = tfvis.show.fitCallbacks(container, metrics);

  parseAsync(testFilePath)
    .then((data) => {
      console.log('script 23');
      const [trainXs, trainYs] = load(data);
      console.log(trainXs.shape);
      console.log(trainYs.shape);
      return model.fit(trainXs, trainYs, {
        batchSize: BATCH_SIZE,
        validationSplit: 0.1,
        epochs: 2,
        shuffle: true,
        // callbacks: fitCallbacks,
      })
        .then(results => console.log(results.history.loss));
    });

  // const [trainXs, trainYs] = tf.tidy(() => {
  //   const d = data.getNextTrainBatch(BATCH_SIZE);
  //   return [
  //     d.xs.reshape([BATCH_SIZE, 28, 28, 1]),
  //     d.labels,
  //   ];
  // });

  // const [testXs, testYs] = tf.tidy(() => {
  //   const d = data.nextTestBatch(TEST_DATA_SIZE);
  //   return [
  //     d.xs.reshape([TEST_DATA_SIZE, 28, 28, 1]),
  //     d.labels,
  //   ];
  // });
}

const model = getModel(BATCH_SIZE, MAX_LENGTH);
// tfvis.show.modelSummary({name: 'Model Architecture'}, model);

train(model);
