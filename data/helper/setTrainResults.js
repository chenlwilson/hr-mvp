const { db, resultModel } = require('../index.js');
const { trainResultTable } = require('../dbIndex.js');

const setTrainResults = (results) => {
  const { history } = results;
  const trainData = [];
  for (let i = 0; i < history.acc.length; i += 1) {
    const obj = {
      epoch_time: new Date(),
    };
    for (const key in history) {
      obj[key] = history[key][i];
    }
    trainData.push(obj);
  }
  const Result = resultModel(trainResultTable, db);
  return Result.bulkCreate(trainData);
};

module.exports = setTrainResults;
