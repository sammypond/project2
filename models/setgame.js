'use strict';
module.exports = (sequelize, DataTypes) => {
  const setGame = sequelize.define('setGame', {
    userId: DataTypes.INTEGER,
    apiId: DataTypes.INTEGER
  }, {});
  setGame.associate = function(models) {
    // associations can be defined here
    models.setGame.belongsTo(models.user);
    models.setGame.hasMany(models.attempt);
  };
  return setGame;
};