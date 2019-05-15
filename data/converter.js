// const draw = [
//   {
//     word: 'panda',
//     countrycode: 'US',
//     timestamp: '2017-03-13 16:53:48.79098 UTC',
//     recognized: true,
//     key_id: '5453565080371200',
//     drawing: [
//       [[46, 53, 58, 55, 49, 25, 7, 1, 0, 14, 16, 8, 11, 70, 93, 149, 181, 210, 218], [95, 97, 105, 117, 124, 125, 118, 105, 92, 60, 49, 48, 44, 24, 20, 22, 19, 23, 20]],
//       [[218, 233, 247, 255, 255, 246, 218, 198, 183, 180, 190, 180, 160, 138, 118, 110, 49, 34], [20, 11, 11, 21, 32, 43, 51, 63, 96, 116, 125, 137, 131, 110, 114, 83, 82, 96]],
//       [[229, 229, 237, 237], [13, 6, 0, 14]],
//     ],
//   }];

require('@tensorflow/tfjs-node');
const tf = require('@tensorflow/tfjs');
const { fileNames, MIN_LENGTH } = require('./dbIndex.js');
const convertSingle = require('./convertSingle.js');

const nameHash = fileNames.reduce((hash, el, i) => {
  hash[el] = i;
  return hash;
}, {});

const converter = (fileData) => {
  const normalized = [];
  const labels = [];

  // filter out imcomplete drawings
  fileData
    .filter((d) => {
      let len = 0;
      d.drawing.forEach((stroke) => {
        len += stroke[0].length;
      });
      return len > MIN_LENGTH;
    })
    .forEach((d) => {
      const { word, drawing } = d;
      labels.push(nameHash[word]);
      // if (word === 'panda') {
      //   labels.push(1);
      // } else {
      //   labels.push(0);
      // }

      const single = convertSingle(drawing);
      normalized.push(single);
    });

  const batchLabels = tf.tensor1d(labels, 'int32');
  const xs = tf.tensor3d(normalized);
  const yx = tf.oneHot(batchLabels, 10);
  return [xs, yx, normalized];
};

module.exports = converter;
