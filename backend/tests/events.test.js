const request = require('supertest');
const app = require('../src/app');

describe('POST /api/events', () => {
  test('creates a valid engagement event', async () => {
    const response = await request(app)
      .post('/api/events')
      .send({
        videoId: 1,
        eventType: 'view'
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data.videoId).toBe(1);
    expect(response.body.data.eventType).toBe('view');
  });

  test('rejects an invalid event type', async () => {
    const response = await request(app)
      .post('/api/events')
      .send({
        videoId: 1,
        eventType: 'invalid'
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Invalid event payload');
  });

  test('returns 404 for a missing video', async () => {
    const response = await request(app)
      .post('/api/events')
      .send({
        videoId: 999999,
        eventType: 'view'
      });

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe('Video not found');
  });
});