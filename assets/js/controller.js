import {
    view,
    model
} from './app.js';

export default class Controller {
    constructor() {
        this.gameStatus = 0;
        this.tilesOnBoard = 0;
        this.gameType;
    }

    restartGame() {
        model.clearBoard();
        view.clearBoard();
    }

    startGame() {
        model.initGame(this.gameType);
        view.initGame(this.gameType);
        this.gameStatus = 1;
        view.addTile(model.addTile());
        view.addTile(model.addTile());
    }

    onKeyPress(key) {
            (key === 'Escape' && view.popupVisible) ? view.togglePopup() : null;
            if (!key.includes('Arrow') || (!this.gameStatus)) return;
            view.moveTiles(model.moveTiles(key));
            view.addTile(model.addTile());
    }

    endGame() {
        this.gameStatus = 0;
    }
}