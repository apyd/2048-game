import { controller, view } from './app.js';
import { generateRandomCoordinates } from './utils.js';

export default class Model {
	bestScore;
	gameType;
	board;

	constructor() {
		this.nextAvailableTileId = 0;
		this.score = 0;
		this.numberOfMoves = 0;
		this.canAddTile = true;
	}

	initializeGame(selectedType) {
		this.gameType = +selectedType;
		this.board = this.createBoard();
		this.bestScore = +localStorage.getItem(`bestScore${this.gameType}`);
	};

	createBoard(boardType) {
		switch (boardType) {
			case 1:
				return Array(this.gameType).fill().map(() => Array());
			case 2:
				return Array(this.gameType).fill().map(() => Array(this.gameType));
			default:
				return Array(this.gameType).fill().map(() => Array(this.gameType).fill(''));
		}
	};

	clearBoard() {
		this.board = this.createBoard();
		this.nextAvailableTileId = 0;
		this.score = 0;
	};

	checkCollision({ x, y }) {
		return !!this.board[y][x] ? false : { x, y };
	};

	createTile() {
		return {
			id: this.nextAvailableTileId,
			val: 2
		}
	}

	addTileToBoard() {
		if (!this.canAddTile) return; 
		const tile = this.createTile();
		let tileCoordinates;
		while (!tileCoordinates) {
			tileCoordinates = this.checkCollision(generateRandomCoordinates(this.gameType));
		}
		this.board[tileCoordinates.y][tileCoordinates.x] = tile;
		this.nextAvailableTileId++;
		controller.incrementNumberOfTilesOnBoard();
		return {
			y: tileCoordinates.y,
			x: tileCoordinates.x,
			id: tile.id
		};
	};

	moveTiles(key) {
		let boardToSort = [...this.board];
		let sortedBoard = this.createBoard(2);
		(key === 'ArrowUp' || key === 'ArrowDown') ? boardToSort = this.rotateBoard([...boardToSort]): null;
		if (key === 'ArrowRight' || key === 'ArrowDown') {
			for (let [index, subArray] of boardToSort.entries()) {
				sortedBoard[index] = subArray.filter(el => !el).concat(this.mergeTiles(subArray.filter(el => el), key));
				sortedBoard[index] = [...sortedBoard[index]].filter(el => !el).concat([...sortedBoard[index]].filter(el => el));
			}
		}
		else {
			for (let [index, subArray] of boardToSort.entries()) {
				sortedBoard[index] = this.mergeTiles(subArray.filter(el => el), key).concat(subArray.filter(el => !el));
				sortedBoard[index] = [...sortedBoard[index]].filter(el => el).concat([...sortedBoard[index]].filter(el => !el));
			}
		}
		(key === 'ArrowUp' || key === 'ArrowDown') ? sortedBoard = this.rotateBoard([...sortedBoard]): null;
		let previouslyUpdatedTiles = this.generateArrayWithUpdatedTiles(this.board);
		this.board = [...sortedBoard];
		let arrWithUpdatedTiles = this.generateArrayWithUpdatedTiles(sortedBoard);
		this.canAddTile = !this.checkIfArraysEqual(previouslyUpdatedTiles, arrWithUpdatedTiles);
		if (!this.canAddTile) return;
		this.numberOfMoves++;
		return arrWithUpdatedTiles;
	};

	checkIfPossibleMerge() {
		let tempBoard = [...this.board];
		for (const subArray of tempBoard) {
			for (let i = 0; i <= subArray.length - 2; i++) {
				if (subArray[i].val === subArray[i + 1].val) return true;
			}
		}
		tempBoard = this.rotateBoard([...tempBoard]);
		for (const subArray of tempBoard) {
			for (let i = 0; i <= subArray.length - 2; i++) {
				if (subArray[i].val === subArray[i + 1].val) return true;
			}
		}
		return false;
	};

	checkIfArraysEqual(arr1, arr2) {
		if (typeof arr1 === 'undefined') return false;
		let previouslyUpdatedTiles = JSON.stringify(arr1);
		let arrWithUpdatedTiles = JSON.stringify(arr2);
		return previouslyUpdatedTiles === arrWithUpdatedTiles
	};

	generateArrayWithUpdatedTiles(board) {
		let arrayWithTiles = [];
		for (let [index, subArray] of board.entries()) {
			subArray.filter(el => el).map(el => {
				arrayWithTiles.push({
					id: el.id,
					val: el.val,
					y: index,
					x: subArray.map(arrayEl => { return arrayEl.id }).indexOf(el.id),
					mergedId: el.mergedId
				});
			});
		}
		return arrayWithTiles;
	};

	rotateBoard(boardToRotate) {
		let rotatedBoard = this.createBoard(1);
		for (let i = 0; i < boardToRotate.length; i++) {
			for (let j = 0; j < boardToRotate.length; j++) {
				rotatedBoard[i].push(boardToRotate[j][i]);
			}
		}
		return rotatedBoard;
	};

	mergeTiles(arr, key) {
		if (arr.length < 2) return arr;
		if ((key === 'ArrowDown' || key === 'ArrowRight')) {
			for (let i = arr.length - 1; i >= 1; i--) {
				if (arr[i].val === arr[i - 1].val) {
					arr[i].val += arr[i - 1].val;
					arr[i].mergedId = arr[i - 1].id;
					arr[i - 1] = '';
					this.updateScore(arr[i].val);
					controller.tilesOnBoard--;
				}
			}
		} else {
			for (let i = 0; i <= arr.length - 2; i++) {
				if (arr[i].val === arr[i + 1].val) {
					arr[i].val += arr[i + 1].val;
					arr[i].mergedId = arr[i + 1].id;
					arr[i + 1] = '';
					this.updateScore(arr[i].val);
					controller.tilesOnBoard--;
				}
			}
		}
		return arr;
	};

	updateScore(pointsToAdd) {
		this.score += pointsToAdd;
		if (this.score > this.bestScore) {
			localStorage.setItem(`bestScore${this.gameType}`, this.score);
			this.bestScore = +localStorage.getItem(`bestScore${this.gameType}`);
		}
		view.updateScore(this.score);
	};
}