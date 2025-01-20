// backend/controllers/contactController.js

import Contact from '../models/contactModels.js';  // Import the Contact model to interact with MongoDB

// Controller function to handle saving contact data
export const saveContactData = async (req, res) => {
  try {
    // Extract the contact data from the request body
    const { fullname, email, subject, phone, message } = req.body;

    // Create a new contact document based on the model
    const newContact = new Contact({
      fullname,
      email,
      subject,
      phone,
      message,
    });

    // Save the new contact document to the database
    const savedContact = await newContact.save();

    // Respond with a success message and the saved contact data
    res.status(201).json({
      message: 'Contact data saved successfully',
      data: savedContact, // Return the saved contact document
    });
  } catch (error) {
    // Catch and handle any errors during the saving process
    console.error('Error saving contact data:', error);
    res.status(500).json({
      message: 'Failed to save contact data',
      error: error.message,
    });
  }
};
