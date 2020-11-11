export class Model {
    constructor() {
        this.tilesLimit = 12;
        this.tiles = [];
        this.score;
        this.bestScore;
        this.board = [
            ['', '', '', ''],
            ['', '', '', ''],
            ['', '', '', ''],
            ['', '', '', '']
        ]

        }
        generateCoordinates() {
            let x = Math.floor((Math.random() * 4));
            let y = Math.floor((Math.random() * 4));
            return this.checkCollision(x, y) ? `${x}${y}` : this.generateCoordinates();
        }

        checkCollision(x, y) {
            return this.board[x][y] ? false : true;
        }

        addTile() {
                let coordinates = this.generateCoordinates();
                this.board[coordinates.charAt(0)][coordinates.charAt(1)] = 2;
                this.tiles.push(coordinates);
                return coordinates;
        }

        moveTiles(key) {
            let boardToSort = [...this.board];
            let sortedBoard;
            if (key === 'ArrowRight' || key === 'ArrowLeft') {
                boardToSort.map(subArray => { subArray.sort((a, b) => this.sortToSide(a, b, key))});
                sortedBoard = [...boardToSort];
            }
            else {
                let rotatedBoard = [];
                rotatedBoard = this.rotateBoard(boardToSort);
                rotatedBoard.map(subArray => { subArray.sort((a, b) => this.sortToSide(a, b, key))});
                sortedBoard = this.rotateBoard(rotatedBoard);
                
            }
            this.board = [...sortedBoard];
            console.log(this.board);
        }

        rotateBoard(boardToRotate) {
            let rotatedBoard = Array.from(Array(4), () => new Array());
            for (let i = 0; i < boardToRotate.length; i++) {
                for(let j = 0; j < boardToRotate.length; j++) {
                    rotatedBoard[i].push(boardToRotate[j][i]);
                }
            }
            return rotatedBoard;
        }

        sortToSide(a, b, key) {
                let condition;
                (key === 'ArrowLeft' || key == 'ArrowUp') ? condition = a > b : condition = a < b;
                if (typeof a === typeof b) {
                    return 0;
                } else if (condition) {
                    return -1;
                } else {
                    return 1;
                }
}
}