export default function SkeletonLoader() {
  return (
    <>
      {/* Weather Summary Skeleton */}
      <div className="skeleton-card skeleton-summary">
        <div className="skeleton-circle"></div>
        <div className="skeleton-lines">
          <div className="skeleton-line skeleton-line-long"></div>
          <div className="skeleton-line skeleton-line-medium"></div>
        </div>
      </div>

      {/* Current Weather Skeleton */}
      <div className="current-weather">
        <div className="skeleton-card skeleton-main">
          <div className="skeleton-line skeleton-line-short"></div>
          <div className="skeleton-line skeleton-line-short"></div>
          <div className="skeleton-line skeleton-line-temp"></div>
          <div className="skeleton-line skeleton-line-short"></div>
          <div className="skeleton-circle skeleton-circle-large"></div>
        </div>
        <div className="skeleton-card">
          <div className="skeleton-line skeleton-line-medium"></div>
          <div className="skeleton-grid">
            <div className="skeleton-box"></div>
            <div className="skeleton-box"></div>
            <div className="skeleton-box"></div>
            <div className="skeleton-box"></div>
          </div>
        </div>
      </div>
    </>
  );
}
