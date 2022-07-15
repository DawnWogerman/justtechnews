const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

/// create our User model
class User extends Model {}

// define table columns and configuration
User.init(
  {
   id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
   },
   //username
   username: {
    type: DataTypes.STRING,
    allowNull: false
   },
   //email
   email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
        isEmail: true
    }
   },
   //password
   password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        len: [4]
    }
   }
  },
  {
    // pass in our imported sequelize connection (the direct connection to our database)
    sequelize,   
    timestamps: false,  
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
);

module.exports = User;