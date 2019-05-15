const DB_NAME = 'quickdraw';
const DB_USERNAME = 'Chen';
const DB_HOST = '127.0.0.1';
const DB_PORT = 5432;
const fileNames = ['bee', 'bird', 'cat', 'crab', 'dog', 'fish', 'giraffe', 'lion', 'octopus', 'panda'];
const folder = 'data/ndjson/';
const tablePrefix = 'draw_';
const trainResultTable = 'train_results';
const tableEnd = 10;
const rowsPerTable = 110000;
const outputClasses = 10;
const BATCH_SIZE = 1100;
const MIN_LENGTH = 50;
const MAX_LENGTH = 1800;

module.exports = {
  DB_NAME,
  DB_USERNAME,
  DB_HOST,
  DB_PORT,
  fileNames,
  folder,
  tablePrefix,
  trainResultTable,
  tableEnd,
  rowsPerTable,
  outputClasses,
  BATCH_SIZE,
  MAX_LENGTH,
  MIN_LENGTH,
};
