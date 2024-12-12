const { Model, Op } = require("sequelize");
const { isRegExp } = require("lodash");
const bcrypt = require('bcrypt');


module.exports = (sequelize, DataTypes) => {
  class Packages extends Model {
    toJSON() {
      return { ...this.get() };
    }
  }
  Packages.init(
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
      work_ids: {
        type: DataTypes.ARRAY(DataTypes.STRING), // Storing an array of work IDs
        allowNull: true, // Optional if you want packages without works
      },
      
    },
        
    {
      sequelize,
      timestamps: true,
      tableName: "Packages",
    }
  );

  return Packages;
};


