import EmptyState from './EmptyState';
import { calculateConversionRate } from '../utils/analytics';

function VideoAnalyticsTable({ videos }) {
  if (videos.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="table-container">
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
            const clicks = Number(video.clicks);
            const conversions = Number(video.conversions);

            const conversionRate = calculateConversionRate(
              conversions,
              views
            );

            return (
              <tr key={video.id}>
                <td>{video.title}</td>
                <td>{views}</td>
                <td>{clicks}</td>
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