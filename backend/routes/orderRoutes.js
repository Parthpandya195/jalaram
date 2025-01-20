const express = require('express');
const { placeOrder } = require('../controllers/orderController');
const router = express.Router();
import { orderRoutes } from './routes/orderRoutes.js';

router.post('/', placeOrder);

module.exports = router;
