import useVideoAnalytics from '../hooks/useVideoAnalytics';

function Dashboard() {
  const {
    videos,
    loading,
    error
  } = useVideoAnalytics();

  if (loading) {
    return <main>Loading analytics...</main>;
  }

  if (error) {
    return <main>Failed to load analytics: {error}</main>;
  }

  return (
    <main>
      <h1>Shoppable Video Analytics</h1>

      <p>
        {videos.length} videos loaded.
      </p>
    </main>
  );
}

export default Dashboard;