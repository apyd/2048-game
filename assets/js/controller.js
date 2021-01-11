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
        this.startGameTime;
        this.endGameTime;
        this.minSwipeDistance = 20;
    }

    startGame() {
        this.tilesOnBoard = 0;
        this.gameStatus = 1;
        model.clearBoard();
        view.clearBoard();
        !localStorage.getItem(`bestScore${this.gameType}`) ? localStorage.setItem(`bestScore${this.gameType}`, 0) : null;
        model.initializeGame(this.gameType);
        view.initializeGameView(this.gameType);
        this.startGameTime = performance.now();
        view.addTile(model.addTile());
        view.addTile(model.addTile());
    }

    onKeyPress(key) {
        (key === 'Escape' && view.popupVisible) ? view.togglePopup() : null;
        if (!key.includes('Arrow') || (!this.gameStatus)) return;
        view.moveTiles(model.moveTiles(key));
        model.canAddTile ? view.addTile(model.addTile()) : null;
        if (this.tilesOnBoard === (this.gameType * this.gameType)) {
            const isContinued = model.checkIfPossibleMerge();
            !isContinued ? this.endGame() : null;
        }
    }

    onTouch(type, eX, eY) {
        if (type === 'touchend') {
            let key;
            if (Math.abs(Math.round(eY - this.initY)) < this.minSwipeDistance && Math.abs(Math.round(eX - this.initX)) < this.minSwipeDistance) return;
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
            model.canAddTile ? view.addTile(model.addTile()) : null;
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
        this.endGameTime = performance.now();
        const timeElapsed = this.endGameTime - this.startGameTime;
        view.showEndGamePopup(this.convertMillisToMinutesAndSeconds(timeElapsed), model.numberOfMoves, model.score);
        this.gameStatus = 0;
    }
    convertMillisToMinutesAndSeconds(millis) {
        const minutes = Math.floor(millis / 60000);
        const seconds = ((millis % 60000) / 1000).toFixed(0);
        const minutesToShow = `${minutes === 0 ?
                                            '' :
                                 minutes === 1 ?
                           `${minutes} minute` :
                         `${minutes} minutes`}`;
        return `${minutesToShow} ${seconds} seconds`;
    }
}