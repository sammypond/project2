'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Invalid email address' 
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1,99],
          msg:'Invalid username, must be between 1 and 99 characters.'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8,99],
          msg: 'Password must be at least 8 character.'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: function(pendingUser, options){
        if (pendingUser && pendingUser.password){
          var hash = bcrypt.hashSync(pendingUser.password, 12);
          pendingUser.password = hash;
        }
      }
    }
  });
  user.associate = function(models) {
    // associations can be defined here.
    // one to many relationship where each user has picks.
  };
  user.prototype.validPassword = function(passwordTyped){
    return bcrypt.compareSync(passwordTyped, this.password);
  };
  user.prototype.toJSON = function() {
    var userData = this.get();
    delete userData.password;
    return userData;
  }
  return user;
};