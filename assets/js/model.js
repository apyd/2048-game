import {
    controller,
    view
} from './app.js';
export class Model {
    constructor() {
        this.tilesOnBoard = 0;
        this.tilesLimit = 12;
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
            return !this.board[x][y] ? true : false
        }

        addTile() {
                let coordinates = this.generateCoordinates();
                this.board[coordinates.charAt(0)][coordinates.charAt(1)] = 2;
                this.tilesOnBoard++;
                return coordinates;
        }

        moveTiles() {
                console.log('moveTiles');
        }
}