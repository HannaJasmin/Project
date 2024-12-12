const { Sequelize, DataTypes } = require('sequelize');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Task = require('../models/Task');

require('dotenv').config();

// Your PostgreSQL connection string
const connectionString = process.env.DBSTRING;
const sequelize = new Sequelize(connectionString, {
  dialect: 'postgres',
  logging: false,
  port: 5432,
}); 

sequelize   
  .sync({ alter: true })
  .then(() => console.log('Database & tables created!'))
  .catch(async (err) => {
    console.log('DB Cannot connect: ', err); 
  });

const db = {
  Users:require("../models/User")(sequelize,Sequelize), 
  Departments:require("../models/Userdepartment")(sequelize,Sequelize),
  Employees:require("../models/Employee")(sequelize,Sequelize),
  Works:require("../models/Work")(sequelize,Sequelize),
  Packages:require("../models/Package")(sequelize,Sequelize),
  Leaves:require("../models/Leave")(sequelize,Sequelize),
  Clients:require("../models/Client")(sequelize,Sequelize),
  Projects:require("../models/Project")(sequelize,Sequelize),
  Tasks:require("../models/Task")(sequelize,Sequelize),
  sequelize,
};

// Setup associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;


