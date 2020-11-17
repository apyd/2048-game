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
            (key === 'ArrowUp' || key === 'ArrowDown') ? boardToSort = this.rotateBoard([...boardToSort]): null;
            if (key === 'ArrowRight' || key === 'ArrowDown') {
                for (let [index, subArray] of boardToSort.entries()) {
                    sortedBoard[index] = subArray.filter(el => !el).concat(subArray.filter(el => el));
                }
            }
            else {
                for (let [index, subArray] of boardToSort.entries()) {
                    sortedBoard[index] = subArray.filter(el => el).concat(subArray.filter(el => !el));
                }
            }
            (key === 'ArrowUp' || key === 'ArrowDown') ? sortedBoard = this.rotateBoard([...sortedBoard]): null;
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
    }