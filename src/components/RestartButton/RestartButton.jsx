import './RestartButton.css';

export function RestartButton({ onClick }) {
  return (
    <button
      className="restart-button"
      onClick={ onClick }
    >
      Restart
    </button>
  );
}
