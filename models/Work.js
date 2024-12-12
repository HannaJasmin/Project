const { Model, Op } = require("sequelize");
const { isRegExp } = require("lodash");
const { Packages } = require("../config/db");


module.exports = (sequelize, DataTypes) => {
  class Works extends Model {
    toJSON() {
      return { ...this.get() };
    }
  }
  Works.init(
    {
      _id: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      work_name:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      single_or_multi: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      tasks: {
        type: DataTypes.JSON,
        allowNull: true, 
      },
    },
    {
      sequelize,
      timestamps: true,
      tableName:"Works",
    }
  );
   

  return Works;
};
