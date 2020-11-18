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
            (key === 'Escape' && view.popupVisibility) ? view.togglePopup() : null;
            if (!key.includes('Arrow')) return;
            model.moveTiles(key);
            // view.moveTiles(key);
            let coordinates = model.addTile();
            view.addTile(coordinates);
            view.updateResults(1);
    }

    endGame() {
        this.gameStatus = 'finished';
    }
}