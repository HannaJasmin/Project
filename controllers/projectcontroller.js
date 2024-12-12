const { Sequelize, DataTypes } = require('sequelize');
const { Projects, Clients } = require('../config/db');
const project = require('../models/Project');


module.exports.AddProject = async (req, res, next) => {
  try {
    const { client_Id, title, due_date, package_details } = req.body;

    // Validate required fields
    if (!client_Id || !title || !due_date) {
      return res.status(400).json({ error: 'Fields client_id, title, and due_date are required.' });
    }

    // Validate client existence
    const client = await Clients.findByPk(client_Id);
    if (!client) {
      return res.status(404).json({ error: 'Client not found.' });
    }

    // Validate package_details structure (if provided)
    if (package_details && !package_details.package_id) {
      return res.status(400).json({ error: 'package_details must include a package_id.' });
    }

    // Create the project
    const newProject = await Projects.create({
      client_Id,
      title,
      due_date,
      package_details: package_details || null, // Default to null if not provided
    });

    res.status(201).json(newProject);
  } catch (error) {
    console.error('Error adding project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports.GetAllProjects = async (req, res, next) => {
    try {
      const project = await Projects.findAll();
  
      if (project.length === 0) {
        return res.status(404).json({ message: 'No project found' });
      }
  
      res.status(200).json(project);
    } catch (error) {
      console.error('Error fetching project:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  module.exports.ProjectDetails = async (req, res, next) => {
    try {
      const { project_Id } = req.params;
      const project = await Projects.findByPk(project_Id);
  
      if (project.length === 0) {
        return res.status(404).json({ message: 'No projects found' });
      }
  
      res.status(200).json(project);
    } catch (error) {
      console.error('Error fetching project:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  module.exports.UpdateProject = async (req, res) => {
    try {
      const { project_Id } = req.params; 
      const updateData = req.body; 
    
      const project = await Projects.findByPk(project_Id);
  
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
  
      await project.update(updateData);
  
      res.status(200).json({ message: 'Project updated successfully', project });
    } catch (error) {
      console.error('Error updating project:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  module.exports.DeleteProject = async (req, res) => {
    try {
      const { project_Id} = req.params; 
  
      const project = await Projects.findByPk(project_Id);

      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }

      await project.destroy();
  
      res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
      console.error('Error deleting project:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  