import elementsDimensions from './elementsDimensions.js';
import gameStatuses from './gameStatuses.js';
import { actionKeys } from './keys.js';

export default class View {
	tileDimension;
	innerBorderWidth;
	outerBorderWidth;
	gameType;
	screenType;

	constructor() {
		this.isPopupOpened = 0;
		this.isGameViewOpened = 0;
	}

	static clearBoard() {
		const board = document.querySelector('.board');
		while (board.firstChild) {
			board.removeChild(board.lastChild);
		}
	}

	switchView() {
		this.isGameViewOpened = !this.isGameViewOpened;
		document.querySelector('.entry-screen').classList.toggle('entry-screen--hidden');
		document.querySelector('.game').classList.toggle('game--hidden');
	}

	onScreenResize(gameStatus) {
		if (gameStatus === gameStatuses.cancelled) return;
		const screenType = window.innerWidth >= 480 ? 'desktop' : 'mobile';
		if (screenType === this.screenType) return;
		this.screenType = screenType;
		const tiles = document.querySelectorAll('.tile');
		this.tileDimension = elementsDimensions[`board${this.gameType}x${this.gameType}`][this.screenType].tileDimension;
		this.innerBorderWidth = elementsDimensions[`board${this.gameType}x${this.gameType}`][this.screenType].innerBorderWidth;
		this.outerBorderWidth = elementsDimensions[`board${this.gameType}x${this.gameType}`][this.screenType].outerBorderWidth;
		tiles.forEach((tile) => {
			tile.style.left = `${tile.dataset.x * this.tileDimension + tile.dataset.x * this.innerBorderWidth + this.outerBorderWidth}px`;
			tile.style.top = `${tile.dataset.y * this.tileDimension + tile.dataset.y * this.innerBorderWidth + this.outerBorderWidth}px`;
		});
	}

	initializeGameView(gameType) {
		View.clearBoard();
		this.gameType = +gameType;
		document.querySelector('.board').classList = 'board';
		document.querySelector('.board').classList.add(`board--${this.gameType}x${this.gameType}`);
		document.querySelectorAll('.score__value')[1].innerHTML = localStorage.getItem(`bestScore${this.gameType}`);
		document.querySelectorAll('.score__value')[0].innerHTML = 0;
		const windowWidth = window.innerWidth;
		this.screenType = windowWidth >= 480 ? 'desktop' : 'mobile';
		this.tileDimension = elementsDimensions[`board${this.gameType}x${this.gameType}`][this.screenType].tileDimension;
		this.innerBorderWidth = elementsDimensions[`board${this.gameType}x${this.gameType}`][this.screenType].innerBorderWidth;
		this.outerBorderWidth = elementsDimensions[`board${this.gameType}x${this.gameType}`][this.screenType].outerBorderWidth;
	}

	updateScore(score = 0) {
		document.querySelectorAll('.score__value')[0].innerHTML = score;
		document.querySelectorAll('.score__value')[1].innerHTML = localStorage.getItem(`bestScore${this.gameType}`);
	}

	togglePopup(target) {
		const overlay = document.querySelector('.overlay');
		const closeButton = document.querySelector('[data-action="close-popup"]');
		if ([overlay, closeButton].includes(target) || target === actionKeys.Esc) {
			overlay.classList.toggle('overlay--hidden');
			this.isPopupOpened = !this.isPopupOpened;
		}
	}

	showEndGamePopup(time, numberOfMoves, result) {
		document.querySelector('.popup__heading').innerHTML = 'End game';
		const popupBody = document.querySelector('.popup__body');
		popupBody.innerHTML = `<p class="popup__text"><span class="popup__text--bold">Time elapsed: </span>${time}</p>
								<p class="popup__text"><span class="popup__text--bold">Moves performed: </span>${numberOfMoves}</p>
								<p class="popup__text"><span class="popup__text--bold">Your result: </span>${result} points </p>`;
		this.togglePopup();
	}

	createTile(x, y, id) {
		const tile = document.createElement('div');
		tile.classList.add('tile', `tile--size-${this.gameType}`, 'tile--2', 'tile--add');
		tile.style.left = `${x * this.tileDimension + x * this.innerBorderWidth + this.outerBorderWidth}px`;
		tile.style.top = `${y * this.tileDimension + y * this.innerBorderWidth + this.outerBorderWidth}px`;
		tile.dataset.id = id;
		tile.dataset.x = x;
		tile.dataset.y = y;
		const span = document.createElement('span');
		span.classList.add('tile__value');
		span.innerHTML = '2';
		tile.appendChild(span);
		tile.addEventListener('transitionend', () => { tile.classList.remove('tile--move'); });
		tile.addEventListener('animationend', () => {
			if (tile.classList.contains('tile--add')) { tile.classList.remove('tile--add'); }
			if (tile.classList.contains('tile--merge')) { tile.classList.remove('tile--merge'); }
		});
		return tile;
	}

	addTileToBoard({ x, y, id }) {
		document.querySelector('.board').appendChild(this.createTile(x, y, id));
	}

	moveTiles(arrayWithTiles) {
		if (!arrayWithTiles) return false;
		const tiles = document.querySelectorAll('.tile');
		let index;
		tiles.forEach((tile) => {
			index = arrayWithTiles.map((arrTile) => arrTile.id).indexOf(+tile.dataset.id);
			if (index === -1) {
				const retainedTileObj = arrayWithTiles.filter((el) => el.mergedId === +tile.dataset.id);
				const retainedTile = document.querySelector(`[data-id="${retainedTileObj[0].id}"]`);
				return this.mergeTiles(retainedTile, tile, retainedTileObj);
			}
			tile.style.left = `${arrayWithTiles[index].x * this.tileDimension + arrayWithTiles[index].x * this.innerBorderWidth + this.outerBorderWidth}px`;
			tile.style.top = `${arrayWithTiles[index].y * this.tileDimension + arrayWithTiles[index].y * this.innerBorderWidth + this.outerBorderWidth}px`;
			tile.dataset.x = arrayWithTiles[index].x;
			tile.dataset.y = arrayWithTiles[index].y;
			tile.classList.add('tile--move');
			return true;
		});
		return true;
	}

	mergeTiles(retainedTile, tileToMerge, retainedObj) {
		tileToMerge.style.left = `${retainedObj[0].x * this.tileDimension + retainedObj[0].x * this.innerBorderWidth + this.outerBorderWidth}px`;
		tileToMerge.style.top = `${retainedObj[0].y * this.tileDimension + retainedObj[0].y * this.innerBorderWidth + this.outerBorderWidth}px`;
		tileToMerge.classList.add('tile--merge');
		retainedTile.style.left = `${retainedObj[0].x * this.tileDimension + retainedObj[0].x * this.innerBorderWidth + this.outerBorderWidth}px`;
		retainedTile.style.top = `${retainedObj[0].y * this.tileDimension + retainedObj[0].y * this.innerBorderWidth + this.outerBorderWidth}px`;
		retainedTile.classList = `tile tile--size-${this.gameType} tile--${retainedObj[0].val}`;
		retainedTile.firstChild.innerHTML = `${retainedObj[0].val}`;
		retainedTile.classList.add('tile--merge');
		if (!(retainedTile.firstChild.textContent.length < 4)) { retainedTile.style.fontSize = '1rem'; }
		tileToMerge.remove();
	}
}