const { db, resultModel } = require('./index.js');
const { trainResultTable } = require('./dbIndex.js');

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
  Result.bulkCreate(trainData)
    .then(() => console.log('added train results to db'));
};

module.exports = setTrainResults;
