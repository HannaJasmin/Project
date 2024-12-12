const { Model, Op } = require("sequelize");
const { isRegExp } = require("lodash");
const bcrypt = require('bcrypt');


module.exports = (sequelize, DataTypes) => {
  class Employees extends Model {
    toJSON() {
      return { ...this.get() };
    }
  }
  Employees.init(
    {
      _id: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      employee_name:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      join_date:{
        type: DataTypes.DATE,
        allowNull: true,
      },
      photo: {
        type: DataTypes.STRING,
        allowNull: true, 
      },
      work_capacity:{
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      phone_number:{
        type: DataTypes.BIGINT,
        allowNull: true,
        validate: {
          isNumeric: true, 
        },
      },
      department_Id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'Departments', 
          key: '_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      
    },
        
    {
      sequelize,
      timestamps: true,
      tableName: "Employees",
    }
  );
  Employees.associate = (models) => {
  Employees.belongsTo(models.Departments, { foreignKey: 'department_Id' });
  Employees.hasMany(models.Leaves, { foreignKey: 'employee_Id', onDelete: 'CASCADE' });
  Employees.hasMany(models.Tasks, {foreignKey: 'employee_Id', onDelete: 'CASCADE'});
  };

  return Employees;
};
