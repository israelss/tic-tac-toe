import { useEffect, useState } from 'react';
import { checkTableState } from '../../utils/utils';
import { Table } from '../Table/Table';
import { DrawIndicator, TurnIndicator, WinnerIndicator } from '../Indicators';
import { RestartButton } from '../RestartButton/RestartButton';
import './Game.css';

export function Game({ tableSize, players, restartGame }) {
  const [hasWinner, setHasWinner] = useState(false);
  const [hasDraw, setHasDraw] = useState(false);
  const [winner, setWinner] = useState(undefined);
  const [currentPlayerSymbol, setCurrentPlayerSymbol] = useState('X');
  const [currentPlayerId, setCurrentPlayerId] = useState(1);
  const [currentPlayerName, setCurrentPlayerName] = useState('X (Player 1)');
  const [tableIndexesMap, setTableIndexesMap] = useState([]);
  const [table, setTable] = useState([]);

  useEffect(() => {
    const newTable = Array(tableSize);
    for (let i = 0; i < tableSize; i += 1) {
      newTable[i] = Array(tableSize).fill('');
    }
    setTable(newTable);
  }, [tableSize]);

  useEffect(() => {
    const newIndexes = table
      .flatMap((line, lineIndex) => line
        .map((_, columnIndex) => `${lineIndex}${columnIndex}`));
    setTableIndexesMap(newIndexes);
  }, [table]);

  useEffect(() => {
    const currentPlayer = players.find(({ id }) => id === currentPlayerId);
    setCurrentPlayerSymbol(currentPlayer.symbol);
    setCurrentPlayerName(`${currentPlayer.symbol} (${currentPlayer.name})`);
  }, [currentPlayerId]);

  function handleClick(id) {
    const [line, column] = id.split('');
    const newTable = [...table];
    newTable[line][column] = currentPlayerSymbol;
    setTable(newTable);

    const [winner, drawState] = checkTableState(table);

    if (drawState) setHasDraw(true);
    if (winner) {
      const winnerPlayer = players.find(({ symbol }) => symbol === winner);
      setWinner(`${winnerPlayer.symbol} (${winnerPlayer.name})`);
      setHasWinner(true);
    }
    if (!hasWinner && !hasDraw) {
      const nextPlayerIndex = (currentPlayerId) % players.length;
      const nextPlayer = players[nextPlayerIndex];
      setCurrentPlayerId(nextPlayer.id);
    }
  }

  return (
    <div className="game">
      {
        !hasWinner && !hasDraw && <TurnIndicator player={ currentPlayerName } />
      }
      <Table
        handleClick={ !hasWinner ? handleClick : null }
        table={ table }
        tableIndexesMap={ tableIndexesMap }
      />
      {
        hasWinner
        && (
          <>
            <WinnerIndicator winner={ winner } />
            <RestartButton onClick={ () => restartGame(tableSize, winner, players) } />
          </>
        )

      }
      {
        hasDraw && (
          <>
            <DrawIndicator />
            <RestartButton onClick={ () => restartGame(tableSize, winner, players) } />
          </>
        )
      }
    </div>
  );
}
