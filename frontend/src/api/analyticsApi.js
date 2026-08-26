const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export async function fetchVideoAnalytics(page = 1, limit = 10) {
  const response = await fetch(
    `${API_BASE_URL}/api/analytics/videos?page=${page}&limit=${limit}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch video analytics');
  }

  return response.json();
}