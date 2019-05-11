// dbname: quickdraw
const Sequelize = require('sequelize');

const db = new Sequelize({
  database: 'quickdraw',
  username: 'Chen',
  password: null,
  dialect: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  define: { timestamps: false },
});

const sqlzModel = (table, sequelize) => {
  const model = sequelize.define(table, {
    word: Sequelize.STRING,
    drawing: Sequelize.JSON,
  });
  return model;
};

module.exports = { db, sqlzModel };
