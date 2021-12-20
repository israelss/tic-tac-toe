import './Selectors.css';

export const TableSizeSelector = ({ changeTableSize, tableSize }) => {
  return (
    <label className='selector'>
      Table size:
      <select defaultValue={ tableSize } onChange={ changeTableSize }>
        <option value="3">3x3</option>
        <option value="4">4x4</option>
        <option value="5">5x5</option>
      </select>
    </label>
  );
};
