const draw = [
  {
    word: 'panda',
    countrycode: 'US',
    timestamp: '2017-03-13 16:53:48.79098 UTC',
    recognized: true,
    key_id: '5453565080371200',
    drawing: [
      [[46, 53, 58, 55, 49, 25, 7, 1, 0, 14, 16, 8, 11, 70, 93, 149, 181, 210, 218], [95, 97, 105, 117, 124, 125, 118, 105, 92, 60, 49, 48, 44, 24, 20, 22, 19, 23, 20]],
      [[218, 233, 247, 255, 255, 246, 218, 198, 183, 180, 190, 180, 160, 138, 118, 110, 49, 34], [20, 11, 11, 21, 32, 43, 51, 63, 96, 116, 125, 137, 131, 110, 114, 83, 82, 96]],
      [[229, 229, 237, 237], [13, 6, 0, 14]],
    ],
  },
  {
    word: 'panda',
    countrycode: 'US',
    timestamp: '2017-03-13 16:53:48.79098 UTC',
    recognized: true,
    key_id: '5453565080371200',
    drawing: [
      [[46, 53, 58, 55, 49, 25, 7, 1, 0, 14, 16, 8, 11, 70, 93, 149, 181, 210, 218], [95, 97, 105, 117, 124, 125, 118, 105, 92, 60, 49, 48, 44, 24, 20, 22, 19, 23, 20]],
      [[218, 233, 247, 255, 255, 246, 218, 198, 183, 180, 190, 180, 160, 138, 118, 110, 49, 34], [20, 11, 11, 21, 32, 43, 51, 63, 96, 116, 125, 137, 131, 110, 114, 83, 82, 96]],
      [[229, 229, 237, 237, 1], [13, 6, 0, 14, 1]],
    ],
  }];

const tf = require('@tensorflow/tfjs');
const parseAsync = require('./parser.js');

const dataFilePath = 'data/panda-simple.ndjson';

const IMAGE_SIZE = 784;
const NUM_DATASET_ELEMENTS = 113613;

const normalized = [];
const labels = [];
const maxLength = 0;

const load = async () => {
  // const drawings = await parseAsync(dataFilePath);
  draw.forEach((d) => {
    // add labels
    if (d.word === 'panda') {
      labels.push([1]);
    } else {
      labels.push([0]);
    }
    // add resized [x,y] tuples to each drawing array
    const single = [];
    d.drawing.forEach((stroke) => {
      const [x, y] = stroke;
      for (let i = 0; i < x.length; i += 1) {
        const tuple = [x[i], y[i]];
        single.push(tuple);
      }
    });
    single.sort((a, b) => a[0] - b[0]);
    const minX = single[0][0];
    console.log(`minX${minX}`);
    const scaleX = single[single.length - 1][0] - single[0][0];
    console.log(`scaleX${scaleX}`);
    single.sort((a, b) => a[1] - b[1]);
    console.log(single);
    const minY = single[0][1];
    console.log(`minY${minY}`);
    const scaleY = single[single.length - 1][1] - single[0][1];
    console.log(`scaleY${scaleY}`);
    const scale = scaleX > scaleY ? scaleX / 56 : scaleY / 56;
    console.log(`scale${scale}`);
    for (let i = 0; i < single.length; i += 1) {
      single[i][0] = Math.floor((single[i][0] - minX) / scale);
      single[i][1] = Math.floor((single[i][1] - minY) / scale);
    }

    normalized.push(single);
  });
  console.log(normalized[0]);
  // normalized.forEach((drawing) => {
  //   if (drawing[0].length < maxLength) {
  //     for (let i = 0; i < 1000 - drawing[0].length; i++) {
  //       drawing[0].push(0);
  //       drawing[1].push(0);
  //       drawing[2].push(0);
  //     }
  //   }
  // });
  // normalized = [
  // [[-0.10196078431372552, -0.09803921568627455, -0.05882352941176466,...],
  //  [-0.004484304932735439, 0.02690582959641255, 0.0358744394618834,...],
  //  [1, 0, 0, ...]],
  // [[], [], []], ...]
  // const xs = tf.tensor3d(normalized);
  // console.log(xs.shape);
};

load();
