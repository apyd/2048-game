export class View {
    constructor(overlay) {
        this.popupVisible = false;
        this.overlay = overlay;
    }

    togglePopup() {
        this.popupVisible = !this.popupVisible;
        this.overlay.classList.toggle('overlay--visible');
    }

    addTile() {

    }

    moveTiles(direction) {
        
    }

    mergeTiles() {

    }
}