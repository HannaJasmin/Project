const { Sequelize, DataTypes } = require('sequelize');
const { Works  } = require('../config/db');
const work = require('../models/Work');

module.exports.AddWork = async (req, res, next) => {
    try {
      const { work_name, single_or_multi, tasks} = req.body;
  
      // Debug: Log the input
      console.log('Request Body:', req.body);
  
      // Validate input
      if (!work_name ) {
        return res.status(400).json({ error: 'All fields are required.' });
      }

      if (tasks && !Array.isArray(tasks)) {
        return res.status(400).json({ error: 'Tasks must be an array of objects.' });
      }
  
      // Validate task structure if tasks are provided
      if (tasks && tasks.length > 0) {
        for (const task of tasks) {
          if (!task.time || !task.order || !task.task_name) {
            return res.status(400).json({
              error: 'Each task must have time, order, and task_name fields.',
            });
          }
        }
      }
  
      // Create the employee
      const newWork = await Works.create({
        work_name,
        single_or_multi,
        tasks: tasks || [],
      });
  
      res.status(201).json(newWork);
    } catch (error) {
      console.error('Error adding Work:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  module.exports.GetAllWork = async (req, res, next) => {
    try {
      const work = await Works.findAll();
      
      if (work.length === 0) {
        return res.status(404).json({ message: 'No works found' });
      }

      res.status(200).json(work);

    } catch (error) {
      console.error("Error fetching Work details:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  module.exports.WorkDetails = async (req, res, next) => {
    try {
      const { work_Id } = req.params;
      const work = await Works.findByPk(work_Id);

      if (!work) {
        
        return res.status(404).json({ error: "Work not found" });
      }

      res.status(200).json(work);

    } catch (error) {
      console.error("Error fetching Work details:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  module.exports.UpdateWork = async (req, res) => {
    try {
      const { work_Id } = req.params;
      const updateData = req.body; 
  
      const work = await Works.findByPk(work_Id);
  
      if (!work) {
        return res.status(404).json({ error: 'Work not found' });
      }
      
      await work.update(updateData);
  
      res.status(200).json({ message: 'Work updated successfully', work });
    } catch (error) {
      console.error('Error updating employee:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  module.exports.DeleteWork = async (req, res) => {
    try {
      const { work_Id } = req.params; 
  
      const work = await Works.findByPk(work_Id);
  
      if (!work) {
        return res.status(404).json({ error: 'Work not found' });
      }
  
      // Delete the employee
      await work.destroy();
  
      res.status(200).json({ message: 'Work deleted successfully' });
    } catch (error) {
      console.error('Error deleting work:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };