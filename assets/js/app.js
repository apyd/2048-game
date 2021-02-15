import View from './view.js';
import Controller from './controller.js';
import Board from './board.js';
import Tile from './tile.js';
import Score from './score.js';

const startBtns = document.querySelectorAll('[data-action="start-game"]');
const closeBtn = document.querySelector('[data-action="close-popup"]');
const arrowBtn = document.querySelector('[data-action="open-entry-screen"]');
const overlay = document.querySelector('.overlay');
const radioInputs = document.querySelectorAll('.game-option__input');
const gameBoard = document.querySelector('.board');

const board = new Board();
const tile = new Tile();
const score = new Score();
const view = new View();
const controller = new Controller();

controller.setView(view);
controller.setBoard(board);
controller.setTile(tile);
controller.setScore(score);
board.setTile(tile);
board.setScore(score);

radioInputs.forEach((radioBtn) => radioBtn.addEventListener('click', () => {
	startBtns[0].disabled = false;
	controller.gameType = radioBtn.value;
}));
startBtns.forEach((startBtn) => startBtn.addEventListener('click', () => controller.startGame()));
closeBtn.addEventListener('click', function (e) {
	e.stopPropagation();
	view.togglePopup(this);
});
arrowBtn.addEventListener('click', () => controller.cancelGame());
overlay.addEventListener('click', (e) => {
	view.togglePopup(e.target);
});
document.addEventListener('keydown', (e) => controller.onKeyPress(e));
window.addEventListener('resize', () => view.onScreenResize(controller.gameStatus));
window.addEventListener('DOMContentLoaded', () => {
	view.updateScore();
});
['touchstart', 'touchend'].forEach((eventType) => gameBoard.addEventListener(eventType, (e) => controller.onTouch(e)));
