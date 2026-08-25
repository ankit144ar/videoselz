const express = require('express');

const {
  createEvent
} = require('../controllers/engagementEventController');

const router = express.Router();

router.post('/events', createEvent);

module.exports = router;