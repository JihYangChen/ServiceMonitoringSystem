var express = require('express');
var router = express.Router();

router.use('/hostManagement', require('./hostManagement'));
router.use('/monitorHostStatus', require('./monitorHostStatus'));

module.exports = router;