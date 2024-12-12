const { Model, Op } = require("sequelize");
const { isRegExp } = require("lodash");
const bcrypt = require('bcrypt');


module.exports = (sequelize, DataTypes) => {
  class Departments extends Model {
    toJSON() {
      return { ...this.get() };
    }
  }
  Departments.init(
    {
      _id: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      department_name:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      total_works:{
        type: DataTypes.STRING,
        allowNull: false,
      }
      
    },
    {
      sequelize,
      timestamps: true,
      tableName:"Departments",
    }
  );
    Departments.associate = (models) => {
    Departments.hasMany(models.Employees, { foreignKey: 'department_Id', onDelete: 'CASCADE' });
  };
  return Departments;
};
