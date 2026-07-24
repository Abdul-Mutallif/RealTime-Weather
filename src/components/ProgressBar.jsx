export default function ProgressBar({ value, max = 100, label }) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className="progress-bar-container">
      {label && <span className="progress-bar-label">{label}</span>}
      <div className="progress-bar-track">
        <div
          className="progress-bar-fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
