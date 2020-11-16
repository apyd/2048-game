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
            let sortedBoard = Array.from(Array(4), () => new Array());
            let _tempArray = Array.from(Array(4), () => new Array());
            if (key === 'ArrowRight' || key === 'ArrowLeft') {
                for (let i = 0; i < boardToSort.length; i++) {
                    _tempArray[i] = boardToSort[i].map((value, i) => {
                                return {
                                    i,
                                    value
                        }
                    }).sort((a, b) => this.sortToSide(a, b, key));
                    sortedBoard[i] = _tempArray[i].map(obj => obj.value);
                    }
                    }
            else {
                let rotatedBoard = this.rotateBoard(boardToSort);
                for (let i = 0; i < boardToSort.length; i++) {
                    _tempArray[i] = rotatedBoard[i].map((value, i) => {
                        return {
                            i,
                            value
                        }
                    }).sort((a, b) => this.sortToSide(a, b, key));
                    sortedBoard[i] = _tempArray[i].map(obj => obj.value);
                }
                rotatedBoard = this.rotateBoard(sortedBoard);
                sortedBoard = rotatedBoard;
                }
                this.board = [...sortedBoard];
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
                (key === 'ArrowLeft' || key === 'ArrowUp') ? condition = a.value > b.value: condition = a.value < b.value;
                if ((typeof a.value === 'number') && (typeof b.value === 'number')) {
                    a.value === b.value ? this.mergeTiles(a, b, condition) : null;
                    return 0;
                } else if (condition) {
                    return -1;
                } else {
                    return 1;
                }
        }
        mergeTiles(a, b, condition) {
            if (condition === a.value > b.value) {
                b.value += b.value;
                a.value = '';
            } else {
                a.value *= 2;
                b.value = '';
            }
        }
}