'use strict';
module.exports = (sequelize, DataTypes) => {
  const venue = sequelize.define('venue', {
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    date: DataTypes.INTEGER
  }, {});
  venue.associate = function(models) {
    // associations can be defined here
  };
  return venue;
};