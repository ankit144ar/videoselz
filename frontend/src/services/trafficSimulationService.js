import { createEngagementEvent } from '../api/eventApi';

const EVENT_TYPES = [
  'view',
  'click',
  'add_to_cart'
];

function getRandomItem(items) {
  const randomIndex = Math.floor(
    Math.random() * items.length
  );

  return items[randomIndex];
}

export async function simulateTraffic(videos) {
  if (!videos.length) {
    throw new Error('No videos available for traffic simulation');
  }

  const video = getRandomItem(videos);
  const eventType = getRandomItem(EVENT_TYPES);

  return createEngagementEvent({
    videoId: video.id,
    eventType
  });
}