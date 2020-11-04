export class Controller {
    constructor() {
        this.gameStatus = 'init';
    }

    startGame() {
        console.log('Start game');
        this.gameStatus = 'running';
        
    }

    endGame() {
        this.gameStatus = 'finished';
    }
}