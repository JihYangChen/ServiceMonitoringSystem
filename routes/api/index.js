var express = require('express');
var router = express.Router();

router.use('/hostManagement', require('./hostManagement'));
router.use('/contactManagement', require('./contactManagement'));

module.exports = router;