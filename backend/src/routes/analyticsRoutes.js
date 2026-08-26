const express = require('express');

const {
  getVideoAnalytics
} = require('../controllers/analyticsController');

const router = express.Router();

router.get('/videos', getVideoAnalytics);

module.exports = router;