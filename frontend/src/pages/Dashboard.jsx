import useVideoAnalytics from '../hooks/useVideoAnalytics';
import VideoAnalyticsTable from '../components/VideoAnalyticsTable';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

function Dashboard() {
  const {
    videos,
    pagination,
    loading,
    error,
    refresh
  } = useVideoAnalytics();

  return (
    <main>
      <h1>Shoppable Video Analytics</h1>

      {loading && <LoadingState />}

      {!loading && error && (
        <ErrorState
          message={error}
          onRetry={refresh}
        />
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