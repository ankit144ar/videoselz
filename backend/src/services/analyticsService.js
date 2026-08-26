const analyticsRepository = require('../repositories/analyticsRepository');

async function getVideoAnalytics(limit, offset) {
  const [videos, total] = await Promise.all([
    analyticsRepository.getVideoAnalytics(limit, offset),
    analyticsRepository.countVideos()
  ]);

  return {
    videos,
    total
  };
}

module.exports = {
  getVideoAnalytics
};