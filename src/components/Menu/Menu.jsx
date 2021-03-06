import { PlayerSelector } from '../Selectors/PlayerSelector';
import { TableSizeSelector } from '../Selectors/TableSizeSelector';
import './Menu.css';

export const Menu = ({
  startGame,
  changeTableSize,
  tableSize,
  addPlayer,
  removePlayer,
  changePlayers,
  players
}) => {
  return (
    <div className='menu'>
      <PlayerSelector
        addPlayer={ addPlayer }
        removePlayer={ removePlayer }
        changePlayers={ changePlayers }
        players={ players }
      />

      <TableSizeSelector
        changeTableSize={ changeTableSize }
        tableSize={ tableSize }
      />

      <button
        className='menu-button'
        onClick={ () => startGame() }
      >
        Start Game
      </button>
    </div>
  );
};
