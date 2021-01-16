const express = require('express');
const { 
    location,
    getConfirmationIfInRadius
} = require('../controllers/location');

const router = express.Router();

const { protectRoute, authRoles } = require('../middleware/auth');

router.route('/city/:city')
.post(protectRoute, authRoles('admin'), location)
.get(protectRoute, authRoles('admin', 'user'), getConfirmationIfInRadius);

module.exports = router;