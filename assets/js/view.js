export default class View {
    constructor() {
        this.tileDimension;
        this.innerBorderWidth;
        this.outerBorderWidth;
        this.gameType;
        this.screenType;
        this.gameSettings = {
            t4: {
                mobile: {
                    tileDimension: 66,
                    innerBorderWidth: 8,
                    outerBorderWidth: 6
                },
                desktop: {
                    tileDimension: 88,
                    innerBorderWidth: 10,
                    outerBorderWidth: 9
            }
            },
            t5: {
                mobile: {
                    tileDimension: 54,
                    innerBorderWidth: 5,
                    outerBorderWidth: 5
                },
                desktop: {
                    tileDimension: 72,
                    innerBorderWidth: 7,
                    outerBorderWidth: 6
                }
            }
        }
    }

    togglePopup() {
        document.querySelector(".overlay").classList.toggle('hidden');
    }
    showEndGamePopup(time, numberOfMoves, result) {
        document.querySelectorAll('.header__text')[1].innerHTML = 'End game';
        const popupBody = document.querySelector('.popup__body');
        popupBody.innerHTML = `<p class="popup__text"><span class="text__label">Time elapsed: </span>${time}</p>
                             <p class="popup__text"><span class="text__label">Moves performed: </span>${numberOfMoves}</p>
                             <p class="popup__text"><span class="text__label">Your result: </span>${result} points </p>`
        this.togglePopup();
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
        document.querySelectorAll('.scoreboard__value')[0].innerHTML = 0;
        let windowWidth = window.innerWidth;
        windowWidth > 480 ? this.screenType = 'desktop' : this.screenType = 'mobile';
        this.tileDimension = this.gameSettings[`t${this.gameType}`][this.screenType].tileDimension;
        this.innerBorderWidth = this.gameSettings[`t${this.gameType}`][this.screenType].innerBorderWidth;
        this.outerBorderWidth = this.gameSettings[`t${this.gameType}`][this.screenType].outerBorderWidth;
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
        tile.style.left = `${(x*this.tileDimension+x*this.innerBorderWidth)+this.outerBorderWidth}px`;
        tile.style.top = `${(y*this.tileDimension+y*this.innerBorderWidth)+this.outerBorderWidth}px`;
        tile.dataset.id = id;
        tile.dataset.x = x;
        tile.dataset.y = y;
        let span = document.createElement('span');
        span.classList.add('tile__value');
        span.innerHTML = "2";
        tile.appendChild(span);
        board.appendChild(tile);
        tile.addEventListener('transitionend', () => {
            tile.classList.remove('move');
        });
        tile.addEventListener('animationend', () => {
            tile.classList.contains('add') ? tile.classList.remove('add') : null;
            tile.classList.contains('merge') ? tile.classList.remove('merge') : null;
        });
    }

    moveTiles(arrayWithTiles) {
        if (!arrayWithTiles) return;
        let tiles = document.querySelectorAll('.tile');
        let index;
        tiles.forEach(tile => {
            index = arrayWithTiles.map(arrTile => arrTile.id).indexOf(+tile.dataset.id);
            if(index === -1) {
                let retainedTileObj = arrayWithTiles.filter(el => el.mergedId === (+tile.dataset.id));
                let retainedTile = document.querySelector(`[data-id="${retainedTileObj[0].id}"]`);
                return this.mergeTiles(retainedTile, tile, retainedTileObj);
            }
            tile.style.left = `${(arrayWithTiles[index].x*this.tileDimension+arrayWithTiles[index].x*this.innerBorderWidth)+this.outerBorderWidth}px`;
            tile.style.top = `${(arrayWithTiles[index].y*this.tileDimension+arrayWithTiles[index].y*this.innerBorderWidth)+this.outerBorderWidth}px`;
            tile.dataset.x = arrayWithTiles[index].x;
            tile.dataset.y = arrayWithTiles[index].y;
            tile.classList.add('move');
        });
    }


    mergeTiles(retainedTile, tileToMerge, retainedObj) {
        tileToMerge.style.left = `${(retainedObj[0].x*this.tileDimension+retainedObj[0].x*this.innerBorderWidth)+this.outerBorderWidth}px`;
        tileToMerge.style.top = `${(retainedObj[0].y*this.tileDimension+retainedObj[0].y*this.innerBorderWidth)+this.outerBorderWidth}px`;
        tileToMerge.classList.add('merge');
        retainedTile.style.left = `${(retainedObj[0].x*this.tileDimension+retainedObj[0].x*this.innerBorderWidth)+this.outerBorderWidth}px`;
        retainedTile.style.top = `${(retainedObj[0].y*this.tileDimension+retainedObj[0].y*this.innerBorderWidth)+this.outerBorderWidth}px`;
        retainedTile.classList = `tile t${this.gameType} tile--${retainedObj[0].val}`;
        retainedTile.firstChild.innerHTML = `${retainedObj[0].val}`;
        retainedTile.classList.add('merge');
        !(retainedTile.firstChild.textContent.length < 5) ? retainedTile.style.fontSize = `.8em` : null;
        tileToMerge.remove();
    }

    updateScore(score = 0) {
        document.querySelectorAll('.scoreboard__value')[0].innerHTML = score;
        document.querySelectorAll('.scoreboard__value')[1].innerHTML = localStorage.getItem(`bestScore${this.gameType}`);
    }

    onScreenResize() {
        let tiles = document.querySelectorAll('.tile');
        let screenType = this.screenType;
        let windowWidth = window.innerWidth;
        windowWidth > 480 ? this.screenType = 'desktop' : this.screenType = 'mobile';
        if (screenType === this.screenType) return;
        this.tileDimension = this.gameSettings[`t${this.gameType}`][this.screenType].tileDimension;
        this.innerBorderWidth = this.gameSettings[`t${this.gameType}`][this.screenType].innerBorderWidth;
        this.outerBorderWidth = this.gameSettings[`t${this.gameType}`][this.screenType].outerBorderWidth;
        tiles.forEach(tile => {
            tile.style.left = `${(tile.dataset.x*this.tileDimension+tile.dataset.x*this.innerBorderWidth)+this.outerBorderWidth}px`;
            tile.style.top = `${(tile.dataset.y*this.tileDimension+tile.dataset.y*this.innerBorderWidth)+this.outerBorderWidth}px`;
        });

    }
}