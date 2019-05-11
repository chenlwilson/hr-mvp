const { Op } = require('sequelize');
const { db, sqlzModel } = require('./index.js');
const { rowsPerTable, outputClasses } = require('./dbIndex.js');

// 110k for table draw_0 to draw_10
// get 5500 drawings per batch, each table makes 20 batches
// animal index 0 - 9;
// each animal starts at 11000 * index + 1;
// each animal ends at 11000 * ( index + 1 );

const getAsync = (table, startId, batchSize) => {
  // every batch is comprised of 1/10 of each kind of animal
  const perAnimal = batchSize / outputClasses;

  const animalCount = rowsPerTable / outputClasses;
  const Draw = sqlzModel(table, db);
  return Draw.findAll({
    where: {
      [Op.or]: [
        {
          id: {
            [Op.between]: [startId, startId + perAnimal - 1],
          },
        },
        {
          id: {
            [Op.between]: [animalCount * 1 + startId, animalCount * 1 + startId + perAnimal - 1],
          },
        },
        {
          id: {
            [Op.between]: [animalCount * 2 + startId, animalCount * 2 + startId + perAnimal - 1],
          },
        },
        {
          id: {
            [Op.between]: [animalCount * 3 + startId, animalCount * 3 + startId + perAnimal - 1],
          },
        },
        {
          id: {
            [Op.between]: [animalCount * 4 + startId, animalCount * 4 + startId + perAnimal - 1],
          },
        },
        {
          id: {
            [Op.between]: [animalCount * 5 + startId, animalCount * 5 + startId + perAnimal - 1],
          },
        },
        {
          id: {
            [Op.between]: [animalCount * 6 + startId, animalCount * 6 + startId + perAnimal - 1],
          },
        },
        {
          id: {
            [Op.between]: [animalCount * 7 + startId, animalCount * 7 + startId + perAnimal - 1],
          },
        },
        {
          id: {
            [Op.between]: [animalCount * 8 + startId, animalCount * 8 + startId + perAnimal - 1],
          },
        },
        {
          id: {
            [Op.between]: [animalCount * 9 + startId, animalCount * 9 + startId + perAnimal - 1],
          },
        },
      ],
    },
  });
};

module.exports = getAsync;
