const { Sequelize, DataTypes } = require('sequelize');
const { Tasks, Employees, Projects  } = require('../config/db');
const Task = require('../models/Task');


module.exports.AddTask = async (req, res, next) => {
  try {
    const { employee_Id, task_name, attributes, description, project_Id, notes, status } = req.body;


    if (!employee_Id || !task_name || !description || !project_Id || !status) {
      return res.status(400).json({ error: 'Required fields: employee_id, task_name, description, project_id, and status.' });
    }

    const employee = await Employees.findByPk(employee_Id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found.' });
    }

    const project = await Projects.findByPk(project_Id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    const validStatuses = ['done', 'process', 'confirmed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: `Invalid status. Allowed values: ${validStatuses.join(', ')}` });
    }

    // Create the task
    const newTask = await Tasks.create({
      employee_Id,
      task_name,
      attributes: attributes || null, 
      description,
      project_Id,
      notes: notes || null,           
      status,
    });

    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
module.exports.GetAllTasks = async (req, res, next) => {
    try {
      const task = await Tasks.findAll();
  
      if (task.length === 0) {
        return res.status(404).json({ message: 'No task found' });
      }
  
      res.status(200).json(task);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  module.exports.TaskDetails = async (req, res, next) => {
    try {
      const { task_Id } = req.params;
      const task = await Tasks.findByPk(task_Id);
  
      if (task.length === 0) {
        return res.status(404).json({ message: 'No tasks found' });
      }
  
      res.status(200).json(task);
    } catch (error) {
      console.error('Error fetching task:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  module.exports.UpdateTask = async (req, res) => {
    try {
      const { task_Id } = req.params; 
      const updateData = req.body; 
    
      const task = await Tasks.findByPk(task_Id);
  
      if (!task) {
        return res.status(404).json({ error: 'Leave not found' });
      }
  
      await task.update(updateData);
  
      res.status(200).json({ message: 'Task updated successfully', task });
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  module.exports.DeleteTask = async (req, res) => {
    try {
      const { task_Id} = req.params; 
  
      const task = await Tasks.findByPk(task_Id);

      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }

      await task.destroy();
  
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  
    
      