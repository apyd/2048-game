export default class View {
    constructor() {
        this.popupVisible = false;
    }

    togglePopup() {
        this.popupVisible = !this.popupVisible;
        document.querySelector(".overlay").classList.toggle('overlay--visible');
    }

    addTile(coordinates) {
        let board = document.querySelector('.board');
        let tile = document.createElement('div');
        tile.classList.add('tile');
        tile.classList.add('tile--2');
        tile.style.left = `${coordinates.charAt(0)*95+(coordinates.charAt(0)*10)}px`;
        tile.style.top = `${coordinates.charAt(1)*95+(coordinates.charAt(1)*10)}px`;
        tile.dataset.coordinates = coordinates;
        let span = document.createElement('span');
        span.classList.add('tile__value')
        span.innerHTML = "2";
        tile.appendChild(span);
        board.appendChild(tile);
    }

    moveTiles() {
    }


    mergeTiles() {
    }

    updateScore(score) {
        document.querySelectorAll('.scoreboard__value')[0].innerHTML = score;
        document.querySelectorAll('.scoreboard__value')[1].innerHTML = localStorage.getItem('bestScore');
    }
}