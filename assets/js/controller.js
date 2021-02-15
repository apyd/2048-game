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
	view;
	tile;
	board;
	score;

	constructor() {
		this.gameStatus = 0;
		this.minSwipeDistance = 20;
	}

	setView(view) {
		this.view = view;
	}

	setTile(tile) {
		this.tile = tile;
	}

	setBoard(board) {
		this.board = board;
	}

	setScore(score) {
		this.score = score;
	}

	onKeyPress(e, code = e.code) {
		if (arrowKeys[code] && this.gameStatus !== gameStatuses.started) return false;
		if (code === actionKeys.Esc && this.view.isPopupOpened) return this.view.togglePopup(code);
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
			this.view.moveTiles(this.board.moveTiles(code));
			this.view.updateScore(this.score.getCurrentScore());
			if (this.board.tilesOnBoard === this.gameType * this.gameType) {
				const isContinued = this.board.checkIfPossibleMerge();
				if (!isContinued) return this.endGame();
			}
			if (this.board.canAddTile) {
				this.view.addTileToBoard(this.board.addTileToBoard(this.tile));
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

	initializeGame() {
		this.board.resetBoard(this.gameType);
		this.tile.resetNextAvailableTileId();
		this.score.resetScore();
		this.score.setBestScore(this.gameType);
		this.view.initializeGameView(this.gameType);
	}

	startGame() {
		this.gameStatus = gameStatuses.started;
		if (!localStorage.getItem(`bestScore${this.gameType}`)) return localStorage.setItem(`bestScore${this.gameType}`, 0);
		this.initializeGame();
		if (!this.view.isGameViewOpened) { this.view.switchView(); }
		this.view.addTileToBoard(this.board.addTileToBoard());
		this.view.addTileToBoard(this.board.addTileToBoard());
		this.startGameTime = performance.now();
		return true;
	}

	cancelGame() {
		this.gameStatus = gameStatuses.cancelled;
		this.view.switchView();
	}

	endGame() {
		this.endGameTime = performance.now();
		const timeElapsed = this.endGameTime - this.startGameTime;
		const { numberOfMoves } = this.board;
		const { currentScore } = this.score;
		this.view.showEndGamePopup(convertMillisToMinutesAndSeconds(timeElapsed), numberOfMoves, currentScore);
		this.gameStatus = gameStatuses.ended;
	}
}