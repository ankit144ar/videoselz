const { z } = require('zod');

const engagementEventSchema = z.object({
  videoId: z.number().int().positive(),
  eventType: z.enum(['view', 'click', 'add_to_cart']),
  timestamp: z.string().datetime().optional()
});

module.exports = {
  engagementEventSchema
};