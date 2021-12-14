import { useState } from 'react';
import './App.css';
import { Game } from './components/Game/Game';
import { LastWinnerIndicator } from './components/Indicators/LastWinnerIndicator';
import { Menu } from './components/Menu/Menu';

const INITIAL_PLAYERS = [
  {
    id: 1,
    name: 'Player 1',
    symbol: 'X'
  },
  {
    id: 2,
    name: 'Player 2',
    symbol: 'O'
  }
];

function App() {

  const [players, setPlayers] = useState(INITIAL_PLAYERS);
  const [tableSize, setTableSize] = useState(3);
  const [isRunning, setIsRunning] = useState(false);
  const [lastWinner, setLastWinner] = useState(undefined);

  function restartGame(tableSize, winner, players) {
    setPlayers(players);
    setTableSize(tableSize);
    setLastWinner(winner);
    setIsRunning(false);
  }

  function changeTableSize({ target: { value } }) {
    setTableSize(Number(value));
  }

  function addPlayer() {
    const newPlayerId = players.at(-1)?.id + 1 || 1;
    let nextSymbol = 0x0041;
    while (players.find(({ symbol }) => symbol === String.fromCodePoint(nextSymbol))) {
      nextSymbol += 0x1;
    }
    const newPlayer = {
      id: newPlayerId,
      name: `Player ${newPlayerId}`,
      symbol: String.fromCodePoint(nextSymbol),
    };
    const newPlayers = [...players];
    newPlayers.push(newPlayer);
    newPlayers.forEach((player, index) => player.id = index + 1);
    setPlayers(newPlayers);
  }

  function removePlayer(playerId) {
    const newPlayers = players.filter(({ id }) => id !== playerId);
    newPlayers.forEach((player, index) => player.id = index + 1);
    setPlayers(newPlayers);
  }

  function changePlayers({ id, name, symbol }) {
    const newPlayers = players.map((player) => {
      if (id === player.id) {
        return {
          id,
          name: name || player.name,
          symbol: symbol || player.symbol,
        };
      }
      return player;
    });
    newPlayers.forEach((player, index) => player.id = index + 1);
    setPlayers(newPlayers);
  }

  function startGame() {
    setIsRunning(true);
  }

  return (
    <div className="App">
      {
        isRunning
          ? (
            <Game
              tableSize={ tableSize }
              players={ players }
              restartGame={ restartGame }
            />
          )
          : (
            <>
              { lastWinner && <LastWinnerIndicator winner={ lastWinner } /> }
              < Menu
                changeTableSize={ changeTableSize }
                changePlayers={ changePlayers }
                players={ players }
                startGame={ startGame }
                addPlayer={ addPlayer }
                removePlayer={ removePlayer }
              />
            </>
          )
      }
    </div>
  );
}

export default App;
