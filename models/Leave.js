const { Model, Op } = require("sequelize");
const { isRegExp } = require("lodash");
const bcrypt = require('bcrypt');


module.exports = (sequelize, DataTypes) => {
  class Leaves extends Model {
    toJSON() {
      return { ...this.get() };
    }
  }
  Leaves.init(
    {
      _id: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      leave_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      
      employee_Id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'Employees', // Table name
          key: '_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      
    },
        
    {
      sequelize,
      
      tableName: "Leaves",
    }
  );
  Leaves.associate = (models) => {
  Leaves.belongsTo(models.Employees, { foreignKey: 'employee_Id' });
  };

  return Leaves;
};


