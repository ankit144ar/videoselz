const request = require('supertest');
const app = require('../src/app');

describe('GET /api/analytics/videos', () => {
  test('returns paginated video analytics', async () => {
    const response = await request(app)
      .get('/api/analytics/videos')
      .query({
        page: 1,
        limit: 5
      });

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);

    expect(response.body.pagination).toEqual(
      expect.objectContaining({
        page: 1,
        limit: 5
      })
    );
  });

  test('rejects invalid pagination', async () => {
    const response = await request(app)
      .get('/api/analytics/videos')
      .query({
        page: 0,
        limit: 5
      });

    expect(response.statusCode).toBe(400);
  });
});