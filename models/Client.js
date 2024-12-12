const { Model, Op } = require("sequelize");
const { isRegExp } = require("lodash");
const bcrypt = require('bcrypt');


module.exports = (sequelize, DataTypes) => {
  class Clients extends Model {
    toJSON() {
      return { ...this.get() };
    }
  }
  Clients.init(
    {
      _id: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      sales_person:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      type:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      join_date:{
        type: DataTypes.DATE,
        allowNull: false,
      },
      phone_number:{
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isNumeric: true, 
        },
      }
      
    },
    {
      sequelize,
      tableName: "Clients",
    }
  );
  Clients.associate = (models) => {
  Clients.hasMany(models.Projects, { foreignKey: 'client_Id', onDelete: 'CASCADE' });
    };
  return Clients;
};
