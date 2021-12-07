function isAll(players, arr) {
  const result = [];
  players.forEach((player) => {
    const playerExp = new RegExp(`^${player}$`, 'i');
    result.push(arr.every((item) => item.match(playerExp)));
  });
  return result.some((item) => item);
}

function columns(arr) {
  const max = arr.length - 1;
  return arr.reduce((transposed, _, index, originalArr) => {
    const newLine = [];
    for (let i = 0; i <= max; i += 1) {
      newLine.push(originalArr[i][index]);
    }
    return transposed.concat([newLine]);
  }, []);
}

function diagonals(matrix) {
  const max = matrix.length - 1;
  const diagonalOne = [];
  const diagonalTwo = [];
  for (let i = 0; i <= max; i += 1) {
    diagonalOne.push(matrix[i][i]);
    diagonalTwo.push(matrix[i][max - i]);
  }
  return [diagonalOne, diagonalTwo];
}

function lineHasWinner(table, players) {
  return table.some((line) => isAll(players, line));
}

function columnHasWinner(table, players) {
  return columns(table).some((column) => isAll(players, column));
}

function diagonalHasWinner(table, players) {
  return diagonals(table).some((diagonal) => isAll(players, diagonal));
}

function checkWinner(table, players) {
  return lineHasWinner(table, players)
    || columnHasWinner(table, players)
    || diagonalHasWinner(table, players);
}

function checkDraw(table) {
  return table.every((line) => line.every((cell) => cell !== ''));
}

export function checkTableState(table, players) {
  const hasWinner = checkWinner(table, players);
  const isDraw = hasWinner ? false : checkDraw(table);
  return [hasWinner, isDraw];
}