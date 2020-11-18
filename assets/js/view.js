export class View {
    constructor(overlay, bestScore, score) {
        this.popupVisible = false;
        this.overlay = overlay;
        this.bestScore = bestScore;
        this.score = score;
    }
    
    get popupVisibility() {
        return this.popupVisible;
    }

    togglePopup() {
        this.popupVisible = !this.popupVisible;
        this.overlay.classList.toggle('overlay--visible');
    }

    addTile(coordinates) {
        let parent = document.querySelector(`[data-coordinates="${coordinates}"]`);
        let tile = this.createTile();
        parent.appendChild(tile, parent);
    }

    createTile() {
            let div = document.createElement('div');
            let span = document.createElement('span');
            div.classList.add('tile');
            div.classList.add('tile--2');
            span.classList.add('tile__value')
            span.innerHTML = "2";
            div.appendChild(span, div);
            return div;
    }

    updateBoard(board) {
        console.log('move Tiles');
    }

    updateResults(score) {
        this.bestScore = localStorage.getItem('bestScore');
        console.log(this.bestScore, this.score);
    }
}