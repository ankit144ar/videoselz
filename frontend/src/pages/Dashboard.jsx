import { useState } from 'react';

import useVideoAnalytics from '../hooks/useVideoAnalytics';
import VideoAnalyticsTable from '../components/VideoAnalyticsTable';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import Pagination from '../components/Pagination';

function Dashboard() {
  const [page, setPage] = useState(1);
  const limit = 5;

  const {
    videos,
    pagination,
    loading,
    error,
    refresh
  } = useVideoAnalytics(page, limit);

  function goToPreviousPage() {
    setPage((currentPage) => currentPage - 1);
  }

  function goToNextPage() {
    setPage((currentPage) => currentPage + 1);
  }

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
            <Pagination
              page={pagination.page}
              totalPages={pagination.totalPages}
              onPrevious={goToPreviousPage}
              onNext={goToNextPage}
            />
          )}
        </>
      )}
    </main>
  );
}

export default Dashboard;