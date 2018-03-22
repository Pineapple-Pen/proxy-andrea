var express = require('express');
var router = express.Router();
//this router deals with /api/restaurants

router.get('/:id/gallery', (req, res) => {
  res.redirect('http://13.57.148.57/api/restaurants/' + req.params.id + '/gallery');
});

router.get('/:id/overview', (req, res) => {
  res.redirect('http://184.169.248.150/api/restaurants/' + req.params.id + '/overview');
});

router.get('/:id/sidebar', (req, res) => {
  res.redirect('http://54.177.233.239/api/restaurants/' + req.params.id + '/sidebar');
});

router.get('/:id/recommendations', (req, res) => {
  res.redirect('http://52.89.102.101/api/restaurants/' + req.params.id + '/recommendations');
});



module.exports = router;
