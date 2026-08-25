const {
  engagementEventSchema
} = require('../validators/engagementEventValidator');

const engagementEventService = require('../services/engagementEventService');

async function createEvent(req, res, next) {
  try {
    const validationResult = engagementEventSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Invalid event payload',
        details: validationResult.error.issues
      });
    }

    const event = await engagementEventService.createEvent(
      validationResult.data
    );

    req.log.info(
      {
        eventId: event.id,
        videoId: event.videoId,
        eventType: event.eventType
      },
      'Engagement event created'
    );

    return res.status(201).json({
      data: event
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createEvent
};