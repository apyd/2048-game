import {
    model
} from "./app.js";

export default class View {
    constructor() {
        this.popupVisible = false;
    }

    togglePopup() {
        this.popupVisible = !this.popupVisible;
        document.querySelector(".overlay").classList.toggle('overlay--visible');
    }

    clearBoard() {
        let board = document.querySelector('.board');
        while (board.firstChild) {
            board.removeChild(board.lastChild);
        }
    }

    addTile({y, x, id}) {
        let board = document.querySelector('.board');
        let tile = document.createElement('div');
        tile.classList.add('tile');
        tile.classList.add('tile--2');
        tile.style.left = `${x*95+x*10}px`;
        tile.style.top = `${y*95+y*10}px`;
        tile.dataset.id = id;
        let span = document.createElement('span');
        span.classList.add('tile__value')
        span.innerHTML = "2";
        tile.appendChild(span);
        board.appendChild(tile);
    }

    moveTiles(key) {

    }


    mergeTiles() {
    }

    updateScore(score) {
        document.querySelectorAll('.scoreboard__value')[0].innerHTML = score;
        document.querySelectorAll('.scoreboard__value')[1].innerHTML = localStorage.getItem('bestScore');
    }
}