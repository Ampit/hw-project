const Sequelize = require("sequelize");
const db = require("../db");
const Session = db.define(
  "Session",
  {
    sid: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    data: {
      type: Sequelize.TEXT,
    },
  },
  { freezeTableName: true }
);

module.exports = Session;
