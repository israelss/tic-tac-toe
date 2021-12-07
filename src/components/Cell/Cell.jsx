import './Cell.css';

export function Cell({ onClick, value, id }) {
  return (
    <button
      className="cell"
      id={ id }
      onClick={ () => onClick ? onClick(id) : null }
      disabled={ value !== "" }
    >
      { value }
    </button>
  );
}
