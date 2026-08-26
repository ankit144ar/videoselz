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
    const [highlightedVideoId, setHighlightedVideoId] = useState(null);

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
        setHighlightedVideoId(null);

        try {
            const result = await simulateTraffic(videos);

            await refresh();

            setHighlightedVideoId(result.video.id);

            setSimulationMessage(
                `"${result.eventType}" recorded for "${result.video.title}".`
            );

            setTimeout(() => {
                setHighlightedVideoId(null);
            }, 1500);
        } catch (err) {
            setSimulationError(err.message);
        } finally {
            setSimulationLoading(false);
        }
    }

    function goToPreviousPage() {
        setPage((currentPage) => Math.max(1, currentPage - 1));
    }

    function goToNextPage() {
        setPage((currentPage) =>
            Math.min(
                currentPage + 1,
                pagination?.totalPages || currentPage
            )
        );
    }

    return (
        <main className="dashboard">
            <header className="dashboard-header">
                <div>
                    <p className="eyebrow">VIDEO ANALYTICS</p>

                    <h1>Shoppable Video Performance</h1>

                    <p className="dashboard-description">
                        Monitor views, clicks and add-to-cart activity across your
                        shoppable videos.
                    </p>
                </div>

                <SimulateTrafficButton
                    onClick={handleSimulateTraffic}
                    loading={simulationLoading}
                    disabled={videos.length === 0}
                />
            </header>

            {simulationMessage && (
                <p className="feedback-message" role="status">
                    {simulationMessage}
                </p>
            )}

            {simulationError && (
                <p className="feedback-message error" role="alert">
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
                <section className="analytics-section">
                    <div className="section-header">
                        <div>
                            <h2>Video performance</h2>

                            {pagination && (
                                <p>
                                    Showing {videos.length} of {pagination.total} videos
                                </p>
                            )}
                        </div>
                    </div>

                    <VideoAnalyticsTable
                        videos={videos}
                        highlightedVideoId={highlightedVideoId}
                    />

                    {pagination && (
                        <Pagination
                            page={pagination.page}
                            totalPages={pagination.totalPages}
                            onPrevious={goToPreviousPage}
                            onNext={goToNextPage}
                        />
                    )}
                </section>
            )}
        </main>
    );
}

export default Dashboard;