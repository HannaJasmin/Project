const { Model, Op } = require("sequelize");
const { isRegExp } = require("lodash");
const bcrypt = require('bcrypt');


module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    toJSON() {
      return { ...this.get() };
    }
  }
  Users.init(
    {
      _id: {
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      username:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      password:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      phonenumber:{
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      emailid:{
        type: DataTypes.STRING,
        allowNull: false,
      }
      
    },
    {
      sequelize,
      modelName: 'User',
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSalt(10); // Generate salt
            user.password = await bcrypt.hash(user.password, salt); // Hash password
          }
        },
        beforeUpdate: async (user) => {
          if (user.changed('password')) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
      },
      timestamps: true,
      tableName: "Users",
    }
  );


  return Users;
};
