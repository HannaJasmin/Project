const { Model, Op } = require("sequelize");
const { isRegExp } = require("lodash");
const bcrypt = require('bcrypt');
const { Clients } = require("../config/db");


module.exports = (sequelize, DataTypes) => {
  class Projects extends Model {
    toJSON() {
      return { ...this.get() };
    }
  }
  Projects.init(
    {
          _id: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
          },
          client_Id: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
              model: 'Clients', // Name of the referenced table
              key: '_id',        // Primary key of the referenced table
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          title: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          due_date: {
            type: DataTypes.DATE,
            allowNull: false,
          },
          package_details: {
            type: DataTypes.JSON,
            allowNull: true, // Set to false if this field must always have data
          },
        },
    {
      sequelize,
      tableName: "Projects",
    }
);
    Projects.associate = (models) => {
    Projects.belongsTo(models.Clients, { foreignKey: 'client_Id' });
    Projects.hasMany(models.Tasks, { foreignKey: 'project_Id', onDelete: 'CASCADE' });
        };
 

  return Projects;
};
