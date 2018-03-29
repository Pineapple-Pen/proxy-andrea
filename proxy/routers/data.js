var express = require('express');
var router = express.Router();
require ('dotenv').config();
//this router deals with /api/restaurants

router.get('/:id/gallery', (req, res) => {
  res.redirect(`http://${process.env.HOST_PHOTOS}/api/restaurants/` + req.params.id + '/gallery');
});

router.get('/:id/overview', (req, res) => {
  res.redirect(`http://${process.env.HOST_OVERVIEW}/api/restaurants/` + req.params.id + '/overview');
});

router.get('/:id/sidebar', (req, res) => {
  res.redirect(`http://${process.env.HOST_SIDEBAR}/api/restaurants/` + req.params.id + '/sidebar');
});

router.get('/:id/recommendations', (req, res) => {
  res.redirect(`http://${process.env.HOST_RECOMMENDATIONS}/api/restaurants/` + req.params.id + '/recommendations');
});



module.exports = router;
