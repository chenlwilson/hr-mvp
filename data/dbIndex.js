const fileNames = ['bear', 'cat', 'cow', 'dog', 'dragon', 'lion', 'octopus', 'panda', 'rabbit', 'raccoon'];
const folder = 'data/ndjson/';
const tablePrefix = 'draw_';
const trainResultTable = 'train_results';
const tableEnd = 10;
const rowsPerTable = 110000;

module.exports = {
  fileNames, folder, tablePrefix, trainResultTable, tableEnd, rowsPerTable,
};
