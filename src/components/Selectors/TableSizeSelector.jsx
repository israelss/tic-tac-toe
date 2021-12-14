import './Selectors.css';

export const TableSizeSelector = ({ changeTableSize }) => {
  return (
    <label className='selector'>
      Table size:
      <select onChange={ changeTableSize } name="table-size" id="table-size">
        <option value="3">3x3</option>
        <option value="4">4x4</option>
        <option value="5">5x5</option>
      </select>
    </label>
  );
};
