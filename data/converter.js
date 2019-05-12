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
const { fileNames } = require('./dbIndex.js');

const nameHash = fileNames.reduce((hash, el, i) => {
  hash[el] = i;
  return hash;
}, {});

const converter = (fileData, maxLength) => {
  const normalized = [];
  const labels = [];
  fileData.forEach((d) => {
    const { word, drawing } = d;
    labels.push(nameHash[word]);
    // if (word === 'panda') {
    //   labels.push(1);
    // } else {
    //   labels.push(0);
    // }

    const single = [];
    const defaultBounds = {
      minX: Math.min(...drawing[0][0]),
      maxX: Math.max(...drawing[0][0]),
      minY: Math.min(...drawing[0][1]),
      maxY: Math.max(...drawing[0][1]),
    };
    const bounds = drawing.slice(1).reduce((res, stroke) => {
      const strokeMinX = Math.min(...stroke[0]);
      const strokeMaxX = Math.max(...stroke[0]);
      const strokeMinY = Math.min(...stroke[1]);
      const strokeMaxY = Math.max(...stroke[1]);
      if (strokeMinX < res.minX) {
        res.minX = strokeMinX;
      }
      if (strokeMaxX > res.maxX) {
        res.maxX = strokeMaxX;
      }
      if (strokeMinY < res.minY) {
        res.minY = strokeMinY;
      }
      if (strokeMaxY > res.maxY) {
        res.maxY = strokeMaxY;
      }
      return res;
    }, defaultBounds);

    const {
      minX, maxX, minY, maxY,
    } = bounds;

    const scaleX = maxX - minX === 0 ? 1 : maxX - minX;
    const scaleY = maxY - minY === 0 ? 1 : maxY - minY;

    drawing.forEach((stroke) => {
      const [x, y] = stroke;
      for (let i = 0; i < x.length; i += 1) {
        const triple = [];
        triple[0] = (x[i] - minX) / scaleX;
        triple[1] = (y[i] - minY) / scaleY;
        triple[2] = i === 0 ? 1 : 0;
        single.push(triple);
      }
    });

    for (let i = 0; i < single.length - 1; i += 3) {
      single[i][0] = single[i + 1][0] - single[i][0];
      single[i][1] = single[i + 1][1] - single[i][1];
    }
    single.pop();

    normalized.push(single);
  });

  // maxLength = normalized.reduce((max, el) => {
  //   if (el.length > max) {
  //     max = el.length;
  //   }
  //   return max;
  // }, 0);

  const batchData = normalized.map((item) => {
    if (item.length < maxLength) {
      return item.concat(new Array(maxLength - item.length).fill([2, 2, 2]));
    }
    return item;
  });
  const batchLabels = tf.tensor1d(labels, 'int32');
  const xs = tf.tensor3d(batchData);
  const yx = tf.oneHot(batchLabels, 10);
  return [xs, yx];
};

module.exports = converter;
