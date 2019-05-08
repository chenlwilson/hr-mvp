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
//   } ];

const tf = require('@tensorflow/tfjs');
const parseAsync = require('./parser.js');

const dataFilePath = 'data/panda-simple.ndjson';

const IMAGE_SIZE = 784;
const NUM_DATASET_ELEMENTS = 113613;

const normalized = [];

const load = async () => {
  const drawings = await parseAsync(dataFilePath);
  drawings.forEach((d) => {
    const single = [[], [], []];
    d.drawing.forEach((stroke) => {
      const [x, y] = stroke;
      for (let i = 0; i < x.length; i += 1) {
        single[0].push(x[i]);
        single[1].push(y[i]);
        if (i === 0) {
          single[2].push(1);
        } else {
          single[2].push(0);
        }
      }
    });
    const minX = Math.min(...single[0]);
    const minY = Math.min(...single[1]);
    const maxX = Math.max(...single[0]);
    const maxY = Math.max(...single[1]);
    const scaleX = maxX - minX === 0 ? 1 : maxX - minX;
    const scaleY = maxY - minY === 0 ? 1 : maxY - minY;
    for (let i = 0; i < single[0].length; i += 1) {
      single[0][i] = (single[0][i] - minX) / scaleX;
      single[1][i] = (single[1][i] - minY) / scaleY;
    }
    for (let i = 0; i < single[0].length - 1; i += 1) {
      single[0][i] = single[0][i + 1] - single[0][i];
      single[1][i] = single[1][i + 1] - single[1][i];
    }
    single[0].pop();
    single[1].pop();
    single[2].pop();
    normalized.push(single);
  });
  // console.log(normalized[0]);
};

load();


// let xs;
// xs = tf.tensor3d(resized);
// console.log(xs[0]);
