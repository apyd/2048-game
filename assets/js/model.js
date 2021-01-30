import { arrowKeys } from './keys.js';
import { controller, view } from './app.js';
import { generateRandomCoordinates, checkIfArraysEqual } from './utils.js';

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
		this.clearBoard();
		this.canAddTile = true;
		this.bestScore = +localStorage.getItem(`bestScore${this.gameType}`);
	}

	createBoard(boardType) {
		switch (boardType) {
		case 1:
			return Array(this.gameType).fill().map(() => []);
		default:
			return new Array(this.gameType).fill().map(() => new Array(this.gameType).fill(''));
		}
	}

	clearBoard() {
		this.board = this.createBoard();
		this.nextAvailableTileId = 0;
		this.score = 0;
	}

	checkCollision({ x, y }) {
		return this.board[y][x] ? false : { x, y };
	}

	createTile() {
		return {
			id: this.nextAvailableTileId,
			val: 2
		};
	}

	addTileToBoard() {
		if (!this.canAddTile) return false;
		const tile = this.createTile();
		let tileCoordinates;
		while (!tileCoordinates) {
			tileCoordinates = this.checkCollision(generateRandomCoordinates(this.gameType));
		}
		this.board[tileCoordinates.y][tileCoordinates.x] = tile;
		this.nextAvailableTileId += 1;
		controller.incrementNumberOfTilesOnBoard();
		return {
			y: tileCoordinates.y,
			x: tileCoordinates.x,
			id: tile.id
		};
	}

	moveTiles(key) {
		let boardToSort = [...this.board];
		boardToSort = (key === arrowKeys.ArrowUp || key === arrowKeys.ArrowDown) ? this.rotateBoard([...boardToSort]) : boardToSort;
		let sortedBoard = boardToSort.map((boardRow) => Model.sortArray(this.mergeTiles(boardRow, key), key));
		sortedBoard = (key === arrowKeys.ArrowUp || key === arrowKeys.ArrowDown) ? this.rotateBoard([...sortedBoard]) : sortedBoard;
		const previouslyUpdatedTiles = Model.generateArrayWithUpdatedTiles(this.board);
		this.board = [...sortedBoard];
		const arrWithUpdatedTiles = Model.generateArrayWithUpdatedTiles(sortedBoard);
		this.canAddTile = !checkIfArraysEqual(previouslyUpdatedTiles, arrWithUpdatedTiles);
		if (!this.canAddTile) return false;
		this.numberOfMoves += 1;
		return arrWithUpdatedTiles;
	}

	static sortArray(arrayToSort, key) {
		if (key === arrowKeys.ArrowLeft || key === arrowKeys.ArrowUp) {
			return ((arrayToSort.filter((arrayElement) => arrayElement)))
				.concat(arrayToSort.filter((arrayElement) => !arrayElement));
		}
		return ((arrayToSort.filter((arrayElement) => !arrayElement)))
			.concat(arrayToSort.filter((arrayElement) => arrayElement));
	}

	static generateArrayWithUpdatedTiles(board) {
		const arrayWithUpdatedTiles = [];
		board.forEach((boardRow, index) => {
			boardRow.filter((tile) => tile).map((tile) => arrayWithUpdatedTiles.push({
				id: tile.id,
				val: tile.val,
				y: index,
				x: boardRow.map((arrayElement) => arrayElement.id).indexOf(tile.id),
				mergedId: tile.mergedId
			}));
		});
		return arrayWithUpdatedTiles;
	}

	rotateBoard(boardToRotate) {
		const rotatedBoard = this.createBoard(1);
		for (let i = 0; i < boardToRotate.length; i++) {
			for (let j = 0; j < boardToRotate.length; j++) {
				rotatedBoard[i].push(boardToRotate[j][i]);
			}
		}
		return rotatedBoard;
	}

	checkIfPossibleMerge() {
		const board = [...this.board];
		const rotatedBoard = this.rotateBoard(board);
		for (let i = 0; i <= board.length - 1; i++) {
			for (let j = 0; j < board.length - 1; j++) {
				if ((board[i][j].val === board[i][j + 1].val)
				|| (rotatedBoard[i][j].val === rotatedBoard[i][j + 1].val)) return true;
			}
		}
		return false;
	}

	mergeTiles(array, key) {
		const filteredArray = array.filter((el) => el);
		if (filteredArray.length < 2) return array;
		if (key === arrowKeys.ArrowDown || key === arrowKeys.ArrowRight) {
			for (let i = filteredArray.length - 1; i >= 1; i--) {
				if (filteredArray[i].val === filteredArray[i - 1].val) {
					filteredArray[i].val += filteredArray[i - 1].val;
					filteredArray[i].mergedId = filteredArray[i - 1].id;
					filteredArray[i - 1] = '';
					this.updateScore(filteredArray[i].val);
					controller.decrementNumberOfTilesOnBoard();
				}
			}
		} else {
			for (let i = 0; i <= filteredArray.length - 2; i++) {
				if (filteredArray[i].val === filteredArray[i + 1].val) {
					filteredArray[i].val += filteredArray[i + 1].val;
					filteredArray[i].mergedId = filteredArray[i + 1].id;
					filteredArray[i + 1] = '';
					this.updateScore(filteredArray[i].val);
					controller.decrementNumberOfTilesOnBoard();
				}
			}
		}
		return (array.filter((el) => !el)).concat(filteredArray);
	}

	updateScore(pointsToAdd) {
		this.score += pointsToAdd;
		if (this.score > this.bestScore) {
			localStorage.setItem(`bestScore${this.gameType}`, this.score);
			this.bestScore = +localStorage.getItem(`bestScore${this.gameType}`);
		}
		view.updateScore(this.score);
	}
}