const { Sequelize, DataTypes } = require('sequelize');
const { Employees, Departments } = require('../config/db');
const employee = require('../models/Employee');

module.exports.AddEmployee = async (req, res, next) => {
    try {
      const { employee_name, join_date, photo, work_capacity, phone_number, department_Id } = req.body;
  
      // Debug: Log the input
      console.log('Request Body:', req.body);
  
      // Validate input
      if (!employee_name || !join_date || !photo || !work_capacity || !phone_number || !department_Id) {
        return res.status(400).json({ error: 'All fields, including department_Id, are required.' });
      }
  
      // Validate if the department exists
      const department = await Departments.findByPk(department_Id);
      if (!department) {
        return res.status(404).json({ error: 'Department not found.' });
      }
  
      // Create the employee
      const newEmployee = await Employees.create({
        employee_name,
        join_date,
        photo,
        work_capacity,
        phone_number,
        department_Id,
      });
  
      res.status(201).json(newEmployee);
    } catch (error) {
      console.error('Error adding Employee:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
 
  module.exports.GetAllEmployees = async (req, res, next) => {
    try {
      const employees = await Employees.findAll({
        include: [
          {
            model: Departments,
            attributes: ['department_name'], // Adjust attributes as needed
          },
        ],
      });
  
      if (employees.length === 0) {
        return res.status(404).json({ message: 'No employees found' });
      }
  
      res.status(200).json(employees);
    } catch (error) {
      console.error('Error fetching employees:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  module.exports.EmployeeDetails = async (req, res, next) => {
    try {
      const { employee_Id } = req.params;
      const employees = await Employees.findByPk(employee_Id,{
        include: [
          {
            model: Departments,
            attributes: ['department_name'], // Adjust attributes as needed
          },
        ],
      });
  
      if (employees.length === 0) {
        return res.status(404).json({ message: 'No employees found' });
      }
  
      res.status(200).json(employees);
    } catch (error) {
      console.error('Error fetching employees:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
module.exports.UpdateEmployee = async (req, res) => {
  try {
    const { employee_Id } = req.params; // Extract employee ID from URL params
    const updateData = req.body; // Extract updated fields from the request body

    // Find the employee by ID
    const employee = await Employees.findByPk(employee_Id);

    // Check if employee exists
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // Update employee details
    await employee.update(updateData);

    res.status(200).json({ message: 'Employee updated successfully', employee });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports.DeleteEmployee = async (req, res) => {
  try {
    const { employee_Id } = req.params; // Extract employee ID from URL params

    // Find the employee by ID
    const employee = await Employees.findByPk(employee_Id);

    // Check if employee exists
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // Delete the employee
    await employee.destroy();

    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


  
  