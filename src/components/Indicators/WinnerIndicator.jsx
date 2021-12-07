import './Indicators.css';

export function WinnerIndicator({ winner }) {
  return (
    <div className="indicator">
      Player <span>{ winner }</span> has won this game!
    </div>
  );
}
