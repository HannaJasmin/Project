const { Sequelize, DataTypes } = require('sequelize');
const { Package, Works, Packages } = require('../config/db');
const Client = require('../models/Client');

     
module.exports.AddPackage = async (req, res, next) => {
  try {
    const { name, work_ids } = req.body;

    // Validate required fields
    if (!name || !Array.isArray(work_ids)) {
      return res.status(400).json({ error: 'Fields name and work_ids (array) are required.' });
    }

    // Validate work_ids
    /*const validWorks = await Works.findAll({ where: { _id: work_ids } });
    if (validWorks.length !== work_ids.length) {
      return res.status(400).json({ error: 'One or more work_ids are invalid.' });
    }*/

    // Create the package
    const newPackage = await Packages.create({ name,work_ids });

    // Associate works with the package
    //await newPackage.setWorks(validWorks);

    res.status(201).json(newPackage);
  } catch (error) {
    console.error('Error adding package:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

    module.exports.GetAllPackages = async (req, res, next) => {
        try {
          const package = await Packages.findAll();
      
          if (package.length === 0) {
            return res.status(404).json({ message: 'No client found' });
          }
      
          res.status(200).json(package);
        } catch (error) {
          console.error('Error fetching package:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      };
      module.exports.PackageDetails = async (req, res, next) => {
        try {
          const { package_Id } = req.params;
          const package = await Packages.findByPk(package_Id);
      
          if (package.length === 0) {
            return res.status(404).json({ message: 'No packages found' });
          }
      
          res.status(200).json(package);
        } catch (error) {
          console.error('Error fetching package:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      };
      module.exports.UpdatePackage = async (req, res) => {
        try {
          const { package_Id } = req.params; 
          const updateData = req.body; 
        
          const package = await Packages.findByPk(package_Id);
      
          if (!package) {
            return res.status(404).json({ error: 'Package not found' });
          }
      
          await package.update(updateData);
      
          res.status(200).json({ message: 'Package updated successfully', package });
        } catch (error) {
          console.error('Error updating leave:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      };
      
      module.exports.DeletePackage = async (req, res) => {
        try {
          const { package_Id} = req.params; 
      
          const package = await Packages.findByPk(package_Id);
    
          if (!package) {
            return res.status(404).json({ error: 'Package not found' });
          }
    
          await package.destroy();
      
          res.status(200).json({ message: 'Package deleted successfully' });
        } catch (error) {
          console.error('Error deleting package:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      };
      