
const { Sequelize, DataTypes } = require('sequelize');
const { Users } = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const secret=process.env.DBSECRET;

module.exports.AddUser =async (req,res,next)=>{
   
    try { 

        const { username, password,phonenumber,emailid } = req.body;

        // Validate input
        if (!username || !password || !phonenumber ||!emailid) {
          return res.status(400).json({ error: 'Username, password ,phonenumber,emailid are required' });
        }

        // Create expense in the database
        const newUser = await Users.create({
          username,
          password,
          phonenumber,
          emailid,
        });
      

      
        // Send the newly created expense as a response
        res.status(201).json(newUser);
      } catch (error) {
        // Handle errors
        console.error('Error adding User:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
     
    };

module.exports.LoginUser =async (req,res,next)=>{
  console.log(req.body)
  try {
    // Find the user by username
    const {username, password} = req.body 
    const user = await Users.findOne({ where: { username } });

    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials. User not found.' });
    }

    //  Compare the provided password with the stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid credentials. Incorrect password.' });
    }

    //  If valid, create a JWT token 
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      secret  , 
      { expiresIn: '1h' } // Token expiration time (1 hour in this case)
    );

    // Return user details and the token
    return res.status(400).json( {
      
      user: {
        id: user._id,
        username: user.username,
        phonenumber:user.phonenumber,
        emailid:user.emailid
        // Add any other details you want to return
      },
      token,// Only return token if using JWT
    });
   
  } catch (error) {
    console.error('Login error:', error);
    return res.status(400).json({ error: 'An error occurred during login.' });
  }
};


module.exports.UpdateUser = async (req, res, next) => {
  try {
    const { username, password,phonenumber,emailid } = req.body;
    const { userId } = req.params; // Access the userId from URL params

    // Validate input
    if (!username || !password || !phonenumber ||!emailid) {
      return res.status(400).json({ error: 'Username, password ,phonenumber,emailid are required' });
    }

    // Find the user by ID
    const user = await Users.findByPk(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user details
    await Users.update({
      username,
      password: hashedPassword, // Store the hashed password
      phonenumber,
      emailid,
    },
    {
      where: { _id: userId }, // Specify the user to update
    }
  );

    // Send the updated user as a response (excluding sensitive data like password)
    const updatedUser = await Users.findByPk(userId, {
      attributes: { exclude: ['password'] }, // Exclude password from response
    });


    // Send the updated user as a response
    res.status(200).json({ message: 'User updated successfully', updatedUser });
  } catch (error) {
    // Handle errors
    console.error('Error updating User:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
module.exports.DeleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params; 
    console.log('User ID:', req.params.userId);

    // Check if the user ID is provided
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Delete the customer
    const deletedUser = await Users.destroy({
      where: { _id: userId }
    });

    // Check if any customer was deleted
    if (deletedUser === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Send a success response
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    // Handle errors
    console.error('Error deleting Us:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
module.exports.UserDetails = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await Users.findByPk(userId);

    if (!user) {
      
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);

  } catch (error) {
    console.error("Error fetching User details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports.GetAllUsers = async (req, res, next) => {
  try {
    //const { departmentId } = req.params;
    const user = await Users.findAll();
    
    if (user.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }

    res.status(200).json(user);

  } catch (error) {
    console.error("Error fetching Users details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

