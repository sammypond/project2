'use strict';
module.exports = (sequelize, DataTypes) => {
  const attempt = sequelize.define('attempt', {
    setGameId: DataTypes.INTEGER,
    possible: DataTypes.INTEGER,
    correct: DataTypes.INTEGER
  }, {});
  attempt.associate = function(models) {
    // associations can be defined here
  };
  return attempt;
};