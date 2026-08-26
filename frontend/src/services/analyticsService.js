import { fetchVideoAnalytics } from '../api/analyticsApi';

export async function getVideoAnalytics(page = 1, limit = 10) {
  const response = await fetchVideoAnalytics(page, limit);

  return {
    videos: response.data,
    pagination: response.pagination
  };
}