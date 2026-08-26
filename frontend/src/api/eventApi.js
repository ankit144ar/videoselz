const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export async function createEngagementEvent(event) {
  const response = await fetch(
    `${API_BASE_URL}/api/events`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(event)
    }
  );

  if (!response.ok) {
    let message = 'Failed to create engagement event';

    try {
      const errorBody = await response.json();

      if (errorBody.error) {
        message = errorBody.error;
      }
    } catch {
      // Keep the default error message.
    }

    throw new Error(message);
  }

  return response.json();
}