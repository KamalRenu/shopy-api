const express = require('express');
const {
	getStripeSecret,
	getStripePublicKey,
} = require('../controllers/payment-controller.js');
const { protect } = require('../middleware/auth-middleware.js');

const router = express.Router();

router.route('/config/stripe-pk').get(getStripePublicKey);
router.route('/config/stripe-payment-intent').post(getStripeSecret);

module.exports = router;