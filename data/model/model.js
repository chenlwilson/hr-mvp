require('@tensorflow/tfjs-node');
const tf = require('@tensorflow/tfjs');
const { outputClasses } = require('../dbIndex.js');

const getModel = (batchSize, maxLength) => {
  const model = tf.sequential();

  // masking layer to skip padding
  model.add(tf.layers.masking({
    batchInputShape: [batchSize, maxLength, 3],
    maskValue: 2,
  }));

  // 3 conv1d layers
  model.add(tf.layers.conv1d({
    kernelSize: 3,
    filters: 8,
    strides: 1,
    activation: 'relu',
    kernelInitializer: 'varianceScaling',
  }));
  model.add(tf.layers.maxPooling1d({ poolSize: 2, strides: 2 }));

  model.add(tf.layers.conv1d({
    kernelSize: 5,
    filters: 16,
    strides: 1,
    activation: 'relu',
    kernelInitializer: 'varianceScaling',
  }));
  model.add(tf.layers.maxPooling1d({ poolSize: 2, strides: 2 }));

  model.add(tf.layers.conv1d({
    kernelSize: 5,
    filters: 32,
    strides: 1,
    activation: 'relu',
    kernelInitializer: 'varianceScaling',
  }));
  model.add(tf.layers.maxPooling1d({ poolSize: 2, strides: 2 }));

  // 2 LSTM layers
  model.add(tf.layers.lstm({
    units: 10,
    returnSequences: true,
    activation: 'relu',
  }));

  model.add(tf.layers.lstm({
    units: 10,
    returnSequences: true,
    activation: 'relu',
  }));

  // dropout layer to prevent overfitting
  model.add(tf.layers.dropout(0.2));

  // last softmax layer
  model.add(tf.layers.flatten());
  // Our last layer is a dense layer which has 10 output units, one for each
  // output class (i.e. 0, 1, 2, 3, 4, 5, 6, 7, 8, 9).
  model.add(tf.layers.dense({
    units: outputClasses,
    kernelInitializer: 'varianceScaling',
    activation: 'softmax',
  }));

  // Choose an optimizer, loss function and accuracy metric,
  // then compile and return the model
  const optimizer = tf.train.adam();
  model.compile({
    optimizer,
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy'],
  });

  return model;
};

module.exports = getModel;
