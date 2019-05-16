const { db, sqlzModel } = require('../index.js');
const { tableEnd } = require('../dbIndex.js');

const getRandom = (word) => {
  const Draw = sqlzModel(`draw_${Math.floor(Math.random() * tableEnd)}`, db);
  return Draw.findAll({
    where: {
      word,
    },
    offset: Math.floor(Math.random() * 11080),
    limit: 2,
  });
};

module.exports = getRandom;
