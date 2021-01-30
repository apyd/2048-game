import { view, model } from './app.js';
import { calculateAngle, convertMillisToMinutesAndSeconds, convertAngleToKey, checkIfEnoughSwipeDistance } from './utils.js';
import { arrowKeys, actionKeys } from './keys.js';
import gameStatuses from './gameStatuses.js';
import touchStates from './touchStates.js';

export default class Controller {
	gameType;
	initY;
	initX;
	startGameTime;
	endGameTime;

	constructor() {
		this.tilesOnBoard = 0;
		this.gameStatus = 0;
		this.minSwipeDistance = 20;
	}

	onKeyPress(e, code = e.code) {
		if (arrowKeys[code] && this.gameStatus !== (gameStatuses.started)) return false;
		if (code === actionKeys.esc && view.isPopupOpened) return view.togglePopup();
		if (actionKeys[code] && actionKeys.esc !== code && e.target.dataset.action) {
			const { action } = e.target.dataset;
			if (action === 'start-game') return this.startGame();
			if (action === 'game-type') {
				document.querySelectorAll('[data-action="start-game"]')[0].disabled = false;
				this.gameType = e.target.control.value;
				e.target.control.checked = true;
				return true;
			}
			e.preventDefault();
			return this.cancelGame();
		}
		if (arrowKeys[code]) {
			view.moveTiles(model.moveTiles(code));
			if (model.canAddTile) { view.addTileToBoard(model.addTileToBoard()); }
			if (this.tilesOnBoard === this.gameType * this.gameType) {
				const isContinued = model.checkIfPossibleMerge();
				if (!isContinued) return this.endGame();
			}
		}
		return false;
	}

	onTouch(e) {
		const eX = e.changedTouches[0].clientX;
		const eY = e.changedTouches[0].clientY;
		if (e.type === touchStates.touchend) {
			if (!checkIfEnoughSwipeDistance(eX, this.initX, eY, this.initY, this.minSwipeDistance)) return;
			const angle = calculateAngle(this.initX, this.initY, eX, eY);
			if (!angle) return;
			const key = convertAngleToKey(angle);
			this.onKeyPress(e, key);
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

	startGame() {
		this.tilesOnBoard = 0;
		this.gameStatus = gameStatuses.started;
		if (!localStorage.getItem(`bestScore${this.gameType}`)) return localStorage.setItem(`bestScore${this.gameType}`, 0);
		model.initializeGame(this.gameType);
		view.initializeGameView(this.gameType);
		if (!view.isGameViewOpened) { view.switchView(); }
		view.addTileToBoard(model.addTileToBoard());
		view.addTileToBoard(model.addTileToBoard());
		this.startGameTime = performance.now();
		return true;
	}

	cancelGame() {
		this.gameStatus = gameStatuses.cancelled;
		view.switchView();
	}

	endGame() {
		this.endGameTime = performance.now();
		const timeElapsed = this.endGameTime - this.startGameTime;
		view.showEndGamePopup(convertMillisToMinutesAndSeconds(timeElapsed), model.numberOfMoves, model.score);
		this.gameStatus = gameStatuses.ended;
	}
}