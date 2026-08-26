import useVideoAnalytics from '../hooks/useVideoAnalytics';
import VideoAnalyticsTable from '../components/VideoAnalyticsTable';

function Dashboard() {
  const {
    videos,
    pagination,
    loading,
    error
  } = useVideoAnalytics();

  return (
    <main>
      <h1>Shoppable Video Analytics</h1>

      {loading && <p>Loading analytics...</p>}

      {error && (
        <p>
          Failed to load analytics: {error}
        </p>
      )}

      {!loading && !error && (
        <>
          <VideoAnalyticsTable videos={videos} />

          {pagination && (
            <p>
              Page {pagination.page} of {pagination.totalPages}
            </p>
          )}
        </>
      )}
    </main>
  );
}

export default Dashboard;