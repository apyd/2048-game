import {
    view
} from './app.js';
export class Model {
    constructor() {
        this.score;
        this.bestScore;
        this.board = [['','','',''],
                      ['','','',''],
                      ['','','',''],
                      ['','','','']]
        }
        generateCoordinates() {
            let x = Math.floor((Math.random() * 4) + 1);
            let y = Math.floor((Math.random() * 4) + 1);
            this.checkColision(x,y)
            console.log(x, y);
            return `${x}${y}`;
        }

        checkColision(x,y) {
            
        }

        moveTiles() {
                console.log('moveTiles');
        }
}