const GameController = (function () {
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
    
    const promptName = (number) => prompt(`Enter the name of Player ${number}`);
    const playerOne = Player(promptName(1), 1);
    const playerTwo = Player(promptName(2), 2);

    return {};




})();

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
    const state = '';

    function setState (newState) {
        state = newState;
    }
    
    function getState () {
        return state;
    }

    return {setState, getState}
}
