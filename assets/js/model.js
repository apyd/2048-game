import {
    controller,
    view
} from './app.js';

export default class Model {
    constructor() {
        this.nextId = 0;
        this.score = 0;
        this.bestScore = +localStorage.getItem(`bestScore${this.gameType}`);
        this.gameType;
        this.board;
        this.numberOfMoves = 0;
    }

    initGame(selectedType) {
            this.gameType = +selectedType;
            this.board = Array(this.gameType).fill().map(() => Array(this.gameType).fill(''));
    }

    clearBoard() {
        this.board = Array(this.gameType).fill('').map(() => Array(this.gameType));
        this.nextId = 0;
    }

    generateCoordinates() {
        let x = Math.floor((Math.random() * this.gameType));
        let y = Math.floor((Math.random() * this.gameType));
        return this.checkCollision(x, y) ? `${x}${y}` : this.generateCoordinates();
    }

    checkCollision(x, y) {
        return this.board[x][y] ? false : true;
    }

    addTile() {
            let coordinates = this.generateCoordinates();
            let id = this.nextId;
            this.board[coordinates.charAt(0)][coordinates.charAt(1)] = {
                id: id,
                val: 2
            };
            this.nextId++;
            controller.tilesOnBoard++;
            return {
                y: coordinates.charAt(0),
                x: coordinates.charAt(1),
                id: id
            };
    }

    moveTiles(key) {
        let boardToSort = [...this.board];
        let sortedBoard = Array(this.gameType).fill().map(() => Array(this.gameType));
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
        this.board = [...sortedBoard];
        this.numberOfMoves++;
        return this.generateArrayWithUpdatedTiles(sortedBoard);
    }

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
    }

    generateArrayWithUpdatedTiles(board) {
        let arrayWithTiles = [];
        for (let [index, subArray] of board.entries()) {
            arrayWithTiles.push(subArray.filter(el => el).map(el => {
                return {
                    id: el.id,
                    val: el.val,
                    y: index,
                    x: subArray.map(arrayEl => {
                        return arrayEl.id
                    }).indexOf(el.id),
                    mergedId : el.mergedId
                }
            }));
        }
        let arr = [].concat(...arrayWithTiles);
        return arr;
    }

    rotateBoard(boardToRotate) {
        let rotatedBoard = Array(this.gameType).fill().map(() => Array());
        for (let i = 0; i < boardToRotate.length; i++) {
            for(let j = 0; j < boardToRotate.length; j++) {
                rotatedBoard[i].push(boardToRotate[j][i]);
            }
        }
        return rotatedBoard;
    }
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