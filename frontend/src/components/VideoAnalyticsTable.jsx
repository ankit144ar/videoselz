import EmptyState from './EmptyState';
import { calculateConversionRate } from '../utils/analytics';

function VideoAnalyticsTable({
  videos,
  highlightedVideoId
}) {
  if (videos.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="table-container">
      <table>
        <caption className="visually-hidden">
          Shoppable video performance metrics
        </caption>

        <thead>
          <tr>
            <th scope="col">Video</th>
            <th scope="col">Views</th>
            <th scope="col">Clicks</th>
            <th scope="col">Conversions</th>
            <th scope="col">Conversion Rate</th>
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

            const isHighlighted =
              video.id === highlightedVideoId;

            return (
              <tr
                key={video.id}
                className={isHighlighted ? 'row-highlight' : ''}
              >
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