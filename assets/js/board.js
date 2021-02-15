import { arrowKeys } from './keys.js';
import { generateRandomCoordinates,
	checkIfArraysEqual,
	sortArray,
	getAllElementsFromMultidimensionalArray,
	updateItemsCoordinatesInMultidimensionalArray } from './utils.js';

export default class Board {
	gameType;
	tile;
	board;
	tile;
	score;

	constructor() {
		this.canAddTile = true;
		this.numberOfMoves = 0;
		this.tilesOnBoard = 0;
	}

	setTile(tile) {
		this.tile = tile;
	}

	setScore(score) {
		this.score = score;
	}

	createBoard(boardType) {
		switch (boardType) {
		case 1:
			return new Array(this.gameType).fill().map(() => []);
		default:
			return new Array(this.gameType).fill().map(() => new Array(this.gameType).fill(''));
		}
	}

	resetBoard(gameType) {
		this.gameType = +gameType;
		this.board = this.createBoard();
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

	addTileToBoard() {
		if (!this.canAddTile) return false;
		let tileCoordinates;
		while (!tileCoordinates) {
			tileCoordinates = this.checkCollision(generateRandomCoordinates(this.gameType));
		}
		const newTile = this.tile.create(tileCoordinates);
		this.board[tileCoordinates.y][tileCoordinates.x] = newTile;
		this.tile.incrementNextAvailableTileId();
		this.tilesOnBoard += 1;
		return newTile;
	}

	moveTiles(key) {
		let boardToSort = [...this.board];
		boardToSort = (key === arrowKeys.ArrowUp || key === arrowKeys.ArrowDown) ? this.rotateBoard([...boardToSort]) : boardToSort;
		let sortedBoard = boardToSort.map((boardRow) => sortArray(this.mergeTilesOnBoard(boardRow, key), key));
		sortedBoard = (key === arrowKeys.ArrowUp || key === arrowKeys.ArrowDown) ? this.rotateBoard([...sortedBoard]) : sortedBoard;
		const previouslyUpdatedTiles = getAllElementsFromMultidimensionalArray(this.board);
		const boardWithUpdatedTilesCoordinates = updateItemsCoordinatesInMultidimensionalArray(sortedBoard);
		this.board = [...boardWithUpdatedTilesCoordinates];
		const arrWithUpdatedTiles = getAllElementsFromMultidimensionalArray(boardWithUpdatedTilesCoordinates);
		this.canAddTile = !checkIfArraysEqual(previouslyUpdatedTiles, arrWithUpdatedTiles);
		if (!this.canAddTile) return false;
		this.numberOfMoves += 1;
		return arrWithUpdatedTiles;
	}

	checkIfPossibleMerge() {
		const board = [...this.board];
		const rotatedBoard = this.rotateBoard(board);
		for (let i = 0; i <= board.length - 1; i++) {
			for (let j = 0; j < board.length - 1; j++) {
				if ((board[i][j].val === board[i][j + 1].val) || (rotatedBoard[i][j].val === rotatedBoard[i][j + 1].val)) return true;
			}
		}
		return false;
	}

	mergeTilesOnBoard(array, key) {
		const filteredArray = array.filter((el) => el);
		if (filteredArray.length < 2) return array;
		if (key === arrowKeys.ArrowDown || key === arrowKeys.ArrowRight) {
			for (let i = filteredArray.length - 1; i >= 1; i--) {
				if (filteredArray[i].val === filteredArray[i - 1].val) {
					filteredArray[i].val += filteredArray[i - 1].val;
					filteredArray[i].mergedId = filteredArray[i - 1].id;
					filteredArray[i - 1] = '';
					this.score.update(filteredArray[i].val, this.gameType);
					this.tilesOnBoard -= 1;
				}
			}
		} else {
			for (let i = 0; i <= filteredArray.length - 2; i++) {
				if (filteredArray[i].val === filteredArray[i + 1].val) {
					filteredArray[i].val += filteredArray[i + 1].val;
					filteredArray[i].mergedId = filteredArray[i + 1].id;
					filteredArray[i + 1] = '';
					this.score.update(filteredArray[i].val, this.gameType);
					this.tilesOnBoard -= 1;
				}
			}
		}
		return (array.filter((el) => !el)).concat(filteredArray);
	}

	checkCollision({ x, y }) {
		return this.board[y][x] ? false : { x, y };
	}
}