// { "word":"panda",
// "countrycode":"US",
// "timestamp":"2017-03-13 16:53:48.79098 UTC",
// "recognized":true,
// "key_id":"5453565080371200",
// "drawing": [
// --- each stroke, represented in x coordinates array and y coordinates array ---
// [[46,53,58,55,49,25,7,1,0,14,16,8,11,70,93,149,181,210,218],[95,97,105,117,124,125,118,105,92,60,49,48,44,24,20,22,19,23,20]],
// [[218,233,247,255,255,246,218,198,183,180,190,180,160,138,118,110,49,34],[20,11,11,21,32,43,51,63,96,116,125,137,131,110,114,83,82,96]],
// [[229,229,237,237],[13,6,0,14]]
// ]}
const tf = require('@tensorflow/tfjs');
const parseSimplifiedDrawings = require('./parser.js');

const dataFilePath = 'data/panda-simple.ndjson';

const IMAGE_SIZE = 784;
const NUM_DATASET_ELEMENTS = 113613;

const resized = [];

parseSimplifiedDrawings(dataFilePath, (err, drawings) => {
  if (err) {
    return console.log(`parse simple ndjson file error: ${err}`);
  }
  drawings.forEach((d) => {
    const single = [];
    d.drawing.forEach((stroke) => {
      for (let i = 0; i < stroke[0].length; i += 1) {
        single.push([stroke[0][i], stroke[1][i]]);
      }
      single.push([0, 0]);
    });
    resized.push(single);
  });
});

