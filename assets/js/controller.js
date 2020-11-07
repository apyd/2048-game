import {
    view,
    model
} from './app.js';

export class Controller {
    constructor() {
        this.gameStatus = 'init';
    }

    startGame() {
        console.log('Start game');
        this.gameStatus = 'running';
    }

    onKeyPress(key) {
            if (!key.includes('Arrow')) return;
            view.moveTiles(key);
            let coordinates = model.addTile();
            view.addTile(coordinates);
    }

    endGame() {
        this.gameStatus = 'finished';
    }
}