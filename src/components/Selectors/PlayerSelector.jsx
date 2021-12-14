import { useEffect, useState } from 'react';
import { getSymbolsList } from '../../utils/utils';
import './Selectors.css';

const upperLetters = getSymbolsList();

const initialSymbols = new Set();
initialSymbols.add('X');
initialSymbols.add('O');

export const PlayerSelector = ({
  addPlayer,
  removePlayer,
  changePlayers,
  players,
}) => {
  const [availableSymbols, setAvailableSymbols] = useState(upperLetters);
  const [usedSymbols, setUsedSymbols] = useState(initialSymbols);

  useEffect(() => {
    setAvailableSymbols(upperLetters.filter((symbol) => !usedSymbols.has(symbol)));
  }, [usedSymbols]);

  useEffect(() => {
    const newUsedSymbols = new Set();
    players.forEach(({ symbol }) => newUsedSymbols.add(symbol));
    setUsedSymbols(newUsedSymbols);
  }, [players.length]);

  return (
    <div className='selector'>
      Players:
      {
        players.map(({ id, name, symbol }) => (
          <div className='player' key={ id }>
            <label>
              <input
                onChange={ ({ target: { value } }) => changePlayers({ id, name: value }) }
                type="text"
                value={ name }
              />
              <select
                defaultValue={ symbol }
                onChange={ ({ target: { value } }) => {
                  const newUsedSymbols = new Set(usedSymbols);
                  newUsedSymbols.delete(symbol);
                  newUsedSymbols.add(value);
                  setUsedSymbols(newUsedSymbols);
                  changePlayers({ id, symbol: value });
                } }
              >
                <option value={ symbol }>{ symbol }</option>
                { availableSymbols.map((letter) => (
                  <option
                    key={ letter }
                    value={ letter }
                  >
                    { letter }
                  </option>)
                ) }
              </select>
            </label>
            <button
              className='menu-button'
              disabled={ players.length === 2 }
              onClick={ () => removePlayer(id) }
            >
              Remove Player
            </button>

          </div>
        ))
      }

      <button
        className='menu-button'
        disabled={ players.length === 26 }
        onClick={ () => addPlayer() }
      >
        Add Player
      </button>
    </div>
  );
};
