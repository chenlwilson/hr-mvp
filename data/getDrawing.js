const { Op } = require('sequelize');
const { db, sqlzModel } = require('./index.js');

// 110k for table draw_0 to draw_10
// get 5500 drawings per batch, each table makes 20 batches
// animal index 0 - 9;
// each animal starts at 11000 * index + 1;
// each animal ends at 11000 * ( index + 1 );

const getAsync = (table, startId, batchSize) => {
  const Draw = sqlzModel(table, db);
  return Draw.findAll({
    where: {
      id: {
        [Op.between]: [startId, startId + batchSize - 1],
      },
    },
  });
};

module.exports = getAsync;
