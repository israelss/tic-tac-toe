import './Indicators.css';

export function LastWinnerIndicator({ winner }) {
  return (
    <div className="indicator">
      Last winner was <span>{ winner }</span>!
    </div>
  );
}
