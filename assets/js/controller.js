import { view, model } from './app.js';
import { calculateAngle, convertMillisToMinutesAndSeconds, convertAngleToKey, checkIfEnoughSwipeDistance } from './utils.js';
import keys from './keys.js';
import gameStatuses from './gameStatuses.js';
import touchStates from './touchStates.js';

export default class Controller {
	tilesOnBoard;
	gameType;
	initY;
	initX;
	startGameTime;
	endGameTime;

	constructor() {
		this.gameStatus = 0;
		this.minSwipeDistance = 20;
	}

	startGame() {
		this.tilesOnBoard = 0;
		this.gameStatus = gameStatuses.started;
		model.clearBoard();
		view.clearBoard();
		if (!localStorage.getItem(`bestScore${this.gameType}`)) return localStorage.setItem(`bestScore${this.gameType}`, 0);
		model.initializeGame(this.gameType);
		view.initializeGameView(this.gameType);
		view.addTileToBoard(model.addTileToBoard());
		view.addTileToBoard(model.addTileToBoard());
		this.startGameTime = performance.now();
		return true;
	}

	onKeyPress(key) {
		if (keys[key] && view.isPopupOpened) return view.togglePopup();
		if (!keys[key] || this.gameStatus === (gameStatuses.stopped || gameStatuses.ended)) return false;
		view.moveTiles(model.moveTiles(key));
		if (model.canAddTile) return view.addTileToBoard(model.addTileToBoard());
		if (this.tilesOnBoard === this.gameType * this.gameType) {
			const isContinued = model.checkIfPossibleMerge();
			if (!isContinued) return this.endGame();
		}
		return true;
	}

	onTouch(type, eX, eY) {
		if (touchStates.touchend === type) {
			if (!checkIfEnoughSwipeDistance(eX, this.initX, eY, this.initY, this.minSwipeDistance)) return;
			const angle = calculateAngle(this.initX, this.initY, eX, eY);
			if (angle) return;
			const key = convertAngleToKey(angle);
			view.moveTiles(model.moveTiles(key));
			if (model.canAddTile) {
				view.addTileToBoard(model.addTileToBoard());
				const isContinued = (this.tileOnBoard === (this.gameType ** 2));
				if (isContinued) this.endGame();
			}
		}
		this.initY = eY;
		this.initX = eX;
	}

	incrementNumberOfTilesOnBoard() {
		this.tilesOnBoard += 1;
	}

	decrementNumberOfTilesOnBoard() {
		this.tilesOnBoard -= 1;
	}

	stopGame() {
		this.gameStatus = gameStatuses.stopped;
		view.showEntryScreen();
	}

	endGame() {
		this.endGameTime = performance.now();
		const timeElapsed = this.endGameTime - this.startGameTime;
		view.showEndGamePopup(convertMillisToMinutesAndSeconds(timeElapsed), model.numberOfMoves, model.score);
		this.gameStatus = gameStatuses.stopped;
	}
}
