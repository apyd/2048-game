import { createModelInstance, createViewInstance, createControllerInstance } from './init.js';

const startBtn = document.getElementById('start-game');
const restartBtn = document.getElementById('restart-game');
const closeBtn = document.getElementById('close-popup');
const arrowBtn = document.getElementById('open-entry-screen');
const overlay = document.querySelector('.overlay');
const radioBtns = document.querySelectorAll('.game-option__input');
const board = document.querySelector('.board');

export const view = createViewInstance();
export const model = createModelInstance();
export const controller = createControllerInstance();

radioBtns.forEach((radioBtn) => radioBtn.addEventListener('click', () => {
	startBtn.disabled = false;
	controller.gameType = radioBtn.value;
}));
startBtn.addEventListener('click', (e) => controller.startGame(e));
restartBtn.addEventListener('click', (e) => controller.startGame(e));
closeBtn.addEventListener('click', () => view.togglePopup());
arrowBtn.addEventListener('click', () => controller.cancelGame(e));
overlay.addEventListener('click', (e) => { if (e.target === overlay) view.togglePopup(); });
window.addEventListener('keyup', (e) => controller.onKeyPress(e.key));
window.addEventListener('DOMContentLoaded', () => view.updateScore());
board.addEventListener('touchstart', (e) => {
	controller.onTouch(e.type, e.changedTouches[0].clientX, e.changedTouches[0].clientY);
});
board.addEventListener('touchend', (e) => {
	controller.onTouch(e.type, e.changedTouches[0].clientX, e.changedTouches[0].clientY);
});
window.addEventListener('resize', () => view.onScreenResize());