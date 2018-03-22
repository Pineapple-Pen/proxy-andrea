var express = require('express');
var router = express.Router();
//this router deals with /restaurants

router.use('/:id', express.static('client'));

module.exports = router;
