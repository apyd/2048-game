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

    moveTiles(arrayWithTiles) {
        let tiles = document.querySelectorAll('.tile');
        let index;
        tiles.forEach(tile => {
            index = arrayWithTiles.map(arrTile => arrTile.id).indexOf(+tile.dataset.id);
            if(index === -1) {
                let mergedIndex = arrayWithTiles.filter(arrTile => arrTile.mergedId).map(arrTile => arrTile.mergedId).indexOf(+tile.dataset.id);
                return this.mergeTiles(tiles[mergedIndex], tile);
            }
            tile.style.left = `${arrayWithTiles[index].x*95+arrayWithTiles[index].x*10}px`;
            tile.style.top = `${arrayWithTiles[index].y*95+arrayWithTiles[index].y*10}px`;
        });
    }


    mergeTiles(retainedTile, tileToMerge) {
        console.log(retainedTile, tileToMerge);
    }

    updateScore(score) {
        document.querySelectorAll('.scoreboard__value')[0].innerHTML = score;
        document.querySelectorAll('.scoreboard__value')[1].innerHTML = localStorage.getItem('bestScore');
    }
}