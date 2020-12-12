export default class View {
    constructor() {
        this.popupVisible = false;
        this.tileDimension;
        this.innerBorderWidth;
        this.gameType;
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

    initGame(gameType) {
        this.gameType = gameType;
        document.querySelector('.board').id = `t${gameType}`;
        document.querySelectorAll('.scoreboard__value')[1].innerHTML = localStorage.getItem(`bestScore${this.gameType}`);
        if (gameType === '3') {
            this.tileDimension = 128;
            this.innerBorderWidth = 13;
        }
        else {
            this.tileDimension = 95;
            this.innerBorderWidth = 10;
        }
        document.querySelector('.entry-screen').classList.add('hidden');
        document.querySelector('.main').classList.remove('hidden');
    }

    showEntryScreen() {
        document.querySelector('.entry-screen').classList.remove('hidden');
        document.querySelector('.main').classList.add('hidden');
    }

    addTile({
            y,
            x,
            id
        }) {
        let board = document.querySelector('.board');
        let tile = document.createElement('div');
        tile.classList.add('tile', `t${this.gameType}`, 'tile--2', 'add');
        tile.style.left = `${x*this.tileDimension+x*this.innerBorderWidth}px`;
        tile.style.top = `${y*this.tileDimension+y*this.innerBorderWidth}px`;
        tile.dataset.id = id;
        let span = document.createElement('span');
        span.classList.add('tile__value');
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
            tile.style.left = `${arrayWithTiles[index].x*this.tileDimension+arrayWithTiles[index].x*this.innerBorderWidth}px`;
            tile.style.top = `${arrayWithTiles[index].y*this.tileDimension+arrayWithTiles[index].y*this.innerBorderWidth}px`;
            tile.classList.add('move');
            setTimeout(() => tile.classList.remove('move'), 600);
        });
    }


    mergeTiles(retainedTile, tileToMerge, retainedObj) {
        tileToMerge.style.left = `${retainedObj[0].x*this.tileDimension+retainedObj[0].x*this.innerBorderWidth}px`;
        tileToMerge.style.top = `${retainedObj[0].y*this.tileDimension+retainedObj[0].y*this.innerBorderWidth}px`;
        tileToMerge.classList.add('merge');
        retainedTile.style.left = `${retainedObj[0].x*this.tileDimension+retainedObj[0].x*this.innerBorderWidth}px`;
        retainedTile.style.top = `${retainedObj[0].y*this.tileDimension+retainedObj[0].y*this.innerBorderWidth}px`;
        retainedTile.classList = `tile t${this.gameType} tile--${retainedObj[0].val}`;
        retainedTile.firstChild.innerHTML = `${retainedObj[0].val}`;
        retainedTile.classList.add('merge');
        setTimeout(() => retainedTile.classList.remove('merge'), 600);
        tileToMerge.remove();

    }

    updateScore(score = 0) {
        document.querySelectorAll('.scoreboard__value')[0].innerHTML = score;
        document.querySelectorAll('.scoreboard__value')[1].innerHTML = localStorage.getItem(`bestScore${this.gameType}`);
    }
}