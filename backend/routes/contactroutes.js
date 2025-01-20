// backend/routes/contactroutes.js

import express from 'express';
import { saveContactData } from '../controllers/contactController.js'; // Import the function from contactController

const router = express.Router();

// Define the POST route to handle contact form data submission
router.post('/', saveContactData);  // When POST is sent to '/api/contact', call saveContactData

export default router;  // Export the router to be used in server.js
