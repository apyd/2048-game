import {
    view,
    model
} from './app.js';

export default class Controller {
    constructor() {
        this.gameStatus = 0;
    }

    startGame() {
        this.gameStatus = 1;
        view.addTile(model.addTile());
        view.addTile(model.addTile());
    }

    onKeyPress(key) {
            if (!this.gameStatus) return;
            (key === 'Escape' && view.popupVisibility) ? view.togglePopup() : null;
            if (!key.includes('Arrow')) return;
            model.moveTiles(key);
            // view.moveTiles(key);
            view.addTile(model.addTile());
    }

    endGame() {
        this.gameStatus = 0;
    }
}