const { Sequelize, DataTypes } = require('sequelize');
const { Leaves, Employees } = require('../config/db');
const leave = require('../models/Leave');

module.exports.AddLeave =async (req,res,next)=>{
   
    try {
        const { leave_date,employee_Id } = req.body;
  
        // Validate input
       if (!leave_date || !employee_Id) {
         return res.status(400).json({ error: 'All fields, including employee_Id, are required.' });
        }
    
        const employee = await Employees.findByPk(employee_Id);
        if (!employee) {
          return res.status(404).json({ error: 'Employee not found.' });
        }

        const newLeave = await Leaves.create({
        leave_date,
        employee_Id,
        });
    
        res.status(201).json(newLeave);
      } catch (error) {
        console.error('Error adding Leave:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    };
    module.exports.GetAllLeaves = async (req, res, next) => {
      try {
        const leave = await Leaves.findAll();
    
        if (leave.length === 0) {
          return res.status(404).json({ message: 'No leave found' });
        }
    
        res.status(200).json(leave);
      } catch (error) {
        console.error('Error fetching leaves:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    };
    module.exports.LeaveDetails = async (req, res, next) => {
      try {
        const { leave_Id } = req.params;
        const leave = await Leaves.findByPk(leave_Id);
    
        if (leave.length === 0) {
          return res.status(404).json({ message: 'No leaves found' });
        }
    
        res.status(200).json(leave);
      } catch (error) {
        console.error('Error fetching leave:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    };
    module.exports.UpdateLeave = async (req, res) => {
      try {
        const { leave_Id } = req.params; 
        const updateData = req.body; 
      
        const leave = await Leaves.findByPk(leave_Id);
    
        if (!leave) {
          return res.status(404).json({ error: 'Leave not found' });
        }
    
        await leave.update(updateData);
    
        res.status(200).json({ message: 'Leave updated successfully', leave });
      } catch (error) {
        console.error('Error updating leave:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    };
    
    module.exports.DeleteLeave = async (req, res) => {
      try {
        const { leave_Id} = req.params; 
    
        const leave = await Leaves.findByPk(leave_Id);
  
        if (!leave) {
          return res.status(404).json({ error: 'Leave not found' });
        }
  
        await leave.destroy();
    
        res.status(200).json({ message: 'Leave deleted successfully' });
      } catch (error) {
        console.error('Error deleting leave:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    };
    
    
      
        