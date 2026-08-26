import { useState } from 'react';

import useVideoAnalytics from '../hooks/useVideoAnalytics';
import VideoAnalyticsTable from '../components/VideoAnalyticsTable';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import Pagination from '../components/Pagination';
import SimulateTrafficButton from '../components/SimulateTrafficButton';
import { simulateTraffic } from '../services/trafficSimulationService';

function Dashboard() {
  const [page, setPage] = useState(1);
  const [simulationLoading, setSimulationLoading] = useState(false);
  const [simulationMessage, setSimulationMessage] = useState(null);
  const [simulationError, setSimulationError] = useState(null);

  const limit = 5;

  const {
    videos,
    pagination,
    loading,
    error,
    refresh
  } = useVideoAnalytics(page, limit);

  async function handleSimulateTraffic() {
    setSimulationLoading(true);
    setSimulationMessage(null);
    setSimulationError(null);

    try {
      const result = await simulateTraffic(videos);

      setSimulationMessage(
        `Simulated "${result.data.eventType}" event.`
      );

      await refresh();
    } catch (err) {
      setSimulationError(err.message);
    } finally {
      setSimulationLoading(false);
    }
  }

  function goToPreviousPage() {
    setPage((currentPage) => currentPage - 1);
  }

  function goToNextPage() {
    setPage((currentPage) => currentPage + 1);
  }

  return (
    <main>
      <div className="dashboard-header">
        <div>
          <h1>Shoppable Video Analytics</h1>
          <p>Track engagement with your shoppable videos.</p>
        </div>

        <SimulateTrafficButton
          onClick={handleSimulateTraffic}
          loading={simulationLoading}
        />
      </div>

      {simulationMessage && (
        <p role="status">
          {simulationMessage}
        </p>
      )}

      {simulationError && (
        <p role="alert">
          {simulationError}
        </p>
      )}

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