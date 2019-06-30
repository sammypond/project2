'use strict';
module.exports = (sequelize, DataTypes) => {
  const set = sequelize.define('set', {
    song: DataTypes.STRING
  }, {});
  set.associate = function(models) {
    // associations can be defined here
  };
  return set;
};