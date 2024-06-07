function Gameboard () {
    const board = [];
    
    for (let row = 0; row < 3; row++){
        board.push([]);
        for (let col = 0; col < 3; col++) {
            board[row].push('');
        }
    }
    
    function getBoard () {
        return board;

    }
    return {getBoard}
}

Gameboard();