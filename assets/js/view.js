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
        tile.classList.add('tile', 'tile--2', 'add');
        tile.style.left = `${x*95+x*10}px`;
        tile.style.top = `${y*95+y*10}px`;
        tile.dataset.id = id;
        let span = document.createElement('span');
        span.classList.add('tile__value')
        span.innerHTML = "2";
        tile.appendChild(span);
        board.appendChild(tile);
        setTimeout(() => tile.classList.remove('add'), 600);
    }

    moveTiles(arrayWithTiles) {
        let tiles = document.querySelectorAll('.tile');
        let index;
        tiles.forEach(tile => {
            index = arrayWithTiles.map(arrTile => arrTile.id).indexOf(+tile.dataset.id);
            if(index === -1) {
                let retainedTileObj = arrayWithTiles.filter(el => el.mergedId === (+tile.dataset.id));
                let retainedTile = document.querySelector(`[data-id="${retainedTileObj[0].id}"]`);
                return this.mergeTiles(retainedTile, tile, retainedTileObj);
            }
            tile.style.left = `${arrayWithTiles[index].x*95+arrayWithTiles[index].x*10}px`;
            tile.style.top = `${arrayWithTiles[index].y*95+arrayWithTiles[index].y*10}px`;
            tile.classList.add('move');
            setTimeout(() => tile.classList.remove('move'), 600);
        });
    }


    mergeTiles(retainedTile, tileToMerge, retainedObj) {
        tileToMerge.style.left = `${retainedObj[0].x*95+retainedObj[0].x*10}px`;
        tileToMerge.style.top = `${retainedObj[0].y*95+retainedObj[0].y*10}px`;
        tileToMerge.classList.add('merge');
        retainedTile.style.left = `${retainedObj[0].x*95+retainedObj[0].x*10}px`;
        retainedTile.style.top = `${retainedObj[0].y*95+retainedObj[0].y*10}px`;
        retainedTile.classList = `tile tile--${retainedObj[0].val}`;
        retainedTile.firstChild.innerHTML = `${retainedObj[0].val}`;
        retainedTile.classList.add('merge');
        setTimeout(() => retainedTile.classList.remove('merge'), 600);
        tileToMerge.remove();

    }

    updateScore(score = 0) {
        document.querySelectorAll('.scoreboard__value')[0].innerHTML = score;
        document.querySelectorAll('.scoreboard__value')[1].innerHTML = localStorage.getItem('bestScore');
    }
}