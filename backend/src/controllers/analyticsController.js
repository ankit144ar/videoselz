const analyticsService = require('../services/analyticsService');

async function getVideoAnalytics(req, res, next) {
  try {
    const page = Number.parseInt(req.query.page, 10) || 1;
    const limit = Number.parseInt(req.query.limit, 10) || 10;

    if (page < 1 || limit < 1 || limit > 100) {
      return res.status(400).json({
        error: 'Invalid pagination parameters'
      });
    }

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