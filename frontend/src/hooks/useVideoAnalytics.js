import { useCallback, useEffect, useState } from 'react';
import { getVideoAnalytics } from '../services/analyticsService';

function useVideoAnalytics(page = 1, limit = 10) {
  const [videos, setVideos] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadAnalytics = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await getVideoAnalytics(page, limit);

      setVideos(result.videos);
      setPagination(result.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    loadAnalytics();
  }, [loadAnalytics]);

  return {
    videos,
    pagination,
    loading,
    error,
    refresh: loadAnalytics
  };
}

export default useVideoAnalytics;