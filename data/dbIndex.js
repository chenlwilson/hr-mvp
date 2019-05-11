const fileNames = ['bear', 'cat', 'cow', 'dog', 'dragon', 'lion', 'octopus', 'panda', 'rabbit', 'raccoon'];
const folder = 'data/ndjson/';
const tablePrefix = 'draw_';
const trainResultTable = 'train_results';
const tableEnd = 10;
const rowsPerTable = 110000;
const outputClasses = 10;
const BATCH_SIZE = 5500;
const MAX_LENGTH = 1800;

module.exports = {
  fileNames, folder, tablePrefix, trainResultTable, tableEnd, rowsPerTable, outputClasses, BATCH_SIZE, MAX_LENGTH,
};
