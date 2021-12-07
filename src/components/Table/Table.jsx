import { Cell } from '../Cell/Cell';
import './Table.css';

export function Table({ handleClick, table, tableIndexesMap }) {
  return (
    <div className="table">
      {
        tableIndexesMap.map((index) => {
          const [line, column] = index.split('');
          const value = table[line][column];
          return (
            <Cell
              key={ index }
              onClick={ handleClick }
              id={ index }
              value={ value }
            />
          );
        })
      }
    </div>
  );
}
