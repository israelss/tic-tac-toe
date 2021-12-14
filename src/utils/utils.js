function checkItems(arr) {
  let winner;
  arr.forEach((line) => {
    if (!winner && line.every((cell) => cell === line[0])) winner = line[0];
  });
  return winner;
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

function lineWinner(table) {
  return checkItems(table);
}

function columnWinner(table) {
  return checkItems(columns(table));
}

function diagonalWinner(table) {
  return checkItems(diagonals(table));
}

function checkWinner(table) {
  return lineWinner(table)
    || columnWinner(table)
    || diagonalWinner(table);
}

function checkDraw(table) {
  return table.every((line) => line.every((cell) => cell !== ''));
}

export function checkTableState(table) {
  const winner = checkWinner(table);
  const isDraw = winner ? false : checkDraw(table);
  return [winner, isDraw];
}

export function getSymbolsList() {
  const upperA = 0x0041;
  const upperZ = 0x005A;
  const symbols = [];
  for (let i = upperA; i <= upperZ; i += 0x1) {
    symbols.push(String.fromCodePoint(i));
  }
  return symbols;
}