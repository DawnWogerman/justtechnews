const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

/// create our User model
class User extends Model {
//setup method to run on instance data to check password
  checkPassword(loginPw){
  return bcrypt.compareSync(loginPw, this.password);
  }

}

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
    hooks: {
      // set up beforeCreate lifecycle "hook" functionality
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },

      async beforeUpdate(updatedUserData){
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      }
    },
    // pass in our imported sequelize connection (the direct connection to our database)
    sequelize,   
    timestamps: false,  
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
);

module.exports = User;