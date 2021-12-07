import { useState } from 'react';
import './App.css';
import { checkTableState } from './utils/utils';
import { Table } from './components/Table/Table';
import { DrawIndicator, TurnIndicator, WinnerIndicator } from './components/Indicators';
import { RestartButton } from './components/RestartButton/RestartButton';

function App() {
  const players = { X: "O", O: "X" };
  const initialTable = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const tableIndexesMap = [
    "00", "01", "02",
    "10", "11", "12",
    "20", "21", "22",
  ];

  const [hasWinner, setHasWinner] = useState(false);
  const [hasDraw, setHasDraw] = useState(false);
  const [winner, setWinner] = useState(undefined);
  const [player, setPlayer] = useState("X");
  const [table, setTable] = useState(initialTable);

  function restartGame() {
    setTable(initialTable);
    setPlayer("X");
    setHasWinner(false);
    setWinner("");
    setHasDraw(false);
  }

  function handleClick(id) {
    const [line, column] = id.split('');
    table[line][column] = player;
    setTable(table);

    const [
      winningState,
      drawState,
    ] = checkTableState(table, Object.keys(players));

    if (drawState) setHasDraw(true);
    if (winningState) {
      setWinner(player);
      setHasWinner(true);
    }
    if (!hasWinner && !hasDraw) setPlayer(players[player]);
  }

  return (
    <div className="App">
      {
        !hasWinner && !hasDraw && <TurnIndicator player={ player } />
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
            <RestartButton onClick={ restartGame } />
          </>
        )

      }
      {
        hasDraw && (
          <>
            <DrawIndicator />
            <RestartButton onClick={ restartGame } />
          </>
        )
      }
    </div>
  );
}

export default App;
