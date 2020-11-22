import {
    controller,
    view
} from './app.js';

export default class Model {
    constructor() {
        this.nextId = 0;
        this.tilesLimit = 12;
        this.score = 0;
        this.bestScore = +localStorage.getItem('bestScore');
        this.board = [
            ['', '', '', ''],
            ['', '', '', ''],
            ['', '', '', ''],
            ['', '', '', '']
        ]
        }

        clearBoard() {
            this.board = [
                ['', '', '', ''],
                ['', '', '', ''],
                ['', '', '', ''],
                ['', '', '', '']
            ];
            this.nextId = 0;
        }

        generateCoordinates() {
            let x = Math.floor((Math.random() * 4));
            let y = Math.floor((Math.random() * 4));
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
            let sortedBoard = Array.from(Array(4), () => new Array());
            (key === 'ArrowUp' || key === 'ArrowDown') ? boardToSort = this.rotateBoard([...boardToSort]): null;
            if (key === 'ArrowRight' || key === 'ArrowDown') {
                for (let [index, subArray] of boardToSort.entries()) {
                    sortedBoard[index] = subArray.filter(el => !el).concat(this.mergeTiles(subArray.filter(el => el), key));
                }
            }
            else {
                for (let [index, subArray] of boardToSort.entries()) {
                    sortedBoard[index] = this.mergeTiles(subArray.filter(el => el), key).concat(subArray.filter(el => !el));
                }
            }
            (key === 'ArrowUp' || key === 'ArrowDown') ? sortedBoard = this.rotateBoard([...sortedBoard]): null;
            this.board = [...sortedBoard];
        }

        rotateBoard(boardToRotate) {
            let rotatedBoard = Array.from(Array(4), () => new Array());
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
                        arr[i - 1] = '';
                        this.updateScore(arr[i].val);
                        controller.tilesOnBoard--;
                    }
                }
            } else {
                for (let i = 0; i <= arr.length - 2; i++) {
                    if (arr[i].val === arr[i + 1].val) {
                        arr[i].val += arr[i + 1].val;
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
                    localStorage.setItem('bestScore', this.score);
                    this.bestScore = +localStorage.getItem('bestScore');
            }    
            view.updateScore(this.score);
        }

}