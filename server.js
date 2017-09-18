const express = require('express');
const app = express();
const program = require('commander');
const { prompt } = require('inquirer');

const newBoard = [
['0', '1', '2'],
['3', '4', '5'],
['6', '7', '8'],
];
let board = newBoard.map(row => row.slice());
let turnCount = 0;

program
  .command('start')
  .description('Stat game')
  .action(() => {
    console.log('Hello, welcome to the game!');
    console.log(
      `  
       0 | 1 | 2
       --|---|--
       3 | 4 | 5
       --|---|--
       6 | 7 | 8  
      `   
    );
    turn();
  });

const turn = () => {
  prompt([{
      type: 'input',
      name: 'move',
      message: (turnCount % 2 === 0 ? 'X' : 'O') + ': what space do you choose? (0-8)'
    }]).then(({move}) => {
      let row = Math.floor(move / 3);
      let col = move % 3;
      if (board[row][col] === 'X' || board[row][col] === 'O') {
        console.log('That space is already taken.');
        turn();
        return;
      }
      board[row][col] = turnCount % 2 === 0 ? 'X' : 'O';
      console.log(
        `  
         ${board[0][0]} | ${board[0][1]} | ${board[0][2]}
         --|---|--
         ${board[1][0]} | ${board[1][1]} | ${board[1][2]}
         --|---|--
         ${board[2][0]} | ${board[2][1]} | ${board[2][2]}  
        `   
      );
      checkWin();
    })
};

const checkWin = () => {
  const win =
    // rows
    (board[0][0] === board[0][1] && board[0][0] === board[0][2]) ||
    (board[1][0] === board[1][1] && board[1][0] === board[1][2]) ||
    (board[2][0] === board[2][1] && board[2][0] === board[2][2]) ||
    // cols
    (board[0][0] === board[1][0] && board[0][0] === board[2][0]) ||
    (board[0][1] === board[1][1] && board[0][1] === board[2][1]) ||
    (board[0][2] === board[1][2] && board[0][1] === board[2][2]) ||
    // diag
    (board[0][0] === board[1][1] && board[0][0] === board[2][2]) ||
    (board[0][2] === board[1][1] && board[0][2] === board[2][0]);
  if (win) {
    console.log('!!! ' + (turnCount % 2 === 0 ? 'X' : 'O') + ' WON !!!');
    prompt([{
      type: 'confirm',
      name: 'play',
      message: 'play again?',
    }]).then(({play}) => {
      if (play) {
        board = newBoard.map(row => row.slice());
        console.log(
          `  
           ${board[0][0]} | ${board[0][1]} | ${board[0][2]}
           --|---|--
           ${board[1][0]} | ${board[1][1]} | ${board[1][2]}
           --|---|--
           ${board[2][0]} | ${board[2][1]} | ${board[2][2]}  
          `   
        );
        turnCount++;
        turn();
      }
    });
  } else{
    turnCount++;
    turn();
  }
}

program.parse(process.argv);