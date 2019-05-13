const Sequelize = require('sequelize');
const {
  DB_NAME, DB_USERNAME, DB_HOST, DB_PORT,
} = require('./dbIndex.js');

const db = new Sequelize({
  database: DB_NAME,
  username: DB_USERNAME,
  password: null,
  dialect: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  define: { timestamps: false },
});

const sqlzModel = (table, sequelize) => {
  const model = sequelize.define(table, {
    word: Sequelize.STRING,
    drawing: Sequelize.JSON,
  });
  return model;
};

const resultModel = (trainTable, sequelize) => {
  const model = sequelize.define(trainTable, {
    epoch_time: Sequelize.STRING,
    acc: Sequelize.STRING,
    loss: Sequelize.STRING,
    val_acc: Sequelize.STRING,
    val_loss: Sequelize.STRING,
  });
  return model;
};

module.exports = { db, sqlzModel, resultModel };
