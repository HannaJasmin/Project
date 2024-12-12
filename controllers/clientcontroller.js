const { Sequelize, DataTypes } = require('sequelize');
const { Clients } = require('../config/db');
const bcrypt = require('bcrypt');
const Client = require('../models/Client');

module.exports.AddClient =async (req,res,next)=>{
   
    try {
        const { name,sales_person,type,join_date,phone_number} = req.body;
  
        // Validate input
       if (!name || !sales_person || !type || !join_date ||!phone_number) {
         return res.status(400).json({ error: 'All fields are required.' });
        }

        const newClient = await Clients.create({
            name,
            sales_person,
            type,
            join_date,
            phone_number
        });
    
        res.status(201).json(newClient);
      } catch (error) {
        console.error('Error adding Client:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    };
    module.exports.GetAllClients = async (req, res, next) => {
        try {
          const client = await Clients.findAll();
      
          if (client.length === 0) {
            return res.status(404).json({ message: 'No client found' });
          }
      
          res.status(200).json(client);
        } catch (error) {
          console.error('Error fetching client:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      };
      module.exports.ClientDetails = async (req, res, next) => {
        try {
          const { client_Id } = req.params;
          const client = await Clients.findByPk(client_Id);
      
          if (client.length === 0) {
            return res.status(404).json({ message: 'No clients found' });
          }
      
          res.status(200).json(client);
        } catch (error) {
          console.error('Error fetching client:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      };
      module.exports.UpdateClient = async (req, res) => {
        try {
          const { client_Id } = req.params; 
          const updateData = req.body; 
        
          const client = await Clients.findByPk(client_Id);
      
          if (!client) {
            return res.status(404).json({ error: 'Client not found' });
          }
      
          await client.update(updateData);
      
          res.status(200).json({ message: 'Client updated successfully', client });
        } catch (error) {
          console.error('Error updating leave:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      };
      
      module.exports.DeleteClient = async (req, res) => {
        try {
          const { client_Id} = req.params; 
      
          const client = await Clients.findByPk(client_Id);
    
          if (!client) {
            return res.status(404).json({ error: 'Client not found' });
          }
    
          await client.destroy();
      
          res.status(200).json({ message: 'Client deleted successfully' });
        } catch (error) {
          console.error('Error deleting client:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      };
      