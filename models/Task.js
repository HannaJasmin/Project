const { Model, Op } = require("sequelize");
const { isRegExp } = require("lodash");

module.exports = (sequelize, DataTypes) => {
  class Tasks extends Model {
    toJSON() {
      return { ...this.get() };
    }
  }
  Tasks.init(
    {
        _id: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
          },
          employee_Id: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
              model: 'Employees', // Name of the Employee table
              key: '_id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          task_name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          attributes: {
            type: DataTypes.JSON,
            allowNull: true, // Optional field
          },
          description: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          project_Id: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
              model: 'Projects', // Name of the Project table
              key: '_id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          notes: {
            type: DataTypes.JSON,
            allowNull: true, // Optional field
          },
          status: {
            type: DataTypes.ENUM('done', 'process', 'confirmed'),
            allowNull: false,
            defaultValue: 'process',
          },
        },
        {
            sequelize,
            tableName: "Tasks",
          }
          
      );
      Tasks.associate = (models) => {
      Tasks.belongsTo(models.Projects, { foreignKey: 'project_Id' });
      Tasks.belongsTo(models.Employees, {foreignKey: 'employee_Id'});
      }
        return Tasks;
      };