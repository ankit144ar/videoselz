const analyticsService = require('../services/analyticsService');
const { paginationSchema } = require('../validators/paginationValidator');

async function getVideoAnalytics(req, res, next) {
  try {
    const validationResult = paginationSchema.safeParse(req.query);

    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Invalid pagination parameters',
        details: validationResult.error.issues
      });
    }

    const { page, limit } = validationResult.data;
    const offset = (page - 1) * limit;

    const result = await analyticsService.getVideoAnalytics(
      limit,
      offset
    );

    return res.json({
      data: result.videos,
      pagination: {
        page,
        limit,
        total: result.total,
        totalPages: Math.ceil(result.total / limit)
      }
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getVideoAnalytics
};