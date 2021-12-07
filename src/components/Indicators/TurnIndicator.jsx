import './Indicators.css';

export function TurnIndicator({ player }) {
  return (
    <div className="indicator">
      It's player's <span>{ player }</span> turn!
    </div>
  );
}
