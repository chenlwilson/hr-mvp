require('@tensorflow/tfjs-node');
const tf = require('@tensorflow/tfjs');

// -- if parse ndjson file --
// const parseAsync = require('./parser.js');
// -- if get drawing from db --
const getAsync = require('./helper/getDrawing.js');
const getModel = require('./model/model.js');
const convert = require('./helper/converter.js');
const setTrainResults = require('./helper/setTrainResults.js');
const {
  BATCH_SIZE, tablePrefix, rowsPerTable, outputClasses,
} = require('./dbIndex.js');

let BATCH_NUM = 0;
const TOTAL_BATCH = rowsPerTable / BATCH_SIZE;
const TABLE_INDEX = 0;
const PER_ANIMAL = BATCH_SIZE / outputClasses;
const NUM_OF_EPOCH = 20;
const VAL_SPLIT = 0.1;
const SHUFFLE_BOOL = true;

async function train() {
  // -- if model file has not been created --
  // const model = getModel(BATCH_SIZE, MAX_LENGTH);
  // -- if loading saved model --
  const model = await tf.loadLayersModel('file://./data/model/model.json');
  const optimizer = tf.train.adam();
  model.compile({
    optimizer,
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy'],
  });

  // -- if parse ndjson file --
  // parseAsync(testFilePath)
  // -- if get drawing from db --
  getAsync(tablePrefix + TABLE_INDEX, BATCH_NUM * PER_ANIMAL + 1, BATCH_SIZE)
    .then((data) => {
      const [trainXs, trainYs] = convert(data);
      console.log(trainXs.shape);
      console.log(trainYs.shape);
      return model.fit(trainXs, trainYs, {
        batchSize: BATCH_SIZE,
        validationSplit: VAL_SPLIT,
        epochs: NUM_OF_EPOCH,
        shuffle: SHUFFLE_BOOL,
        callbacks: {
          onTrainEnd: () => {
            model.save('file://./data');
          },
        },
      })
        .then((results) => {
          setTrainResults(results)
            .then(() => {
              BATCH_NUM += 1;
              if (BATCH_NUM < TOTAL_BATCH) {
                train();
              }
            });
        });
    });
}

train();
