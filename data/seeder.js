const parseAsync = require('./parser.js');
const { db, sqlzModel } = require('./index.js');
const {
  fileNames, folder, tablePrefix, tableEnd, rowsPerTable,
} = require('./dbIndex.js');

let fileCounter = 0;
let tableIndex = 0;

const rowsPerCreate = 550;
const createPerTable = rowsPerTable / 10 / rowsPerCreate;

// drawing count per animal:
// bear: 134762
// cat: 123202
// cow: 123083
// dog: 152159
// dragon: 124362
// lion: 120949
// octopus: 150152
// panda: 113613
// rabbit: 155288
// raccoon: 119588

// use schema file to create table 0 - 10
// for table 0 - 10, insert 11k of each animal in each table
// (table 10 will not have 11k panda or raccoon)
// bulk create 550 rows per write, 20 writes per table per animal

const seed = () => {
  const file = `${folder + fileNames[fileCounter]}.ndjson`;

  parseAsync(file)
    .then((data) => {
      for (let i = 0; i <= tableEnd; i += 1) {
        // from table 0 to 10 => 'draw_10'
        const table = tablePrefix + tableIndex;
        const Draw = sqlzModel(table, db);
        // from 0 to 20
        for (let j = 0; j < createPerTable; j += 1) {
          // 0 * 20 * 550 + 0 * 550
          // 0 * 20 * 500 + 1 * 550
          const start = tableIndex * createPerTable * rowsPerCreate + j * rowsPerCreate;
          // 0, 550
          // 550, 1100
          Draw.bulkCreate(data.slice(start, start + rowsPerCreate));
        }
        tableIndex += 1;
      }
    })
    .then(() => {
      if (fileCounter < fileNames.length - 1) {
        fileCounter += 1;
        tableIndex = 0;
        seed();
      }
    });
};

seed();
