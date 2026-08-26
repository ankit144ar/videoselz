const {
  engagementEventRepository,
  videoRepository
} = require('../repositories');

async function createEvent({ videoId, eventType, timestamp }) {
  const video = await videoRepository.getVideoById(videoId);

  if (!video) {
    const error = new Error('Video not found');
    error.statusCode = 404;
    throw error;
  }

  return engagementEventRepository.createEvent(
    videoId,
    eventType,
    timestamp
  );
}

module.exports = {
  createEvent
};