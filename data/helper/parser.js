// https://github.com/googlecreativelab/quickdraw-dataset/blob/master/examples/nodejs/simplified-parser.js
const fs = require('fs');
const ndjson = require('ndjson');
const Promise = require('bluebird');

const parseSimplifiedDrawings = (fileName, callback) => {
  const drawings = [];
  const fileStream = fs.createReadStream(fileName);
  fileStream
    .pipe(ndjson.parse())
    .on('data', (obj) => {
      drawings.push(obj);
    })
    .on('error', callback)
    .on('end', () => {
      callback(null, drawings);
    });
};

const parseAsync = Promise.promisify(parseSimplifiedDrawings);

module.exports = parseAsync;
