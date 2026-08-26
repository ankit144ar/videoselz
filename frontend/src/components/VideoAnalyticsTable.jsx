function VideoAnalyticsTable({ videos }) {
  if (videos.length === 0) {
    return <p>No video analytics available.</p>;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Video</th>
            <th>Views</th>
            <th>Clicks</th>
            <th>Conversions</th>
            <th>Conversion Rate</th>
          </tr>
        </thead>

        <tbody>
          {videos.map((video) => {
            const views = Number(video.views);
            const conversions = Number(video.conversions);

            const conversionRate =
              views > 0
                ? (conversions / views) * 100
                : 0;

            return (
              <tr key={video.id}>
                <td>{video.title}</td>
                <td>{views}</td>
                <td>{Number(video.clicks)}</td>
                <td>{conversions}</td>
                <td>{conversionRate.toFixed(2)}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default VideoAnalyticsTable;