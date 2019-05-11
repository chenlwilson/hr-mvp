const { Op } = require('sequelize');
const Promise = require('bluebird');
const { db, sqlzModel } = require('./index.js');
const {
  fileNames, folder, tablePrefix, tableEnd, rowsPerTable,
} = require('./dbIndex.js');

const batchSize = 5000;
const tableIndex = 0;

// 110k for table draw_0 to draw_10
// get 5500 drawings per batch, each table makes 20 batches
// animal index 0 - 9;
// each animal starts at 11000 * index + 1;
// each animal ends at 11000 * ( index + 1 );
// const getDrawing = (callback) => {

// };

// const getAsync = Promise.promisify(getDrawing);

// module.exports = getAsync;

const getDrawing = (callback) => {
  const Draw = sqlzModel(tablePrefix + tableIndex, db);
  Draw.findAll({
    where: {
      id: {
        [Op.between]: [1, 10],
      },
    },
  })
    .then(res => callback(res));
};

