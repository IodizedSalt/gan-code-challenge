const express = require('express');
const router = express.Router();
const authenticate = require('../auth');

const {
  getCitiesByTag,
  getDistance,
  getArea,
  getAreaResult,
  getAllCities
} = require('../controllers/citiesController');

router.get('/cities-by-tag', authenticate, getCitiesByTag);
router.get('/distance', authenticate, getDistance);
router.get('/area', authenticate, getArea);
router.get('/area-result/:id', authenticate, getAreaResult);
router.get('/all-cities', authenticate, getAllCities);

module.exports = router;
