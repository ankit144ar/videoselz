const {
  engagementEventRepository
} = require('../repositories');

async function createEvent({ videoId, eventType, timestamp }) {
  const event = await engagementEventRepository.createEvent(
    videoId,
    eventType,
    timestamp
  );

  return event;
}

module.exports = {
  createEvent
};