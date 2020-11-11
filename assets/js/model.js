import {
    controller,
    view
} from './app.js';
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
            if (key === 'ArrowRight' || 'ArrowLeft') {
                for (let i = 0; i < boardToSort.length; i++) {
                    boardToSort[i].sort((a, b) => this.sortToSide(a, b, key));
                }
            }
            this.board = [...boardToSort];
        }

        sortToSide(a, b, key) {
                let condition;
                key === 'ArrowLeft' ? condition = a > b : condition = a < b;
                if (typeof a === typeof b) {
                    return 0;
                } else if (condition) {
                    return -1;
                } else {
                    return 1;
                }
}
}