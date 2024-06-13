const Gameboard = (function () {
    const board = [];
    
    for (let row = 0; row < 3; row++){
        board.push([]);
        for (let col = 0; col < 3; col++) {
            board[row].push(Cell());
        }
    }
    
    function getBoard () {
        return board;

    }
    
    return {getBoard};
})();

const GameController = (function () {  
    function checkWin () {
        const targetRowLength = Gameboard.getBoard()[moveRow]
                                         .reduce((count, cell)=>{
            return (cell.getState() === currentPlayer.getToken()) ? ++count : count;       
        }, 0)
        
        const targetColLength = Gameboard.getBoard()
                                         .reduce((count, row)=>{             
            return (row[moveColumn].getState() === currentPlayer.getToken())? ++count : count;
        }, 0)
     
        const backDiagonalLength = [Gameboard.getBoard()[0][0], 
                                    Gameboard.getBoard()[1][1], 
                                    Gameboard.getBoard()[2][2]].reduce((count, cell)=>{
            return (cell.getState() === currentPlayer.getToken()) ? ++count : count;
        }, 0)

        const frontDiagonalLength = [Gameboard.getBoard()[0][2], 
                                    Gameboard.getBoard()[1][1], 
                                    Gameboard.getBoard()[2][0]].reduce((count, cell)=>{
            return (cell.getState() === currentPlayer.getToken()) ? ++count : count;      
        }, 0)

        return (targetRowLength === 3 || targetColLength === 3 || backDiagonalLength === 3 || frontDiagonalLength === 3);
    }
    
    function switchTurn () {
        currentPlayer = (currentPlayer != playerOne) ? playerOne : playerTwo;
    }

    function getPlayerMove () {
        moveRow = prompt(`${currentPlayer.getName()} to move. Place ${currentPlayer.getToken()} at row?`);
        moveColumn = prompt(`${currentPlayer.getName()} to move. Place ${currentPlayer.getToken()} at column?`);
    }

    function placeToken () {
        targetCell = Gameboard.getBoard()[moveRow][moveColumn];
        targetCell.setState(currentPlayer.getToken());
    }

    function printBoard () {
        for (let i = 0; i < Gameboard.getBoard().length; i++) {
            console.log(
                {
                0:Gameboard.getBoard()[i][0].getState(), 
                1:Gameboard.getBoard()[i][1].getState(), 
                2:Gameboard.getBoard()[i][2].getState(
                )});
        }
    }

    function printWinner () {
        console.log((winner) ? `${winner.getName()} (${winner.getToken()}) won!`: 'Game drawn!')
    }
    
    const promptName = (number) => prompt(`Enter the name of Player ${number}`);
    const playerOne = Player(promptName(1), 1);
    const playerTwo = Player(promptName(2), 2);

    let currentPlayer;
    let moveRow;
    let moveColumn;
    let targetCell;
    let winner;
    let tokensPlaced = 0;
    
    while (!winner) {
        switchTurn();
        getPlayerMove();
        placeToken();
        tokensPlaced++;

        printBoard();

        if (tokensPlaced >= 5) {
        winner = (checkWin()) ? currentPlayer : null;
        }
        if (tokensPlaced === 9) {
            break;
        }

    }

    printWinner();

    return {};

});

const ScreenController = (function () {

    function updateScreen () {
        let board = Gameboard.getBoard();
        let divCounter = 0;
        for (let row = 0; row < 3; row++){
            for (let col = 0; col < 3; col++){
                document.querySelectorAll('.grid-cell')[divCounter++].textContent = board[row][col].getState();

            }
            

        }


    }

    return {updateScreen}


})()


function Player (name, number) {
    const token = (number === 1) ? 'X' : 'O';

    function getName () {
        return name;
    }
    function getToken () {
        return token;
    }
    return {getName, getToken};
}

function Cell () {
    let state = '';

    function setState (newState) {
        state = newState;
    }
    
    function getState () {
        return state;
    }

    return {setState, getState}
}

ScreenController.updateScreen();