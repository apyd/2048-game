import {
    view,
    model
} from './app.js';

export default class Controller {
    constructor() {
        this.gameStatus = 0;
        this.tilesOnBoard;
        this.gameType;
        this.initY;
        this.initX;
    }

    startGame() {
        this.tilesOnBoard = 0;
        model.clearBoard();
        view.clearBoard();
        !localStorage.getItem(`bestScore${this.gameType}`) ? localStorage.setItem(`bestScore${this.gameType}`, 0) : null;
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
        if (this.tilesOnBoard === (this.gameType * this.gameType)) {
            let isContinued = model.checkIfPossibleMerge();
            !isContinued ? this.endGame() : null;
        }
    }

    onTouch(type, eX, eY) {
        if (type === 'touchend') {
            let key;
            let angle = (Math.atan2(Math.round(eY - this.initY), (Math.round(eX - this.initX))));
            angle *= 180 / Math.PI;
            angle = Math.round(angle);
            if (angle === 0) return;
            else {
                if (angle >= -135 && angle < -45) {
                    key = 'ArrowUp';
                } else if (angle >= -45 && angle < 45) {
                    key = 'ArrowRight';
                } else if (angle >= 45 && angle < 135) {
                    key = 'ArrowDown';
                } else {
                    key = 'ArrowLeft';
                }
            }
            view.moveTiles(model.moveTiles(key));
            view.addTile(model.addTile());
            if (this.tilesOnBoard === (this.gameType * this.gameType)) {
                let isContinued = model.checkIfPossibleMerge();
                !isContinued ? this.endGame() : null;
            }
        }
        this.initY = eY;
        this.initX = eX;
    }

    stopGame() {
        this.gameStatus = 0;
        view.showEntryScreen();
    }

    endGame() {
        this.gameStatus = 0;
    }
}